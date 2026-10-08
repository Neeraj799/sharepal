import { useState } from 'react'
import { ChevronDownIcon } from './NavIcons'
import { seoContent } from '../data/footer'

const STRONG = 'text-sm font-bold leading-[18px] text-gray-150'
const LINK = `${STRONG} underline decoration-primary-100`
const PARAGRAPH = 'mt-1 font-light'

// A heading whose text is a link when an href is given
const SeoHeading = ({ as: Tag, href, children }) => {
  return (
    <Tag className={Tag === 'h2' ? 'my-1 text-lg font-medium' : 'my-2 text-base font-medium'}>
      {href ? (
        <a href={href} className={LINK}>
          {children}
        </a>
      ) : (
        <span className={STRONG}>{children}</span>
      )}
    </Tag>
  )
}

const SeoPointList = ({ points }) => {
  return (
    <ul>
      {points.map((point) => (
        <li key={point.label} className="mt-1">
          <strong className={STRONG}>{point.label}</strong>: {point.text}
        </li>
      ))}
    </ul>
  )
}

const FooterSeoContent = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { intro, categories, rentingVsBuying, whySharePal, reviewLinks } = seoContent

  return (
    <div className="flex flex-col gap-2">
      <div
        id="footer-seo-content"
        className={`flex flex-col gap-6 overflow-hidden text-pretty text-sm text-neutral-300 ${isExpanded ? '' : 'h-[260px]'}`}
      >
        <section>
          <SeoHeading as="h2" href={intro.href}>
            {intro.title}
          </SeoHeading>
          <p className={PARAGRAPH}>{intro.text}</p>
        </section>

        <section>
          <SeoHeading as="h2">Categories on Rent</SeoHeading>
          {categories.map((category) => (
            <div key={category.title}>
              <SeoHeading as="h3" href={category.href}>
                {category.title}
              </SeoHeading>
              <p className={PARAGRAPH}>{category.text}</p>
            </div>
          ))}
        </section>

        <section>
          <SeoHeading as="h2">Renting vs. Buying</SeoHeading>
          <SeoPointList points={rentingVsBuying} />
        </section>

        <section>
          <SeoHeading as="h2" href={whySharePal.href}>
            {whySharePal.title}
          </SeoHeading>
          <p className={PARAGRAPH}>{whySharePal.text}</p>
          <SeoPointList points={whySharePal.points} />
        </section>

        <section>
          <SeoHeading as="h2">
            Read Our Reviews of Customers in SharePal Bangalore
          </SeoHeading>
          {reviewLinks.map((link) => (
            <p key={link.href} className={PARAGRAPH}>
              <a href={link.href} target="_blank" rel="noreferrer" className={LINK}>
                {link.label}
              </a>
            </p>
          ))}
        </section>
      </div>

      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="footer-seo-content"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-xs font-semibold text-neutral-200 transition-colors hover:text-neutral-100 focus:outline-none focus-visible:underline"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
        <ChevronDownIcon className={`size-4 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

export default FooterSeoContent
