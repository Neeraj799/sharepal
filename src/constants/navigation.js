import { Home, LayoutGrid, Search, ShoppingCart } from 'lucide-react'

export const POPULAR_CITIES = [
  'Delhi',
  'Hyderabad',
  'Mumbai',
  'Pune',
  'Chennai',
  'Bangalore',
]

export const OTHER_CITIES = [
  'Faridabad',
  'Kolkata',
  'Gurgaon',
  'Noida',
  'Ghaziabad',
]

export const MOBILE_TABS = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'category', label: 'Category', icon: LayoutGrid },
  { key: 'search', label: 'Search', icon: Search },
  { key: 'cart', label: 'Cart', icon: ShoppingCart },
]

export const SUPER_CATEGORIES = ['Photography', 'Gaming', 'Outdoor', 'Entertainment']
export const DEFAULT_SUPER_CATEGORY = 'Gaming'
