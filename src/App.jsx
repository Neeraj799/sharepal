import { useState } from 'react'
import Navbar from './components/Navbar'
import CategoryTabs from './components/CategoryTabs'
import Hero from './components/Hero'
import CategorySidebar from './components/CategorySidebar'
import ProductsHeader from './components/ProductsHeader'

function App() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Navbar />

      {/* One grid places the hero full-width on mobile and beside the sidebar on desktop */}
      <div className="mx-auto grid max-w-[1216px] grid-cols-[88px_1fr] md:grid-cols-[100px_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-8 lg:grid-cols-[120px_1fr]">
        {/* Mobile-only gradient running behind both the tabs and the hero */}
        <div
          aria-hidden="true"
          className="col-span-full row-span-2 row-start-1 -mt-px bg-hero md:hidden"
        />

        <div className="z-20 col-span-full row-start-1 md:bg-neutral-150 lg:sticky lg:top-[84px]">
          <CategoryTabs />
        </div>

        <div className="col-span-full row-start-2 px-2 pb-3 md:col-span-1 md:col-start-2 md:px-0 md:pb-0">
          <Hero />
        </div>

        <aside className="row-start-3 max-md:pl-2 max-md:pt-4 md:row-span-2 md:row-start-2">
          <CategorySidebar
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </aside>
        <main className="col-start-2 row-start-3 min-w-0 max-md:px-2 max-md:pt-4">
          <ProductsHeader title="gaming gadgets on rent" count={50} />
        </main>
      </div>
    </div>
  )
}

export default App
