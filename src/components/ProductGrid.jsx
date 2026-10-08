import { Fragment, useState } from 'react'
import ProductCard from './ProductCard'
import PromoBanner from './PromoBanner'
import { PROMO_BANNERS } from '../constants/promoBanners'

const PAGE_SIZE = 12

const ProductGrid = ({
  products,
  rentalDays,
  onSelectDates,
  cart,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const visibleProducts = products.slice(0, visibleCount)

  return (
    <section id="products-section" className="pb-10">
      <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-5 md:mt-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {visibleProducts.map((product, index) => {
          const banner = PROMO_BANNERS[index + 1]
          return (
            <Fragment key={product.id}>
              <ProductCard
                product={product}
                rentalDays={rentalDays}
                onSelectDates={onSelectDates}
                quantity={cart[product.id]?.qty ?? 0}
                onAdd={() => onAddToCart(product)}
                onRemove={() => onRemoveFromCart(product.id)}
              />
              {banner && <PromoBanner {...banner} />}
            </Fragment>
          )
        })}
      </div>

      <div className="mt-5 flex w-full flex-col items-center border-t border-neutral-200 py-7 md:mt-10">
        <p className="pb-3 text-sm text-[#979797] md:text-base">
          Showing {visibleProducts.length} of {products.length} results
        </p>
        {visibleCount < products.length && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="h-[51.2px] w-full rounded-full border-2 border-neutral-900 bg-white text-base font-medium text-foreground transition-colors hover:bg-neutral-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:opacity-90 sm:max-w-72"
          >
            Show More
          </button>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
