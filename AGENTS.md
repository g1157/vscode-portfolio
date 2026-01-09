# AGENTS.md

## Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- No test framework configured

## Architecture
Next.js 15 portfolio site styled like VS Code. Uses Pages Router with TypeScript and React 19.
- `pages/` - Route pages (_app.tsx, index.tsx, about.tsx, projects.tsx, etc.)
- `components/` - Reusable UI components (Layout, Sidebar, Explorer, Tabsbar, etc.)
- `styles/` - CSS Modules per component + globals.css + themes.css
- `data/` - Static data (articles.ts, projects.ts)
- `types/` - Custom TypeScript type definitions

## Code Style
- TypeScript with strict mode enabled
- Use `@/` path alias for imports (e.g., `@/components/Layout`)
- CSS Modules for styling (ComponentName.module.css)
- React functional components with arrow functions
- Export components as default exports
- Use explicit TypeScript interfaces for props (e.g., `interface LayoutProps`)
- ESLint with next/core-web-vitals and next/typescript rules
