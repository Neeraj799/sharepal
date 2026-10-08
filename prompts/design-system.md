# SharePal — Design System Analysis
`/bangalore/gaming-gadgets-on-rent`

Extracted via live inspection (computed styles from the actual site, not estimated from screenshots).

## 1. Colors

| Token | Value (rgb → hex) | Usage |
|---|---|---|
| `primary-900` | rgb(3,13,49) → `#030D31` | Footer bg, dark CTA buttons |
| `primary-500` | rgb(25,69,232) → `#1945E8` | Mid-tone primary (links, accents) |
| `primary-100` | rgb(232,236,253) → `#E8ECFD` | Light tint backgrounds |
| `secondary-500` | rgb(158,255,0) → `#9EFF00` | **Signature lime-green accent** — CTA buttons, "Know More", prices, highlight text |
| `secondary-900` | rgb(36,58,1) → `#243A01` | Dark green (badge/tag backgrounds) |
| `neutral-900` | rgb(9,10,11) → `#090A0B` | Primary body text / headings |
| `neutral-300` | rgb(156,159,168) → `#9C9FA8` | Muted/secondary text |
| `neutral-500` | rgb(93,97,113) → `#5D6171` | Mid-muted text |
| `neutral-100` | rgb(251,251,251) → `#FBFBFB` | Card/section backgrounds |
| Body bg | rgb(243,245,246) → `#F3F5F6` | Page background |
| `decorative-blue` | rgb(0,121,188) → `#0079BC` | "New" badge |
| `decorative-orange` | rgb(232,100,25) → `#E86419` | "Trending" badge |
| Hero gradient | `linear-gradient(360deg, #8A2BE2 0%, #4C187C 100%)` | Hero/banner purple gradient |
| Header bg | rgb(76,24,124) → `#4C187C` | Navbar/header solid purple |

**Brand identity:** deep indigo/navy + violet-purple, with a single hyper-saturated lime-green (`#9EFF00`) as the "pop" accent used sparingly for primary CTAs and price highlights. This is the key differentiator — the green should stay rare and loud, not bleed everywhere.

## 2. Typography

- **Body font:** `Inter` (with `Inter Fallback`)
- **Display/hero font:** `Ubuntu` (used for H1 in hero banner only — `font-ubuntu`)
- Base: 16px / 400 / line-height 24px

**Type scale (measured):**

| Class | Size | Weight | Line-height |
|---|---|---|---|
| `text-h1` | 32px | 700 | 40px |
| `text-h2` | 24px | 700 | 32px |
| `text-h3` | 24px | 500 | 32px |
| `text-h4` | 20px | 700 | 28px |
| `text-h5` | 20px | 500 | 28px |
| `text-h6` | 18px | 700 | 24px |
| `text-b1` | 16px | 400 | 24px |
| `text-b2` | 16px | 500 | 24px |
| `text-b4` | 14px | 500 | 18px |
| `text-b5` | 14px | 400 | 18px |
| `text-b6` (card meta) | 12px | 500 | 16px |
| `text-o2` (overline/badge) | 12px | 600 | 16px |
| `text-o3` (micro label) | 10px | 700 | 14px |

Hero H1 actually renders at 40px/700/48px line-height — sized contextually for the hero, not strictly off the base scale.

## 3. Layout

- **Navbar height:** 84px (desktop)
- **Container padding:** `px-4` (16px) on mobile; content stretches close to full width with 16px gutters rather than a fixed `max-w-7xl`
- **Product card:** 254px × 453px (desktop grid tile), `rounded-3xl` (24px radius), `p-3` (12px internal padding)
- **Product grid:** 4 columns desktop → 2 columns mobile
- **Footer padding:** `72px 0 40px` desktop, `20px 0 64px` mobile

## 4. Components

**Navbar:** solid purple (`#4C187C`) bar, logo left, location/date pickers center, icons + login right. Collapses to compact mobile header + bottom tab bar (Home / Category / Search / Cart).

**Buttons (primary):** `rounded-full`, `border-2 border-secondary-500` (lime), dark navy fill (`bg-primary-900`) — pill-shaped outlined-on-dark style. Secondary/CTA buttons use solid lime-green fill with dark text (seen on "Know More", "Join Waitlist").

**Product Cards:** `rounded-3xl`, no visible border (`border-none`), transparent bg that turns `bg-gray-100` on hover, `transition-all duration-300`. Badge pill absolute-positioned top-left (`rounded-lg`, 1–2px border, color-coded by status). Circular `+` add-to-cart button bottom-right of price row. Image container: `rounded-2xl`, `bg-gray-100`, `aspect-square`.

**Badges:** small pill, `rounded-lg`, outline style (colored text+border, transparent bg) — blue for "New", orange for "Trending", green for "Vote to Launch".

**Hero/Banner:** `rounded-xl`, purple gradient (`360deg, #8A2BE2 → #4C187C`), white Ubuntu-font H1, product illustration overlapping on the right, brand-logo strip (Xbox/PS5/Meta) along the bottom.

**Promo banner (asset-partner):** dark navy, rounded, lime-green pill CTA button on the right, green highlighted stat numbers.

**Footer:** `bg-primary-900` (navy), multi-column link grid, white/light-gray text, lime "NEW" tags next to certain links, social icons row at bottom.

## 5. Visual Styling

- **Border radius:** generous and consistent — `rounded-xl` (12px) on hero/sections, `rounded-2xl`/`rounded-3xl` (16–24px) on cards and images, `rounded-full` on buttons and badge pills, `rounded-lg` (8px) on small badges
- **Shadows:** minimal/none on cards at rest (relies on bg-color change + border instead)
- **Transitions:** `transition-all duration-300` standard on interactive cards
- **Image aspect ratio:** `aspect-square` for product thumbnails

## 6. Responsive Behavior

- **Desktop (≥1024px):** 4-column product grid, horizontal top navbar, sidebar category rail visible
- **Tablet:** follows Tailwind `md:` breakpoints seen throughout (e.g. `md:rounded-3xl`, `md:p-3`) — expect 2–3 column grid
- **Mobile (<768px):** 2-column product grid, bottom tab-bar navigation (Home/Category/Search/Cart) replacing top nav links, horizontal scrollable category icon rail, compact stacked hero text

## 7. Suggested Tailwind Theme Mapping

```js
colors: {
  primary: {
    900: '#030D31',
    500: '#1945E8',
    100: '#E8ECFD',
  },
  secondary: {
    500: '#9EFF00',  // signature lime accent
    900: '#243A01',
  },
  neutral: {
    900: '#090A0B',
    500: '#5D6171',
    300: '#9C9FA8',
    100: '#FBFBFB',
  },
  decorative: {
    blue: '#0079BC',
    orange: '#E86419',
  },
  background: '#F3F5F6',
},
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  display: ['Ubuntu', 'sans-serif'],
},
fontSize: {
  h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],
  h2: ['24px', { lineHeight: '32px', fontWeight: '700' }],
  h4: ['20px', { lineHeight: '28px', fontWeight: '700' }],
  h6: ['18px', { lineHeight: '24px', fontWeight: '700' }],
  b1: ['16px', { lineHeight: '24px' }],
  b4: ['14px', { lineHeight: '18px' }],
  b6: ['12px', { lineHeight: '16px' }],
},
borderRadius: {
  card: '24px',      // rounded-3xl
  image: '16px',      // rounded-2xl
  badge: '8px',        // rounded-lg
  button: '9999px',  // rounded-full
},
backgroundImage: {
  hero: 'linear-gradient(360deg, #8A2BE2 0%, #4C187C 100%)',
},
```
