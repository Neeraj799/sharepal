import { useState } from 'react'
import { BadgeCheck, CalendarDays, Check, Heart, Minus, Plus } from 'lucide-react'
import ProductBadge from './ProductBadge'
import {
  ADVANTAGE_LOGO,
  CAREPAL_LOGO,
  COUPON_STRIP_IMAGE,
  damagesCovered,
  offers,
  transparentPrices,
} from '../data/productDetail'

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
const CTA_STYLE = `flex h-12 w-full items-center justify-center gap-2 rounded-[28px] px-4 text-base font-semibold transition-colors active:opacity-90 ${FOCUS_RING}`

// The two reassurance cards under the offers share one layout
const AssuranceCard = ({ logo, logoAlt, title, highlight, points, className, highlightClassName }) => {
  return (
    <div className={`rounded-xl border md:rounded-2xl md:p-2 ${className}`}>
      <div className="flex items-center gap-2">
        <img src={logo} alt={logoAlt} className="h-auto w-40 px-2 py-1" />
        <p className="text-sm font-bold leading-5">
          {title}
          <br />
          <span className={highlightClassName}>{highlight}</span>
        </p>
      </div>
      <ul className="flex flex-col gap-2 p-2 pt-0">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-center gap-2 text-sm font-medium leading-[18px] text-primary-900"
          >
            <Check aria-hidden="true" className="size-4 shrink-0 text-success-700" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

// rentalDays is null until the user picks rental dates; the price stays hidden until then.
const ProductSummary = ({
  product,
  rentalDays,
  onSelectDates,
  quantity,
  onAdd,
  onRemove,
}) => {
  const {
    name,
    tag,
    description,
    per_day_rent: perDayRent,
    out_of_stock: isOutOfStock,
  } = product
  const isWaitlist = tag === 'Vote to Launch'
  const [isSaved, setIsSaved] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-3 md:gap-6 md:rounded-3xl md:p-4">
      <div className="flex w-full flex-col items-start gap-2">
        {tag && <ProductBadge tag={tag} />}
        <div className="flex w-full items-start justify-between gap-2">
          <h1 className="text-lg font-bold leading-6 text-neutral-900 md:text-xl md:leading-7 xl:text-2xl xl:leading-8">
            {name}
          </h1>
          <button
            type="button"
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isSaved}
            onClick={() => setIsSaved((saved) => !saved)}
            className={`rounded-full text-neutral-300 transition-all duration-500 ${FOCUS_RING}`}
          >
            <Heart
              className={`h-6 w-6 ${isSaved ? 'fill-primary-500 text-primary-500' : ''}`}
            />
          </button>
        </div>
        {description && (
          <p className="line-clamp-3 text-sm font-medium leading-[18px] text-gray-600 md:text-base md:font-normal md:leading-6 xl:font-medium">
            {description}
          </p>
        )}
      </div>

      {!isWaitlist && (
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm font-semibold leading-[18px] text-gray-600">
            {isOutOfStock
              ? 'Out of stock'
              : rentalDays
                ? `Rent for ${rentalDays} ${rentalDays > 1 ? 'days' : 'day'}`
                : 'Select Dates to view price'}
          </p>
          <p className="text-xl font-bold leading-7 text-[#101010] md:text-2xl md:leading-8 lg:text-[32px] lg:leading-10">
            ₹
            {rentalDays ? (
              (perDayRent * rentalDays).toLocaleString('en-IN', {
                maximumFractionDigits: 2,
              })
            ) : (
              <span aria-hidden="true" className="inline-flex blur-md">
                XXX
              </span>
            )}
          </p>
          <div>
            <p className="flex items-center gap-1 text-sm font-semibold leading-[18px] text-decorative-pink">
              <BadgeCheck aria-hidden="true" className="w-5" />
              Lowest Price Guarantee
            </p>
            <span className="text-xs font-medium leading-4 text-gray-600">
              Price incl. of all taxes
            </span>
          </div>
        </div>
      )}

      {isWaitlist ? (
        <button
          type="button"
          disabled={hasJoined}
          onClick={() => setHasJoined(true)}
          className={`${CTA_STYLE} bg-secondary-500 text-primary-900 hover:bg-secondary-400 disabled:cursor-default disabled:bg-neutral-200 disabled:text-neutral-500`}
        >
          {hasJoined ? 'Joined' : 'Join Waitlist'}
        </button>
      ) : !rentalDays ? (
        <button
          type="button"
          onClick={onSelectDates}
          className={`${CTA_STYLE} bg-primary-900 text-white`}
        >
          <CalendarDays aria-hidden="true" className="size-4" />
          Select Date
        </button>
      ) : quantity > 0 ? (
        <div className="flex h-12 w-full items-center justify-between rounded-[28px] border-2 border-primary-900">
          <button
            type="button"
            aria-label={`Remove one ${name} from cart`}
            onClick={onRemove}
            className={`flex h-full w-14 items-center justify-center rounded-full hover:bg-neutral-150 ${FOCUS_RING}`}
          >
            <Minus aria-hidden="true" className="size-4" />
          </button>
          <span aria-live="polite" className="text-base font-semibold tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            aria-label={`Add another ${name} to cart`}
            onClick={onAdd}
            className={`flex h-full w-14 items-center justify-center rounded-full hover:bg-neutral-150 ${FOCUS_RING}`}
          >
            <Plus aria-hidden="true" className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={onAdd}
          className={`${CTA_STYLE} bg-primary-900 text-white disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Add to Cart
        </button>
      )}

      <div className="flex w-full flex-col gap-3">
        <h2 className="text-sm font-semibold leading-[18px] text-gray-600">
          Available Offers ({offers.length} Offers)
        </h2>
        <ul className="flex w-full gap-4 overflow-x-auto [scrollbar-width:none]">
          {offers.map(({ code, discount, description: terms }) => (
            <li
              key={code}
              className="flex min-h-[85px] w-60 shrink-0 overflow-hidden rounded-xl bg-neutral-100 shadow-sm"
            >
              <div className="relative flex w-9 shrink-0 items-center justify-center bg-primary-900">
                <img
                  src={COUPON_STRIP_IMAGE}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="relative -rotate-90 whitespace-nowrap text-xs font-bold text-secondary-500">
                  {discount}
                </span>
              </div>
              <div className="flex-1 p-2">
                <h3 className="mb-1 text-sm font-bold leading-[18px]">{code}</h3>
                <p className="line-clamp-3 text-xs font-medium leading-4 text-gray-600">
                  {terms}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AssuranceCard
        logo={ADVANTAGE_LOGO}
        logoAlt="SharePal Advantage"
        title="Transparent prices"
        highlight="Zero Surprises"
        points={transparentPrices}
        className="border-[#E4DDFB] bg-[#F7F5FF]"
        highlightClassName="text-category-purple"
      />
      <AssuranceCard
        logo={CAREPAL_LOGO}
        logoAlt="CarePal Secure"
        title="Damages Covered"
        highlight="Rest Assured."
        points={damagesCovered}
        className="border-carepal-lighter bg-gradient-to-b from-white to-carepal-lighter/35"
        highlightClassName="text-carepal-dark"
      />
    </div>
  )
}

export default ProductSummary
