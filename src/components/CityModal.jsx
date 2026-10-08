import { OTHER_CITIES, POPULAR_CITIES } from '../constants/navigation'
import delhi from '../assets/images/city-delhi.svg'
import hyderabad from '../assets/images/city-hyderabad.svg'
import mumbai from '../assets/images/city-mumbai.svg'
import pune from '../assets/images/city-pune.svg'
import chennai from '../assets/images/city-chennai.svg'
import bangalore from '../assets/images/city-bangalore.svg'

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

const CITY_IMAGES = { delhi, hyderabad, mumbai, pune, chennai, bangalore }

const SectionTitle = ({ children }) => {
  return (
    <div className="relative flex justify-center">
      <span className="absolute inset-x-0 top-1/2 h-px bg-neutral-200" />
      <h3 className="relative bg-white px-4 text-sm text-neutral-500">
        {children}
      </h3>
    </div>
  )
}

const CityModal = ({ city, onClose, onSelect }) => {
  return (
    <dialog
      // showModal() gives the focus trap, Esc-to-close and backdrop natively
      ref={(element) => {
        if (element && !element.open) element.showModal()
      }}
      aria-labelledby="city-modal-title"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto animate-modal-in max-h-svh w-[95%] max-w-3xl overflow-auto rounded-3xl border border-neutral-200 bg-white px-5 pb-12 pt-6 text-foreground shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm md:px-[33px]"
    >
      <h2
        id="city-modal-title"
        className="text-center text-2xl font-bold leading-8"
      >
        Select Your City
      </h2>

      <div className="mt-4 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <SectionTitle>Popular Cities</SectionTitle>
          <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
            {POPULAR_CITIES.map((name) => {
              const isSelected = name === city
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelect(name)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-colors ${FOCUS_RING} ${
                    isSelected
                      ? 'border-primary-500 bg-primary-100'
                      : 'border-transparent hover:bg-neutral-150'
                  }`}
                >
                  <img
                    src={CITY_IMAGES[name.toLowerCase()]}
                    alt=""
                    className="h-12 w-12 object-contain"
                  />
                  {name}
                </button>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle>Other Cities</SectionTitle>
          <div className="grid grid-cols-2 gap-x-7 gap-y-7 md:grid-cols-4">
            {OTHER_CITIES.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={name === city}
                onClick={() => onSelect(name)}
                className={`rounded-xl border px-6 py-2 text-xs transition-colors ${FOCUS_RING} ${
                  name === city
                    ? 'border-primary-500 bg-primary-100'
                    : 'border-neutral-200 hover:bg-neutral-150'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </section>
      </div>
    </dialog>
  )
}

export default CityModal
