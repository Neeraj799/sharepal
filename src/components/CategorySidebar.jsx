import { sidebarCategories } from '../data/sidebarCategories'

function CategorySidebar({ activeCategory, onSelect }) {
  return (
    <nav
      aria-label="Gaming categories"
      className="sticky top-[140px] max-h-[calc(100dvh-10rem)] overflow-y-auto rounded-lg bg-white p-1 shadow-[0_2px_15px_rgba(0,0,0,0.06)] [scrollbar-width:none] max-md:py-3 md:rounded-xl md:p-3"
    >
      <ul className="flex flex-col gap-2 md:gap-3 lg:gap-4">
        {sidebarCategories.map(({ id, label, image }) => {
          const isActive = id === activeCategory
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={isActive ? 'true' : undefined}
                className="group flex w-full flex-col items-center gap-0.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:gap-1"
              >
                <span
                  className={`flex aspect-square w-12 items-center justify-center overflow-hidden rounded-lg p-1 transition-all duration-300 md:w-14 md:rounded-xl md:p-1.5 lg:w-16 ${
                    isActive
                      ? 'border-2 border-primary-500 bg-white'
                      : 'border border-neutral-200 bg-neutral-100 group-hover:bg-neutral-150'
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className={`h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'scale-105' : ''
                    }`}
                  />
                </span>
                <span
                  className={`line-clamp-2 max-w-[50px] text-center text-[10px] font-semibold leading-tight md:max-w-[60px] md:text-xs md:font-bold lg:max-w-20 lg:text-sm lg:font-semibold lg:leading-[18px] ${
                    isActive ? 'text-primary-500' : 'text-neutral-900'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="mx-auto mt-0.5 block h-0.5 w-4 rounded-full bg-primary-500 md:w-6 lg:w-8" />
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategorySidebar
