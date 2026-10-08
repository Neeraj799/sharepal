import { useState } from 'react'
import { ChevronDown, ChevronRight, Minus, Plus, Trash2, X } from 'lucide-react'
import { formatDayMonth } from '../lib/dates'
import { coupons } from '../data/coupons'
import { sidebarCategories } from '../data/sidebarCategories'
import Collapse from './Collapse'
import { DeliveryDateIcon, PickupDateIcon, SelectDateIcon } from './NavIcons'
import ProfileDrawer from './ProfileDrawer'

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

const EmptyBasketIcon = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 136 124"
      className="h-[124px] w-[136px]"
      fill="none"
      strokeLinecap="round"
    >
      <g stroke="#7ee300" strokeWidth="5">
        <path d="M68 6v14M44 20l8 8M92 20l-8 8" />
      </g>
      <path
        d="M10 46h116l-12 70a8 8 0 0 1-8 6H30a8 8 0 0 1-8-6z"
        fill="#3b6df0"
      />
      <rect x="6" y="40" width="124" height="10" rx="2" fill="#1945e8" />
      <g stroke="#e8ecfd" strokeWidth="5">
        <path d="M44 62v42M58 62v42M72 62v42M86 62v42M100 62v42" />
      </g>
      <g stroke="#7ee300" strokeWidth="6">
        <path d="M14 108 56 62M122 108 80 62" />
      </g>
    </svg>
  )
}

const CATEGORY_LABELS = Object.fromEntries(
  Object.values(sidebarCategories)
    .flat()
    .map(({ id, label }) => [id, label]),
)

const categoryLabel = (product) =>
  CATEGORY_LABELS[product.categories.find((id) => id !== 'all')] ?? ''

const Stepper = ({ name, qty, onAdd, onRemove }) => {
  return (
    <div className="flex h-7 items-center gap-1 rounded-full border-2 border-primary-900 bg-neutral-150 px-2 text-primary-500">
      <button
        type="button"
        aria-label={`Remove one ${name}`}
        onClick={onRemove}
        className={`flex h-4 w-4 items-center justify-center rounded-full ${FOCUS_RING}`}
      >
        <Minus aria-hidden="true" className="h-4 w-4" />
      </button>
      <span className="min-w-[13px] text-center text-xs font-semibold tabular-nums text-neutral-900">
        {qty}
      </span>
      <button
        type="button"
        aria-label={`Add another ${name}`}
        onClick={onAdd}
        className={`flex h-4 w-4 items-center justify-center rounded-full ${FOCUS_RING}`}
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  )
}

