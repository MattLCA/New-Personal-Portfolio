<script setup>
/*
  A butterfly that lives in the hero.
  • By default it rests on the flowers and now and then hops to another bloom.
  • Click it and it picks up your cursor and follows it around the page.
  • Press Esc, stop moving for a few seconds, or leave the window and it flies back to a flower.
  • Touch screens: tapping makes it hop to another flower. Stems lean away from the cursor (desktop only).
  • prefers-reduced-motion: it just sits on its flower.
*/
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { heroMap } from '../lib/flowers'

const el = ref(null), rotEl = ref(null), lab = ref(null)
const labelText = ref('Click me')
let raf = 0, cleanup = () => {}

onMounted(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const touch = matchMedia('(hover: none)').matches
  const svg = document.querySelector('.hero .bg')
  if (!svg) return

  const blooms = [...svg.querySelectorAll('.ln')].map(n => ({
    n, bx: +n.dataset.bx, hx: +n.dataset.hx, hy: +n.dataset.hy, r: +n.dataset.r, bf: n.dataset.bf === '1', ang: 0
  }))
  const first = Math.max(0, blooms.findIndex(b => b.bf))

  // design space -> screen pixels (same mapping FlowerField uses to scale the artwork)
  const head = b => {
    const r = svg.getBoundingClientRect()
    const m = heroMap(r.width, r.height, matchMedia('(max-width:760px)').matches ? 'xMax' : 'xMid')
    return { x: r.left + m.ox + b.hx * m.s, y: r.top + m.oy + b.hy * m.s, s: m.s }
  }
  const spot = b => { const h = head(b); return h && { x: h.x + 0.5 * b.r * h.s, y: h.y - 0.6 * b.r * h.s } }
  const onscreen = p => p.x > -40 && p.x < innerWidth + 40 && p.y > -40 && p.y < innerHeight + 40
  const heroVisible = () => { const r = svg.getBoundingClientRect(); return r.bottom > 60 && r.top < innerHeight - 60 }
  const visibleBlooms = except => blooms.map((b, i) => [i, spot(b)]).filter(([i, p]) => i !== except && p && onscreen(p)).map(([i]) => i)
  const nearest = (x, y, max = Infinity) => {
    let best = null, bd = max
    blooms.forEach((b, i) => { const s = spot(b); if (s && onscreen(s)) { const d = Math.hypot(s.x - x, s.y - y); if (d < bd) { bd = d; best = i } } })
    return best
  }

  const pe = touch ? 'none' : 'auto'                 // on touch screens it never intercepts taps
  el.value.style.pointerEvents = pe
  const cur = { x: 0, y: 0, has: false }
  const P = { x: -100, y: -100 }, V = { x: 0, y: 0 }
  let lastMove = 0, rot = 24, state = 'rest', restIdx = first, flyTo = null, level = '', hintTimer = 0
  let follow = false, clicked = false, hintUntil = 0
  let restUntil = performance.now() + 3500

  const place = () => {
    const s = spot(blooms[first]); if (!s) return
    P.x = s.x; P.y = s.y
    el.value.style.transform = `translate3d(${P.x}px,${P.y}px,0)`
    rotEl.value.style.transform = `rotate(${rot}deg)`
    el.value.classList.add('on')
  }
  place()
  if (reduce) {
    const upd = () => place()
    el.value.style.pointerEvents = 'none'
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd)
    cleanup = () => { removeEventListener('scroll', upd); removeEventListener('resize', upd) }
    return
  }

  const release = () => {                          // stop following, head for the nearest flower
    follow = false; el.value.style.pointerEvents = pe
    flyTo = nearest(P.x, P.y); state = 'fly'
    hintUntil = 0
  }
  const onClick = e => {
    clicked = true
    if (touch || e.pointerType === 'touch' || !cur.has) {           // touch: just hop somewhere else
      const opts = visibleBlooms(restIdx); if (opts.length) { flyTo = opts[(Math.random() * opts.length) | 0]; state = 'fly'; V.y = -3 }
      return
    }
    follow = true; state = 'fly'; flyTo = null; V.y = -3
    el.value.style.pointerEvents = 'none'          // so it never blocks clicks on the page while it follows
    labelText.value = 'Esc to let go'; hintUntil = performance.now() + 3500
  }
  const onMove = e => {
    if (e.pointerType === 'touch') return
    cur.x = e.clientX; cur.y = e.clientY; cur.has = true; lastMove = performance.now()
  }
  const onLeave = () => { cur.has = false; if (follow) release() }
  const onKey = e => { if (e.key === 'Escape' && follow) release() }
  el.value.addEventListener('click', onClick)
  addEventListener('pointermove', onMove, { passive: true })
  addEventListener('keydown', onKey)
  document.documentElement.addEventListener('mouseleave', onLeave)

  function frame() {
    raf = requestAnimationFrame(frame)
    const now = performance.now(), tt = now / 1000, hv = heroVisible()
    let speed = 0

    if (state === 'rest') {
      const s = spot(blooms[restIdx])
      if (!s || !onscreen(s)) { state = 'fly'; flyTo = null }                       // its flower scrolled away
      else {
        P.x += (s.x - P.x) * 0.14; P.y += (s.y - P.y) * 0.14; rot += (24 - rot) * 0.1; V.x = V.y = 0
        if (now > restUntil && hv) {                                                // idle hop to another bloom
          const opts = visibleBlooms(restIdx)
          if (opts.length) { flyTo = opts[(Math.random() * opts.length) | 0]; state = 'fly'; V.y = -3 } else restUntil = now + 1500
        }
      }
    }

    if (state === 'fly') {
      let tx, ty
      if (follow) {
        if (!cur.has) release()
        else {
          tx = cur.x + Math.cos(tt * 1.9) * 10; ty = cur.y - 4 + Math.sin(tt * 2.6) * 8
          if (now - lastMove > 3000 && hv) { const b = nearest(cur.x, cur.y, 420); if (b !== null) { follow = false; el.value.style.pointerEvents = pe; flyTo = b } }
        }
      }
      if (!follow) {
        if (flyTo !== null) {
          const s = spot(blooms[flyTo])
          if (!s || !onscreen(s)) flyTo = null; else { tx = s.x; ty = s.y }
        }
        if (flyTo === null) {
          const opts = visibleBlooms(restIdx)
          if (opts.length) flyTo = opts[(Math.random() * opts.length) | 0]
          else { tx = P.x + Math.cos(tt * 1.3) * 30; ty = P.y + Math.sin(tt * 1.7) * 20 }
        }
      }
      if (tx !== undefined) {
        V.x = (V.x + (tx - P.x) * 0.02) * 0.89; V.y = (V.y + (ty - P.y) * 0.02) * 0.89   // spring + damping
        P.x += V.x; P.y += V.y
        speed = Math.hypot(V.x, V.y)
        if (speed > 0.7) { const hd = Math.atan2(V.y, V.x) * 180 / Math.PI + 90; rot += (((hd - rot + 540) % 360) - 180) * 0.12 }
        if (!follow && flyTo !== null && Math.hypot(tx - P.x, ty - P.y) < 14 && speed < 2.5) {   // touchdown
          state = 'rest'; restIdx = flyTo; flyTo = null; restUntil = now + 3500 + Math.random() * 3000
        }
      }
    }

    const lv = state === 'rest' ? 'rest' : speed > 4 ? 'fast' : 'mid'
    if (lv !== level) { level = lv; el.value.style.setProperty('--fd', { rest: '1.4s', mid: '.24s', fast: '.14s' }[lv]) }
    const bob = state === 'fly' ? Math.sin(tt * 9) * 1.6 : 0
    el.value.style.transform = `translate3d(${P.x.toFixed(1)}px,${(P.y + bob).toFixed(1)}px,0)`
    rotEl.value.style.transform = `rotate(${rot.toFixed(1)}deg)`
    el.value.classList.toggle('on', hv || follow)

    // little speech label: "Click me" until the first click, "Esc to let go" briefly while following
    const showHint = !touch && ((!clicked && state === 'rest' && hv) || now < hintUntil)
    if (!clicked && !follow) labelText.value = 'Click me'
    lab.value.classList.toggle('on', showHint)

    blooms.forEach(b => {                           // stems lean away from the cursor
      let target = 0
      if (!touch && cur.has && hv) {
        const h = head(b)
        if (h) { const k = Math.max(0, 1 - Math.hypot(h.x - cur.x, h.y - cur.y) / 320); target = (h.x >= cur.x ? 1 : -1) * k * k * 6 }
      }
      const next = b.ang + (target - b.ang) * 0.08
      if (Math.abs(next - b.ang) > 0.003 || Math.abs(next) > 0.003) { b.ang = next; b.n.style.transform = `rotate(${next.toFixed(2)}deg)` }
    })
  }
  raf = requestAnimationFrame(frame)

  cleanup = () => {
    cancelAnimationFrame(raf); clearTimeout(hintTimer)
    removeEventListener('pointermove', onMove); removeEventListener('keydown', onKey)
    document.documentElement.removeEventListener('mouseleave', onLeave)
    el.value?.removeEventListener('click', onClick)
  }
})
onBeforeUnmount(() => cleanup())
</script>

