import { forwardRef } from 'react'

const Section = forwardRef(function Section({ id, className = '', children, ...props }, ref) {
  return (
    <section ref={ref} id={id} className={`relative z-1 py-[clamp(4.5rem,12vw,9.5rem)] ${className}`.trim()} {...props}>
      {children}
    </section>
  )
})

export default Section
