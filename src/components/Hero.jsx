import logo from '../assets/images/sharepal-logo.svg'

const Hero = ({ title, taglineStart, taglineEnd, leftImage, rightImage, brands }) => {
  return (
    <section className="relative flex min-h-[150px] w-full items-center justify-center overflow-hidden rounded-xl bg-hero max-md:shadow-lg md:min-h-[228px]">
      <img
        src={leftImage}
        alt=""
        className="absolute -bottom-12 left-0 hidden w-44 md:block xl:w-[250px]"
      />
      <img
        src={rightImage}
        alt=""
        className="absolute -bottom-11 right-0 w-48 sm:-bottom-10 sm:w-60 md:-bottom-12 md:w-44 xl:w-[250px]"
      />

      {/* mobile: the right padding keeps the text and logos clear of the right image */}
      <div className="relative z-10 flex w-full flex-col items-start gap-1.5 px-4 text-white max-md:pr-[45%] md:items-center md:gap-3 md:text-center">
        <h1 className="font-display text-xl font-bold leading-tight tracking-[0.025em] drop-shadow-lg md:text-[40px] md:leading-[48px] md:tracking-[-0.4px]">
          {title}
        </h1>

        {/* shrink-to-fit wrapper: the h2's 75% resolves against the text's own width */}
        <div className="flex flex-col items-start md:items-center">
          <h2 className="text-[10px] font-bold leading-[14px] drop-shadow-md sm:text-sm sm:font-medium sm:leading-[18px] md:w-3/4 md:max-w-[70%] lg:text-lg lg:leading-6 xl:font-bold">
            {taglineStart}{' '}
            <span className="mx-1 inline-flex h-[27px] w-14 items-center justify-center align-middle md:w-20">
              <img
                src={logo}
                alt="SharePal"
                className="w-full brightness-0 invert"
              />
            </span>{' '}
            {taglineEnd}
          </h2>
        </div>

        {/* wraps to a second centred row when a page has more logos than fit */}
        <ul className="flex flex-wrap items-center gap-y-1 md:mt-3 md:justify-center md:max-w-lg md:gap-2">
          {brands.map(({ name, logo: brandLogo }) => (
            <li key={name} className="group flex items-center md:gap-2">
              <span className="h-4 w-0.5 rounded-full bg-category-accent opacity-50 group-first:hidden md:h-6 md:w-[3px] md:opacity-70" />
              <img src={brandLogo} alt={name} className="w-12 md:w-24" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero
