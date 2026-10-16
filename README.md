# Hossein Bajan portfolio

A Next.js App Router portfolio for Hossein Bajan. Content is maintained in the existing page and component files. The Education data and markup in `app/resume/page.tsx` are protected and must remain unchanged.

## Local development

Use Node.js 20 or later and npm. Install with `npm ci`, then run `npm run dev`.

Before shipping, run:

```bash
npx tsc --noEmit --incremental false
npm run lint
npm run build
npx opennextjs-cloudflare build
```

The browser smoke suite uses a locally running production build and a Chrome executable:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
# In another terminal:
CHROME_PATH=/usr/bin/google-chrome npm run test:smoke
```

Set `PORTFOLIO_URL` if the server uses another address. Set `SCREENSHOT_DIR` to save desktop and mobile viewport captures outside the repository.

## Deployment and contact

The repository includes Docker and Cloudflare OpenNext configurations. Deploy only after validating the intended target; the local build command does not deploy. Set `NEXT_PUBLIC_SITE_URL` to the verified public origin to enable canonical URLs and populated sitemap entries. Without it, no production domain is assumed.

The Contact form opens an email draft in the visitor's email application. It does not send a message through a server. The CV button serves the unchanged source PDF from `public/resume/`.
