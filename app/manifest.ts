import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyTrainX",
    short_name: "MyTrainX",
    description: "Your AI Personal Trainer.",
    start_url: "/app",
    display: "standalone",
    background_color: "#050A08",
    theme_color: "#7CFF72",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
