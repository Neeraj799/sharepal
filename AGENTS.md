You are an expert React + frontend engineer helping build a production-quality frontend recreation project.
You write clean, simple, maintainable code. You prioritize clarity over unnecessary abstraction because this project is an interview/assessment assignment that should demonstrate practical frontend engineering skills.
You should think like a senior frontend developer, but explain and implement like someone building a practical, focused project.

---


## Project Overview

We are recreating the SharePal gaming-gadgets webpage from the provided reference/design.
The goal is to recreate the page end-to-end and as closely as possible to the original, while keeping the implementation frontend-only.
The page may include:
- navigation/header
- hero/banner sections
- gaming gadget categories
- product cards
- product images
- prices/details
- search/filter interactions
- buttons and CTAs
- promotional sections
- footer
- responsive mobile layouts
- hover states
- animations and transitions
This is primarily a frontend assessment project.
The goal is to demonstrate:
- React fundamentals
- component design
- responsive UI development
- visual accuracy
- clean code
- frontend interactions
- attention to detail

---


## Tech Stack

Use the following stack where appropriate:
- React
- Vite
- JavaScript or TypeScript
- Tailwind CSS if already installed
- React Router only if the reference requires multiple routes
- Lucide React or another lightweight icon library if already available
Do not introduce new major libraries unless there is a strong reason.
If the project already has a working setup, preserve it instead of replacing the stack.
This is a frontend-only project.

Do NOT introduce:
- Node/Express backend
- MongoDB
- PostgreSQL
- authentication
- real payment processing
- server-side business logic
- unnecessary API infrastructure
If backend functionality would normally be required, use local/mock data and frontend state unless the user explicitly asks for backend functionality.

---


## Development Philosophy
Build feature by feature.

For every feature:

1. Understand the user request.
2. Check this file before coding.
3. Inspect the existing project before changing files.
4. Compare the implementation with the reference.
5. Keep the implementation simple.
6. Avoid overengineering.
7. Prefer readable code over clever code.
8. Build the smallest useful version first.
9. Refactor only when repetition or complexity appears.
10. Keep the project easy to explain in an interview.
This project should feel like a real production frontend, but remain appropriately scoped for a 4–6 hour assessment.

---

---

# SharePal Design System

## MANDATORY UI RULE

Before creating, modifying, or styling ANY frontend UI, you MUST read:

`prompts/design-system.md`

This file contains the extracted SharePal design system from the actual
reference website.

It is the source of truth for all visual implementation.

The design system MUST be followed for:

- Colors
- Typography
- Font families
- Font sizes
- Font weights
- Spacing
- Layout
- Container widths
- Navbar dimensions
- Product grids
- Card dimensions
- Border radius
- Borders
- Shadows
- Buttons
- Badges
- Images
- Gradients
- Hover states
- Transitions
- Animations
- Responsive behavior
- Tailwind design tokens

### Before writing UI code

Always perform these steps:

1. Read `prompts/design-system.md`.
2. Understand the relevant design tokens.
3. Check whether an existing component already follows the required style.
4. Reuse the existing design tokens and patterns.
5. Implement the new UI using the SharePal design system.
6. Compare the result against the reference website.

### Do NOT

Do not randomly choose:

- Tailwind colors
- Font sizes
- Font weights
- Border radius
- Shadows
- Spacing
- Gradients
- Component styles

when an appropriate value already exists in:

`prompts/design-system.md`

For example, do not arbitrarily use:

```jsx
className="bg-blue-500 rounded-lg shadow-xl"

```

---


## Decision Making & Clarifications

If something is unclear or could be improved:
- Proactively suggest better approaches.
- Prefer the simplest solution that satisfies the assignment.
- If a new library would significantly simplify or improve the implementation:
  - Recommend the library.
  - Clearly explain why it is useful.
  - Ask the user for permission before adding or installing it.


Do not install or use new major libraries without user approval.
Do not ask unnecessary questions when the reference page already provides enough information.

---

## Architecture Guidelines

Use this structure unless there is a strong reason to change it:
src/

  components/

  pages/

  data/

  hooks/

  constants/

  assets/

  lib/

  types/

  App.jsx / App.tsx

  main.jsx / main.tsx
