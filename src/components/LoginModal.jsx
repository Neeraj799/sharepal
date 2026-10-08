import { useState } from 'react'
import { ArrowRight, ChevronDown, X } from 'lucide-react'
import logoShare from '../assets/images/footer-logo-share.svg'
import logoPal from '../assets/images/footer-logo-pal.svg'
import CouponBanner from './CouponBanner'

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

const COUNTRY_CODES = ['+91', '+1', '+44', '+971']

const LoginModal = ({ onClose }) => {
  const [countryCode, setCountryCode] = useState('+91')
  const [number, setNumber] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isValid =
    countryCode === '+91' ? number.length === 10 : number.length >= 7

  return (
    <dialog
      // showModal() gives the focus trap, Esc-to-close and backdrop natively
      ref={(element) => {
        if (element && !element.open) element.showModal()
      }}
      aria-labelledby="login-modal-title"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto animate-modal-in max-h-svh w-[95%] max-w-lg overflow-auto rounded-[32px] bg-background px-6 pb-9 pt-16 text-foreground shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm sm:px-[73px]"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-200 ${FOCUS_RING}`}
      >
        <X aria-hidden="true" className="h-6 w-6" />
      </button>

      <div className="flex items-center justify-center">
        <img src={logoShare} alt="SharePal" className="w-[86px]" />
        {/* the lime "Pal" is drawn for dark backgrounds, so darken it for this light one */}
        <img src={logoPal} alt="" className="w-[46px] brightness-75" />
      </div>

      <h2
        id="login-modal-title"
        className="mt-6 text-center text-xl font-medium leading-7 text-neutral-900"
      >
        Login/Signup to Your Account
      </h2>
      <p className="mt-2 text-center text-sm leading-6 text-neutral-900">
        Enter your WhatsApp number to continue
      </p>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault()
          setIsSubmitted(true)
        }}
      >
        <div className="flex h-12 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 focus-within:border-primary-500">
          <div className="relative flex items-center bg-neutral-200">
            <select
              aria-label="Country code"
              value={countryCode}
              onChange={(event) => {
                setCountryCode(event.target.value)
                setIsSubmitted(false)
              }}
              className="h-full appearance-none bg-transparent pl-4 pr-8 text-sm font-medium text-neutral-900 focus:outline-none"
            >
              {COUNTRY_CODES.map((code) => (
                <option key={code}>{code}</option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 h-4 w-4"
            />
          </div>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            aria-label="WhatsApp number"
            placeholder="Enter your number"
            maxLength={countryCode === '+91' ? 10 : 15}
            value={number}
            onChange={(event) => {
              setNumber(event.target.value.replace(/\D/g, ''))
              setIsSubmitted(false)
            }}
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        <CouponBanner compact className="mt-6 border border-white" />

        <button
          type="submit"
          disabled={!isValid}
          className={`mt-10 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-900 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:bg-neutral-200 disabled:text-neutral-300 disabled:hover:opacity-100 ${FOCUS_RING}`}
        >
          Get OTP
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </button>
        {/* Frontend-only: there is no OTP service behind this form */}
        <p role="status" className="mt-2 text-center text-xs text-neutral-500">
          {isSubmitted && 'This is a demo, so no OTP is sent.'}
        </p>
      </form>

      <p className="mt-3 text-center text-xs leading-4 text-neutral-500">
        By continuing, you agree to the{' '}
        <a
          href="https://sharepal.in/terms-of-service"
          target="_blank"
          rel="noreferrer"
          className={`font-medium text-primary-500 hover:underline ${FOCUS_RING}`}
        >
          Terms of Service
        </a>{' '}
        and acknowledge the{' '}
        <a
          href="https://sharepal.in/privacy-policy"
          target="_blank"
          rel="noreferrer"
          className={`font-medium text-primary-500 hover:underline ${FOCUS_RING}`}
        >
          Privacy Policy
        </a>
        .
      </p>
    </dialog>
  )
}

export default LoginModal
