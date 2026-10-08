// Footer links point at the live SharePal site, since this project has a single page.
const SITE = 'https://sharepal.in'
const CITY = `${SITE}/bangalore`

const PHOTOGRAPHY = `${CITY}/photography-on-rent`
const OUTDOOR = `${CITY}/outdoor-gears-on-rent`
const GAMING = `${CITY}/gaming-gadgets-on-rent`
const ENTERTAINMENT = `${CITY}/entertainment-on-rent`

// Each link is [label, slug]; links without their own page fall back to the parent category.
function categoryGroup(title, parent, links) {
  return {
    title,
    links: links.map(([label, slug]) => ({
      label,
      href: slug ? `${parent}/${slug}` : parent,
    })),
  }
}

export const categoryGroups = [
  categoryGroup('Action Cameras', PHOTOGRAPHY, [
    ['Action Cameras', 'action-cameras-on-rent'],
    ['Pocket Cameras', 'pocket-cameras-on-rent'],
    ['GoPro Cameras', 'gopro-cameras-on-rent'],
    ['DJI Cameras', 'dji-cameras-on-rent'],
    ['DJI Drones', 'dji-drones-on-rent'],
    ['360 Cameras', '360-cameras-on-rent'],
    ['Insta360 Cameras'],
    ['Action Camera Add ons'],
    ['Action Camera Mounts'],
  ]),
  categoryGroup('Cameras', PHOTOGRAPHY, [
    ['DSLR Cameras', 'dslr-cameras-on-rent'],
    ['Cameras', 'all-cameras-on-rent'],
    ['iPhones', 'iphones-on-rent'],
    ['DSLR Gimbal Combos', 'dslr-gimbal-on-rent'],
    ['Wildlife Photography', 'wildlife-photography-cameras-on-rent'],
    ['Tripod and camera accessories', 'tripod-and-camera-accessories-on-rent'],
    ['DSLR Lens'],
  ]),
  categoryGroup('Trekking Gear', OUTDOOR, [
    ['Trekking Gear', 'trekking-gear-on-rent'],
    ['Trekking Jackets', 'trekking-jackets-on-rent'],
    ['Trek/Snow Pants', 'trek-snow-pants-on-rent'],
    ['Trekking Shoes', 'trekking-shoes-on-rent'],
    ['Trek Accessories', 'trek-accessories-on-rent'],
  ]),
  categoryGroup('Riding Gear', OUTDOOR, [
    ['Riding Gear', 'riding-gear-on-rent'],
    ['Riding Luggage', 'riding-luggage-on-rent'],
    ['Riding Jackets', 'riding-jackets-on-rent'],
    ['Riding Essentials', 'riding-essentials-on-rent'],
    ['Riding Boots', 'riding-boots-on-rent'],
    ['Binoculars', 'binoculars-on-rent'],
  ]),
  categoryGroup('Creator Gear', PHOTOGRAPHY, [
    ['Wireless & Collar Mics', 'wireless-and-collar-mics-on-rent'],
    ['Professional Cameras', 'professional-cameras-on-rent'],
    ['Mirrorless Cameras', 'mirrorless-cameras-on-rent'],
    ['UNLMTD Vlogging', 'unlmtd-vlogging-on-rent'],
    ['Mobile Gimbals', 'mobile-gimbals-on-rent'],
    ['Vlogging', 'vlogging-cameras-on-rent'],
  ]),
  categoryGroup('Gaming Console', GAMING, [
    ['PS5 Console', 'ps5-console-on-rent'],
    ['VR', 'vr-on-rent'],
    ['Racing Wheel', 'gaming-controllers-on-rent'],
    ['Big Screen Gaming', 'big-screen-gaming'],
    ['Xbox Console', 'xbox-console-on-rent'],
  ]),
  categoryGroup('Winter Wear', OUTDOOR, [
    ['Snow Boots', 'snow-boots-on-rent'],
    ['Winter Jackets', 'winter-jackets-on-rent'],
    ['Backpacks', 'backpacks-on-rent'],
  ]),
  categoryGroup('Camping Gear', OUTDOOR, [
    ['Camping Gear', 'camping-gear-on-rent'],
    ['Camping Stools & Tables', 'camping-stools-and-tables-on-rent'],
    ['Camping Tents', 'camping-tents-on-rent'],
    ['Sleeping Bags & Mats', 'sleeping-bags-and-mats-on-rent'],
  ]),
  categoryGroup('Audio Visual Equipment', ENTERTAINMENT, [
    ['Projectors', 'projectors-on-rent'],
    ['VR', 'vr-on-rent'],
    ['Mics', 'mics-on-rent'],
    ['Speakers', 'speakers-on-rent'],
  ]),
]

