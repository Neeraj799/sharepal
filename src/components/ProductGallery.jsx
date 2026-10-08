import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ARROW_STYLE =
  'absolute top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus-visible:flex focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 group-hover:flex md:h-10 md:w-10'

const ProductGallery = ({ images, name }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="group flex min-h-[250px] w-full flex-col items-center gap-4 rounded-2xl bg-white p-3 md:min-h-[400px] md:flex-row md:gap-6 md:rounded-3xl md:p-6">
      <div className="relative w-full pb-4 md:order-2 md:flex-1">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
          <img
            src={images[activeIndex]}
            alt={`${name} image ${activeIndex + 1}`}
            className="h-full w-full scale-95 rounded-md object-contain"
          />
        </div>

        <button
          type="button"
          aria-label="Previous image"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex(activeIndex - 1)}
          className={`left-0 ${ARROW_STYLE}`}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          disabled={activeIndex === images.length - 1}
          onClick={() => setActiveIndex(activeIndex + 1)}
          className={`right-0 ${ARROW_STYLE}`}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>

        <p
          aria-live="polite"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-primary-900 md:text-sm"
        >
          {activeIndex + 1} of {images.length} Images
        </p>
      </div>

      {/* A row under the image on mobile, a rail beside it from md up */}
      <ul className="flex w-full gap-2 overflow-auto rounded-lg bg-neutral-150 p-2 [scrollbar-width:none] md:order-1 md:max-h-[470px] md:w-24 md:shrink-0 md:flex-col">
        {images.map((image, index) => (
          <li key={image} className="w-1/6 shrink-0 md:w-full">
            <button
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`flex aspect-square w-full items-center justify-center rounded-lg border bg-white p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:p-2 ${
                index === activeIndex ? 'border-primary-500' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="h-full w-full rounded-md object-contain"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductGallery
