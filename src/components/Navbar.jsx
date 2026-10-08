import { useState } from 'react'
import logo from '../assets/images/sharepal-logo.svg'
import { MOBILE_TABS } from '../constants/navigation'
import { formatDayMonth } from '../lib/dates'
import CityModal from './CityModal'
import ProfileDrawer from './ProfileDrawer'
import SearchDrawer from './SearchDrawer'
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

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500'

const LocationPicker = ({ city, onOpen, compact = false }) => {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      className={`flex items-center gap-1 font-semibold ${FOCUS_RING} ${
        compact
          ? 'rounded-full border border-category-accent bg-category-accent px-2 py-0.5 text-xs text-white shadow-md'
          : 'rounded-l-full bg-neutral-200 px-2.5 py-1.5 text-sm text-primary-900 transition-colors hover:bg-neutral-250'
      }`}
    >
      <PinIcon className={compact ? 'h-6 w-4' : 'h-6 w-5'} />
      <span className={`text-left leading-4 ${compact ? '' : 'min-w-16'}`}>
        {city}
      </span>
      <ChevronDownIcon className={compact ? 'h-6 w-3' : 'h-4 w-4'} />
    </button>
  )
}

const DesktopNav = ({
  city,
  onCityOpen,
  onSearchOpen,
  onCartOpen,
  cartCount,
  onProfileOpen,
  rentalDates,
  onSelectDates,
}) => {
  return (
    <div className="mx-auto hidden max-w-[1216px] items-end justify-between gap-1 px-4 lg:flex">
      <a
        href="/"
        aria-label="SharePal home"
        className={`flex h-[68px] w-40 shrink-0 items-end justify-center rounded-b-2xl bg-primary-500 p-3 shadow-md ${FOCUS_RING}`}
      >
        <img src={logo} alt="SharePal" className="w-full" />
      </a>

      <div className="flex items-center gap-2 rounded-full border-2 border-category-accent bg-white">
        <LocationPicker city={city} onOpen={onCityOpen} />

        <button
          type="button"
          aria-label="Edit Dates"
          onClick={onSelectDates}
          className={`flex items-center gap-4 text-sm font-semibold leading-[18px] text-neutral-700 ${FOCUS_RING}`}
        >
          <span className="flex items-center gap-2">
            <DeliveryDateIcon className="h-4 w-4" />
            Delivery Date
            {rentalDates && `: ${formatDayMonth(rentalDates.delivery)}`}
          </span>
          <span className="flex items-center gap-2">
            <PickupDateIcon className="h-4 w-4" />
            Pickup Date
            {rentalDates && `: ${formatDayMonth(rentalDates.pickup)}`}
          </span>
        </button>

        <button
          type="button"
          onClick={onSelectDates}
          className={`flex h-9 items-center gap-1 rounded-full bg-primary-900 px-3 text-sm font-semibold text-white active:opacity-90 ${FOCUS_RING}`}
        >
          <SelectDateIcon className="h-4 w-4" />
          <span className="pr-1 leading-5 tracking-wide">
            {rentalDates ? 'Edit' : 'Select'}
          </span>
        </button>
      </div>

      <div className="flex items-end gap-3 text-white">
        <button
          type="button"
          aria-label="Search"
          onClick={onSearchOpen}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-neutral-150 hover:text-neutral-900 ${FOCUS_RING}`}
        >
          <SearchIcon className="h-7 w-7" />
        </button>
        <button
          type="button"
          aria-label={cartCount ? `Cart, ${cartCount} items` : 'Cart'}
          onClick={onCartOpen}
          className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-neutral-150 hover:text-neutral-900 ${FOCUS_RING}`}
        >
          <CartIcon className="h-7 w-7" />
          {cartCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[8px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onProfileOpen}
          className={`group flex items-center gap-3 rounded-full text-base font-semibold leading-5 ${FOCUS_RING}`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-category-accent bg-white text-neutral-900 transition-colors duration-300 group-hover:bg-neutral-200">
            <UserIcon className="h-6 w-6" />
          </span>
          Hi, Login
        </button>
      </div>
    </div>
  )
}

const MobileNav = ({ city, onCityOpen, onProfileOpen, rentalDates, onSelectDates }) => {
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
          <LocationPicker city={city} onOpen={onCityOpen} compact />
          <button
            type="button"
            aria-label="Account"
            onClick={onProfileOpen}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-900 text-white ${FOCUS_RING}`}
          >
            <UserIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex h-[34px] items-center justify-between gap-1 rounded-full border-2 border-category-accent bg-white">
        <button
          type="button"
          onClick={onSelectDates}
          className={`flex h-full flex-1 items-center gap-2 rounded-l-full pl-3 text-sm font-semibold leading-[18px] text-neutral-700 ${FOCUS_RING}`}
        >
          <DeliveryDateIcon className="h-4 w-4 text-neutral-900" />
          {rentalDates
            ? `${formatDayMonth(rentalDates.delivery)} - ${formatDayMonth(rentalDates.pickup)}`
            : 'Select Rental Dates'}
        </button>
        <button
          type="button"
          onClick={onSelectDates}
          className={`flex h-full items-center gap-1 rounded-full bg-primary-900 pl-2 pr-3 text-xs font-medium text-white active:opacity-90 ${FOCUS_RING}`}
        >
          <SelectDateIcon className="h-4 w-4" />
          {rentalDates ? 'Edit' : 'Select'}
        </button>
      </div>
    </div>
  )
}

const MobileTabBar = ({ onSearchOpen, onCartOpen }) => {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-neutral-300/40 bg-white py-2 lg:hidden">
      {MOBILE_TABS.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => {
              if (key === 'search') onSearchOpen()
              else if (key === 'cart') onCartOpen()
              else setActiveTab(key)
            }}
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

const Navbar = ({
  isHidden = false,
  rentalDates,
  onSelectDates,
  cartCount = 0,
  onCartOpen: openCart,
}) => {
  const [city, setCity] = useState('Bangalore')
  const [isCityModalOpen, setIsCityModalOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const openProfile = () => setIsProfileOpen(true)
  const openCityModal = () => setIsCityModalOpen(true)
  const openSearch = () => setIsSearchOpen(true)

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-header pb-3 transition-all duration-500 focus-within:translate-y-0 focus-within:opacity-100 md:pb-4 ${
          isHidden ? '-translate-y-full opacity-0' : 'opacity-100'
        }`}
      >
        <DesktopNav
          city={city}
          onCityOpen={openCityModal}
          onSearchOpen={openSearch}
          onCartOpen={openCart}
          cartCount={cartCount}
          onProfileOpen={openProfile}
          rentalDates={rentalDates}
          onSelectDates={onSelectDates}
        />
        <MobileNav
          city={city}
          onCityOpen={openCityModal}
          onProfileOpen={openProfile}
          rentalDates={rentalDates}
          onSelectDates={onSelectDates}
        />
      </header>

      {isCityModalOpen && (
        <CityModal
          city={city}
          onClose={() => setIsCityModalOpen(false)}
          onSelect={(name) => {
            setCity(name)
            setIsCityModalOpen(false)
          }}
        />
      )}

      <MobileTabBar onSearchOpen={openSearch} onCartOpen={openCart} />

      {isSearchOpen && <SearchDrawer onClose={() => setIsSearchOpen(false)} />}
      {isProfileOpen && (
        <ProfileDrawer onClose={() => setIsProfileOpen(false)} />
      )}
    </>
  )
}

export default Navbar
