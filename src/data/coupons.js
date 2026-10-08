const MONTH_DAYS = 30

// getDiscount returns the rupees off for a cart, or 0 when the cart does not qualify
export const coupons = [
  {
    code: 'GAMING12',
    label: '12% Off',
    description: 'Rent A PS5 Console For A Month & Get 12% Off!',
    requirement: 'GAMING12 needs a PS5 console rented for 30 days or more',
    getDiscount: ({ items, rentalDays }) =>
      rentalDays < MONTH_DAYS
        ? 0
        : Math.round(
            items
              .filter(({ product }) => product.categories.includes('ps5-console'))
              .reduce(
                (sum, { product, qty }) =>
                  sum + product.per_day_rent * rentalDays * qty,
                0,
              ) * 0.12,
          ),
  },
  {
    code: 'SHAREPAL',
    label: '10% Off',
    description:
      'Use code SHAREPAL & get 10% off on orders above ₹1500. Maximum discount: ₹300',
    requirement: 'SHAREPAL works on orders above ₹1,500',
    getDiscount: ({ total }) =>
      total > 1500 ? Math.min(Math.round(total * 0.1), 300) : 0,
  },
]
