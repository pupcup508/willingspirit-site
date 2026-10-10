# Willing Spirit Animal Sanctuary website

Static site built with [Astro](https://astro.build) and hosted free on Cloudflare Pages. Maintained by Darla (github.com/pupcup508) for now; can be transferred to a nonprofit-owned GitHub account later. Optional no-code editing via [Pages CMS](https://pagescms.org).

## Local preview

```sh
npm install
npm run dev        # http://localhost:4321 (draft animals/events show here only)
npm run build      # production build into dist/
```

## Where things live

| What | File |
|---|---|
| Animal profiles | `src/content/animals/*.md` |
| Events | `src/content/events/*.md` |
| Email, socials, banner, Amazon wishlist, Venmo/PayPal/Cash App links | `src/data/settings.json` |
| Photos | `public/images/` |
| Page text (Our Story, Get Involved, …) | `src/pages/*.astro` |
| Colors and fonts | `src/styles/global.css` |
| No-code editing forms (Pages CMS) | `.pages.yml` |
| Printable flyer with donate QR code | `/flyer/` (`src/pages/flyer.astro`) |

Set `draft: true` on an animal or event to hide it from the live site.

## Going live (all free)

1. **GitHub:** repo lives at github.com/pupcup508/willingspirit-site for now. (GitHub → Settings → Transfer ownership moves it to a nonprofit account later.)
2. **Cloudflare Pages:** in a Cloudflare account owned by Tess, go to Workers & Pages → Create → Pages → Connect to Git → pick the repo.
   Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
   You get a free `*.pages.dev` URL immediately, and every push redeploys automatically.
3. **Pages CMS (optional):** sign in at https://app.pagescms.org with GitHub to get phone-friendly forms for Animals, Events and Site settings.
4. **Domain (later, ~$8):** register `willingspiritanimalsanctuary.org` at Porkbun under Tess's account, then in Cloudflare Pages → Custom domains add it and follow the DNS instructions. HTTPS is automatic.
5. **Email (free):** use Porkbun's email forwarding to send `hello@willingspiritanimalsanctuary.org` to Tess's Gmail.

## QR code flyers

Open `/flyer/` on the live site and print it (or save as PDF). The QR code points to `<site>/donate/`, where `site` comes from `astro.config.mjs`.
**Register the domain before printing flyers**, so the code points at the permanent address. If you need flyers sooner, temporarily set `site` to the `*.pages.dev` URL; that address keeps working forever too.

## Before launch

- [ ] Get permission from the Raleigh rescue before publishing the foster dogs; fill in "Adoptions handled by" on each profile.
- [ ] Replace the placeholder story on `src/pages/about.astro` with Tess's own words.
- [ ] Confirm the email, location, and social links in `src/data/settings.json`.
- [ ] Add the Amazon wishlist and any Venmo/PayPal/Cash App links in `src/data/settings.json` (blank ones are hidden).
- [ ] The donate page says gifts aren't tax-deductible yet; update that once nonprofit status is official.
- [ ] Delete `src/content/animals/example-pup.md` once real animals are added.
