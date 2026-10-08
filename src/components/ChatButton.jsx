// Bubble outline traced from the reference's animated icon, centred on 0,0 with the tail bottom-left
const BUBBLE_PATH =
  'M-64.8,87.9C-61.5,86.7-57.7,87-54.6,88.7C-38,98.2-19.2,103.2,0,103.1C59.2,103.1,107.3,57,107.3,0C107.3,-57,59.2,-103.1,0,-103.1C-59.2,-103.1-107.3,-57-107.3,0C-107.3,17-103,33.6-94.7,48.5C-93,51.5-92.6,55.1-93.6,58.4L-104.8,94.9C-105.5,97.2-104.2,99.6-101.9,100.3C-101,100.6-100.1,100.5-99.2,100.2Z'

const DOT_OFFSETS = [-51.6, 0, 51.6]
const LOOP_SECONDS = 3
const DOT_STAGGER_SECONDS = 0.083

// One chat bubble with its three dots. `typingFrom` (seconds into the loop) starts the dots' bounce.
const Bubble = ({ x, y, color, mirrored = false, className, typingFrom }) => {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`motion-reduce:animate-none ${className}`}>
        <path
          d={BUBBLE_PATH}
          transform={mirrored ? 'scale(-1 1)' : undefined}
          className={color}
        />
        {DOT_OFFSETS.map((cx, index) => (
          <circle
            key={cx}
            cx={cx}
            r="17.2"
            fill="#fff"
            className={
              typingFrom === undefined
                ? undefined
                : 'animate-chat-dot motion-reduce:animate-none'
            }
            // a negative delay starts the loop part-way through, keeping the dots in step
            style={
              typingFrom === undefined
                ? undefined
                : {
                    animationDelay: `${typingFrom + index * DOT_STAGGER_SECONDS - LOOP_SECONDS}s`,
                  }
            }
          />
        ))}
      </g>
    </g>
  )
}

// Floating button that opens the chat window. The green and blue bubbles keep swapping places, as on the reference:
// a "back" and a "front" copy of each colour hand over to one another (keyframes in index.css).
const ChatButton = ({ onOpen }) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      title="Open chatbot"
      aria-label="Open chatbot"
      className="fixed bottom-16 right-2 z-30 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:bottom-10 md:right-6"
    >
      <svg viewBox="0 0 500 500" aria-hidden="true" className="w-20 lg:w-28">
        <Bubble
          x={228.5}
          y={224.2}
          color="fill-secondary-500"
          className="animate-chat-green-back"
        />
        <Bubble
          x={271.5}
          y={226}
          color="fill-primary-500"
          mirrored
          className="animate-chat-blue-back motion-reduce:hidden"
        />
        <Bubble
          x={228.5}
          y={274.2}
          color="fill-secondary-500"
          className="animate-chat-green-front motion-reduce:hidden"
          typingFrom={2.667}
        />
        <Bubble
          x={271.5}
          y={276}
          color="fill-primary-500"
          mirrored
          className="animate-chat-blue-front"
          typingFrom={1.333}
        />
      </svg>
    </button>
  )
}

export default ChatButton