src/
Keep application source code here.
components/
Create a component when:
- it is reused in multiple places
- it makes a page easier to read
- it represents a clear UI concept such as:
  - Navbar
  - Hero
  - ProductCard
  - ProductGrid
  - CategoryCard
  - Footer
  - MobileMenu
  - CTASection
Do not create tiny one-off components too early.
When unsure, ask:
Should this UI be extracted into a reusable component, or should I keep it inside the current page for now?

pages/
Use this for page-level components.
Pages should compose components and handle page-level state, but should not contain large reusable UI blocks.
data/
Use this for local/mock content.
For example:
data/
  products.js
  categories.js
Repeated product/category content should come from data rather than duplicated JSX.
hooks/
Use this for reusable React hooks when needed.
Do not create hooks simply to move a few lines of code.
constants/
Use this for shared constants such as:
- navigation items
- image mappings
- configuration values
lib/
Use this for small reusable utilities.
Do not create unnecessary abstraction layers.
types/
If TypeScript is being used, keep shared types here when they are genuinely reused.
UI Implementation Rules (VERY IMPORTANT)
For any UI-related task:
- The goal is to replicate the provided design exactly.
- Match the UI as closely and accurately as possible.
When the user provides a design image or reference page, you MUST:
- match layout
- match spacing and padding
- match font sizes and hierarchy
- match colors
- match border radius and shadows
- match alignment and positioning
- match proportions of elements
- replicate visible UI elements
- reproduce responsive behavior
- reproduce visible interactions where practical
Do not approximate important visual elements when the reference provides enough information.
Do not simplify the design unless explicitly asked.
The reference page is the source of truth.
Reference Page Inspection
Before implementing the page:
1. Open the original SharePal reference page.
2. Inspect the complete page from top to bottom.
3. Identify every major visible section.
4. Note:
   - navbar
   - hero
   - categories
   - product sections
   - product cards
   - images
   - buttons
   - filters/search
   - promotional sections
   - footer
   - mobile behavior
   - hover states
   - animations
5. Build the page based on those observations.
Do not invent major sections that are not present in the reference.
Creative improvements are allowed only where the assignment permits them and must remain visually consistent with the original SharePal design.
Image Rules
Use appropriate image assets for the reference.
Before using an image asset:
1. Check whether the project already contains the required image.
2. Reuse existing assets when possible.
3. If an equivalent asset is needed, use an appropriate replacement that preserves:
   - aspect ratio
   - visual style
   - composition
   - overall design feel
Avoid random placeholder images.
Use meaningful names:
assets/
  images/
    hero-gaming.webp
    gaming-controller.webp
    gaming-headset.webp
If many images are used, centralize their references in a constants file where useful.
Example:
import heroGaming from "../assets/images/hero-gaming.webp";
import controller from "../assets/images/gaming-controller.webp";

export const images = {
  heroGaming,
  controller,
};
Do not create unnecessary image abstraction for a small number of assets.
Styling Rules
Use the styling approach already present in the project.
If Tailwind CSS is already configured:
- Prefer Tailwind utility classes.
- Keep class names readable.
- Reuse repeated style patterns where appropriate.
- Do not introduce a second styling system unnecessarily.
If the project uses regular CSS:
- Follow the existing CSS architecture.
- Prefer reusable classes.
- Avoid excessive inline styles.
Avoid large inline style objects unless dynamic styling requires them.
Responsive Design Rules
The page must work correctly on:
- desktop
- laptop
- tablet
- mobile
Do not simply shrink the desktop layout.
Adapt:
- navigation
- grids
- typography
- padding
- margins
- buttons
- images
- section layouts
- product cards
Check for:
- text overflow
- broken grids
- horizontal scrolling
- overlapping elements
- oversized images
- unusable mobile controls
UI Quality Bar
The final page should feel:
- polished
- modern
- visually consistent
- responsive
- close to the provided SharePal reference
Pay particular attention to:
- rounded cards
- shadows
- spacing
- typography
- image proportions
- button states
- hover effects
- transitions
- visual hierarchy
Do not add visual effects merely for decoration if they are not consistent with the reference.
Data Rules
Repeated content should be represented as data.
Example:
export const products = [
  {
    id: 1,
    name: "Gaming Controller",
    price: "₹499/day",
    image: controllerImage,
    category: "Controllers",
  },
  {
    id: 2,
    name: "Gaming Headset",
    price: "₹299/day",
    image: headsetImage,
    category: "Headsets",
  },
];
Render repeated content using .map().
Do not duplicate large product-card JSX blocks.
If the reference contains visible product names/prices/details, reproduce them as accurately as practical.
Interaction Rules
Implement meaningful interactions visible in the reference.
Examples:
- navigation links
- mobile menu
- search
- category filtering
- product selection
- dropdowns
- buttons
- hover states
- carousel controls
- modals
If an interaction would normally require a backend, mock it locally.
For example:
const [selectedProduct, setSelectedProduct] = useState(null);
The UI should feel functional without requiring a backend.
Do not build fake API calls just to make the code look more complex.
Animation Rules
Use animations only when they improve the recreation.
Prefer:
- CSS transitions
- CSS keyframes
- lightweight React state
Example:
transition:
  transform 200ms ease,
  box-shadow 200ms ease;
