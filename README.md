# SharePal — Gaming Gadgets on Rent (frontend recreation)

A frontend-only recreation of SharePal's gaming rentals page:
<https://sharepal.in/bangalore/gaming-gadgets-on-rent>

- **Live demo:** _add the deployed URL here_
- **Repository:** <https://github.com/Neeraj799/sharepal>

## Tech stack

- React 18
- Vite 5
- Tailwind CSS 4 (design tokens defined in `src/index.css`)
- lucide-react for icons

There is no backend. All content comes from local data files and all state lives in the browser.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

The dev server runs at <http://localhost:5173>. The port is fixed, so the command fails if 5173 is already in use.

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## What is recreated

The listing page, top to bottom:

- Navbar with city picker, rental dates, search, cart and login
- Category tabs (Photography, Gaming, Outdoor, Entertainment) with hover dropdowns on desktop
- Hero banner with brand logos
- Sticky category sidebar that filters the product grid
- Product cards with badges, wishlist, pricing, add-to-cart and the "Vote to Launch" waitlist card
- Promo banners inside the grid, "Show More" paging
- FAQ accordion, breadcrumb, testimonials marquee and impact stats
- Footer with category links, expandable SEO text and link columns
- Mobile layout: stacked header, two-column grid, bottom tab bar

Supporting flows that the page depends on:

- **Rental dates.** Prices stay hidden until delivery and pickup dates are chosen, then each card shows the total for the chargeable period.
- **Cart.** Add, change quantity, remove, apply a coupon (for example `SHAREPAL`), with an empty state.
- **Search.** Filters products across all four categories as you type.
- **Product detail page.** Opens from any product card, with gallery, offers and similar products.
- **Other category tabs.** Photography, Outdoor and Entertainment reuse the same layout with their own theme colours, sidebar and products.

## Responsive behaviour

Checked at 1440, 1280, 1024, 768, 480 and 375 pixels wide with no horizontal scrolling. The grid is four columns on desktop, three on tablet and two on mobile; the navbar switches to a stacked header and bottom tab bar below 1024px.

## Implementation notes

- **Overlays use the native `<dialog>` element**, which provides focus trapping, Escape-to-close and the backdrop without a modal library.
- **Theming is one mechanism.** Each tab sets `data-theme` on the root and CSS variables recolour the header, hero and accents.
- **Dates and cart persist** in `localStorage` and are restored on reload. Dates that have passed are discarded.
- **Animations respect `prefers-reduced-motion`.**
- **Routing is a small custom hook** (`src/lib/router.js`) built on the History API, since the app has only two page types.
- Interactive controls have accessible labels and visible focus states; accordions expose `aria-expanded`.

## What is mocked

- **Login:** the form validates the number but no OTP is sent.
- **Chatbot:** replies are canned text from `src/data/chatbot.js`.
- **Coupons, waitlist and wishlist:** handled in local state only.
- **Checkout:** stops at the login step.
- **Product images** are loaded from SharePal's image CDN rather than stored in this repository.

## Known limitations

- The selected tab and sidebar category are not stored in the URL, so a refresh returns to Gaming / All. On the original site each category has its own URL.
- "View more FAQ's" has no action.
- Search results are not links to the product page.
- The "Home" and "Category" items in the mobile tab bar only change the highlight.
- The original shows left and right arrows on the mobile category tabs; this version scrolls without them.
- Unknown URLs fall back to the listing page instead of a not-found page.

## Deployment

The build output is a static site. Because routing happens in the browser, the host must serve `index.html` for every path. Without that rule, opening a product URL or `/bangalore/gaming-gadgets-on-rent` directly returns a 404.

## Project structure

```
src/
  App.jsx            App shell: cart, rental dates and page selection
  main.jsx           Entry point
  index.css          Tailwind import, design tokens, keyframes, themes
  pages/             Home (listing) and ProductDetail
  components/        UI components (Navbar, Hero, ProductCard, CartDrawer, ...)
  data/              Product lists (JSON), categories, FAQs, testimonials, footer content
  constants/         Navigation items and promo banner placement
  hooks/             useScrolledPast
  lib/               Date helpers, router, localStorage persistence
  assets/images/     Logos, hero artwork, category thumbnails, banners
```

## Development notes

`AGENTS.md` and `prompts/design-system.md` hold the project rules and the design tokens extracted from the original site. They were used to guide AI-assisted development and are kept in the repository for transparency.