const CartDrawer = ({
  items,
  rentalDays,
  rentalDates,
  onAdd,
  onRemove,
  onRemoveAll,
  onEditDates,
  onClose,
}) => {
  const itemCount = items.reduce((sum, { qty }) => sum + qty, 0)
  const total = items.reduce(
    (sum, { product, qty }) => sum + product.per_day_rent * rentalDays * qty,
    0,
  )

  const [couponCode, setCouponCode] = useState('')
  const [appliedCode, setAppliedCode] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [isCouponListOpen, setIsCouponListOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  // Derived, so the discount drops off by itself once the cart stops qualifying
  const appliedCoupon = coupons.find(({ code }) => code === appliedCode)
  const discount = appliedCoupon?.getDiscount({ items, rentalDays, total }) ?? 0

  const applyCoupon = (input) => {
    const code = input.trim().toUpperCase()
    const isValid = coupons.some((coupon) => coupon.code === code)
    setAppliedCode(isValid ? code : null)
    setCouponError(isValid ? '' : 'Invalid coupon code')
    if (isValid) setCouponCode(code)
  }

  const removeCoupon = () => {
    setAppliedCode(null)
    setCouponCode('')
  }

  const handleCouponSubmit = (event) => {
    event.preventDefault()
    if (appliedCoupon) removeCoupon()
    else applyCoupon(couponCode)
  }

  const couponMessage = appliedCoupon
    ? discount > 0
      ? `${appliedCode} applied. You save ₹${discount.toLocaleString('en-IN')}`
      : appliedCoupon.requirement
    : couponError

  return (
    <dialog
      // showModal() gives the focus trap, Esc-to-close and backdrop natively
      ref={(element) => {
        if (element && !element.open) element.showModal()
      }}
      aria-labelledby="cart-drawer-title"
      // React bubbles close up from the login drawer nested below, so ignore that one
      onClose={(event) => event.target === event.currentTarget && onClose()}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-0 ml-auto flex h-svh max-h-none w-full max-w-[606px] animate-drawer-in flex-col overflow-hidden bg-neutral-150 text-foreground backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:rounded-l-3xl"
    >
      <div className="flex h-[81px] shrink-0 items-center gap-5 border-b border-neutral-200 bg-white p-6">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={`flex h-[18px] w-[18px] items-center justify-center ${FOCUS_RING}`}
        >
          <X aria-hidden="true" className="h-[18px] w-[18px]" />
        </button>
        <h2 id="cart-drawer-title" className="text-xl font-bold">
          Cart Items
        </h2>
        {itemCount > 0 && (
          <span className="ml-auto rounded-full bg-neutral-150 px-4 py-2 text-xs font-semibold text-neutral-500">
            {itemCount} items added
          </span>
        )}
      </div>

      {items.length > 0 ? (
        <>
          <ul className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
            {items.map(({ product, qty }) => (
              <li
                key={product.id}
                className="flex items-start gap-[19px] rounded-xl bg-white p-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 shrink-0 object-contain"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-6 text-neutral-900">
                        {product.name}
                      </h3>
                      <p className="text-xs font-medium text-[#979797]">
                        {categoryLabel(product)}
                      </p>
                    </div>
                    <div className="shrink-0 pr-2 text-right">
                      <p className="text-base font-bold leading-6 text-neutral-900">
                        ₹{(product.per_day_rent * rentalDays * qty).toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs font-medium text-[#979797]">
                        Rent for {rentalDays} {rentalDays > 1 ? 'days' : 'day'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex h-9 items-center">
                    <Stepper
                      name={product.name}
                      qty={qty}
                      onAdd={() => onAdd(product)}
                      onRemove={() => onRemove(product.id)}
                    />
                    <button
                      type="button"
                      aria-label={`Delete ${product.name} from cart`}
                      onClick={() => onRemoveAll(product.id)}
                      className={`flex h-9 items-center rounded-full px-4 text-[#a6a6a6] hover:text-neutral-700 ${FOCUS_RING}`}
                    >
                      <Trash2 aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 flex-col gap-3 bg-white p-6 shadow-[0_-1px_0_#e5e5e5]">
            <div className="flex h-9 items-center justify-between rounded-full border border-neutral-200">
              <div className="flex min-w-0 items-center gap-4 pl-3 text-sm text-neutral-700 max-sm:gap-2 max-sm:text-xs">
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <DeliveryDateIcon className="h-5 w-5 text-neutral-900 max-sm:hidden" />
                  <span className="font-medium">
                    Delivery Date:{' '}
                    <span className="font-semibold">
                      {formatDayMonth(rentalDates.delivery)}
                    </span>
                  </span>
                </span>
                <span aria-hidden="true" className="h-[15px] w-0.5 rounded-full bg-neutral-250" />
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <PickupDateIcon className="h-5 w-5 text-neutral-900 max-sm:hidden" />
                  <span className="font-medium">
                    Pickup Date:{' '}
                    <span className="font-semibold">
                      {formatDayMonth(rentalDates.pickup)}
                    </span>
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={onEditDates}
                className={`flex h-9 shrink-0 items-center gap-2 rounded-full bg-primary-900 px-4 text-sm font-semibold text-white active:opacity-90 ${FOCUS_RING}`}
              >
                <SelectDateIcon className="h-4 w-4" />
                Edit
              </button>
            </div>

            <div className="flex flex-col items-end gap-2">
              <form
                onSubmit={handleCouponSubmit}
                className="flex h-9 w-[337px] max-w-full items-center rounded-full border border-neutral-200"
              >
                <input
                  aria-label="Coupon code"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  readOnly={Boolean(appliedCoupon)}
                  onChange={(event) => {
                    setCouponCode(event.target.value)
                    setCouponError('')
                  }}
                  className="h-full min-w-0 flex-1 bg-transparent pl-3 text-sm font-medium uppercase outline-none placeholder:normal-case placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  disabled={!couponCode.trim()}
                  className={`h-9 rounded-full bg-primary-900 px-4 text-sm font-semibold text-white active:opacity-90 disabled:bg-neutral-300 ${FOCUS_RING}`}
                >
                  {appliedCoupon ? 'Remove' : 'Apply'}
                </button>
              </form>
              <p
                aria-live="polite"
                className={`text-xs font-semibold empty:hidden ${
                  discount > 0 ? 'text-success-700' : 'text-red-500'
                }`}
              >
                {couponMessage}
              </p>
              <button
                type="button"
                aria-expanded={isCouponListOpen}
                aria-controls="cart-coupons"
                onClick={() => setIsCouponListOpen((isOpen) => !isOpen)}
                className={`flex items-center gap-0 text-xs font-semibold text-[#2563eb] ${FOCUS_RING}`}
              >
                View Coupons
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-200 ${isCouponListOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div className="w-full">
                <Collapse isOpen={isCouponListOpen} id="cart-coupons">
                  <ul className="flex gap-4 overflow-x-auto pb-1">
                    {coupons.map(({ code, label, description }) => (
                      <li key={code} className="shrink-0">
                        <label className="flex h-full min-h-[84px] w-72 cursor-pointer overflow-hidden rounded-lg bg-neutral-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-primary-500">
                          {/* The dotted edge is the ticket's perforation */}
                          <span className="flex w-8 shrink-0 items-center justify-center border-r-[6px] border-dotted border-neutral-150 bg-decorative-blue">
                            <span className="rotate-180 whitespace-nowrap text-xs font-bold text-secondary-500 [writing-mode:vertical-rl]">
                              {label}
                            </span>
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col gap-1 p-2">
                            <span className="flex items-center justify-between gap-2">
                              <span className="font-bold leading-6 text-neutral-900">
                                {code}
                              </span>
                              <input
                                type="checkbox"
                                aria-label={`Apply coupon ${code}`}
                                checked={code === appliedCode}
                                onChange={(event) =>
                                  event.target.checked
                                    ? applyCoupon(code)
                                    : removeCoupon()
                                }
                                className="h-4 w-4 shrink-0 cursor-pointer accent-primary-900 outline-none"
                              />
                            </span>
                            <span className="text-xs leading-4 text-neutral-500">
                              {description}
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 border-t border-neutral-200 pt-4 max-sm:flex-wrap">
              <div>
                <p className="text-xl font-bold leading-7 text-neutral-900">
                  Total Charges
                </p>
                <p className="text-xs text-[#979797]">Price incl. of all taxes</p>
              </div>
              <span className="ml-auto flex flex-col items-end text-[32px] font-bold leading-10 text-neutral-900">
                {discount > 0 && (
                  <s className="text-xs font-medium text-[#979797]">
                    ₹{total.toLocaleString('en-IN')}
                  </s>
                )}
                ₹{(total - discount).toLocaleString('en-IN')}
              </span>
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className={`h-12 w-48 shrink-0 rounded-full bg-primary-500 font-semibold text-white transition-colors hover:bg-primary-600 active:opacity-90 max-sm:w-full ${FOCUS_RING}`}
              >
                Login to CheckOut
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-24 text-center">
          <EmptyBasketIcon />
          <div className="flex max-w-[290px] flex-col gap-3">
            <h3 className="text-balance text-2xl font-bold leading-8">
              Oops! Your Cart is Feeling Lonely...
            </h3>
            <p className="text-balance text-neutral-500">
              Looks like you left your cart empty. Give it some love and fill it
              up!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`flex h-12 items-center gap-2 rounded-full border-2 border-primary-500 px-8 font-semibold text-primary-500 transition-colors hover:bg-primary-100 ${FOCUS_RING}`}
          >
            Explore All Products
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      )}
      {/* A second modal dialog stacks above the cart in the top layer */}
      {isLoginOpen && <ProfileDrawer onClose={() => setIsLoginOpen(false)} />}
    </dialog>
  )
}

export default CartDrawer
