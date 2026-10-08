import { useEffect, useState } from 'react'
import {
  BadgePercent,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
} from 'lucide-react'
import {
  addDays,
  formatDayMonth,
  formatFullDate,
  getChargeablePeriod,
  startOfDay,
} from '../lib/dates'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

const firstOfMonth = (date, offset = 0) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1)

const MonthGrid = ({ month, minDay, delivery, pickup, onPick }) => {
  // Whole weeks, Sunday-first, padded with the neighbouring months' days.
  const daysInMonth = addDays(firstOfMonth(month, 1), -1).getDate()
  const gridStart = addDays(month, -month.getDay())
  const cellCount = Math.ceil((month.getDay() + daysInMonth) / 7) * 7
  const days = Array.from({ length: cellCount }, (_, index) =>
    addDays(gridStart, index),
  )

  return (
    <div className="flex-1">
      <p className="pt-1 text-center text-sm font-medium leading-8">
        {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
      <div className="mt-3 grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} className="text-[0.8rem] text-neutral-500">
            {weekday}
          </span>
        ))}
        {days.map((day) => {
          const time = day.getTime()
          const isOutside = day.getMonth() !== month.getMonth()
          const isRangeEnd =
            !isOutside &&
            (time === delivery?.getTime() || time === pickup?.getTime())
          const isInRange =
            !isOutside && delivery && pickup && day >= delivery && day <= pickup

          return (
            <div
              key={time}
              className={`aspect-square ${
                isInRange
                  ? `bg-secondary-200 ${
                      day.getDay() === 0 || time === delivery.getTime()
                        ? 'rounded-l-lg'
                        : ''
                    } ${
                      day.getDay() === 6 || time === pickup.getTime()
                        ? 'rounded-r-lg'
                        : ''
                    }`
                  : ''
              }`}
            >
              <button
                type="button"
                disabled={isOutside || day < minDay}
                aria-label={formatFullDate(day)}
                aria-pressed={isRangeEnd}
                onClick={() => onPick(day)}
                className={`h-full w-full rounded-lg text-sm text-neutral-900 transition-colors disabled:text-neutral-300 ${FOCUS_RING} ${
                  isRangeEnd
                    ? 'bg-secondary-500 font-bold'
                    : 'font-medium enabled:hover:bg-neutral-200'
                }`}
              >
                {day.getDate()}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Clicking a field chooses which date the next calendar click sets.
const DateField = ({
  label,
  value,
  placeholder,
  isActive,
  onSelect,
  children,
}) => {
  return (
    // data-date-field lets an outside click tell this field's popover apart
    <div data-date-field className="relative flex flex-col gap-2">
      <p className="text-sm font-medium leading-none">
        {label} <span className="text-red-500">*</span>
      </p>
      <button
        type="button"
        aria-pressed={isActive}
        aria-label={`${label}: ${value ? formatFullDate(value) : placeholder}`}
        onClick={onSelect}
        className={`flex h-11 items-center gap-2 rounded-2xl border-2 bg-white px-3 transition-colors ${FOCUS_RING} ${
          isActive ? 'border-primary-500' : 'border-neutral-200'
        }`}
      >
        <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
        <span
          className={`text-sm font-medium leading-[18px] ${value ? 'text-neutral-900' : 'text-neutral-300'}`}
        >
          {value ? formatFullDate(value) : placeholder}
        </span>
      </button>
      {children}
    </div>
  )
}

// Single-month calendar that drops down under a date field.
const DatePopover = ({ month, onMonthChange, minDay, delivery, pickup, onPick }) => {
  const canGoBack = month > firstOfMonth(minDay)
  const arrow = `absolute top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-100 transition-colors enabled:hover:bg-neutral-150 disabled:opacity-50 ${FOCUS_RING}`

  return (
    <div className="absolute left-0 top-full z-20 mt-2 w-[min(407px,calc(100vw-3rem))] rounded-xl bg-white p-4 shadow-lg">
      <button
        type="button"
        aria-label="Previous month"
        disabled={!canGoBack}
        onClick={() => onMonthChange(firstOfMonth(month, -1))}
        className={`${arrow} left-4`}
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Next month"
        onClick={() => onMonthChange(firstOfMonth(month, 1))}
        className={`${arrow} right-4`}
      >
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </button>
      <MonthGrid
        month={month}
        minDay={minDay}
        delivery={delivery}
        pickup={pickup}
        onPick={onPick}
      />
    </div>
  )
}

const DateModal = ({ dates, onClose, onConfirm }) => {
  const today = startOfDay(new Date())
  const [delivery, setDelivery] = useState(dates?.delivery ?? null)
  const [pickup, setPickup] = useState(dates?.pickup ?? null)
  const [viewMonth, setViewMonth] = useState(() =>
    firstOfMonth(dates?.delivery ?? today),
  )
  const [activeField, setActiveField] = useState(
    dates ? 'pickup' : 'delivery',
  )
  // Which field's dropdown calendar is open, and the month it shows.
  const [openField, setOpenField] = useState(null)
  const [popoverMonth, setPopoverMonth] = useState(() => firstOfMonth(today))
  const period = delivery && pickup ? getChargeablePeriod(delivery, pickup) : null

  // A day after delivery sets pickup; anything else starts over from delivery.
  const handlePick = (day) => {
    if (activeField === 'pickup' && delivery && day > delivery) {
      setPickup(day)
    } else {
      setDelivery(day)
      setPickup(null)
      setActiveField('pickup')
    }
  }

  useEffect(() => {
    if (!openField) return
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest('[data-date-field]')) setOpenField(null)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [openField])

  const toggleField = (field) => {
    setActiveField(field)
    const isClosing = openField === field
    setOpenField(isClosing ? null : field)
    setPopoverMonth(firstOfMonth((field === 'pickup' ? pickup ?? delivery : delivery) ?? today))
  }

  // Delivery dropdown sets delivery (dropping a pickup that is no longer after it);
  // pickup dropdown only offers days after delivery.
  const handlePopoverPick = (day) => {
    if (openField === 'delivery') {
      setDelivery(day)
      if (pickup && pickup <= day) setPickup(null)
      setActiveField('pickup')
    } else {
      setPickup(day)
    }
    setViewMonth(firstOfMonth(day))
    setOpenField(null)
  }

  const popover = openField && (
    <DatePopover
      month={popoverMonth}
      onMonthChange={setPopoverMonth}
      minDay={openField === 'pickup' && delivery ? addDays(delivery, 1) : today}
      delivery={delivery}
      pickup={pickup}
      onPick={handlePopoverPick}
    />
  )

  return (
    <dialog
      // showModal() gives the focus trap, Esc-to-close and backdrop natively
      ref={(element) => {
        if (element && !element.open) element.showModal()
      }}
      aria-labelledby="date-modal-title"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-auto animate-modal-in max-h-svh w-[95%] max-w-7xl overflow-auto rounded-3xl bg-neutral-150 text-foreground shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between p-6 pb-0">
        <h2 id="date-modal-title" className="text-2xl font-semibold tracking-tight">
          Select your Dates
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-200 ${FOCUS_RING}`}
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col-reverse gap-6 p-6 pt-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-5">
          <div className="grid gap-3 md:grid-cols-2">
            <DateField
              label="Delivery Date"
              value={delivery}
              placeholder="Select delivery date"
              isActive={activeField === 'delivery'}
              onSelect={() => toggleField('delivery')}
            >
              {openField === 'delivery' && popover}
            </DateField>
            <DateField
              label="Pickup Date"
              value={pickup}
              placeholder="Select pickup date"
              isActive={activeField === 'pickup'}
              onSelect={() => toggleField('pickup')}
            >
              {openField === 'pickup' && popover}
            </DateField>
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-primary-100 px-3 py-2 text-primary-500 md:rounded-2xl">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-xs font-medium leading-4">
              <b>Same-day delivery</b> between <b>5PM and 11PM</b> For future
              dates, you can select a specific time slot available at checkout.
              We pickup between <b>9AM to 1PM</b>.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium leading-5 text-neutral-900">
              Your Rental Period:
            </p>
            <div className="flex items-end gap-3 rounded-2xl border-2 border-neutral-200 bg-white px-3 py-2.5">
              <p className="flex items-end gap-1 text-sm font-medium leading-5 text-neutral-500">
                <span className="text-[40px] font-bold leading-[48px] text-neutral-900">
                  {String(period?.days ?? 0).padStart(2, '0')}
                </span>
                <span className="pb-1">{period?.days > 1 ? 'Days' : 'Day'}</span>
              </p>
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-xs font-medium leading-4 text-neutral-900">
                  Chargeable Period:
                </p>
                <p
                  className={`flex items-center gap-2 text-sm font-medium leading-5 ${period ? 'text-neutral-900' : 'text-neutral-300'}`}
                >
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4 text-neutral-900"
                  />
                  {period
                    ? `${formatDayMonth(period.start)} - ${formatDayMonth(period.end)}`
                    : '--'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-primary-900 px-5 py-4 text-white">
            <p className="mb-3 flex items-center gap-3 font-bold italic text-secondary-500 md:text-2xl">
              <BadgePercent aria-hidden="true" className="h-8 w-8 shrink-0" />
              Save more with us!
            </p>
            <p className="text-sm font-semibold md:text-xs">
              Longer rental periods mean bigger savings—enjoy discounts of up to
              12%. We don’t charge you for deliver and pickup days!
            </p>
          </div>

          <button
            type="button"
            disabled={!period}
            onClick={() => onConfirm({ delivery, pickup })}
            className={`h-12 w-full rounded-full bg-primary-500 text-lg font-medium text-neutral-100 transition-colors hover:opacity-90 active:opacity-80 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:opacity-100 ${FOCUS_RING}`}
          >
            Continue
          </button>
        </div>

        <div className="relative h-max flex-[1.5] rounded-3xl bg-white p-6">
          <button
            type="button"
            aria-label="Previous month"
            disabled={viewMonth <= firstOfMonth(today)}
            onClick={() => setViewMonth((month) => firstOfMonth(month, -1))}
            className={`absolute left-7 top-7 flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-100 transition-colors enabled:hover:bg-neutral-150 disabled:opacity-50 ${FOCUS_RING}`}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setViewMonth((month) => firstOfMonth(month, 1))}
            className={`absolute right-7 top-7 flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-100 transition-colors hover:bg-neutral-150 ${FOCUS_RING}`}
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>

          <div className="flex flex-col gap-4 sm:flex-row">
            {[viewMonth, firstOfMonth(viewMonth, 1)].map((month) => (
              <MonthGrid
                key={month.getTime()}
                month={month}
                minDay={today}
                delivery={delivery}
                pickup={pickup}
                onPick={handlePick}
              />
            ))}
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default DateModal
