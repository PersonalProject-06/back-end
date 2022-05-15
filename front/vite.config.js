import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://morning-falls-66881.herokuapp.com",
        changeOrigin: true,
        rewrite: (path) => {
  
          return path.replace("/^/api/", "");
        },
      },
    },
  },
  base: "/",
  plugins: [react()],
});
