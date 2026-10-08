// Content shared by every product detail page, as on the reference
const CDN = 'https://images.sharepal.in'

export const HOW_TO_RENT_VIDEO = {
  thumbnail: `${CDN}/how-sharepal-works/thumbnail.webp`,
  youtubeId: 'kPXDlORasCc',
}

export const COUPON_STRIP_IMAGE = `${CDN}/misc/hard-coded/sharepal/Offer+Card+(1).webp`
export const PROMISE_IMAGE = `${CDN}/benefits-of-renting/sharepal-promise.svg`
export const ADVANTAGE_LOGO = `${CDN}/misc/hard-coded/sharepal/SharePal+Advantage+Logo+.webp`
export const CAREPAL_LOGO = `${CDN}/carepal/carepal-secure.svg`

export const offers = [
  {
    code: 'SHAREPAL',
    discount: '10% Off',
    description:
      'Use code SHAREPAL & get 10% off on orders above ₹1500. Maximum discount: ₹300',
  },
  {
    code: 'EARLYBIRD15',
    discount: '15% Off',
    description:
      'Use code EARLYBIRD15 & get 15% off up to ₹500. Valid on order above ₹1500, booked 15 days in advance',
  },
  {
    code: 'EARLYBIRD20',
    discount: '20% Off',
    description:
      'Use code EARLYBIRD20 & get 20% off up to ₹500. Valid on order above ₹1500, booked 20 days in advance',
  },
]

export const transparentPrices = [
  'Zero Security Deposit',
  'Zero Delivery Charges Orders Above ₹1200',
  'Zero Hidden Charges',
]

export const damagesCovered = [
  'Accidental damages covered.',
  'Easy Opt-in at Checkout.',
  'Waiver Auto-applied in case of damages.',
]

export const peacePoints = [
  {
    title: '12 Point Quality Check',
    text: 'Before delivery, we conduct a 12-point quality check to ensure your order meets our quality standard.',
  },
  {
    title: 'Lowest Price Guarantee',
    text: 'We provide lowest price guarantee so you can rent with confidence. No more searching here and there.',
  },
  {
    title: 'Prompt Help & Support',
    text: 'Fast and efficient support, right at your fingertips. We are available from 10 am to 10 pm everyday.',
  },
]

export const rentingBenefits = [
  {
    title: 'Top-Quality Products',
    text: 'Always maintained & ready for action',
    icon: `${CDN}/misc/hard-coded/sharepal/New+Star+Box.webp`,
  },
  {
    title: 'Affordable Rates',
    text: 'Save big compared to buying',
    icon: `${CDN}/misc/hard-coded/sharepal/Offer+Tags.webp`,
  },
  {
    title: 'Eco-Friendly',
    text: 'Reduce single-use products',
    icon: `${CDN}/misc/hard-coded/sharepal/Icon+(3).webp`,
  },
]
