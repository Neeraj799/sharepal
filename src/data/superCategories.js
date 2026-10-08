import photographyLeft from '../assets/images/photography-left.webp'
import photographyRight from '../assets/images/photography-right.webp'
import gamingLeft from '../assets/images/gaming-left.webp'
import gamingRight from '../assets/images/gaming-right.webp'
import outdoorLeft from '../assets/images/outdoor-left.webp'
import outdoorRight from '../assets/images/outdoor-right.webp'
import entertainmentLeft from '../assets/images/entertainment-left.webp'
import entertainmentRight from '../assets/images/entertainment-right.webp'
import nikonLogo from '../assets/images/brand-nikon.svg'
import canonLogo from '../assets/images/brand-canon.svg'
import goproLogo from '../assets/images/brand-gopro.svg'
import insta360Logo from '../assets/images/brand-insta360.svg'
import djiLogo from '../assets/images/brand-dji.svg'
import sonyLogo from '../assets/images/brand-sony.svg'
import xboxLogo from '../assets/images/brand-xbox.svg'
import ps5Logo from '../assets/images/brand-ps5.svg'
import metaLogo from '../assets/images/brand-meta.svg'
import rynoxLogo from '../assets/images/brand-rynox.svg'
import axorLogo from '../assets/images/brand-axor.svg'
import bikingBrotherhoodLogo from '../assets/images/brand-biking-brotherhood.svg'
import decathlonLogo from '../assets/images/brand-decathlon.svg'
import marshallLogo from '../assets/images/brand-marshall.svg'
// Entertainment's Meta and Sony logos are drawn at a different size from the other pages'
import metaEntertainmentLogo from '../assets/images/brand-meta-entertainment.svg'
import sonyEntertainmentLogo from '../assets/images/brand-sony-entertainment.svg'
import rodeLogo from '../assets/images/brand-rode.svg'
import jblLogo from '../assets/images/brand-jbl.svg'
import ahujaLogo from '../assets/images/brand-ahuja.svg'
import epsonLogo from '../assets/images/brand-epson.svg'
import { products as photographyProducts } from './photography-product-list.json'
import { products as gamingProducts } from './gaming-product-list.json'
import { products as outdoorProducts } from './outdoor-product-list.json'
import { products as entertainmentProducts } from './entertainment-product-list.json'
import { sidebarCategories } from './sidebarCategories'

// Each product's `path` is its detail page URL, e.g. /bangalore/gaming-console/ps5-console/...
export const findProductPage = (path) => {
  for (const [superCategory, { products }] of Object.entries(superCategories)) {
    const product = products.find((item) => item.path === path)
    if (product) return { product, superCategory }
  }
  return null
}

// Everything that differs between the tab pages; the layout is shared.
// Each theme's colours are set in index.css under [data-theme].
export const superCategories = {
  Photography: {
    theme: 'photography',
    title: 'Photography on rent',
    categories: sidebarCategories.Photography,
    products: photographyProducts,
    hero: {
      title: 'Cameras',
      // The SharePal logo sits between the two halves of the tagline
      taglineStart: 'Rent cameras & accessories from',
      taglineEnd: 'DSLR, Mirrorless, GoPro, Insta360, DJI on rent.',
      leftImage: photographyLeft,
      rightImage: photographyRight,
      brands: [
        { name: 'Nikon', logo: nikonLogo },
        { name: 'Canon', logo: canonLogo },
        { name: 'GoPro', logo: goproLogo },
        { name: 'Insta360', logo: insta360Logo },
        { name: 'DJI', logo: djiLogo },
        { name: 'Sony', logo: sonyLogo },
      ],
    },
  },
  Gaming: {
    theme: 'gaming',
    title: 'Gaming gadgets on rent',
    categories: sidebarCategories.Gaming,
    products: gamingProducts,
    hero: {
      title: 'Gaming Consoles',
      taglineStart: 'Rent the latest gaming gadgets from',
      taglineEnd: 'PS5, Xbox, Oculus VR, Racing Wheel on rent.',
      leftImage: gamingLeft,
      rightImage: gamingRight,
      brands: [
        { name: 'Xbox', logo: xboxLogo },
        { name: 'PS5', logo: ps5Logo },
        { name: 'Meta', logo: metaLogo },
      ],
    },
  },
  Outdoor: {
    theme: 'outdoor',
    title: 'Outdoor gears on rent',
    categories: sidebarCategories.Outdoor,
    products: outdoorProducts,
    hero: {
      title: 'Outdoor Gear',
      taglineStart: 'Rent Trekking, riding, & camping gear From',
      taglineEnd: 'Jackets, shoes, Boots, Backpacks, tents on rent',
      leftImage: outdoorLeft,
      rightImage: outdoorRight,
      brands: [
        { name: 'Rynox', logo: rynoxLogo },
        { name: 'Axor', logo: axorLogo },
        { name: 'Biking Brotherhood Gears', logo: bikingBrotherhoodLogo },
        { name: 'Decathlon', logo: decathlonLogo },
      ],
    },
  },
  Entertainment: {
    theme: 'entertainment',
    title: 'Entertainment on rent',
    categories: sidebarCategories.Entertainment,
    products: entertainmentProducts,
    hero: {
      title: 'Entertainment Gear',
      taglineStart: 'Rent Audio Visual equipments from',
      taglineEnd: 'Speakers, projectors, microphones on rent.',
      leftImage: entertainmentLeft,
      rightImage: entertainmentRight,
      brands: [
        { name: 'Marshall', logo: marshallLogo },
        { name: 'Meta', logo: metaEntertainmentLogo },
        { name: 'Rode', logo: rodeLogo },
        { name: 'Sony', logo: sonyEntertainmentLogo },
        { name: 'JBL', logo: jblLogo },
        { name: 'Ahuja', logo: ahujaLogo },
        { name: 'Epson', logo: epsonLogo },
      ],
    },
  },
}
