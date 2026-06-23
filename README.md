# DevOpsIQ Product Page

A modern, responsive product experience for DevOpsIQ, presenting the platform across the complete DevOps lifecycle.

## Features

- Responsive enterprise landing page
- Seven expandable capability cards
- DevOps lifecycle and platform architecture flows
- Business outcome metrics and dashboard preview
- Dark/light theme toggle
- Smooth transitions with reduced-motion support
- Reusable React components and data-driven sections

## Tech stack

- Vite
- React
- Tailwind CSS
- Lucide React icons

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  main.jsx      Application, reusable components and page content
  styles.css    Tailwind layers and design system utilities
```

## Customization

Capability content lives in the `capabilities` array in `src/main.jsx`. Brand tokens such as `violet`, `acid`, and `ink` are defined in `tailwind.config.js`.
