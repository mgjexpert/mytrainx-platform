"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "@/app/app/performance/performance.module.css";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

async function normalizeImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Não foi possível preparar a imagem.");

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => result ? resolve(result) : reject(new Error("Falha ao processar a imagem.")),
      "image/jpeg",
      0.86
    );
  });

  return { blob, width, height };
}

export function ProgressPhotoUploader({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState("front");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function upload() {
    if (!file) {
      setStatus("Escolha uma imagem.");
      return;
    }
    if (!allowedTypes.has(file.type)) {
      setStatus("Use JPEG, PNG ou WebP.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setStatus("A imagem deve ter no máximo 8 MB.");
      return;
    }

    setUploading(true);
    setStatus("Removendo metadados e preparando imagem…");
    const supabase = createClient();
    const today = new Date().toISOString().slice(0, 10);
    let uploadedPath: string | null = null;

    try {
      const normalized = await normalizeImage(file);

      let { data: set } = await supabase
        .from("progress_photo_sets")
        .select("id")
        .eq("user_id", userId)
        .eq("captured_on", today)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!set) {
        const created = await supabase
          .from("progress_photo_sets")
          .insert({
            user_id: userId,
            captured_on: today,
            label: "Check-in visual",
            ai_analysis_allowed: false,
            metadata: { upload_version: 2, exif_stripped: true },
          })
          .select("id")
          .single();
        if (created.error) throw created.error;
        set = created.data;
      }

      const objectPath = `${userId}/${set.id}/${angle}-${crypto.randomUUID()}.jpg`;
      uploadedPath = objectPath;

      setStatus("Enviando de forma privada…");
      const uploadResult = await supabase.storage
        .from("progress-photos")
        .upload(objectPath, normalized.blob, {
          contentType: "image/jpeg",
          cacheControl: "300",
          upsert: false,
        });

      if (uploadResult.error) throw uploadResult.error;

      const metadataResult = await supabase.from("progress_photos").insert({
        photo_set_id: set.id,
        user_id: userId,
        angle,
        object_path: objectPath,
        width_px: normalized.width,
        height_px: normalized.height,
        metadata: {
          exif_stripped: true,
          normalized_format: "jpeg",
          upload_version: 2,
        },
      });

      if (metadataResult.error) {
        await supabase.storage.from("progress-photos").remove([objectPath]);
        throw metadataResult.error;
      }

      setFile(null);
      setStatus("Foto salva em área privada. Metadados EXIF removidos.");
      router.refresh();
    } catch (error) {
      if (uploadedPath) {
        await supabase.storage.from("progress-photos").remove([uploadedPath]);
      }
      setStatus(error instanceof Error ? error.message : "Não foi possível enviar a foto.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={styles.upload}>
      <span className={styles.label}>PRIVATE UPLOAD</span>
      <div className={styles.uploadRow}>
        <div className={styles.field}>
          <label htmlFor="angle">Ângulo</label>
          <select id="angle" value={angle} onChange={(event) => setAngle(event.target.value)}>
            <option value="front">Frente</option>
            <option value="side_left">Lado esquerdo</option>
            <option value="side_right">Lado direito</option>
            <option value="back">Costas</option>
            <option value="custom">Outro</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="progress-photo">Imagem</label>
          <input
            id="progress-photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </div>
        <button className={styles.button} type="button" disabled={uploading} onClick={upload}>
          {uploading ? "ENVIANDO…" : "SALVAR FOTO"}
        </button>
      </div>
      <div className={styles.status}>
        {status || "Privado • RLS por utilizador • URL temporária • EXIF removido no upload"}
      </div>
    </div>
  );
}
