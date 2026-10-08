import assetPartnerDesktop from '../assets/images/banner-asset-partner-desktop.webp'
import assetPartnerMobile from '../assets/images/banner-asset-partner-mobile.webp'
import earnWithUsDesktop from '../assets/images/banner-earn-with-us-desktop.webp'
import earnWithUsMobile from '../assets/images/banner-earn-with-us-mobile.webp'

// Keyed by how many product cards come before the banner in the grid.
export const PROMO_BANNERS = {
  4: {
    href: 'https://assets.sharepal.in/',
    desktopImage: assetPartnerDesktop,
    mobileImage: assetPartnerMobile,
    // md:mb-9 matches the extra gap the reference leaves before the next row
    className: 'md:my-5 md:mb-9',
  },
  8: {
    href: 'https://earnwithus.sharepal.in/',
    desktopImage: earnWithUsDesktop,
    mobileImage: earnWithUsMobile,
    className: 'py-2 md:py-4 lg:py-6',
  },
}
