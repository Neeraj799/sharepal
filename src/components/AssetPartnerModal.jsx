import {
  ArrowRight,
  Coins,
  Gift,
  Headphones,
  TicketPercent,
  Wallet,
  X,
} from 'lucide-react'

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500'

const EARNING_BENEFITS = [
  {
    icon: Wallet,
    prefix: 'upto',
    value: '₹20,000',
    suffix: '/mo',
    label: 'Earnings from rental assets',
  },
  {
    icon: Gift,
    prefix: 'upto',
    value: '₹10,000',
    label: 'Instant wallet credit',
  },
]

const RENTAL_BENEFITS = [
  { icon: TicketPercent, value: '10% Off', label: 'Partner discount' },
  { icon: Coins, value: '10%', label: 'Cashback on every order' },
  { icon: Headphones, value: 'Priority', label: 'Customer support' },
]

const BenefitCard = ({ icon: Icon, prefix, value, suffix, label }) => {
  return (
    <li className="flex flex-col items-center rounded-xl border border-white/15 bg-white/5 px-2 py-4 text-center">
      <Icon aria-hidden="true" className="h-4 w-4 text-secondary-500" />
      {prefix && (
        <span className="mt-2 text-[10px] font-bold leading-[14px] text-white">
          {prefix}
        </span>
      )}
      <span
        className={`font-display text-sm font-bold leading-5 text-secondary-500 ${
          prefix ? '' : 'mt-2'
        }`}
      >
        {value}
        {suffix && <span className="text-[10px] text-white">{suffix}</span>}
      </span>
      <span className="text-xs font-medium leading-5 text-white">{label}</span>
    </li>
  )
}

const AssetPartnerModal = ({ onClose }) => {
  return (
    <dialog
      // showModal() gives the focus trap, Esc-to-close and backdrop natively
      ref={(element) => {
        if (element && !element.open) element.showModal()
      }}
      aria-labelledby="asset-partner-title"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto animate-modal-in flex max-h-[95svh] w-[95%] max-w-[680px] flex-col overflow-hidden rounded-3xl bg-white text-foreground shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative shrink-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-500 px-6 pb-6 pt-8 text-center md:px-24">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-900 transition-colors hover:bg-neutral-200 ${FOCUS_RING}`}
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>

        <span className="inline-block rounded-full border border-secondary-500/40 bg-secondary-500/10 px-3 py-1 text-xs font-bold uppercase leading-4 tracking-widest text-secondary-500">
          Introducing
        </span>
        <h2
          id="asset-partner-title"
          className="mt-3 font-display text-xl font-bold leading-7 text-white"
        >
          SharePal <span className="text-secondary-500">Asset Partner</span>{' '}
          Program
        </h2>
        <p className="mt-2 text-xs font-medium leading-5 text-white/80">
          As an Asset Partner, you buy the assets that power SharePal&apos;s
          rental platform. Not only do you earn from your assets, but you also
          unlock exclusive partner privileges that significantly reduce the
          cost of renting from SharePal.
        </p>
      </div>

      <div className="overflow-y-auto p-4 md:p-6">
        <div className="rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-500 p-4">
          <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase leading-[14px] tracking-widest text-secondary-500">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary-500" />
            Earning Benefits
            <span className="h-px flex-1 bg-white/20" />
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {EARNING_BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.label} {...benefit} />
            ))}
          </ul>

          <h3 className="mt-4 flex items-center gap-2 border-t border-white/20 pt-4 text-[10px] font-bold uppercase leading-[14px] tracking-widest text-white">
            Rental Benefits
            <span className="h-px flex-1 bg-white/20" />
          </h3>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {RENTAL_BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.label} {...benefit} />
            ))}
          </ul>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-neutral-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="text-sm font-medium leading-5 text-neutral-900">
          Pick any asset and start earning from{' '}
          <span className="text-primary-500">day one.</span>
        </p>
        <div className="flex shrink-0 items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full text-xs font-medium text-neutral-500 hover:text-neutral-900 ${FOCUS_RING}`}
          >
            Maybe later
          </button>
          {/* Frontend-only: the partner sign-up flow is not built, so this just closes */}
          <button
            type="button"
            onClick={onClose}
            className={`flex h-10 items-center gap-2 rounded-full bg-secondary-500 px-6 text-sm font-semibold text-primary-900 shadow-lg shadow-secondary-500/20 transition-transform hover:-translate-y-0.5 ${FOCUS_RING}`}
          >
            Continue
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default AssetPartnerModal
