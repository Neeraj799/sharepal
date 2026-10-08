import { useState } from 'react'
import { ArrowRight, Search, Star, TrendingUp, X } from 'lucide-react'
import CouponBanner from './CouponBanner'
import gaming from '../data/gaming-product-list.json'
import photography from '../data/photography-product-list.json'
import outdoor from '../data/outdoor-product-list.json'
import entertainment from '../data/entertainment-product-list.json'

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

const ALL_PRODUCTS = [gaming, photography, outdoor, entertainment].flatMap(
  (list) => list.products,
)
const POPULAR_PRODUCTS = [...gaming.products]
  .filter((product) => !product.out_of_stock)
  .sort((a, b) => b.booked_count - a.booked_count)
  .slice(0, 8)

const formatBooked = (count) =>
  count >= 1000 ? `${Math.floor(count / 1000)}k+` : count

const SearchResult = ({ product }) => {
  const { name, image, rating, booked_count: booked, per_day_rent: rent } = product
  return (
    <li className="w-[151px] shrink-0 snap-start rounded-2xl p-2.5 transition-colors hover:bg-white">
      <div className="flex aspect-square items-center justify-center rounded-lg bg-white p-[18px]">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-contain" />
      </div>
      <h4 className="mt-2.5 truncate text-sm font-bold leading-[18px]">{name}</h4>
      <p className="mt-2 text-[10px] font-bold leading-[14px] text-neutral-500">
        Per day
      </p>
      <p className="text-sm font-bold leading-[18px]">
        ₹{rent.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
      </p>
      <p className="mt-1 flex items-center gap-0.5 whitespace-nowrap text-[10px] font-semibold leading-6 text-success-700">
        <TrendingUp aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#10be56]" />
        {formatBooked(booked)} booked this month
      </p>
      <p className="flex items-center gap-1 text-xs leading-4">
        <span className="flex">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              aria-hidden="true"
              className={`h-[11px] w-[11px] ${n <= Math.round(rating) ? 'fill-current text-neutral-900' : 'text-neutral-500'}`}
            />
          ))}
        </span>
        ({rating || 0})
      </p>
    </li>
  )
}

const SearchDrawer = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const term = query.trim().toLowerCase()
  const results = term
    ? ALL_PRODUCTS.filter((product) => product.name.toLowerCase().includes(term))
    : POPULAR_PRODUCTS

  return (
    <dialog
      // showModal() gives the focus trap, Esc-to-close and backdrop natively
      ref={(element) => {
        if (element && !element.open) element.showModal()
      }}
      aria-labelledby="search-drawer-title"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-0 ml-auto h-svh max-h-none w-full max-w-[606px] animate-drawer-in overflow-y-auto bg-neutral-150 text-foreground backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:rounded-l-3xl"
    >
      <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-150 px-4 pb-5 pt-3 md:gap-6 md:p-6">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-200 ${FOCUS_RING}`}
        >
          <X aria-hidden="true" className="h-[18px] w-[18px]" />
        </button>
        <h2 id="search-drawer-title" className="text-lg font-bold md:text-xl">
          Search Products
        </h2>
      </div>

      <div className="flex flex-col">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="m-4 flex items-center gap-2 rounded-2xl border-2 border-neutral-200 bg-white px-3 py-1.5 focus-within:border-primary-500"
        >
          <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-neutral-500" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for products"
            aria-label="Search for products"
            className="h-9 min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-neutral-300"
          />
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-neutral-500" />
        </form>

        <CouponBanner className="mx-4 mt-4" />

        <h3 className="mx-4 mt-6 flex items-center gap-2 text-[10px] font-bold leading-[14px] text-neutral-500">
          {term ? `${results.length} results` : 'Popular Items'}
          <span className="h-px flex-1 bg-neutral-200" />
        </h3>

        {results.length ? (
          <ul className="mx-4 mt-4 flex snap-x gap-8 overflow-x-auto rounded-2xl p-4 pb-6">
            {results.map((product) => (
              <SearchResult key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <p className="mx-4 py-10 text-center text-neutral-500">
            No products found for “{query}”.
          </p>
        )}
      </div>
    </dialog>
  )
}

export default SearchDrawer
