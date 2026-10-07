# Green Farming Website

A production-quality web app for small and marginal farmers in India/Maharashtra, built with Vite, React 18, Tailwind CSS, and React Router.

## Features
- **Bilingual**: Full support for English and Marathi via local storage i18n implementation.
- **Diagnostic Workflow**: A 6-step wizard for crop disease diagnosis with strong emphasis on safe practices.
- **Offline Capable / PWA Ready**: Designed to be fast and responsive, suitable for rural internet connections.
- **Responsive & Accessible**: Mobile-first design, high contrast, large touch targets (≥ 48px), and dark mode support.
- **No Backend Required**: Fully static site using JSON data files (`src/data/*.json`).

## Setup Instructions

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Deployment (Vercel / Netlify)
Since this is a static Vite app with React Router, make sure to configure rewrites if needed (though `npm run build` outputs standard static files that Vercel/Netlify auto-detect).
- **Vercel**: Import the project, framework preset "Vite", build command `npm run build`, output directory `dist`.
- **Netlify**: Build command `npm run build`, publish directory `dist`. Create a `_redirects` file in `public/` containing `/* /index.html 200` to support React Router client-side routing.

## ⚠️ Important Disclaimer
**The agricultural content (diseases, fertilizers, recommendations) provided in `src/data/*.json` is for structural demonstration purposes and MUST be reviewed and validated by a certified agronomist or an agriculture expert (e.g., from Krishi Vigyan Kendra) before real-world production use.**
The application deliberately avoids mentioning chemical pesticide brand names or exact dosages to prevent misuse.
