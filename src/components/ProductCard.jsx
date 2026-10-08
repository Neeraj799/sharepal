import { useState } from 'react'
import { Heart, Minus, Plus, Sparkles } from 'lucide-react'
import ProductBadge from './ProductBadge'
import { linkProps } from '../lib/router'

// The data has no waitlist numbers, so "Vote to Launch" cards use the reference's.
const WAITLIST = { joined: 24, goal: 1000 }

const formatPrice = (amount) =>
  amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

const WaitlistPanel = ({ joined, goal }) => {
  return (
    <div className="mt-2 flex w-full flex-col gap-1.5 rounded-xl bg-secondary-100 p-2">
      <div className="flex items-start gap-1.5">
        <Sparkles
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-success-700"
        />
        <p
          role="status"
          className="text-pretty text-[10px] font-medium leading-[14px] text-success-700"
        >
          We launch if 1k people join the waitlist. Get notified first!
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={joined}
        aria-label={`${joined} of ${goal} people joined the waitlist`}
        className="relative h-5 w-full overflow-hidden rounded-full bg-neutral-200"
      >
        <div
          className="h-full rounded-full bg-category-accent transition-[width] duration-500 ease-out"
          style={{ width: `${(joined / goal) * 100}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold leading-[14px] text-neutral-150 tabular-nums">
          {joined}/{goal} Joined
        </span>
      </div>
    </div>
  )
}

// rentalDays is null until the user picks rental dates; prices stay hidden until then.
const ProductCard = ({
  product,
  rentalDays,
  onSelectDates,
  quantity = 0,
  onAdd,
  onRemove,
}) => {
  const { name, image, tag, per_day_rent: perDayRent, out_of_stock: isOutOfStock } =
    product
  const isWaitlist = tag === 'Vote to Launch'
  const [isSaved, setIsSaved] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-2.5 transition-all duration-300 md:rounded-3xl md:bg-transparent md:p-3 md:hover:bg-white">
      <div className="relative aspect-square shrink-0 overflow-hidden rounded-lg bg-white p-1.5 md:rounded-2xl md:p-3">
        <div className="h-full p-3 md:p-5">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>

        {tag && (
          <ProductBadge
            tag={tag}
            className={`absolute left-2 top-2 md:left-3 md:top-3 ${
              isWaitlist ? 'max-md:leading-[14px]' : ''
            }`}
          />
        )}

        <button
          type="button"
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isSaved}
          onClick={() => setIsSaved((saved) => !saved)}
          className={`absolute right-1 top-1 z-10 scale-75 rounded-full text-neutral-300 opacity-10 transition-all duration-300 focus-visible:scale-100 focus-visible:opacity-100 group-hover:scale-100 group-hover:opacity-100 md:right-3 md:top-3 md:opacity-0 ${FOCUS_RING}`}
        >
          <Heart
            className={`h-6 w-6 ${isSaved ? 'fill-primary-500 text-primary-500' : ''}`}
          />
        </button>
      </div>

      {isWaitlist && (
        <WaitlistPanel
          joined={WAITLIST.joined + (hasJoined ? 1 : 0)}
          goal={WAITLIST.goal}
        />
      )}

      <div className="flex h-full flex-col justify-between">
        <h2 className="line-clamp-2 pb-1 pt-2.5 text-xs font-bold leading-4 text-foreground md:p-2 md:pb-0 md:text-base md:leading-6">
          {/* The link's ::after covers the card, so the whole card opens the product page;
              the buttons sit above it with z-10 */}
          <a
            {...linkProps(product.path)}
            className={`after:absolute after:inset-0 ${FOCUS_RING}`}
          >
            {name}
          </a>
        </h2>

        <div className="flex w-full flex-col items-start md:gap-1 md:px-2">
          <div aria-hidden="true" className="my-1 h-px w-full bg-neutral-200" />

          {isWaitlist ? (
            <button
              type="button"
              disabled={hasJoined}
              onClick={() => setHasJoined(true)}
              className={`relative z-10 mt-2 h-9 w-full whitespace-nowrap rounded-full bg-secondary-500 px-2 text-sm font-semibold leading-4 text-primary-900 transition-[transform,background-color] duration-150 ease-out hover:bg-secondary-400 active:scale-[0.98] disabled:cursor-default disabled:bg-neutral-200 disabled:text-neutral-500 md:mt-3 md:h-10 md:px-4 ${FOCUS_RING}`}
            >
              {hasJoined ? 'Joined' : 'Join Waitlist'}
            </button>
          ) : (
            <div className="flex w-full items-end justify-between gap-1 max-md:flex-wrap md:gap-2">
              <div className="flex flex-col items-baseline md:gap-1">
                <p className="text-[10px] font-semibold leading-[14px] text-[#7a7a7a] md:text-sm md:leading-[18px]">
                  {isOutOfStock ? (
                    'Out of stock'
                  ) : rentalDays ? (
                    <>
                      Rent for{' '}
                      <span className="text-xs leading-5 text-[#101010] md:text-sm">
                        {rentalDays}
                      </span>{' '}
                      {rentalDays > 1 ? 'days' : 'day'}
                    </>
                  ) : (
                    'Select Dates to view price'
                  )}
                </p>
                <p className="text-base font-bold text-[#101010] md:text-lg md:leading-6">
                  ₹
                  {rentalDays ? (
                    formatPrice(perDayRent * rentalDays)
                  ) : (
                    <span aria-hidden="true" className="inline-flex blur-sm">
                      N/A
                    </span>
                  )}
                </p>
                {rentalDays && (
                  <span className="rounded bg-secondary-500 px-1 py-px text-[10px] font-bold leading-[14px] text-secondary-900 md:px-1.5 md:py-0.5 md:text-xs md:font-semibold md:leading-4">
                    Incl. of GST
                  </span>
                )}
              </div>
              {quantity > 0 ? (
                <div className="relative z-10 flex h-8 shrink-0 items-center justify-between rounded-full border-2 border-primary-900 max-md:w-full md:h-9 lg:h-12">
                  <button
                    type="button"
                    aria-label={`Remove one ${name} from cart`}
                    onClick={onRemove}
                    className={`flex h-full w-8 items-center justify-center rounded-full hover:bg-neutral-150 lg:w-10 ${FOCUS_RING}`}
                  >
                    <Minus aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <span aria-live="polite" className="min-w-4 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Add another ${name} to cart`}
                    onClick={onAdd}
                    className={`flex h-full w-8 items-center justify-center rounded-full hover:bg-neutral-150 lg:w-10 ${FOCUS_RING}`}
                  >
                    <Plus aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={isOutOfStock}
                  // without dates there is no price to add, so ask for them first
                  onClick={rentalDays ? onAdd : onSelectDates}
                  aria-label={`Add ${name} to cart`}
                  className={`relative z-10 flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full border-2 border-primary-900 px-4 text-sm font-medium transition-all duration-300 hover:bg-neutral-150 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent max-md:w-full md:h-9 md:w-9 md:p-2 lg:h-12 lg:w-12 ${FOCUS_RING}`}
                >
                  <span className="md:hidden">Add to Cart</span>
                  <Plus aria-hidden="true" className="hidden h-6 w-6 md:block" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
