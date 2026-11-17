# Enamel Dental Studio: Design System

Theme name: **Mint Enamel**. Calm, clean and confident. Cool porcelain surfaces, deep pine green for weight, and one warm orange taken from the toothbrush in the hero photo.

## 1. Colour (60 / 30 / 10)

| Share | Role | Token | Light | Dark |
|---|---|---|---|---|
| 60% | Page background | `--base` | `#F2F7F5` | `#0A2324` |
| 60% | Cards, form, chips | `--surface` | `#FFFFFF` | `#113233` |
| 60% | Soft tint panels | `--tint` | `#DDEEE8` | `#17403F` |
| 60% | Hairlines | `--line` | `#D5E3DE` | `#23494A` |
| 30% | Deep sections, arch, footer bar | `--deep` | `#0F3D3E` | `#164A4A` |
| 30% | Deep gradient partner, focus ring | `--deep-2` | `#185352` | `#1F5C5B` |
| 30% | Text on deep | `--on-deep` / `--on-deep-muted` | `#EAF4F1` / `#A9C9C3` | same |
| 10% | Buttons, key marks | `--accent` | `#F26A3D` | same |
| 10% | Accent hover | `--accent-hover` | `#E0582C` | same |
| 10% | Text on accent | `--on-accent` | `#2A1206` | same |
| text | Headings and body | `--ink` | `#0E2F30` | `#EAF4F1` |
| text | Secondary text | `--muted` | `#55706E` | `#9FBDB7` |

Rules
- Orange is for actions only: primary buttons, the last step marker, the FAQ plus sign, the hero disc and the booking disc. Never use it for body text or large backgrounds.
- Deep green carries the heavy blocks: info bar, studio section, booking panel, hero arch.
- Everything else stays on the light base so the page reads as roughly 60 light, 30 deep, 10 orange.
- Text on orange is dark (`--on-accent`), not white, for contrast.

## 2. Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display, H1 | Bricolage Grotesque | 800 | `clamp(44px, 7.2vw, 88px)`, tracking -0.035em |
| Section heading, H2 | Bricolage Grotesque | 700 | `clamp(34px, 4.6vw, 56px)` |
| Card heading, H3 | Bricolage Grotesque | 700 | 22 to 36px |
| Body | Instrument Sans | 400 / 500 | 17px, line height 1.6 |
| Small, labels | Instrument Sans | 600 | 13.5 to 15px |

Rules: sentence case everywhere, no all-caps labels, lines under 80 characters, headings end with a full stop when they are a sentence.

## 3. Shape

Rounded design, because it suits a calm clinic.
- `--r-s: 14px` inputs
- `--r-m: 24px` cards, form
- `--r-l: 40px` photo tiles and big panels
- `--pill: 999px` buttons, tags
- Signature shape: the **arch** (fully rounded top, flat or lightly rounded base). Used for the hero backdrop and dentist portraits. It echoes the outline of a tooth.

## 4. Layout

- Max content width 1180px, side gutter 16px on phones and 32px from 760px.
- Section spacing 84px on phones, 112px on desktop.
- Hero: text left (about 54%), floating cut-out photo right (about 46%). Stacks on phones with text first.
- Treatments: 12 column bento grid. One large tile, two medium, three small, one full-width text tile.
- Breakpoints: 620, 700, 760, 900, 1000px.

```
+----------------------------------------------------+
| logo        nav nav nav nav nav          [Book]    |
+----------------------------------------------------+
| H1 big headline            |        ( o )          |
| lede                       |     /  photo  \       |
| [Book] [Treatments]        |  chip  cut-out  chip  |
| fact  fact  fact           |    |   on arch   |    |
+----------------------------------------------------+
| find us        | hours          | call             |  deep bar
+----------------------------------------------------+
| Treatments bento: [ big ][ m ] / [ m ] [s][s][s]   |
| Studio (deep): photos | comfort list               |
| First visit: 1 2 3 4                               |
| Dentists: arch portraits x3                        |
| Fees table | FAQ                                   |
| Booking (deep): copy | form                        |
| Footer                                             |
+----------------------------------------------------+
```

## 5. The hero photo (floating cut-out)

- Source is a normal 2D photo with the background removed, saved as a transparent WebP (`images/hero-cutout.webp`).
- It stands on a deep green arch and rises above it, so the head breaks out of the shape. That overlap creates the floating look.
- A soft drop shadow follows the cut-out outline (`filter: drop-shadow`), not a box.
- Two white info chips float beside it with a slow 6 second drift. The photo itself drifts 8px over 7 seconds.
- All motion stops when the visitor has reduced motion turned on.

To swap the photo: use a portrait on a plain background, remove the background (remove.bg or Photoshop), export as transparent PNG or WebP about 900 x 1300px, and replace the file.

## 6. Components

- **Button**: pill, 16px semibold. `btn-accent` (orange, dark text) for the main action, `btn-ghost` (outline) for the second action. One orange button per view where possible.
- **Treatment tile**: photo fills the tile, dark gradient at the base, white title and one line of copy, fee tag top left.
- **Chip**: white rounded card, bold line plus small line, soft shadow.
- **Step card**: numbered circle because the content is a real sequence. Last step uses orange.
- **Fees table**: plain rows, fee right aligned in the display font.
- **FAQ**: native `details` elements, plus sign rotates when open.
- **Form**: labels above fields, 14px radius, green focus ring, inline message for errors, success panel replaces the form.

## 7. Voice

Plain and reassuring. Say what happens and what it costs. Buttons name the action ("Book a visit", "Request appointment"). No jargon, no exclamation marks.

## 8. Files

```
public/index.html   page markup
public/styles.css   all styles and colour tokens
public/script.js    mobile menu, booking form checks and sending
public/images/      optimised photos
DESIGN.md           this file
README.md           deploy steps and go-live checklist
```

Token added in production prep: `--accent-text` (`#B3421B` light, `#F26A3D` dark) for small orange text such as dentist roles and form errors. `--accent-hover` failed contrast at that size.

## 9. Before going live

- Replace the clinic name, address, phone, fees and dentist details with the real ones.
- Replace the stock photos with the clinic's own photos or licensed stock.
- Connect the booking form in `script.js` to a backend, email service or WhatsApp.
