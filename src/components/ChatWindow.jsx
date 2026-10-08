import { useEffect, useRef, useState } from 'react'
import { RefreshCcw, SendHorizontal, ThumbsDown, ThumbsUp, X } from 'lucide-react'
import logo from '../assets/images/sharepal-logo.svg'
import { PinIcon } from './NavIcons'
import { FALLBACK_REPLY, GREETING, QUICK_PICKS } from '../data/chatbot'

// Pause before the bot's canned reply appears, so it reads as a response
const REPLY_DELAY_MS = 600

const HEADER_BUTTON =
  'flex h-8 w-8 items-center justify-center rounded-lg text-primary-150 transition-colors hover:bg-primary-300/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white'

const formatTime = (date) =>
  date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

const newConversation = () => [
  { id: 0, from: 'bot', paragraphs: GREETING, time: formatTime(new Date()), hasQuickPicks: true },
]

const BotMessage = ({ message, canPick, onPick }) => {
  // 'up', 'down' or null
  const [feedback, setFeedback] = useState(null)

  return (
    <li className="flex flex-col items-start">
      <div className="relative max-w-[min(92%,36rem)] rounded-2xl rounded-bl-md border border-primary-150/70 bg-white px-3 py-2 text-neutral-900 shadow-sm">
        <span
          aria-hidden="true"
          className="absolute -left-1.5 bottom-2.5 h-3 w-3 rotate-45 border-b border-l border-primary-150/70 bg-white"
        />

        <div className="relative space-y-2.5 text-xs leading-[1.2rem] md:text-sm md:leading-6">
          {message.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {message.hasQuickPicks && (
          <div className="relative mt-3 border-t border-neutral-100 pt-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Quick picks
            </p>
            <div className="flex flex-col gap-1.5">
              {QUICK_PICKS.map((pick) => (
                <button
                  key={pick.label}
                  type="button"
                  disabled={!canPick}
                  onClick={() => onPick(pick)}
                  className="min-h-9 rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-2.5 text-left text-xs font-medium leading-snug text-neutral-900 transition-colors hover:border-primary-300 hover:bg-primary-100 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pick.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative mt-1 flex items-center justify-between gap-2 text-[11px] leading-6 text-neutral-500">
          <span>{message.time}</span>
          <div className="flex items-center gap-1">
            {[
              { value: 'up', label: 'Thumbs up', Icon: ThumbsUp },
              { value: 'down', label: 'Thumbs down', Icon: ThumbsDown },
            ].map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                aria-label={label}
                aria-pressed={feedback === value}
                onClick={() => setFeedback(feedback === value ? null : value)}
                className={`rounded-md p-1 transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  feedback === value ? 'text-primary-500' : 'text-neutral-500'
                }`}
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}

// Full-screen chat, as on the reference's chatbot page. Replies are canned (see data/chatbot.js).
const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState(newConversation)
  const [draft, setDraft] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const replyTimer = useRef(null)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  const hasUserSpoken = messages.some((message) => message.from === 'user')

  useEffect(() => () => clearTimeout(replyTimer.current), [])

  // Keep the newest message in view
  useEffect(() => {
    endRef.current.scrollIntoView({ block: 'end' })
  }, [messages, isReplying])

  const send = (text, reply = FALLBACK_REPLY) => {
    const time = formatTime(new Date())
    setMessages((current) => [
      ...current,
      { id: current.length, from: 'user', paragraphs: [text], time },
    ])
    setIsReplying(true)
    replyTimer.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: current.length, from: 'bot', paragraphs: [reply], time: formatTime(new Date()) },
      ])
      setIsReplying(false)
    }, REPLY_DELAY_MS)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text || isReplying) return
    send(text)
    setDraft('')
  }

  const startOver = () => {
    clearTimeout(replyTimer.current)
    setIsReplying(false)
    setDraft('')
    setMessages(newConversation())
  }

  return (
    <dialog
      // showModal() gives the focus trap and Esc-to-close natively, as in DateModal
      ref={(element) => {
        if (element && !element.open) {
          element.showModal()
          // showModal() focuses the first control (New chat); typing should work straight away
          inputRef.current.focus()
        }
      }}
      // index.css stops the page behind from scrolling while this is open
      data-fullscreen
      aria-label="Chat with SharePal"
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-full max-w-none justify-center bg-background text-foreground open:flex"
    >
      <div className="flex h-dvh w-full max-w-5xl flex-col overflow-hidden border-primary-150 bg-white md:mt-4 md:h-[calc(100dvh-2rem)] md:rounded-2xl md:border">
        <header className="flex items-start justify-between gap-3 bg-primary-500 px-4 py-3">
          <div className="min-w-0">
            <div className="flex h-8 items-center">
              <img src={logo} alt="SharePal" className="h-[27px]" />
            </div>
            <p className="mt-1 flex items-center gap-2 text-xs font-medium leading-4 text-primary-150">
              <span className="h-2 w-2 rounded-full bg-success-300" />
              Online
            </p>
          </div>

          <div className="flex items-center gap-1">
            <p className="flex h-8 items-center gap-2 px-2 text-xs font-medium text-primary-150">
              <PinIcon className="h-4 w-4" />
              Bangalore
            </p>
            <button
              type="button"
              title="New chat, clears history and starts a fresh session"
              aria-label="New chat"
              onClick={startOver}
              className={HEADER_BUTTON}
            >
              <RefreshCcw aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Close chat"
              aria-label="Close chat"
              onClick={onClose}
              className={HEADER_BUTTON}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </header>

        <ul
          aria-live="polite"
          className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-neutral-100 via-white to-white p-4"
        >
          {messages.map((message) =>
            message.from === 'bot' ? (
              <BotMessage
                // remount on "New chat" so thumbs feedback resets with the conversation
                key={`${message.id}-${message.time}`}
                message={message}
                canPick={!hasUserSpoken}
                onPick={(pick) => send(pick.label, pick.reply)}
              />
            ) : (
              <li key={message.id} className="flex flex-col items-end">
                <div className="max-w-[min(92%,36rem)] rounded-2xl rounded-br-md bg-primary-500 px-3 py-2 text-xs leading-[1.2rem] text-white shadow-sm md:text-sm md:leading-6">
                  <p className="whitespace-pre-wrap break-words">{message.paragraphs[0]}</p>
                  <p className="text-right text-[11px] leading-5 text-primary-150">
                    {message.time}
                  </p>
                </div>
              </li>
            ),
          )}
          {isReplying && (
            <li className="text-xs text-neutral-500">Rocket Singh is typing…</li>
          )}
          <li ref={endRef} aria-hidden="true" />
        </ul>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-neutral-200 bg-white p-3"
        >
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type your message"
            aria-label="Message"
            ref={inputRef}
            className="h-11 w-full rounded-xl border-2 border-neutral-250 bg-white p-3 text-sm leading-5 text-neutral-900 placeholder:text-neutral-300 focus:border-primary-500 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim() || isReplying}
            className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-primary-500 px-4 text-white transition-[transform,background-color] hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:bg-neutral-200 disabled:text-neutral-500"
          >
            <SendHorizontal aria-hidden="true" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </dialog>
  )
}

export default ChatWindow
