# SharePal — Gaming Gadgets on Rent

A frontend recreation of SharePal's gaming rentals page, including responsive UI, rental-date selection, search, cart interactions, product details, and supporting user flows.

- **Reference:** https://sharepal.in/bangalore/gaming-gadgets-on-rent
- **Live Demo:** https://sharepal-h936.onrender.com/
- **Repository:** https://github.com/Neeraj799/sharepal

---

## Live Demo

https://sharepal-h936.onrender.com/

## Repository

https://github.com/Neeraj799/sharepal

---

## Tech Stack

- **React 18** (`react` 18.3.1, `react-dom` 18.3.1)
- **Vite 5** (fast development server and production bundler)
- **Tailwind CSS 4** (configured via `@tailwindcss/vite`, design tokens and theme variables defined in `src/index.css`)
- **lucide-react** (lightweight icon system)
- **Native Web APIs** (HTML5 `<dialog>` for modals and drawers, browser History API via `useSyncExternalStore` for lightweight client routing, `localStorage` for state persistence)

This is a frontend-only project. All product catalogs and supporting content are served from structured local data modules, and all state is managed directly in the browser.

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/Neeraj799/sharepal.git

# Navigate into the project directory
cd sharepal

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The development server runs by default at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Build the production application bundle into `dist/` |
| `npm run preview` | Serve and preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## What is Recreated

The listing page is recreated top-to-bottom based on the original SharePal interface:

- **Sticky Navigation Bar:** SharePal brand logo, city selector modal, rental date picker trigger, search drawer button, dynamic cart counter badge, and profile/login button. The bar automatically tucks away on downward scroll (>300px) and reappears on upward scroll or keyboard focus.
- **Category Tabs:** Desktop tab navigation across Photography, Gaming, Outdoor, and Entertainment with multi-column hover dropdowns and category-specific theme recoloring.
- **Hero Banner:** Recreated promotional hero banner featuring verified brand logos (PS5, Xbox, Meta, Sony, etc.).
- **Sticky Category Sidebar:** Pinned category filtering (All, PS5 Consoles, Xbox Consoles, VR Headsets, Racing Wheels, etc.) with active indicators.
- **Product Grid:** Responsive multi-column layout featuring product cards with CDN-hosted images, badges ("New", "Popular", "Vote to Launch"), star ratings, dynamic price calculation based on chosen rental duration, wishlist toggle, and quantity add/remove steppers.
- **Promotional In-Grid Banners:** "Earn With Us" and "Become an Asset Partner" banners integrated at realistic grid intervals, including an interactive Asset Partner modal.
- **Progressive Pagination:** "Show More" paging displaying 12 products per batch with total product count feedback.
- **Interactive Modals & Drawers:**
  - **Date Selection Modal:** Interactive delivery and pickup date picker with rental duration computation and automatic validation.
  - **City Selection Modal:** Multi-city picker (Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune).
  - **Cart Drawer:** Full slide-out cart displaying selected items, rental duration, quantity controls, coupon input (`SHAREPAL`, `GAMING12`), price breakdown (subtotal, discount, GST), and an empty cart state.
  - **Search Drawer:** Real-time search filtering across all catalog products with instant thumbnail preview and pricing.
  - **Login / Account Drawer:** Phone number validation with simulated OTP submission.
  - **Chatbot Widget:** Floating "Rocket Singh" chat widget with canned support flows and conversational responses.
- **FAQ Accordion:** Frequently Asked Questions section with smooth single-item expansion and ARIA accessibility attributes.
- **Breadcrumb & Social Proof:** Interactive breadcrumb trail, customer testimonials marquee carousel, and platform impact statistics.
- **Comprehensive Footer:** Full category directory links, expandable SEO information block, company policies, and social links.
- **Mobile Experience:** Adaptive layout with stacked header controls, 2-column compact product cards, and a fixed bottom tab bar (Home, Categories, Search, Cart).

---

## Additional Improvements

The project implements several deliberate engineering enhancements beyond visual replication:

- **Cart & Rental Date Persistence:** Selected delivery/pickup dates and cart items are persisted in `localStorage` (`src/lib/rentalStorage.js`). Past dates are automatically detected and discarded on reload, and product records are safely re-indexed from the catalog.
- **Cross-Category Search:** The search drawer searches across all four product categories (Gaming, Photography, Outdoor, Entertainment) in real time.
- **Full Product Detail Pages:** In-app product detail views (`src/pages/ProductDetail.jsx`) featuring multi-angle image galleries, rental duration pricing, peace-of-mind guarantee cards, rental benefit highlights, an embedded video walkthrough modal, similar products carousel, and direct add-to-cart synchronization.
- **Native `<dialog>` Architecture:** All modals and drawers use native HTML `<dialog>` elements via `showModal()`, providing native focus trapping, top-layer browser rendering, and native Escape-key closing without third-party modal libraries.
- **Accessibility & Motion Preferences:** Comprehensive keyboard navigation support (`focus-visible` styling), explicit ARIA attributes (`aria-expanded`, `aria-controls`, `aria-labelledby`, `role="progressbar"`), and full support for the `prefers-reduced-motion` media query to disable heavy keyframe animations.
- **Thoughtful Empty & Error States:** User-friendly empty states for the cart drawer with direct CTA back to the catalog, and clean zero-state handling for unmatched search queries.

---

## Responsive Behaviour

The layout is tested and validated across multiple screen widths (1440px, 1280px, 1024px, 768px, 480px, and 375px) with zero horizontal scrolling:

