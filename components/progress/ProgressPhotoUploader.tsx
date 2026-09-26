"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "@/app/app/performance/performance.module.css";

type Angle = "front" | "side_left" | "back";

function localDateString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

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
  if (!context) throw new Error("Não foi possível processar a imagem.");

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("Falha ao preparar imagem."))),
      "image/jpeg",
      0.86
    );
  });

  return { blob, width, height };
}

export function ProgressPhotoUploader() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("Preparando fotos...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const date = String(formData.get("captured_on") || localDateString());
    const label = String(formData.get("label") || "").trim() || null;

    const inputs: Array<{ angle: Angle; file: File | null }> = [
      { angle: "front", file: formData.get("front") as File | null },
      { angle: "side_left", file: formData.get("side_left") as File | null },
      { angle: "back", file: formData.get("back") as File | null },
    ].filter((item) => item.file && item.file.size > 0);

    if (!inputs.length) {
      setStatus("Escolha pelo menos uma foto.");
      setBusy(false);
      return;
    }

    const uploadedPaths: string[] = [];

    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) throw new Error("Faça login novamente.");

      const userId = authData.user.id;
      const { data: set, error: setError } = await supabase
        .from("progress_photo_sets")
        .insert({
          user_id: userId,
          captured_on: date,
          label,
          ai_analysis_allowed: false,
          metadata: { exif_stripped: true, upload_version: 1 },
        })
        .select("id")
        .single();

      if (setError || !set) throw new Error(setError?.message || "Falha ao criar check-in.");

      for (const item of inputs) {
        setStatus(`Processando ${item.angle}...`);
        const processed = await normalizeImage(item.file!);
        const path = `${userId}/${set.id}/${item.angle}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from("progress-photos")
          .upload(path, processed.blob, {
            contentType: "image/jpeg",
            cacheControl: "300",
            upsert: false,
          });

        if (uploadError) throw new Error(uploadError.message);
        uploadedPaths.push(path);

        const { error: photoError } = await supabase.from("progress_photos").insert({
          photo_set_id: set.id,
          user_id: userId,
          angle: item.angle,
          object_path: path,
          width_px: processed.width,
          height_px: processed.height,
          metadata: { exif_stripped: true, normalized_format: "jpeg" },
        });

        if (photoError) throw new Error(photoError.message);
      }

      setStatus("Check-in fotográfico guardado com segurança.");
      form.reset();
      router.refresh();
    } catch (error) {
      if (uploadedPaths.length) {
        await supabase.storage.from("progress-photos").remove(uploadedPaths);
      }
      setStatus(error instanceof Error ? error.message : "Falha no upload.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={styles.photoUploader} onSubmit={submit}>
      <div className={styles.formHeader}>
        <div>
          <span>PRIVATE PHOTO CHECK-IN</span>
          <h3>Registre a evolução visual</h3>
        </div>
        <small>EXIF removido · bucket privado</small>
      </div>

      <div className={styles.formGrid}>
        <label>
          <span>Data</span>
          <input type="date" name="captured_on" defaultValue={localDateString()} />
        </label>
        <label>
          <span>Etiqueta</span>
          <input name="label" placeholder="Semana 1, Setembro..." />
        </label>
      </div>

      <div className={styles.photoInputs}>
        <label><span>Frente</span><input type="file" name="front" accept="image/jpeg,image/png,image/webp" /></label>
        <label><span>Lado</span><input type="file" name="side_left" accept="image/jpeg,image/png,image/webp" /></label>
        <label><span>Costas</span><input type="file" name="back" accept="image/jpeg,image/png,image/webp" /></label>
      </div>

      <p className={styles.privacyNote}>
        Para comparações úteis, tente repetir distância, iluminação, roupa e postura. As fotos
        não são públicas e não são analisadas por IA nesta fase.
      </p>

      <button disabled={busy} type="submit">{busy ? "A GUARDAR..." : "GUARDAR CHECK-IN →"}</button>
      {status && <p className={styles.uploadStatus}>{status}</p>}
    </form>
  );
}
