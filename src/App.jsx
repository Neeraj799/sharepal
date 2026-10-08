import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import CartNotice from './components/CartNotice'
import DateModal from './components/DateModal'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Footer from './components/Footer'
import SelectDatesPrompt from './components/SelectDatesPrompt'
import ChatButton from './components/ChatButton'
import ChatWindow from './components/ChatWindow'
import { useScrolledPast } from './hooks/useScrolledPast'
import { getChargeablePeriod } from './lib/dates'
import { DEFAULT_SUPER_CATEGORY } from './constants/navigation'
import { findProductPage, superCategories } from './data/superCategories'
import { loadRental, saveRental } from './lib/rentalStorage'
import { navigate, usePath } from './lib/router'

// The reference hides its navbar once the page is scrolled past this point.
const HEADER_HIDE_OFFSET = 300

const App = () => {
  const isHeaderHidden = useScrolledPast(HEADER_HIDE_OFFSET)
  // { delivery, pickup } once chosen; prices stay hidden until then
  // Dates and cart survive a reload, like the reference
  const [saved] = useState(loadRental)
  const [rentalDates, setRentalDates] = useState(saved.rentalDates)
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  // The open tab page and the sidebar category selected within it
  const [superCategory, setSuperCategory] = useState(DEFAULT_SUPER_CATEGORY)
  const [activeCategory, setActiveCategory] = useState('all')

  const selectCategory = (nextSuperCategory, categoryId = 'all') => {
    // Each tab and category is its own page on the reference, so start from the top
    window.scrollTo(0, 0)
    setSuperCategory(nextSuperCategory)
    setActiveCategory(categoryId)
  }

  // A product's own URL shows its detail page; every other URL is the listing
  const productPage = findProductPage(usePath())
  const theme = superCategories[productPage?.superCategory ?? superCategory].theme

  const openDateModal = () => setIsDateModalOpen(true)
  const rentalDays = rentalDates
    ? getChargeablePeriod(rentalDates.delivery, rentalDates.pickup).days
    : null

  // { [productId]: { product, qty } }, plus the last product added for the Go to Cart pill
  const [cart, setCart] = useState(saved.cart)
  const [lastAdded, setLastAdded] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const cartCount = Object.values(cart).reduce((sum, { qty }) => sum + qty, 0)

  useEffect(() => saveRental(rentalDates, cart), [rentalDates, cart])

  useEffect(() => {
    if (!isToastVisible) return
    const timer = setTimeout(() => setIsToastVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [isToastVisible, lastAdded])

  const addToCart = (product) => {
    setCart((current) => ({
      ...current,
      [product.id]: { product, qty: (current[product.id]?.qty ?? 0) + 1 },
    }))
    setLastAdded(product)
    setIsToastVisible(true)
  }

  const removeFromCart = (productId) => {
    setCart((current) => {
      const { [productId]: item, ...rest } = current
      return item.qty > 1
        ? { ...rest, [productId]: { ...item, qty: item.qty - 1 } }
        : rest
    })
  }

  const deleteFromCart = (productId) =>
    setCart(({ [productId]: removed, ...rest }) => rest)

  // Without dates the cart asks for them first.
  const openCart = () => (rentalDates ? setIsCartOpen(true) : openDateModal())

  return (
    <div data-theme={theme} className="min-h-screen bg-background">
      <Navbar
        isHidden={isHeaderHidden}
        rentalDates={rentalDates}
        onSelectDates={openDateModal}
        cartCount={cartCount}
        onCartOpen={openCart}
      />
      {productPage ? (
        <ProductDetail
          // keyed so the gallery and wishlist state reset between products
          key={productPage.product.id}
          product={productPage.product}
          superCategory={productPage.superCategory}
          rentalDays={rentalDays}
          onSelectDates={openDateModal}
          cart={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onOpenCategory={(name, categoryId) => {
            selectCategory(name, categoryId)
            navigate('/')
          }}
        />
      ) : (
        <Home
          superCategory={superCategory}
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
          isHeaderHidden={isHeaderHidden}
          rentalDays={rentalDays}
          onSelectDates={openDateModal}
          cart={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />
      )}
      <Footer />
      <CartNotice
        isToastVisible={isToastVisible}
        onCloseToast={() => setIsToastVisible(false)}
        lastAdded={cartCount > 0 ? lastAdded : null}
        onGoToCart={openCart}
      />
      {isCartOpen && (
        <CartDrawer
          items={Object.values(cart)}
          rentalDays={rentalDays}
          rentalDates={rentalDates}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onRemoveAll={deleteFromCart}
          onEditDates={() => {
            setIsCartOpen(false)
            openDateModal()
          }}
          onClose={() => setIsCartOpen(false)}
        />
      )}
      <ChatButton onOpen={() => setIsChatOpen(true)} />
      {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}

      {!rentalDates && !isDateModalOpen && (
        <SelectDatesPrompt onSelectDates={openDateModal} />
      )}

      {isDateModalOpen && (
        <DateModal
          dates={rentalDates}
          onClose={() => setIsDateModalOpen(false)}
          onConfirm={(dates) => {
            setRentalDates(dates)
            setIsDateModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default App
