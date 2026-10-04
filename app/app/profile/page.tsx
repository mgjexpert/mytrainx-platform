import Link from "next/link";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { saveProfile } from "./actions";
import styles from "@/components/member-section.module.css";

const equipmentOptions = [
  ["bodyweight","Peso corporal"],
  ["bands","Elásticos"],
  ["dumbbells","Halteres"],
  ["barbell","Barra & discos"],
  ["bench","Banco"],
  ["pullup_bar","Barra fixa"],
  ["cables","Cabos"],
  ["machines","Máquinas"],
];

export default async function Page(){
  const session = await getSession();
  if (!session?.userId) return null;
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id",session.userId).maybeSingle();
  const equipment = Array.isArray(profile?.equipment) ? profile.equipment.filter((v):v is string=>typeof v==="string") : [];

  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
      <section className={styles.head}>
        <span>PROFILE · CONTEXT FOR COACH X</span>
        <h1>O teu MyTrainX.</h1>
        <p>
          Estes dados ajudam a plataforma e o Coach X a apresentar contexto mais útil.
          Nada aqui substitui avaliação clínica; altera preferências de produto e treino.
        </p>
      </section>

      <section className={styles.profileGrid}>
        <form action={saveProfile} className={styles.profileForm}>
          <div className={styles.formSection}>
            <span>IDENTIDADE</span>
            <h2>Como queres aparecer</h2>
            <label>Nome
              <input name="display_name" defaultValue={profile?.display_name ?? session.name ?? ""} placeholder="Nome ou apelido"/>
            </label>
            <div className={styles.twoCol}>
              <label>Idioma
                <select name="locale" defaultValue={profile?.locale ?? "pt-BR"}>
                  <option value="pt-BR">Português · Brasil</option>
                  <option value="pt-PT">Português · Portugal</option>
                  <option value="en">English</option>
                </select>
              </label>
              <label>Timezone
                <select name="timezone" defaultValue={profile?.timezone ?? "America/Sao_Paulo"}>
                  <option value="America/Sao_Paulo">Brasil · São Paulo</option>
                  <option value="Europe/Lisbon">Portugal · Lisboa</option>
                  <option value="Europe/London">UK · London</option>
                </select>
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <span>TREINO</span>
            <h2>Contexto base</h2>
            <div className={styles.twoCol}>
              <label>Objetivo principal
                <select name="training_goal" defaultValue={profile?.training_goal ?? ""}>
                  <option value="">Escolher depois</option>
                  <option value="consistency">Consistência</option>
                  <option value="strength">Força</option>
                  <option value="muscle">Ganho de massa</option>
                  <option value="conditioning">Condicionamento</option>
                  <option value="weight_management">Gestão de peso</option>
                  <option value="wellbeing">Saúde & bem-estar</option>
                </select>
              </label>
              <label>Experiência
                <select name="experience_level" defaultValue={profile?.experience_level ?? ""}>
                  <option value="">Não definido</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <span>EQUIPAMENTO</span>
            <h2>O que tens disponível</h2>
            <div className={styles.equipmentGrid}>
              {equipmentOptions.map(([value,label])=>(
                <label key={value} className={styles.checkCard}>
                  <input type="checkbox" name="equipment" value={value} defaultChecked={equipment.includes(value)}/>
                  <b>{label}</b>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className={styles.saveButton}>SALVAR PERFIL →</button>
        </form>

        <aside className={styles.profileAside}>
          <article className={styles.card}><span>ACCOUNT</span><b>{profile?.display_name || session.name || "MyTrainX Member"}</b><small>{session.email || "Conta autenticada"}</small></article>
          <article className={styles.card}><span>COACH X</span><b>Contexto autorizado</b><small>Objetivo, experiência e equipamento podem ser usados pelas tools internas quando relevante.</small><Link href="/app/trainer">ABRIR COACH X →</Link></article>
          <article className={styles.card}><span>PRIVACIDADE</span><b>Progress separado</b><small>Peso, fotos e composição permanecem opcionais e são geridos em Progress.</small><Link href="/app/performance">GERIR PROGRESS →</Link></article>
        </aside>
      </section>
    </main>
  );
}
