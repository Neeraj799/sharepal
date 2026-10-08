import { SelectDateIcon } from './NavIcons'
import { useScrolledPast } from '../hooks/useScrolledPast'

// The reference slides the pill in as soon as the page leaves the top.
const SHOW_OFFSET = 20

// Floating reminder shown until rental dates are chosen; clicking it opens the date picker.
const SelectDatesPrompt = ({ onSelectDates }) => {
  const isVisible = useScrolledPast(SHOW_OFFSET)

  return (
    <div
      className={`fixed inset-x-4 bottom-20 z-40 mx-auto flex max-w-max justify-center transition-all duration-300 ${
        isVisible ? 'visible opacity-100' : 'invisible translate-y-24 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={onSelectDates}
        className="flex items-center justify-center gap-2 rounded-full border-2 border-secondary-500 bg-primary-900 px-[18px] py-3.5 text-sm font-semibold leading-[18px] text-white transition-colors hover:bg-primary-850 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
      >
        <SelectDateIcon className="h-4 w-4" />
        Select rental dates to view prices
      </button>
    </div>
  )
}

export default SelectDatesPrompt
