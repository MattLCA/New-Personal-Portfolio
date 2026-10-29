// v-reveal  /  v-reveal="{ delay: 120 }"  — fades an element up when it scrolls into view.
export default {
  mounted(el, { value }) {
    el.classList.add('rv')
    if (value?.delay) el.style.transitionDelay = `${value.delay}ms`
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      el.classList.add('in'); io.disconnect()
      setTimeout(() => { el.style.transitionDelay = '0ms' }, 1400) // keep hover transitions instant afterwards
    }, { threshold: 0.12 })
    io.observe(el)
  }
}
