import { useState } from 'react'
import { Home, LayoutGrid, Search, ShoppingCart } from 'lucide-react'
import logo from '../assets/images/sharepal-logo.svg'
import {
  CartIcon,
  ChevronDownIcon,
  DeliveryDateIcon,
  PickupDateIcon,
  PinIcon,
  SearchIcon,
  SelectDateIcon,
  UserIcon,
} from './NavIcons'

const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Pune']

const MOBILE_TABS = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'category', label: 'Category', icon: LayoutGrid },
  { key: 'search', label: 'Search', icon: Search },
  { key: 'cart', label: 'Cart', icon: ShoppingCart },
]

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500'

function LocationPicker({ city, onChange, compact = false }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center gap-1 font-semibold ${FOCUS_RING} ${
          compact
            ? 'rounded-full border border-category-purple bg-category-purple px-2 py-0.5 text-xs text-white shadow-md'
            : 'rounded-l-full bg-neutral-200 px-2.5 py-1.5 text-sm text-primary-900 transition-colors hover:bg-neutral-250'
        }`}
      >
        <PinIcon className={compact ? 'h-6 w-4' : 'h-6 w-5'} />
        <span className={`text-left leading-4 ${compact ? '' : 'min-w-16'}`}>
          {city}
        </span>
        <ChevronDownIcon
          className={`transition-transform duration-200 ${compact ? 'h-6 w-3' : 'h-4 w-4'} ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className={`absolute top-full z-20 mt-2 w-40 overflow-hidden rounded-xl bg-white py-1 shadow-lg ${
            compact ? 'right-0' : 'left-0'
          }`}
        >
          {CITIES.map((c) => (
            <li key={c} role="option" aria-selected={c === city}>
              <button
                type="button"
                onClick={() => {
                  onChange(c)
                  setIsOpen(false)
                }}
                className="block w-full px-4 py-2 text-left text-sm font-medium text-neutral-900 hover:bg-primary-100"
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function DesktopNav({ city, onCityChange }) {
  return (
    <div className="mx-auto hidden max-w-[1216px] items-end justify-between gap-1 px-4 lg:flex">
      <a
        href="/"
        aria-label="SharePal home"
        className={`flex h-[68px] w-40 shrink-0 items-end justify-center rounded-b-2xl bg-primary-500 p-3 shadow-md ${FOCUS_RING}`}
      >
        <img src={logo} alt="SharePal" className="w-full" />
      </a>

      <div className="flex items-center gap-2 rounded-full border-2 border-category-purple bg-white">
        <LocationPicker city={city} onChange={onCityChange} />

        <button
          type="button"
          aria-label="Edit Dates"
          className={`flex items-center gap-4 text-sm font-semibold leading-[18px] text-neutral-700 ${FOCUS_RING}`}
        >
          <span className="flex items-center gap-2">
            <DeliveryDateIcon className="h-4 w-4" />
            Delivery Date
          </span>
          <span className="flex items-center gap-2">
            <PickupDateIcon className="h-4 w-4" />
            Pickup Date
          </span>
        </button>

        <button
          type="button"
          className={`flex h-9 items-center gap-1 rounded-full bg-primary-900 px-3 text-sm font-semibold text-white active:opacity-90 ${FOCUS_RING}`}
        >
          <SelectDateIcon className="h-4 w-4" />
          <span className="pr-1 leading-5 tracking-wide">Select</span>
        </button>
      </div>

      <div className="flex items-end gap-3 text-white">
        <button
          type="button"
          aria-label="Search"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-neutral-150 hover:text-neutral-900 ${FOCUS_RING}`}
        >
          <SearchIcon className="h-7 w-7" />
        </button>
        <button
          type="button"
          aria-label="Cart"
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-neutral-150 hover:text-neutral-900 ${FOCUS_RING}`}
        >
          <CartIcon className="h-7 w-7" />
        </button>
        <button
          type="button"
          className={`group flex items-center gap-3 rounded-full text-base font-semibold leading-5 ${FOCUS_RING}`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-category-purple bg-white text-neutral-900 transition-colors duration-300 group-hover:bg-neutral-200">
            <UserIcon className="h-6 w-6" />
          </span>
          Hi, Login
        </button>
      </div>
    </div>
  )
}

function MobileNav({ city, onCityChange }) {
  return (
    <div className="flex flex-col gap-3 px-4 lg:hidden">
      <div className="flex items-start justify-between gap-1">
        <a
          href="/"
          aria-label="SharePal home"
          className={`flex h-10 shrink-0 items-center rounded-b-xl bg-primary-500 px-3 pb-1.5 pt-[11px] ${FOCUS_RING}`}
        >
          <img src={logo} alt="SharePal" className="w-28" />
        </a>

        <div className="flex h-10 items-center gap-1.5 pt-1.5 md:gap-4">
          <LocationPicker city={city} onChange={onCityChange} compact />
          <button
            type="button"
            aria-label="Account"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-900 text-white ${FOCUS_RING}`}
          >
            <UserIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex h-[34px] items-center justify-between gap-1 rounded-full border-2 border-category-purple bg-white">
        <span className="flex items-center gap-2 pl-3 text-sm font-semibold leading-[18px] text-neutral-700">
          <DeliveryDateIcon className="h-4 w-4 text-neutral-900" />
          Select Rental Dates
        </span>
        <button
          type="button"
          className={`flex h-full items-center gap-1 rounded-full bg-primary-900 pl-2 pr-3 text-xs font-medium text-white active:opacity-90 ${FOCUS_RING}`}
        >
          <SelectDateIcon className="h-4 w-4" />
          Select
        </button>
      </div>
    </div>
  )
}

function MobileTabBar() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-neutral-300/40 bg-white py-2 lg:hidden">
      {MOBILE_TABS.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors ${FOCUS_RING} ${
              isActive ? 'text-primary-500' : 'text-neutral-500'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={20} />
            {label}
          </button>
        )
      })}
    </nav>
  )
}

function Navbar() {
  const [city, setCity] = useState('Bangalore')

  return (
    <>
      <header className="sticky top-0 z-50 bg-header pb-3 md:pb-4">
        <DesktopNav city={city} onCityChange={setCity} />
        <MobileNav city={city} onCityChange={setCity} />
      </header>

      <MobileTabBar />
    </>
  )
}

export default Navbar
