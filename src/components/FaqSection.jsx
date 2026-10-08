import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Collapse from './Collapse'
import { faqs } from '../data/faqs'

// className replaces the standalone card styling where the FAQs sit inside another card
const FaqSection = ({
  className = 'mx-auto my-10 max-w-[1216px] rounded-3xl bg-white px-4 py-10',
}) => {
  // Only one answer is open at a time; clicking the open one closes it
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className={`w-full ${className}`}>
      <div className="flex flex-col items-start gap-2 px-4 pb-4 md:px-6 md:pb-6">
        <h2 className="py-2 text-xl font-bold leading-7 text-neutral-900 md:text-2xl md:leading-8">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="w-full">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="rounded-xl transition-colors duration-300 hover:bg-gray-150"
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 rounded-xl p-4 text-left text-sm font-medium text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:text-base md:font-semibold md:leading-6"
                  >
                    {faq.question}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>
                <Collapse
                  isOpen={isOpen}
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p className="px-4 pb-4 text-xs text-gray-700 md:text-sm">
                    {faq.answer}
                  </p>
                </Collapse>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className="h-11 w-full rounded-[28px] bg-neutral-150 px-6 text-sm font-semibold text-primary-900 transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:opacity-90 md:text-base"
        >
          View more FAQ&apos;s
        </button>
      </div>
    </section>
  )
}

export default FaqSection
