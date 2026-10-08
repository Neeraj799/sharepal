import { useState } from 'react'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import assetPartnerIcon from '../assets/images/asset-partner-icon.webp'
import AssetPartnerModal from './AssetPartnerModal'
import CouponBanner from './CouponBanner'
import LoginModal from './LoginModal'

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

// Login is not implemented (frontend-only), so the drawer is the logged-out view.
const ProfileDrawer = ({ onClose }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAssetPartnerOpen, setIsAssetPartnerOpen] = useState(false)

  return (
    <dialog
      // showModal() gives the focus trap, Esc-to-close and backdrop natively
      ref={(element) => {
        if (element && !element.open) element.showModal()
      }}
      aria-label="Account"
      // React bubbles close up from the login modal nested below, so ignore that one
      onClose={(event) => event.target === event.currentTarget && onClose()}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-0 ml-auto flex h-svh max-h-none w-full max-w-[606px] animate-drawer-in flex-col overflow-y-auto bg-neutral-150 text-foreground backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:rounded-l-3xl"
    >
      <div className="rounded-bl-3xl bg-white pb-4 pl-7 pr-4 pt-20">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-4xl font-bold leading-10">Hi, Pal!</h2>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setIsLoginOpen(true)}
            className={`flex h-11 items-center gap-1 rounded-full bg-primary-900 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 ${FOCUS_RING}`}
          >
            Log In
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <CouponBanner className="mt-6" />
      </div>

      <div className="flex-1" />

      <div className="bg-neutral-100 p-6">
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => setIsAssetPartnerOpen(true)}
          className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-500 px-4 py-2 text-left transition-all hover:opacity-95 md:h-[88px] md:gap-4 md:rounded-3xl md:px-6 md:py-3 ${FOCUS_RING}`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-secondary-500/20 blur-3xl"
          />
          <img
            src={assetPartnerIcon}
            alt=""
            className="relative w-14 shrink-0 object-contain md:w-16"
          />
          <span className="relative flex-1">
            <span className="block text-xs font-bold uppercase leading-4 text-secondary-500">
              Asset Partner Program
            </span>
            <span className="block text-base font-bold leading-6 text-white">
              Sponsor an asset. Earn every month.
            </span>
            <span className="block text-xs font-medium leading-4 text-neutral-300">
              Monthly payouts to your bank — plus discounts on every rental.
            </span>
          </span>
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-500 text-primary-900 shadow-lg shadow-secondary-500/20 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-10 md:w-10">
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 md:h-5 md:w-5" />
          </span>
        </button>
      </div>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isAssetPartnerOpen && (
        <AssetPartnerModal onClose={() => setIsAssetPartnerOpen(false)} />
      )}
    </dialog>
  )
}

export default ProfileDrawer
