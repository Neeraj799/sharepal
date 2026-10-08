import CategoryTabs from '../components/CategoryTabs'
import Hero from '../components/Hero'
import CategorySidebar from '../components/CategorySidebar'
import ProductsHeader from '../components/ProductsHeader'
import ProductGrid from '../components/ProductGrid'
import FaqSection from '../components/FaqSection'
import Breadcrumb from '../components/Breadcrumb'
import TestimonialsSection from '../components/TestimonialsSection'
import { superCategories } from '../data/superCategories'

const Home = ({
  superCategory,
  activeCategory,
  onSelectCategory,
  isHeaderHidden,
  rentalDays,
  onSelectDates,
  cart,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const { title, hero, categories, products } = superCategories[superCategory]
  // Every product lists the sidebar categories it belongs to, including "all"
  const visibleProducts = products.filter((product) =>
    product.categories.includes(activeCategory),
  )
  const activeLabel = categories.find(({ id }) => id === activeCategory).label
  const heading = activeCategory === 'all' ? title : `${activeLabel} on rent`

  return (
    <>
    {/* Pinned under the navbar, or at the top once the navbar hides. It sits outside the grid
        because a grid item only sticks within its own row. md:-mt-1 tucks its top 4px under
        the navbar, as the reference does. */}
    <div
      className={`sticky z-20 mx-auto max-w-[1216px] bg-header transition-[top] duration-500 md:-mt-1 md:bg-neutral-150 ${
        isHeaderHidden ? 'top-0' : 'top-[98px] lg:top-20'
      }`}
    >
      <CategoryTabs active={superCategory} onSelect={onSelectCategory} />
    </div>

    {/* One grid places the hero full-width on mobile and beside the sidebar on desktop */}
    <div className="mx-auto grid max-w-[1216px] grid-cols-[88px_1fr] md:grid-cols-[100px_1fr] md:grid-rows-[auto_1fr] md:gap-x-8 lg:grid-cols-[120px_1fr]">
      {/* The mobile gradient continues down from the tab bar's header colour */}
      <div className="col-span-full row-start-1 px-2 pb-3 max-md:bg-hero md:col-span-1 md:col-start-2 md:px-0 md:pb-0">
        <Hero {...hero} />
      </div>

      <aside className="row-start-2 max-md:pl-2 max-md:pt-4 md:row-span-2 md:row-start-1">
        <CategorySidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={(id) => onSelectCategory(superCategory, id)}
          isHeaderHidden={isHeaderHidden}
        />
      </aside>

      <main className="col-start-2 row-start-2 min-w-0 max-md:px-2 max-md:pt-4">
        <ProductsHeader title={heading} count={visibleProducts.length} />
        {/* keyed so "Show More" paging restarts when the tab or category changes */}
        <ProductGrid
          key={`${superCategory}-${activeCategory}`}
          products={visibleProducts}
          rentalDays={rentalDays}
          onSelectDates={onSelectDates}
          cart={cart}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      </main>
    </div>

    <FaqSection />
    <Breadcrumb current={title} />
    <TestimonialsSection />
    </>
  )
}

export default Home
