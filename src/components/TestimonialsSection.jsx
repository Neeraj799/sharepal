import { impactStats, testimonials } from '../data/testimonials'

const MAX_RATING = 5

const GoogleIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53"
      />
    </svg>
  )
}

const TestimonialCard = ({ testimonial }) => {
  const rating = testimonial.rating ?? MAX_RATING

  return (
    <article className="flex w-[328px] flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-100 p-3 md:rounded-3xl lg:w-[360px] lg:px-0 lg:py-4">
      <div className="flex flex-col gap-3.5 md:px-4">
        <div className="flex gap-2">
          <GoogleIcon />
          <div
            role="img"
            aria-label={`Rated ${rating} out of ${MAX_RATING} on Google`}
            className="flex gap-1"
          >
            {Array.from({ length: rating }, (_, index) => (
              <svg key={index} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fill="#E8AE19"
                  d="M6.354 5.333 10 .604l3.646 4.73 5.708 1.916-3.604 5.104.146 5.688L10 16.396l-5.896 1.646.146-5.709L.667 7.25z"
                />
              </svg>
            ))}
          </div>
        </div>
        <p className="line-clamp-4 text-xs font-bold text-primary-900 lg:text-base">
          “ {testimonial.quote} ”
        </p>
      </div>

      <div className="flex gap-5 md:px-4">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-150 text-xs font-semibold text-primary-600 md:text-base"
        >
          {testimonial.initials}
        </span>
        <div>
          <p className="text-xs font-medium text-gray-600 lg:text-sm">
            {testimonial.name}
          </p>
          <p className="text-[10px] text-gray-400 lg:text-sm">
            {testimonial.city} • {testimonial.category}
          </p>
        </div>
      </div>
    </article>
  )
}

const TestimonialsSection = () => {
  return (
    <section className="flex flex-col gap-5 bg-white py-4 lg:gap-12 lg:py-12">
      <h2 className="px-4 text-center font-display text-2xl font-bold leading-7 tracking-[-0.02em] md:text-5xl md:leading-[56px] md:tracking-[-0.01em]">
        Served more than{' '}
        <span className="text-decorative-orange">1 Lakh Orders</span>
      </h2>

      <div className="group overflow-hidden px-2 py-5 motion-reduce:overflow-x-auto">
        {/* The list is rendered twice and slid left by half its width, so the loop is seamless */}
        <div className="flex w-max animate-marquee gap-4 px-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[false, true].map((isDuplicate) => (
            <div
              key={String(isDuplicate)}
              aria-hidden={isDuplicate}
              className="flex shrink-0 gap-4"
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <dl className="mx-auto grid w-full max-w-[1216px] grid-cols-3 gap-3 border-y-2 border-neutral-150 py-4 md:gap-6 md:py-6">
        {impactStats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-2 text-center">
            <dt className="text-xs capitalize text-gray-800 sm:text-xl">
              {stat.label}
            </dt>
            <dd className="bg-review-gradient bg-clip-text font-display text-2xl font-bold text-transparent md:py-3 lg:text-6xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default TestimonialsSection
