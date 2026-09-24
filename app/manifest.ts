import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyTrainX",
    short_name: "MyTrainX",
    description: "Your AI Personal Trainer.",
    start_url: "/app",
    display: "standalone",
    background_color: "#050607",
    theme_color: "#090B0E",
    icons: [
      { src: "/brand/x-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/x-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
