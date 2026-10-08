import all from '../assets/images/category-all.webp'
import gtaVi from '../assets/images/category-gta-vi.webp'
import ps5 from '../assets/images/category-ps5.webp'
import xbox from '../assets/images/category-xbox.webp'
import vr from '../assets/images/category-vr.webp'
import racingWheel from '../assets/images/category-racing-wheel.webp'
import bigScreen from '../assets/images/category-big-screen.webp'

// Thumbnails for the other tabs load from the same CDN as the product images
const CDN = 'https://images.sharepal.in'
const card = (file) => `${CDN}/sub-category-card/${file}.webp`
const icon = (file) => `${CDN}/category-icons/${file}.webp`
const product = (path) => `${CDN}/categories/${path}.webp`

// "Big Screen Gaming" -> { id: 'big-screen-gaming', label, image }
const category = (label, image) => ({
  id: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  label,
  image,
})

const ALL = category('All', all)

// Sidebar categories for each tab, in the reference's order
export const sidebarCategories = {
  Photography: [
    ALL,
    category('DJI Drones', card('DJI-Mini-4-Pro-RC2-drone')),
    category('iPhones', product('cameras/iphones/iphone-17-pro-max/iphone-17-pro-max-on-rent-on-sharepal-1')),
    category('Cameras', card('dslr-cameras-on-rent-sharepal')),
    category('Pocket Cameras', icon('pocket-cameras-on-rent')),
    category('360 Cameras', icon('360-cameras-on-rent')),
    category('Action Cameras', icon('action-cameras-on-rent')),
    category('DSLR Cameras', card('dslr-cameras-on-rent-sharepal')),
    category('Mirrorless Cameras', product('cameras/dslr-cameras/sony-zve10/sony-zv-e10-vlogging-camera-on-rent-on-sharepal-1')),
    category('Vlogging', `${CDN}/category-card-images/dslr-camera-on-rent-sharepal.webp`),
    category('UNLMTD Vlogging', card('UNLMTD%20Vlogging%20(1)')),
    category('Wildlife Photography', product('cameras/dslr-cameras/sony-alpha-7-zoomlens-combo/sony-alpha7-zoom-lens-combo-on-rent-sharepal-1')),
    category('Professional Cameras', card('professional-cameras-on-rent')),
    category('GoPro Cameras', card('gopro-cameras-on-rent-sharepal')),
    category('Insta360 Cameras', card('360-cameras-on-rent-sharepal')),
    category('DJI Cameras', card('dji-cameras-on-rent-sharepal')),
    category('DSLR Gimbal Combos', card('dslr-gimbal-on-rent-sharepal')),
    category('Mobile Gimbals', product('creator-gear/gimbals-and-grips/dji-osmo-mobile/dji-osmo-6-on-rent-sharepal-1')),
    category('Wireless & Collar Mics', product('audio-visual-equipment/mics/rode-go-ii-mics/rode-go-ii-mic-on-rent-sharepal-1')),
    category('DSLR Lens', card('dslr-lens-on-rent-sharepal')),
    category('Tripod and camera accessories', card('tripod_camera-accessories-on-rent-sharepal')),
    category('Action Camera Mounts', card('mounts-and-accessories-on-rent-sharepal')),
    category('Action Camera Add ons', card('action-camera-addons-on-rent-sharepal')),
  ],
  Gaming: [
    ALL,
    category('GTA VI', gtaVi),
    category('PS5 Console', ps5),
    category('Xbox Console', xbox),
    category('VR', vr),
    category('Racing Wheel', racingWheel),
    category('Big Screen Gaming', bigScreen),
  ],
  Outdoor: [
    ALL,
    category('Trekking Gear', card('trekking-gear-on-rent-sharepal-1')),
    category('Riding Gear', card('riding-gear-on-rent-sharepal-1')),
    category('Camping Gear', product('camping-gear/camping-tents/2-person-camping-tent/2-persons-camping-tents-on-rent-sharepal-1')),
    category('Trekking Shoes', product('trekking-gear/trekking-shoes/men-s-leather-high-trekking-shoes-mt100/unisex-trek-mt100-trekking-shoes-on-rent-1')),
    category('Snow Boots', card('snow-boots-on-rent-sharepal')),
    category('Trekking Jackets', card('trekking-jackets-on-rent-sharepal')),
    category('Trek/Snow Pants', product('trekking-gear/trek-accessories/women-trek-pant/women-trek-pant-on-rent-sharepal-1')),
    category('Trek Accessories', card('trek-accessories-on-rent-sharepal')),
    category('Winter Jackets', card('winter-jackets-on-rent-sharepal')),
    category('Riding Jackets', card('riding-jackets-on-rent-sharepal')),
    category('Riding Boots', card('riding-boots-on-rent-sharepal')),
    category('Riding Essentials', card('riding-essentials-on-rent-sharepal')),
    category('Riding Luggage', card('riding-luggage-on-rent-sharepal')),
    category('Backpacks', card('backPacks-on-rent-sharepal')),
    category('Binoculars', card('binoculars-on-rent-sharepal')),
    category('Camping Tents', card('camping-tents-on-sharepal')),
    category('Camping Stools & Tables', card('camping-stools-tables-on-rent-sharepal')),
    category('Sleeping Bags & Mats', card('Sleeping-bags-and-mats-on-rent-sharepal')),
  ],
  Entertainment: [
    ALL,
    category('Projectors', card('Projectors-on-rent-sharepal')),
    category('Speakers', card('speakers-on-rent-sharepal')),
    category('Mics', card('mics-on-rent-sharepal')),
    category('VR', card('vr-on-rent-sharepal')),
  ],
}
