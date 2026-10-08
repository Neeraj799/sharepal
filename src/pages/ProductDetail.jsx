import { useRef, useState } from 'react'
import {
  BadgePercent,
  ChevronLeft,
  ChevronRight,
  Headset,
  Play,
  ShieldCheck,
} from 'lucide-react'
import ProductGallery from '../components/ProductGallery'
import ProductSummary from '../components/ProductSummary'
import ProductCard from '../components/ProductCard'
import FaqSection from '../components/FaqSection'
import Breadcrumb from '../components/Breadcrumb'
import { superCategories } from '../data/superCategories'
import {
  HOW_TO_RENT_VIDEO,
  PROMISE_IMAGE,
  peacePoints,
  rentingBenefits,
} from '../data/productDetail'

const HEADING_STYLE =
  'py-2 text-xl font-bold leading-7 text-neutral-900 md:text-2xl md:leading-8'
const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
const CAROUSEL_ARROW_STYLE = `hidden h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 lg:flex ${FOCUS_RING}`

// One icon per entry of peacePoints
const PEACE_ICONS = [ShieldCheck, BadgePercent, Headset]
const SIMILAR_COUNT = 8

// The thumbnail swaps for the YouTube player once play is pressed, as on the reference
const HowToRentVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${HOW_TO_RENT_VIDEO.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title="SharePal Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <>
          <img
            src={HOW_TO_RENT_VIDEO.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -m-4 animate-ping rounded-full bg-primary-400/40 motion-reduce:hidden" />
              <div className="pointer-events-none absolute inset-0 -m-6 animate-ping rounded-full bg-primary-500/30 motion-reduce:hidden" />
              <button
                type="button"
                aria-label="Play the how to rent video"
                onClick={() => setIsPlaying(true)}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-400 md:h-16 md:w-16 ${FOCUS_RING}`}
              >
                <Play aria-hidden="true" className="size-4 fill-current md:size-6" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const ProductDetail = ({
  product,
  superCategory,
  rentalDays,
  onSelectDates,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCategory,
}) => {
  const { title, categories, products } = superCategories[superCategory]
  const category = categories.find(
    ({ id }) => id !== 'all' && product.categories.includes(id),
  )
  const similarProducts = products
    .filter(
      (other) =>
        other.id !== product.id &&
        (!category || other.categories.includes(category.id)),
    )
    .slice(0, SIMILAR_COUNT)

  const carouselRef = useRef(null)
  const scrollCarousel = (direction) =>
    carouselRef.current.scrollBy({
      left: direction * carouselRef.current.clientWidth,
      behavior: 'smooth',
    })

  const trail = [{ label: title, onClick: () => onOpenCategory(superCategory) }]
  if (category) {
    trail.push({
      label: category.label,
      onClick: () => onOpenCategory(superCategory, category.id),
    })
  }

  return (
    <main className="pt-3 md:pt-6">
      {/* Below xl everything stacks in source order; from xl the summary sticks beside the rest */}
      <div className="mx-auto grid max-w-[1216px] grid-cols-[minmax(0,1fr)] items-start gap-3 px-4 md:gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ProductGallery images={product.images} name={product.name} />

        <aside className="xl:sticky xl:top-24 xl:col-start-2 xl:row-span-2 xl:row-start-1">
          <ProductSummary
            product={product}
            rentalDays={rentalDays}
            onSelectDates={onSelectDates}
            quantity={cart[product.id]?.qty ?? 0}
            onAdd={() => onAddToCart(product)}
            onRemove={() => onRemoveFromCart(product.id)}
          />
        </aside>

        <div className="flex min-w-0 flex-col gap-3 md:gap-6">
          {product.inclusions?.length > 0 && (
            <section className="rounded-2xl bg-white px-3 py-4 md:rounded-3xl md:p-6">
              <h2 className={HEADING_STYLE}>Free Inclusions</h2>
              <ul className="flex w-full items-start gap-4 overflow-x-auto py-2">
                {product.inclusions.map(({ name, image }) => (
                  <li
                    key={name}
                    className="flex w-20 shrink-0 flex-col items-center gap-2 md:w-28"
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="aspect-square w-full rounded-xl object-contain p-1 md:p-3"
                    />
                    <p className="line-clamp-1 w-full text-center text-xs font-semibold leading-4 text-neutral-900">
                      {name}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-col gap-6 rounded-2xl bg-white md:gap-8 md:rounded-3xl md:pt-6">
            <section className="w-full md:px-6">
              <div className="overflow-hidden rounded-2xl bg-primary-850">
                <div className="flex flex-col items-start gap-3 px-5 py-3 md:flex-row md:items-center md:gap-7 md:bg-primary-800 md:px-7">
                  <img src={PROMISE_IMAGE} alt="SharePal Promise" className="w-40 md:w-80" />
                  <h2 className="text-xl font-bold leading-7 text-primary-100 md:text-2xl md:leading-8">
                    Rent with peace
                  </h2>
                </div>
                <ul className="flex gap-5 text-pretty px-4 pb-3 max-lg:flex-col md:px-5 md:pb-4 md:pt-5">
                  {peacePoints.map(({ title: pointTitle, text }, index) => {
                    const Icon = PEACE_ICONS[index]
                    return (
                      <li
                        key={pointTitle}
                        className="flex basis-1/3 items-start gap-3 lg:flex-col"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-secondary-500"
                        />
                        <div className="flex flex-col gap-1 lg:gap-2">
                          <h3 className="text-sm font-bold leading-[18px] text-white md:text-lg md:leading-6">
                            {pointTitle}
                          </h3>
                          <p className="text-xs leading-4 text-primary-250 lg:text-sm lg:leading-[18px]">
                            {text}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>

            <section className="flex flex-col gap-2 px-3 md:px-6">
              <h2 className={HEADING_STYLE}>How to Rent on SharePal?</h2>
              <HowToRentVideo />
            </section>

            <section className="flex flex-col gap-2 px-3 md:px-6">
              <h2 className={HEADING_STYLE}>Key Benefits of Renting?</h2>
              <ul className="flex w-full gap-2 overflow-x-auto py-2 [scrollbar-width:none] md:gap-4">
                {rentingBenefits.map(({ title: benefitTitle, text, icon }) => (
                  <li
                    key={benefitTitle}
                    className="flex-[1_0_180px] rounded-xl bg-neutral-150 px-3 pb-6 pt-4 text-center text-primary-850"
                  >
                    <img
                      src={icon}
                      alt=""
                      loading="lazy"
                      className="mx-auto mb-3 w-20 object-contain md:mb-4"
                    />
                    <h3 className="py-1 text-sm font-bold leading-[18px]">{benefitTitle}</h3>
                    <p className="text-xs font-medium leading-4">{text}</p>
                  </li>
                ))}
              </ul>
            </section>

            <FaqSection className="" />
          </div>
        </div>
      </div>

      <div className="py-5 md:py-10">
        <Breadcrumb trail={trail} current={product.name} />
      </div>

      {similarProducts.length > 0 && (
        <section className="mx-auto w-full max-w-[1216px] px-4 pb-7 md:pb-14">
          <div className="mb-5 flex items-center justify-between gap-3 md:mb-10">
            <h2 className="font-display text-2xl font-bold leading-7 tracking-tight md:text-[40px] md:leading-[48px]">
              <span className="text-decorative-pink">Similar products</span> people viewed
            </h2>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous products"
                onClick={() => scrollCarousel(-1)}
                className={CAROUSEL_ARROW_STYLE}
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next products"
                onClick={() => scrollCarousel(1)}
                className={CAROUSEL_ARROW_STYLE}
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
          <ul
            ref={carouselRef}
            className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] md:gap-4"
          >
            {similarProducts.map((similar) => (
              <li key={similar.id} className="w-56 shrink-0 snap-start md:w-64">
                <ProductCard
                  product={similar}
                  rentalDays={rentalDays}
                  onSelectDates={onSelectDates}
                  quantity={cart[similar.id]?.qty ?? 0}
                  onAdd={() => onAddToCart(similar)}
                  onRemove={() => onRemoveFromCart(similar.id)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default ProductDetail
