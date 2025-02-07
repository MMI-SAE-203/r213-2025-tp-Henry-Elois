// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

import alpinejs from "@astrojs/alpinejs";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), tailwind()],
  adapter: netlify(),
  output: "server",
});