// tailwind.config.js
// This config tells Tailwind where to look for class names in your project.
// 'content' is an array of file globs. This setup works for React projects in src/.
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/TS/React files in src
  ],
  theme: {
    extend: {}, // You can customize your theme here
  },
  plugins: [], // Add Tailwind plugins here if needed
}; 