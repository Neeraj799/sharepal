import { ArrowRight, CheckCircle2, X } from 'lucide-react'

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

// "Added to cart" toast at the top plus the floating "Go to Cart" pill, as on the reference.
const CartNotice = ({ isToastVisible, onCloseToast, lastAdded, onGoToCart }) => {
  return (
    <>
      {isToastVisible && (
        <div
          role="status"
          className="fixed left-1/2 top-6 z-[60] flex w-[calc(100%-2rem)] max-w-[444px] -translate-x-1/2 items-center gap-2 rounded-lg bg-[#021f0d] px-4 py-4 text-sm font-semibold text-success-300 shadow-lg"
        >
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onCloseToast}
            className={`absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-success-300 text-[#021f0d] ${FOCUS_RING}`}
          >
            <X aria-hidden="true" className="h-3 w-3" />
          </button>
          <CheckCircle2
            aria-hidden="true"
            className="h-5 w-5 fill-success-300 text-white [&>circle]:stroke-success-300"
          />
          Added to cart
        </div>
      )}

      {lastAdded && (
        <button
          type="button"
          onClick={onGoToCart}
          className={`fixed bottom-20 left-1/2 z-40 flex h-14 -translate-x-1/2 items-center gap-3 rounded-full bg-secondary-500 py-2 pl-2 pr-5 text-base font-semibold text-primary-900 shadow-lg transition-colors hover:bg-secondary-400 active:scale-[0.98]${FOCUS_RING}`}
        >
          <img
            src={lastAdded.image}
            alt=""
            className="h-10 w-10 rounded-lg bg-white object-contain p-1"
          />
          Go to Cart
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </button>
      )}
    </>
  )
}

export default CartNotice
