import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Collapse from './Collapse'
import { categoryGroups } from '../data/footer'

// The desktop grid shows only the first few links of each group; the mobile accordion shows all.
const DESKTOP_LINK_LIMIT = 6

const FooterCategories = () => {
  // Mobile accordion: one group open at a time
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <nav aria-label="Rental categories">
      <div className="hidden gap-10 md:grid md:grid-cols-4 lg:grid-cols-5">
        {categoryGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-4">
            <h3 className="line-clamp-2 text-lg font-semibold text-white">
              {group.title}
            </h3>
            {group.links.slice(0, DESKTOP_LINK_LIMIT).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium leading-[18px] text-neutral-300 transition-all duration-75 hover:text-neutral-200 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {categoryGroups.map((group, index) => {
          const isOpen = openIndex === index
          return (
            <div key={group.title}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`footer-category-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between rounded-lg bg-primary-800 p-3 text-left text-xs font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  {group.title}
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </h3>
              <Collapse isOpen={isOpen} id={`footer-category-${index}`}>
                <div className="flex flex-col gap-3 rounded-b-lg bg-primary-900/50 p-2">
                  {group.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-xs text-neutral-300"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </Collapse>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default FooterCategories
