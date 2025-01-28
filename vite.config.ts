import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "unplugin-vue-markdown/vite";
import { tasklist } from "@mdit/plugin-tasklist";
import { attrs } from "@mdit/plugin-attrs";
import { container } from "@mdit/plugin-container";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItSetup(md) {
        md.use(tasklist, {
          disabled: false,
          containerClass: "checkbox-list",
        });
        md.use(attrs);
        md.use(container, {
          name: "details",
          marker: ":",
          openRender: (tokens, idx) => {
            const title = tokens[idx].info.trim().replace(/^details\s*/, "");
            return `<details><summary><span>${title}</span></summary><div>\n`;
          },
          closeRender: () => {
            return `</div></details>\n`;
          },
        });
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
