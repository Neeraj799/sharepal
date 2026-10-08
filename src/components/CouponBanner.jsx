import { PartyPopper } from 'lucide-react'

// compact is the smaller version shown inside the login modal
const CouponBanner = ({ className = '', compact = false }) => {
  return (
    <div
      className={`flex items-center gap-4 rounded-3xl bg-gradient-to-r from-primary-100 to-secondary-100 p-3 ${
        compact ? 'text-sm' : ''
      } ${className}`}
    >
      <PartyPopper
        aria-hidden="true"
        className={`shrink-0 text-category-accent ${
          compact ? 'h-8 w-8' : 'h-[54px] w-[54px]'
        }`}
      />
      <div>
        <p className="font-bold leading-6 text-pink-500">
          Use code SHAREPAL &amp; get 10%{' '}
          <span className="text-neutral-900">on orders above ₹1500.</span>
        </p>
        <p className="font-bold leading-6">Maximum discount: ₹300</p>
        <p className="mt-2 text-sm font-bold leading-[18px]">
          Use Coupon - SHAREPAL
        </p>
      </div>
    </div>
  )
}

export default CouponBanner
