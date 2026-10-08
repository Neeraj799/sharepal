const BADGE_STYLES = {
  New: 'border-decorative-blue text-decorative-blue',
  Trending: 'border-decorative-orange text-decorative-orange',
  'Vote to Launch': 'border-secondary-400 bg-secondary-100 text-secondary-850',
}

// Other tags ("DSLR", "Save 10%", ...) get the reference's plain grey outline
const DEFAULT_BADGE_STYLE = 'border-neutral-200 text-foreground'

const ProductBadge = ({ tag, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-1.5 text-[10px] font-semibold md:border-2 md:px-2.5 md:py-0.5 md:text-xs md:leading-4 ${
        BADGE_STYLES[tag] ?? DEFAULT_BADGE_STYLE
      } ${className}`}
    >
      {tag}
    </span>
  )
}

export default ProductBadge
