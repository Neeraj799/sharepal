import { superCategories } from '../data/superCategories'
import { startOfDay } from './dates'

const STORAGE_KEY = 'sharepal-rental'

const PRODUCTS_BY_ID = Object.fromEntries(
  Object.values(superCategories).flatMap(({ products }) =>
    products.map((product) => [product.id, product]),
  ),
)

// Saved as { dates: [deliveryMs, pickupMs] | null, cart: { [productId]: qty } }
export const loadRental = () => {
  try {
    const { dates, cart = {} } =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
    const [delivery, pickup] = (dates ?? []).map((ms) => new Date(ms))
    return {
      // A delivery day that has passed can no longer be booked
      rentalDates:
        delivery >= startOfDay(new Date()) && pickup > delivery
          ? { delivery, pickup }
          : null,
      // Products are looked up again so prices and images are never stale
      cart: Object.fromEntries(
        Object.entries(cart)
          .filter(
            ([id, qty]) => PRODUCTS_BY_ID[id] && Number.isInteger(qty) && qty > 0,
          )
          .map(([id, qty]) => [id, { product: PRODUCTS_BY_ID[id], qty }]),
      ),
    }
  } catch {
    // Storage is blocked or holds something unreadable: start fresh
    return { rentalDates: null, cart: {} }
  }
}

export const saveRental = (rentalDates, cart) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        dates: rentalDates && [+rentalDates.delivery, +rentalDates.pickup],
        cart: Object.fromEntries(
          Object.entries(cart).map(([id, { qty }]) => [id, qty]),
        ),
      }),
    )
  } catch {
    // Storage is blocked (e.g. private mode); the cart still works for this visit
  }
}
