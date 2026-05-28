Sanity Studio scaffold for ETH-Blockchain-Club

This folder is a minimal standalone scaffold of the Studio used by the main website.

Usage

1. Install deps:

```bash
cd studio
npm install
```

2. Start Studio locally:

```bash
npx sanity start
# or
npm run dev
```

3. Set environment variables (in your deployment / local `.env`):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (optional)

4. Deploy the `studio/` repo to Vercel/Netlify/Cloudflare as a standalone site and add its URL to the Sanity project's CORS origins.

Notes

- This scaffold copies the schema types and sanity config used by the main repo. It expects to use the same Sanity project (no content migration needed).
- After you deploy, add the Studio URL and the website URL to the Sanity project's CORS settings.
