import type { NextConfig } from "next";

// Site estático por natureza (AGENTS.md §2): export para `out/`, sem servidor.
// `unoptimized` porque não há otimizador de imagem em host estático; as imagens do
// site são SVG inline e os poucos PNG já entram no tamanho final.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
