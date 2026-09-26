import Link from "next/link";
import { getSession } from "@/lib/session";
import { getProgressPhotoGallery } from "@/lib/progress";
import { ProgressPhotoUploader } from "@/components/progress/ProgressPhotoUploader";
import styles from "../performance.module.css";

export default async function ProgressPhotosPage() {
  const session = await getSession();
  if (!session?.userId) return null;
  const photos = await getProgressPhotoGallery(session.userId);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.top}>
          <Link className={styles.back} href="/app/performance">← PROGRESS</Link>
          <span className={styles.eyebrow}>PRIVATE PHOTO TIMELINE</span>
        </div>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>SAME LIGHT. SAME ANGLE. BETTER COMPARISON.</span>
          <h1>Fotos para acompanhar, não para julgar.</h1>
          <p>
            Para comparações úteis, tente repetir iluminação, distância, roupa e posição.
            As imagens ficam em Storage privado e são abertas por URL temporária.
          </p>
        </section>

        <ProgressPhotoUploader userId={session.userId} />

        <section className={styles.sectionTitle}>
          <span>TIMELINE</span><h2>Registros visuais</h2>
        </section>

        {photos.length ? (
          <div className={styles.photoGrid}>
            {photos.map((photo) => {
              const relation = Array.isArray(photo.progress_photo_sets)
                ? photo.progress_photo_sets[0]
                : photo.progress_photo_sets;
              return (
                <article className={styles.photoCard} key={photo.id}>
                  {photo.signedUrl ? (
                    <a href={photo.signedUrl} target="_blank" rel="noreferrer">
                      <div
                        className={styles.photoPreview}
                        style={{ backgroundImage: `url("${photo.signedUrl}")` }}
                        aria-label={`Foto de progresso: ${photo.angle}`}
                      />
                    </a>
                  ) : <div className={styles.photoPreview} />}
                  <div className={styles.photoMeta}>
                    <span>{String(relation?.captured_on ?? photo.captured_at).slice(0,10)}</span>
                    <span>{photo.angle}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            Ainda não existem fotos. Um set simples frente/lado/costas já é suficiente para começar.
          </div>
        )}

        <section className={styles.notice}>
          <strong>PRIVACIDADE E IA</strong>
          <p>
            Fotos não são públicas e não são enviadas automaticamente ao Coach X. Análise por IA,
            se ativada no futuro, exigirá consentimento explícito e não será usada para estimar
            com falsa precisão percentual de gordura ou massa muscular.
          </p>
        </section>
      </div>
    </main>
  );
}
