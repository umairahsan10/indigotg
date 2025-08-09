// Disable Lightning CSS usage inside Tailwind's PostCSS plugin during build
// to avoid native binary resolution issues on some CI/CD environments.
process.env.TAILWIND_DISABLE_LIGHTNINGCSS = process.env.TAILWIND_DISABLE_LIGHTNINGCSS || "1";

const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