- **Desktop (>= 1024px):** 4-column product grid (`lg:grid-cols-4`), expanded top navigation bar with search and city controls, persistent sticky category sidebar, and hover multi-column dropdowns.
- **Tablet (768px - 1023px):** 3-column product grid (`md:grid-cols-3`), condensed navbar header, and responsive sidebar layout.
- **Mobile (< 768px):** 2-column compact product grid (`grid-cols-2`), compact badges, horizontal touch-scrolling category navigation, stacked header controls, and a fixed bottom tab bar for quick navigation.

---

## Implementation Notes

- **Native Dialogs:** Modals and drawers leverage `<dialog>` and `showModal()`, ensuring standard browser accessibility, native backdrop dimming (`backdrop:backdrop-blur-sm`), and focus management without added bundle weight.
- **Design Tokens & Theming:** Custom CSS variables and `data-theme` attributes on the root container dynamically control header colors, category accents, and hero backgrounds for each super-category.
- **Lightweight Client Router:** A compact custom router (`src/lib/router.js`) built on React's `useSyncExternalStore` and the browser History API (`pushState` and `popstate`) enables navigation between the listing and product detail pages without external router dependencies.
- **Pricing Logic:** Product prices remain blurred/hidden until rental dates are chosen, after which the total chargeable amount is computed dynamically based on the rental day count.
- **Animation Handling:** Keyframes and transitions (slide-in drawers, scale-in modals, continuous testimonial marquee) are built with CSS and Tailwind utilities, gracefully degraded when `prefers-reduced-motion` is active.

---

## What is Mocked

The application runs entirely on the client side without a remote backend:

- **Login / OTP:** Validates phone number and country code formats (+91, +1, +44, +971) and simulates OTP request submission with a client-side status message; no SMS is dispatched.
- **Customer Chatbot:** The "Rocket Singh" chat widget uses predefined conversation flows from `src/data/chatbot.js`.
- **Coupons:** Coupon codes (`SHAREPAL` and `GAMING12`) are validated and calculated purely via client-side discount logic (`src/data/coupons.js`).
- **Wishlist & Waitlist:** Toggling product favorites and joining the "Vote to Launch" waitlist updates local React state and progress bars in real time without a backend database.
- **Checkout Flow:** Clicking "Login to CheckOut" opens the login drawer to simulate the authentication step before order placement; payment gateways and backend order processing are omitted.
- **Product Images:** Images are loaded directly from SharePal's official CDN (`https://images.sharepal.in/...`) rather than bundling large image assets inside the repository.

---

## Known Limitations

- **Category State in URL:** The active super-category tab and sidebar selection are managed in React component state rather than synchronized to query parameters. A hard browser refresh on the home route resets to Gaming / All.
- **Search Item Navigation:** Products shown in the search drawer provide instant pricing and availability lookup, but clicking a search result does not currently navigate directly to its product detail page.
- **SPA Rewrites on Render:** Direct URL access or hard page refresh on nested routes (such as `/bangalore/gaming-gadgets-on-rent` or direct product URLs) returns a 404 because an SPA rewrite rule (`/* -> /index.html`) is **not configured** on the Render static host. In-app navigation works smoothly.
- **FAQ Expansion Button:** The "View more FAQ's" button is included for visual fidelity with the reference page, but does not load additional items.
- **Mobile Bottom Navigation Tabs:** The "Home" and "Category" items in the mobile bottom bar update the active tab highlight state rather than opening separate dedicated views.
- **Mobile Tab Navigation Arrows:** The original website displays left and right arrow buttons on mobile category tabs; this implementation supports smooth touch scrolling without the arrows.
- **Route Fallback:** Unrecognized URLs fall back directly to the listing page rather than rendering a custom 404 page.

---

## Deployment

The application is deployed as a static site on **Render**:

- **Live URL:** https://sharepal-h936.onrender.com/
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

### SPA Rewrite Requirement

Because client-side routing is handled in the browser via the History API, static hosts require an SPA rewrite rule to redirect all requests to `index.html` (e.g., source: `/*`, destination: `/index.html`, action: `Rewrite`).

> **Note on Current Deployment:** The SPA rewrite rule is **not currently configured** on the Render deployment. As a result, directly opening or hard-refreshing deep URLs (such as `/bangalore/gaming-gadgets-on-rent` or direct product URLs) will return a Render 404 page. However, all in-app navigation and flows originating from the root URL (`https://sharepal-h936.onrender.com/`) function as intended.

---

## Project Structure

```text
sharepal/
├── index.html                   # HTML document shell with fonts and metadata
├── vite.config.js               # Vite configuration with React and Tailwind plugins
├── package.json                 # Project dependencies and npm scripts
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Main application shell (routing, cart state, date modals)
│   ├── index.css                # Tailwind CSS imports, design tokens, keyframes, themes
│   ├── pages/
│   │   ├── Home.jsx             # Listing page (tabs, hero, sidebar, product grid, FAQs, testimonials)
│   │   └── ProductDetail.jsx    # Product detail page (gallery, summary, guarantees, video modal)
│   ├── components/              # 31 focused UI components (Navbar, ProductCard, CartDrawer, etc.)
│   ├── data/                    # Local JSON catalogs, categories, FAQs, coupons, chatbot text
│   ├── constants/               # Navigation items, mobile tabs, promo banner configurations
│   ├── hooks/
│   │   └── useScrolledPast.js   # Scroll detection hook for hiding/showing header
│   ├── lib/
│   │   ├── dates.js             # Date helpers and rental charge calculations
│   │   ├── rentalStorage.js     # localStorage persistence for cart and dates
│   │   └── router.js            # Lightweight client-side router hook
│   └── assets/                  # SVG logos, city icons, and promotional banner graphics
└── public/
    └── favicon.png              # SharePal browser favicon
```

---

## Development Notes

The implementation was developed with AI-assisted coding tools and then reviewed, tested, debugged, and adapted to match the target SharePal experience.
