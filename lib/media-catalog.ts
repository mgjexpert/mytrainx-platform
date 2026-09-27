import { driveThumbnailUrl, workouts } from "@/lib/workouts";

export type MediaRole =
  | "homeHero"
  | "homeProgress"
  | "programWkt"
  | "coachX"
  | "login"
  | "goalWeight"
  | "goalMuscle"
  | "goalConditioning"
  | "goalWellbeing"
  | "goalCommunity"
  | "programStart"
  | "programCore"
  | "programCalisthenics";

const workoutIndexByRole: Record<MediaRole, number> = {
  homeHero: 4,
  homeProgress: 15,
  programWkt: 10,
  coachX: 14,
  login: 6,
  goalWeight: 12,
  goalMuscle: 15,
  goalConditioning: 17,
  goalWellbeing: 7,
  goalCommunity: 20,
  programStart: 12,
  programCore: 17,
  programCalisthenics: 20,
};

export function mediaFor(role: MediaRole, size = 1200) {
  const index = workoutIndexByRole[role] % workouts.length;
  return driveThumbnailUrl(workouts[index].driveFileId, size);
}

export function libraryMedia(type: "article" | "exercise" | "recipe", index: number, size = 1000) {
  const offsets = { article: 3, exercise: 8, recipe: 15 } as const;
  const slot = (offsets[type] + index * 3) % workouts.length;
  return driveThumbnailUrl(workouts[slot].driveFileId, size);
}

export function programMedia(slug: string, size = 1200) {
  const bySlug: Record<string, MediaRole> = {
    "wkt-militar": "programWkt",
    "mytrainx-start-4-weeks": "programStart",
    "core-21": "programCore",
    "calisthenics-foundations": "programCalisthenics",
    "home-30": "goalWellbeing",
  };
  return mediaFor(bySlug[slug] ?? "programWkt", size);
}

export function slugMedia(slug: string, size = 1400) {
  const index = Math.abs(slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % workouts.length;
  return driveThumbnailUrl(workouts[index].driveFileId, size);
}

export const staticMedia = {
  team: "/media/v2/references/team-banner.png",
  community: "/media/v2/references/community-cover.png",
  sara: "/media/v2/sara/welcome-banner.png",
  commandReference: "/media/v2/references/command-center-desktop.png",
  homeReference: "/media/v2/references/home-wide.png",
} as const;
