const CATEGORIES = ['Photography', 'Gaming', 'Outdoor', 'Entertainment']
const ACTIVE_CATEGORY = 'Gaming'

function CategoryTabs() {
  return (
    <nav aria-label="Categories" className="mx-auto w-full max-w-3xl px-8 py-1">
      <ul className="flex overflow-x-auto [scrollbar-width:none]">
        {CATEGORIES.map((category) => {
          const isActive = category === ACTIVE_CATEGORY
          return (
            <li
              key={category}
              className="flex shrink-0 basis-2/5 justify-center p-2 text-center sm:basis-1/2 md:basis-1/3 md:px-4 lg:basis-1/4"
            >
              <a
                href="#"
                aria-current={isActive ? 'page' : undefined}
                className={`relative inline-block w-full max-w-44 px-3 text-sm leading-6 text-neutral-200 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 md:text-neutral-700 md:hover:text-neutral-900 ${
                  isActive ? 'font-bold' : 'font-semibold'
                }`}
              >
                {category}
                {isActive && (
                  <span className="absolute left-1/2 top-full mt-1.5 h-0.5 w-full -translate-x-1/2 rounded-full bg-category-purple md:w-10/12" />
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategoryTabs
