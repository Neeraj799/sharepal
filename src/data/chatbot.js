// Canned content for the demo chat. The real SharePal chatbot needs a login and a
// support backend, so replies here are fixed text chosen on the frontend.
export const GREETING = ['Hi Pal 👋', 'I’m Rocket Singh. How can I help you today?']

export const QUICK_PICKS = [
  {
    label: 'I want to place a new order',
    reply:
      'Great! Pick a category from the tabs at the top, choose your rental dates, and add what you need to the cart.',
  },
  {
    label: 'I need help with an existing order',
    reply:
      'Sure. Please share your order ID and tell me what went wrong, and I’ll look into it.',
  },
  {
    label: 'Something else',
    reply: 'No problem. Tell me what you need and I’ll do my best to help.',
  },
]

export const FALLBACK_REPLY =
  'Thanks for your message! This is a demo chat, so I can’t look that up here. On SharePal, an expert would take it from this point.'
