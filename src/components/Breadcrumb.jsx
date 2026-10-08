import { ChevronRight } from 'lucide-react'

const SEPARATOR = (
  <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
)
const LINK_STYLE = 'text-neutral-500 transition-colors hover:text-neutral-700'

// trail: [{ label, onClick }] steps shown between the city and the current page
const Breadcrumb = ({ trail = [], current }) => {
  return (
    <nav
      aria-label="breadcrumb"
      className="mx-auto w-full max-w-[1216px] px-4 py-3 md:py-6"
    >
      <ol className="flex items-center gap-1.5 text-xs font-semibold leading-4 sm:gap-2.5 md:text-sm md:leading-[18px]">
        <li className="flex items-center gap-1.5">
          <a href="https://sharepal.in/bangalore" className={LINK_STYLE}>
            Bangalore
          </a>
          {SEPARATOR}
        </li>
        {trail.map(({ label, onClick }) => (
          <li key={label} className="flex shrink-0 items-center gap-1.5">
            <button type="button" onClick={onClick} className={LINK_STYLE}>
              {label}
            </button>
            {SEPARATOR}
          </li>
        ))}
        <li aria-current="page" className="truncate text-neutral-900">
          {current}
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb
