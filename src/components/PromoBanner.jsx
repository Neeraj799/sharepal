const PromoBanner = ({ href, desktopImage, mobileImage, className = '' }) => {
  return (
    <div className="col-span-full">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:rounded-2xl ${className}`}
      >
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopImage} />
          <img
            src={mobileImage}
            alt="Become an asset partner and earn with SharePal"
            loading="lazy"
            className="w-full rounded-lg object-cover md:rounded-2xl"
          />
        </picture>
      </a>
    </div>
  )
}

export default PromoBanner
