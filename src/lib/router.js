import { useSyncExternalStore } from 'react'

// ponytail: two page types don't need a router library; switch to React Router if routes grow.
const subscribe = (onChange) => {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}

export const usePath = () =>
  useSyncExternalStore(subscribe, () => window.location.pathname)

export const navigate = (path) => {
  window.history.pushState(null, '', path)
  // pushState fires no event of its own, so tell usePath the URL changed
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

// Spread onto an <a>: a plain click navigates in-app, while ctrl/middle click still opens a tab
export const linkProps = (href) => ({
  href,
  onClick: (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    navigate(href)
  },
})
