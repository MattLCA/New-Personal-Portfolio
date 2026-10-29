<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// m = legend on the keycap, ac = brand accent, k = keyboard shortcut, f = click pitch (Hz)
const keys = [
  { m: 'Py',  l: 'Python',     r: 'Scripting',       ac: '#3776AB', k: 'p', f: 520 },
  { m: 'JS',  l: 'JavaScript', r: 'Interaction',     ac: '#D4A100', k: 'j', f: 560 },
  { m: '⬢',   l: 'Node.js',    r: 'Back-End',        ac: '#3C873A', k: 'n', f: 480 },
  { m: 'V',   l: 'Vue.js',     r: 'Front-End',       ac: '#2F9E6F', k: 'v', f: 640 },
  { m: 'php', l: 'PHP',        r: 'Server',          ac: '#6A6FAE', k: 'x', f: 440 },
  { m: '‹/›', l: 'HTML',       r: 'Structure',       ac: '#E34F26', k: 'h', f: 600 },
  { m: '{ }', l: 'CSS',        r: 'Style',           ac: '#2965F1', k: 'c', f: 580 },
  { m: 'B',   l: 'Bootstrap',  r: 'UI Framework',    ac: '#7952B3', k: 'b', f: 500 },
  { m: 'SQL', l: 'MySQL',      r: 'Database',        ac: '#00758F', k: 'm', f: 420 },
  { m: 'Git', l: 'Github',     r: 'Version Control', ac: '#24292F', k: 'g', f: 380 }
]

const down = ref(new Set())
const sound = ref(true)
const readout = ref('Tap a key, or press P J N V X H C B M G')
const scene = ref(null)
let ctx, io
const timers = []

function beep(freq) {
  if (!sound.value) return
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)()
    const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain()
    o.type = 'square'
    o.frequency.setValueAtTime(freq, t)
    o.frequency.exponentialRampToValueAtTime(freq / 3, t + 0.05)
    g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.07)
  } catch { /* audio unavailable: visuals still work */ }
}
function press(i, quiet = false) {
  if (down.value.has(i)) return
  down.value = new Set(down.value).add(i)
  if (!quiet) beep(keys[i].f)
  readout.value = `${keys[i].l} — ${keys[i].r}`
}
function release(i) {
  const s = new Set(down.value); s.delete(i); down.value = s
}
const idx = e => keys.findIndex(k => k.k === e.key.toLowerCase())
const onDown = e => {
  if (e.repeat || e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return
  const i = idx(e); if (i > -1) press(i)
}
const onUp = e => { const i = idx(e); if (i > -1) release(i) }

onMounted(() => {
  addEventListener('keydown', onDown); addEventListener('keyup', onUp)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // one silent "typing" pass the first time the keypad scrolls into view
  io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    io.disconnect()
    keys.forEach((_, i) => timers.push(setTimeout(() => { press(i, true); timers.push(setTimeout(() => release(i), 160)) }, 400 + i * 130)))
  }, { threshold: 0.5 })
  io.observe(scene.value)
})
onBeforeUnmount(() => {
  removeEventListener('keydown', onDown); removeEventListener('keyup', onUp)
  io?.disconnect(); timers.forEach(clearTimeout)
})
</script>

<template>
  <section class="b" id="skills">
    <div class="hd" v-reveal>
      <div><p class="eb">The toolkit / 04</p><h2 class="d">Skills<i>.</i></h2></div>
      <p class="n">From the first line to the final pixel. A fast stack, built with intention.</p>
    </div>

    <p class="hint" style="margin:24px 0 0">(hint: press a key)</p>
    <div ref="scene" class="scene" aria-label="Interactive keypad. Click a key or press its shortcut letter.">
      <div class="board">
        <div class="plate"><i class="pf pf1"></i><i class="pf pf2"></i></div>
        <div class="keys">
          <div v-for="(k, i) in keys" :key="k.l" class="slot" :class="{ on: down.has(i) }"
               role="button" tabindex="0" :aria-label="k.l" :style="{ '--ac': k.ac }"
               @pointerdown.prevent="press(i)" @pointerup="release(i)" @pointerleave="release(i)"
               @keydown.enter.space.prevent="press(i)" @keyup="release(i)">
            <span class="key">
              <!-- 11 stacked, shrinking rounded slices = a tapered keycap with real depth -->
              <i v-for="n in 11" :key="n" class="ly" :class="{ tp: n === 11 }" :style="{ '--i': n - 1 }">
                <template v-if="n === 11"><span class="mk">{{ k.m }}</span><small>{{ k.l }}</small></template>
              </i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="ro" v-reveal>
      <span aria-live="polite">{{ readout }}</span>
      <button @click="sound = !sound">Sound: {{ sound ? 'on' : 'off' }}</button>
    </div>

    <ul class="lg">
      <li v-for="(k, i) in keys" :key="k.l" :style="{ '--ac': k.ac }" v-reveal="{ delay: (i % 5) * 60 }">
        <b>{{ k.l }}</b><span>{{ k.r }}</span>
      </li>
    </ul>
  </section>
</template>