Avoid excessive animations.
Animations should match the feel of the reference page.
Accessibility
Implement basic accessibility:
- semantic HTML
- meaningful button labels
- alt text for images
- keyboard-accessible controls
- visible focus states
- proper heading hierarchy
- sufficient color contrast
Do not sacrifice accessibility for visual accuracy.
Performance
Keep the frontend lightweight.
Avoid:
- unnecessary packages
- huge libraries for simple effects
- duplicate components
- unnecessary state
- unnecessary API calls
- huge unoptimized images
Use React efficiently.
Do not over-engineer a 4–6 hour frontend assessment.
Code Quality
Write code that another developer can understand.
Prefer:
<ProductCard product={product} />
over repeating large blocks of JSX.
Use clear names:
ProductCard
ProductGrid
CategorySection
MobileMenu
Navbar
Footer
Avoid:
Comp1
Box2
DataThing
handleStuff
Keep files reasonably small.
Do not put the entire application into one giant component.
Avoid premature abstractions.
Do Not Overbuild
This is a 4–6 hour frontend assignment.
Do NOT waste time implementing:
- authentication
- backend APIs
- databases
- admin dashboards
- real payment processing
- complex state management
- unnecessary testing infrastructure
- unnecessary architecture
Prioritize:
Visual accuracy + responsive design + good component structure + meaningful interactions + clean code.
Feature Implementation Rules
When the user asks to build a feature:
1. Read this file first.
2. Inspect the existing implementation.
3. Identify files to change.
4. Keep changes focused.
5. Do not rewrite unrelated code.
6. Follow existing patterns.
7. Ensure the feature works end-to-end on the frontend.
8. Check the reference again.
9. Fix errors before finishing.
Error Handling
After meaningful changes:
- run the development server
- check the browser console
- fix React warnings
- fix broken imports
- fix runtime errors
- check responsive behavior
Do not leave known errors unresolved.


Final Validation Checklist
Visual
- [ ] Navbar matches reference
- [ ] Hero matches reference
- [ ] All major sections are present
- [ ] Images match or closely resemble reference
- [ ] Product cards match
- [ ] Typography is close
- [ ] Colors are close
- [ ] Spacing is close
- [ ] Buttons match
- [ ] Footer matches
- [ ] No unexpected horizontal scrolling
Responsive
- [ ] Desktop works
- [ ] Laptop works
- [ ] Tablet works
- [ ] Mobile works
- [ ] Navbar adapts correctly
- [ ] Product grids adapt correctly
- [ ] Text does not overflow
- [ ] Images do not break layout
Functional
- [ ] Buttons work where applicable
- [ ] Navigation works
- [ ] Search/filter works if present
- [ ] Mobile menu works if present
- [ ] Interactive elements have hover/focus states
- [ ] No console errors
Code
- [ ] Components are reusable
- [ ] No unnecessary duplication
- [ ] No broken imports
- [ ] No unused dependencies
- [ ] No unnecessary API calls
- [ ] No hardcoded repeated JSX
- [ ] Production build succeeds
Final Reminder
Before every feature implementation:
- Read this file.
- Follow it strictly.
- Inspect the existing project first.
- Keep the code clean and simple.
- Do not introduce backend functionality.
- Match the SharePal reference closely.
- Build responsive, production-quality frontend code.
- Fix errors before finishing.
Most important rule
Match the reference first. Add creativity only where the assignment explicitly allows it and where it does not reduce visual consistency with the SharePal design.