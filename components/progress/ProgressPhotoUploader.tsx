"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "@/app/app/performance/performance.module.css";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

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
    setStatus("Preparando set privado…");
    const supabase = createClient();
    const today = new Date().toISOString().slice(0, 10);

    try {
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
          .insert({ user_id: userId, captured_on: today, label: "Check-in visual" })
          .select("id")
          .single();
        if (created.error) throw created.error;
        set = created.data;
      }

      const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const objectPath = `${userId}/${set.id}/${angle}-${crypto.randomUUID()}.${ext}`;

      setStatus("Enviando de forma privada…");
      const uploadResult = await supabase.storage
        .from("progress-photos")
        .upload(objectPath, file, { contentType: file.type, upsert: false });

      if (uploadResult.error) throw uploadResult.error;

      const metadataResult = await supabase.from("progress_photos").insert({
        photo_set_id: set.id,
        user_id: userId,
        angle,
        object_path: objectPath,
      });

      if (metadataResult.error) {
        await supabase.storage.from("progress-photos").remove([objectPath]);
        throw metadataResult.error;
      }

      setFile(null);
      setStatus("Foto salva. Apenas sua conta pode acessá-la.");
      router.refresh();
    } catch (error) {
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
      <div className={styles.status}>{status || "Bucket privado • RLS por utilizador • URLs temporárias"}</div>
    </div>
  );
}
