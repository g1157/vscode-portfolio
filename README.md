# vscode-portfolio
[![Open is Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/itsnitinr/vscode-portfolio)

A Visual Studio Code themed developer portfolio website built with Next.js and deployed on Vercel.

![vscode-portfolio banner](https://imgur.com/JXJ9mpO.gif)

## Features Roadmap

- [ ] Themes and customizations
  - [x] GitHub Dark (default)
  - [ ] One Dark Pro
  - [x] Dracula
  - [x] Ayu
  - [x] Nord
- [ ] Interactive custom terminal

For other features and themes suggestions, please open an issue.

## Environment Variables

For fetching your articles from dev.to, create an `.env.local` file inside the project directory. Check the `.env.local.example` file for more information.

## Scheduled Cloudflare Pages Rebuild

This repository includes a GitHub Actions workflow at `.github/workflows/scheduled-pages-rebuild.yml` that checks once per day and triggers a Cloudflare Pages rebuild every 3 days. It also supports manual runs from the Actions tab.

To enable it:

1. Create a Deploy Hook in your Cloudflare Pages project.
2. Add the hook URL to the GitHub repository secret `CLOUDFLARE_PAGES_DEPLOY_HOOK`.
3. Keep the workflow file on the default branch so the schedule stays active.

The workflow uses a fixed anchor date (`2026-03-20`) to preserve a stable 3-day cadence, since GitHub cron cannot express an exact "every 3 days" schedule directly.

This is useful for static pages that fetch external content at build time, such as the blog articles feed on `/articles`.

## Running Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

All VSCode related components can be found in the `components` folder. To change the content of the portfolio, check out the `pages` folder. To add or remove pages, modify `components/Sidebar.jsx` and `components/Tabsbar.jsx`.

## Next.js Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
