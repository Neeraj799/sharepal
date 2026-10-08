import logo from '../assets/images/sharepal-logo.svg'
import gamingLeft from '../assets/images/gaming-left.webp'
import gamingRight from '../assets/images/gaming-right.webp'
import xboxLogo from '../assets/images/brand-xbox.svg'
import ps5Logo from '../assets/images/brand-ps5.svg'
import metaLogo from '../assets/images/brand-meta.svg'

const BRANDS = [
  { name: 'Xbox', logo: xboxLogo },
  { name: 'PS5', logo: ps5Logo },
  { name: 'Meta', logo: metaLogo },
]

function Hero() {
  return (
    <section className="relative flex min-h-[150px] w-full items-center justify-center overflow-hidden rounded-xl bg-hero max-md:shadow-lg md:min-h-[228px]">
      <img
        src={gamingLeft}
        alt=""
        className="absolute -bottom-12 left-0 hidden w-44 md:block xl:w-[250px]"
      />
      <img
        src={gamingRight}
        alt=""
        className="absolute -bottom-11 right-0 w-48 sm:-bottom-10 sm:w-60 md:-bottom-12 md:w-44 xl:w-[250px]"
      />

      <div className="relative z-10 flex w-full flex-col items-start gap-1.5 px-4 text-white md:items-center md:gap-3 md:text-center">
        <h1 className="font-display text-xl font-bold leading-tight tracking-[-0.01em] drop-shadow-lg md:text-[40px] md:leading-[48px]">
          Gaming Consoles
        </h1>

        {/* shrink-to-fit wrapper: the h2's 75% resolves against the text's own width */}
        <div className="flex flex-col items-start md:items-center">
          <h2 className="w-3/4 text-[10px] font-bold leading-[14px] drop-shadow-md sm:text-sm md:max-w-[70%] lg:text-base xl:text-lg xl:leading-6">
            Rent the latest gaming gadgets from{' '}
            <img
              src={logo}
              alt="SharePal"
              className="mx-1 inline w-14 align-middle brightness-0 invert md:w-20"
            />{' '}
            PS5, Xbox, Oculus VR, Racing Wheel on rent.
          </h2>
        </div>

        <ul className="flex items-center md:mt-3 md:gap-2">
          {BRANDS.map(({ name, logo: brandLogo }) => (
            <li key={name} className="group flex items-center md:gap-2">
              <span className="h-4 w-0.5 rounded-full bg-category-purple opacity-50 group-first:hidden md:h-6 md:w-[3px] md:opacity-70" />
              <img src={brandLogo} alt={name} className="w-12 md:w-24" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero
