function ProductsHeader({ title, count }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-3 md:py-4">
      <h2 className="text-base font-semibold capitalize text-neutral-900 md:text-2xl md:font-bold md:leading-8">
        {title}
      </h2>
      <p className="flex items-center gap-1 text-xs text-neutral-300 md:text-base md:font-medium">
        <span className="hidden md:inline">Total items:</span>
        <span className="text-neutral-500">{count} items</span>
      </p>
    </div>
  )
}

export default ProductsHeader