export const seoContent = {
  intro: {
    title: 'Renting from SharePal in Bangalore',
    href: `${CITY}/rent`,
    text: "Discover the convenience of renting from SharePal, your trusted partner in Bangalore for all your rental needs. Whether you're exploring the vibrant streets of Koramangala, setting up a shoot in Indiranagar, or planning a trek from the outskirts of Whitefield, SharePal has you covered. We offer a wide range of products, including cameras, action cameras, gaming consoles, projectors, speakers, trekking gear, riding gear, and creator gear. With free home delivery and pickup services, flexible rental tenures, and an easy-to-use platform, renting has never been easier. Experience the freedom to rent what you need, when you need it, without the commitment of buying.",
  },
  categories: [
    {
      title: 'Action Cameras on Rent',
      href: `${CITY}/action-cameras-on-rent`,
      text: "Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI, perfect for everything from extreme sports to casual vlogging. Whether you need high-quality video for your next trek or a 360-degree camera to capture every angle, we've got you covered.",
    },
    {
      title: 'Cameras on Rent',
      href: `${CITY}/cameras-on-rent`,
      text: "From DSLRs to mirrorless cameras, SharePal offers a wide selection of high-quality cameras for rent. Whether you're a professional photographer or an enthusiast, our range of cameras will suit your every need. Capture life's precious moments without the hefty price tag of ownership.",
    },
    {
      title: 'Trekking Gear on Rent',
      href: `${CITY}/trekking-gear-on-rent`,
      text: "Gear up for your next adventure with SharePal's range of trekking equipment. Rent everything you need, from jackets and shoes to backpacks and accessories. Our trekking gear is designed to keep you comfortable and safe on your journey, no matter the terrain.",
    },
    {
      title: 'Riding Gear on Rent',
      href: `${CITY}/riding-gear-on-rent`,
      text: 'Stay safe and stylish on your rides with our collection of riding gear. From helmets to jackets, we offer everything you need to enjoy a thrilling ride. Our riding gear is carefully selected to ensure you have the best experience on the road.',
    },
    {
      title: 'Projectors/Speakers on Rent',
      href: `${CITY}/audio-visual-equipment-on-rent`,
      text: "Make your events memorable with our high-quality projectors and speakers. Whether you're hosting a movie night, a presentation, or a party, our rental options provide top-notch audio and visual equipment to make your event a success.",
    },
    {
      title: 'Creator Gear on Rent',
      href: `${CITY}/creator-gear-on-rent`,
      text: 'For content creators, having access to the right gear is crucial. SharePal offers a wide range of creator gear, including lights, tripods, and microphones. Elevate your content without the burden of buying expensive equipment.',
    },
    {
      title: 'Gaming Consoles on Rent',
      href: `${CITY}/gaming-console-on-rent`,
      text: "Experience the latest gaming consoles without the upfront cost. Rent PS5, Xbox, and more from SharePal. Whether you're a casual gamer or a hardcore enthusiast, our gaming consoles will provide hours of entertainment.",
    },
  ],
  rentingVsBuying: [
    {
      label: 'Cost-Effective',
      text: 'Renting allows you to access high-quality products without the significant investment of buying. Save money by renting only when you need the product.',
    },
    {
      label: 'Flexibility',
      text: "Enjoy the flexibility to rent for as long as you need, whether it's for a day, a week, or a month. No long-term commitments required.",
    },
    {
      label: 'Access to the Latest Gear',
      text: 'Stay up-to-date with the latest technology and trends without the hassle of reselling outdated products.',
    },
    {
      label: 'No Maintenance Worries',
      text: "Forget about maintenance and storage concerns. With renting, you're free from the responsibilities that come with ownership.",
    },
  ],
  whySharePal: {
    title: 'Why SharePal in Bangalore',
    href: `${SITE}/why-sharepal`,
    text: 'SharePal stands out in Bangalore for its customer-focused services and unique selling propositions (USPs):',
    points: [
      { label: 'Zero Deposit', text: 'Rent without the worry of a hefty deposit.' },
      {
        label: 'Free Delivery and Pickup',
        text: "Enjoy the convenience of having your rentals delivered to your doorstep and picked up when you're done.",
      },
      {
        label: 'Wide Range of Products',
        text: 'From cameras to gaming consoles, we offer a diverse selection of high-quality products for rent.',
      },
      {
        label: 'Flexible Rental Tenures',
        text: 'Rent for a day, a week, or even longer with our flexible rental options.',
      },
      {
        label: 'Top-Notch Customer Support',
        text: 'Our dedicated customer support team is always ready to assist you with any questions or concerns.',
      },
    ],
  },
  reviewLinks: [
    {
      label: 'Read Google reviews of SharePal in Bangalore',
      href: 'https://maps.app.goo.gl/GydVypN8UytSTiFU8',
    },
    {
      label: 'Read Trust Pilot reviews of our customers from Bangalore',
      href: 'https://www.trustpilot.com/review/sharepal.in',
    },
  ],
}

export const linkColumns = [
  {
    title: 'Sharepal',
    links: [
      { label: 'About', href: `${SITE}/about-us` },
      { label: 'Why SharePal', href: `${SITE}/why-sharepal` },
      { label: 'Sitemap', href: `${SITE}/sitemap` },
      { label: 'CarePal', href: `${SITE}/carepal` },
    ],
  },
  {
    title: 'Become a Pal',
    links: [
      { label: 'Sharepal for Creators', href: `${SITE}/sharepal-for-creators` },
      { label: 'Careers', href: `${SITE}/life-at-sharepal?active=careers` },
      { label: 'Sharepal for Brands', href: `${SITE}/sharepal-for-brands` },
      { label: 'Asset Funding Program', href: 'https://assets.sharepal.in', isNew: true },
      { label: 'Rent Your Gear', href: 'https://earnwithus.sharepal.in/', isNew: true },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'How it works?', href: `${SITE}/how-sharepal-works` },
      { label: 'FAQs', href: `${SITE}/faq` },
      { label: 'Verification', href: `${SITE}/complete-verification` },
      { label: 'Cancellation Policy', href: `${SITE}/cancellation-policy` },
      { label: 'Life at Sharepal', href: `${SITE}/life-at-sharepal` },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Terms & Condition', href: `${SITE}/terms-and-conditions` },
      { label: 'Shipping policy', href: `${SITE}/shipping-policy` },
      { label: 'Damage Policy', href: `${SITE}/damage-policy` },
      { label: 'Terms of Use', href: `${SITE}/terms-of-use` },
      { label: 'Privacy Policy', href: `${SITE}/privacy-policy` },
    ],
  },
]

export const helpLinks = {
  support: `${SITE}/chatbot`,
  contact: `${SITE}/support`,
  email: 'care@sharepal.in',
}
