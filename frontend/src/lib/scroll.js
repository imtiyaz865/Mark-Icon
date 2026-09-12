import gsap from './gsap'

export function scrollToId(id) {
  if (id === 'top') {
    gsap.to(window, { duration: 0.9, ease: 'power3.inOut', scrollTo: 0 })
    return
  }

  const target = document.getElementById(id)
  if (!target) return

  gsap.to(window, {
    duration: 1,
    ease: 'power3.inOut',
    scrollTo: { y: target, offsetY: 72 },
  })
}