<template>
  <button ref="el" class="bf" type="button" aria-label="Butterfly. Click it to make it follow your cursor; press Escape to let it go.">
    <span ref="rotEl" class="bfr">
      <svg viewBox="-62 -46 124 96" width="68" height="53" aria-hidden="true">
        <defs>
          <radialGradient id="bfw"><stop offset="0" stop-color="#fff" /><stop offset="1" stop-color="#e1e7ed" /></radialGradient>
          <g id="bfh">
            <path d="M0 0C10 -28 42 -40 52 -18C58 -2 34 10 0 4Z" fill="url(#bfw)" stroke="#aeb7c2" stroke-width=".9" />
            <path d="M0 4C26 8 38 24 26 34C14 40 2 22 0 4Z" fill="url(#bfw)" stroke="#aeb7c2" stroke-width=".9" />
            <path d="M2 0L44 -20M2 1L50 -8M2 2L36 12" stroke="#c4ccd5" stroke-width=".6" fill="none" />
            <circle cx="34" cy="-17" r="3.2" fill="#3b3b42" opacity=".8" />
            <path d="M42 -34C52 -28 56 -22 52 -18C50 -26 46 -30 42 -34Z" fill="#6b6c73" opacity=".45" />
          </g>
        </defs>
        <g class="wg"><use href="#bfh" /><use href="#bfh" transform="scale(-1 1)" /></g>
        <ellipse cx="0" cy="3" rx="2.4" ry="11.5" fill="#3f4046" />
        <path d="M-1 -8Q-8 -20 -14 -22M1 -8Q8 -20 14 -22" stroke="#3f4046" stroke-width=".9" fill="none" />
      </svg>
    </span>
    <span ref="lab" class="bfh">{{ labelText }}</span>
  </button>
</template>
