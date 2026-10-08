import { useEffect, useRef, useState } from 'react'
import { SUPER_CATEGORIES } from '../constants/navigation'
import { sidebarCategories } from '../data/sidebarCategories'

// A tab's dropdown lists its sidebar categories, minus "All"
const menuItems = (category) => sidebarCategories[category].slice(1)

const MENU_ROWS = 4
const MENU_COLUMN_WIDTH = 240
const MENU_MARGIN = 20

// onSelect(superCategory, categoryId?) opens a tab's page, optionally on one sidebar category
const CategoryTabs = ({ active, onSelect }) => {
  const navRef = useRef(null)
  const listRef = useRef(null)
  // The open dropdown: { category, left, width }, or null when closed
  const [menu, setMenu] = useState(null)

  // The reference opens with the row scrolled to its end (browsers clamp the value)
  useEffect(() => {
    listRef.current.scrollLeft = listRef.current.scrollWidth
  }, [])

  // One 240px column per four items, centred under the tab and kept inside the viewport
  const openMenu = (category, tab) => {
    const viewportWidth = document.documentElement.clientWidth
    const columns = Math.ceil(menuItems(category).length / MENU_ROWS)
    const width = Math.min(columns * MENU_COLUMN_WIDTH, viewportWidth - MENU_MARGIN * 2)
    const tabRect = tab.getBoundingClientRect()
    const left = Math.min(
      Math.max(tabRect.left + tabRect.width / 2 - width / 2, MENU_MARGIN),
      viewportWidth - width - MENU_MARGIN,
    )
    setMenu({ category, width, left: left - navRef.current.getBoundingClientRect().left })
  }

  const handleTabClick = (event, category) => {
    event.preventDefault()
    onSelect(category)
    setMenu(null)
  }

  // A dropdown item opens its tab's page on that sidebar category
  const handleItemClick = (event, id) => {
    event.preventDefault()
    onSelect(menu.category, id)
    setMenu(null)
  }

  return (
    <nav
      ref={navRef}
      aria-label="Categories"
      className="relative mx-auto w-full max-w-3xl px-8 py-1"
      onMouseLeave={() => setMenu(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenu(null)
      }}
    >
      <ul
        ref={listRef}
        className="flex gap-2.5 overflow-x-auto [scrollbar-width:none]"
      >
        {SUPER_CATEGORIES.map((category) => {
          const isActive = category === active
          return (
            <li
              key={category}
              onMouseEnter={(event) => openMenu(category, event.currentTarget)}
              onFocus={(event) => openMenu(category, event.currentTarget)}
              className="flex shrink-0 basis-2/5 justify-center p-2 text-center sm:basis-1/2 md:basis-1/3 md:px-4 lg:basis-1/4"
            >
              <a
                href="#"
                onClick={(event) => handleTabClick(event, category)}
                aria-current={isActive ? 'page' : undefined}
                aria-haspopup="true"
                aria-expanded={menu?.category === category}
                className="relative inline-block w-full max-w-44 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
              >
                <span
                  className={`inline-block text-sm leading-[18px] text-neutral-200 transition-colors duration-200 hover:text-white md:text-neutral-700 md:hover:text-neutral-900 ${
                    isActive ? 'font-bold' : 'font-semibold'
                  }`}
                >
                  {category}
                  {isActive && (
                    <span className="absolute left-1/2 mt-2 block h-0.5 w-full -translate-x-1/2 rounded-full bg-category-accent md:w-10/12" />
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* Sits outside the list because the list's overflow would clip it */}
      {menu && (
        <ul
          key={menu.category}
          style={{ left: menu.left, width: menu.width }}
          className="absolute top-full z-20 hidden animate-menu-in auto-cols-fr grid-flow-col grid-rows-[repeat(4,auto)] gap-x-6 gap-y-4 rounded-3xl bg-white p-6 shadow-[0_0_14px_rgba(0,0,0,0.12),0_0_16px_1px_rgba(0,0,0,0.16)] md:grid"
        >
          {menuItems(menu.category).map(({ id, label }) => (
            <li key={id} className="min-w-0">
              <a
                href="#"
                onClick={(event) => handleItemClick(event, id)}
                className="line-clamp-1 block rounded-lg px-2 py-1 text-sm font-medium leading-[18px] text-neutral-900 transition-colors duration-200 hover:bg-gray-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default CategoryTabs
