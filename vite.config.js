import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
export default defineConfig({
  root: "src/frontend",
  build: {
    outDir: "../../build",
  },
  server: {
    open: true,
    port: 3001,
  },
  publicDir: "../../public",
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    envCompatible(),
  ],
});
