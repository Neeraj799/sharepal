// Animates open/closed height with CSS only: 0fr -> 1fr grows to the content's natural height.
const Collapse = ({ isOpen, children, ...props }) => {
  return (
    <div
      {...props}
      // inert keeps collapsed content out of the tab order and away from screen readers
      inert={isOpen ? undefined : ''}
      className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

export default Collapse
