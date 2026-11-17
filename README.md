# Enamel Dental Studio website

A static, single-page clinic website. No build step and no dependencies.

## Folder layout

```
public/                  <- the website. Deploy this folder only.
  index.html             page markup, SEO tags, structured data
  styles.css             all styles and colour tokens (see DESIGN.md)
  script.js              mobile menu and booking form (settings at the top)
  404.html               "page not found" page
  images/                optimised photos, plus og-image.jpg for link previews
  favicon.svg, favicon-32.png, apple-touch-icon.png, icon-192/512.png
  site.webmanifest       app icon and colour info for phones
  robots.txt, sitemap.xml
  _headers               security and caching headers (Netlify, Cloudflare Pages)
DESIGN.md                design system
backup/                  the files as they were before production prep
Enamel Dental Studio.zip original export (same content, kept as a reference)
```

## Preview locally

```
cd public
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Any static host works. Point it at the `public` folder.

- **Netlify**: drag the `public` folder onto app.netlify.com/drop, or set the publish directory to `public`. `_headers` and `404.html` are used automatically.
- **Cloudflare Pages**: set the build output directory to `public`, with no build command. `_headers` and `404.html` are used automatically.
- **Vercel, GitHub Pages or shared hosting**: upload `public`. `404.html` works on all of them. Copy the headers from `_headers` into that host's config, because only Netlify and Cloudflare read `_headers`.

## Go-live checklist

These must be done before the site is public. Each one is marked `GO-LIVE` in the code where it applies.

1. **Domain.** Replace `https://www.enameldental.example` in `index.html` (canonical, Open Graph and structured data), `robots.txt` and `sitemap.xml`.
2. **Clinic details.** Replace the address, phone, email, hours, fees and dentist names and bios in `index.html`. That includes the JSON-LD block in `<head>`, the `tel:` and `mailto:` links, and the Google Maps link.
3. **Booking form.** In `script.js`, either:
   - set `FORM_ENDPOINT` to a form service URL (Formspree, Web3Forms, Getform or your own API) that accepts a JSON POST, or
   - leave it empty and set `WHATSAPP_NUMBER` to the clinic's real WhatsApp number (digits only, with 91). The form then opens WhatsApp with the request filled in.

   If you use a form service on another domain, the existing `connect-src 'self' https:` rule in `_headers` already allows it.
4. **Photos.** The current photos are stock images. Replace them with the clinic's own photos or properly licensed ones, at the same sizes (see the `width` and `height` in `index.html`). Regenerate `images/og-image.jpg` at 1200 x 630.
5. **Footer.** Remove "Sample site with placeholder clinic details and stock photos." from the footer.
6. **Legal.** If the form collects patient data, add a privacy notice in line with India's DPDP Act 2023, and check the content against Dental Council of India rules on advertising.
7. **After launch.** Submit `sitemap.xml` in Google Search Console, set up a Google Business Profile, and test the booking flow on a real phone.

## What changed in production prep (17 Nov 2026)

- Images now come from the zip export. They have the same dimensions with metadata stripped, so they are smaller.
- Added a phone menu. Before this, the navigation was hidden below 900px.
- Booking form: it only shows success when the request was actually sent, either to `FORM_ENDPOINT` or as a filled-in WhatsApp message. It also has field-level errors, rejects past dates, includes a spam trap and has a sending state. Treatment tiles now preselect the right option.
- SEO: canonical URL, Open Graph and Twitter tags, `Dentist` structured data, sitemap and robots.
- Performance: the hero image is preloaded, every image has a width and height (no layout shift), and the script is deferred.
- Accessibility: skip link, darker orange for small text (it now passes WCAG AA), proper footer headings, a fees table caption, and no invalid `<time>` elements.
- Added favicons, a web manifest, a 404 page, and security and caching headers.
- The visual design is unchanged.
