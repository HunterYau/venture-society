# Venture Society

The Venture Society website is a Next.js application for PVPHS students. It includes the public club site, an interest form, and a password-protected registration roster.

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. Create a Neon Postgres database through the Vercel Marketplace and connect it to this project. Vercel will provide a `DATABASE_URL` environment variable.
3. In the database provider's SQL editor, run [`db/vercel-schema.sql`](db/vercel-schema.sql) once.
4. In Vercel Project Settings → Environment Variables, add:
   - `DATABASE_URL` — the Neon connection string.
   - `ADMIN_PASSWORD` — a long private password for `/admin`.
   - `ADMIN_SESSION_SECRET` — a separate long random secret used to sign the administrator session.
5. Deploy. Vercel will run `pnpm build` automatically.

For local development, copy `.env.example` to `.env.local`, fill in your own values, then run:

```bash
pnpm install
pnpm dev
```

## Important notes

- The website is designed for Vercel's Next.js runtime and Neon Postgres database.
- No credentials are committed to this repository. `.env.local` and all real environment files are ignored.
- The existing ChatGPT-hosted site's registration data is not included in this source repository. If you want those existing entries in the Vercel database, export them separately before switching public hosting.
- The public pages, team photos, join form, and protected roster are all included in this repository.
