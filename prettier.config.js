/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  "importOrder": ["^~/lib/(.*)$", "^~/app/(.*)$", "^~/server/(.*)$", "^~/styles/(.*)$", "^~/components/(.*)$", "^./_components/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSideEffects: false,
  printWidth: 119,
  plugins: ["prettier-plugin-tailwindcss", "@trivago/prettier-plugin-sort-imports"],
};
