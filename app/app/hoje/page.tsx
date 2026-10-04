import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAgentTodayWorkout } from "@/lib/domain/agent-tools";

export default async function Today(){
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const today = await getAgentTodayWorkout(session.userId);

  if (today.mode === "no_active_program") {
    redirect("/app/programas");
  }

  if (today.mode === "program_complete" || !today.workout || !today.program) {
    redirect("/app/performance");
  }

  if (today.program.slug === "wkt-militar") {
    redirect(`/app/workout/${today.workout.slug}`);
  }

  if (today.program.slug === "mytrainx-start-4-weeks") {
    redirect(`/app/programas/mytrainx-start/session/${today.workout.slug}`);
  }

  redirect(`/app/programas/${today.program.slug}/session/${today.workout.slug}`);
}
