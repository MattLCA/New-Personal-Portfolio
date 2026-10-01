<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { nav, profile } from '../data'

const active = ref('')
const open = ref(false)
const scrolled = ref(false)
let io
const onScroll = () => { scrolled.value = window.scrollY > 8 }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) active.value = e.target.id }),
    { rootMargin: '-45% 0px -50% 0px' }
  )
  nav.forEach((n) => { const el = document.getElementById(n.id); el && io.observe(el) })
})
onUnmounted(() => { window.removeEventListener('scroll', onScroll); io && io.disconnect() })
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <div class="wrap bar">
      <a class="brand" href="#top">{{ profile.name.replace(' Neo', '') }}</a>
      <button class="burger" :aria-expanded="open" aria-controls="nav-links" @click="open = !open">
        {{ open ? 'Close' : 'Menu' }}
      </button>
      <nav id="nav-links" :class="{ open }" aria-label="Main">
        <a v-for="n in nav" :key="n.id" :href="'#' + n.id"
           :class="{ on: active === n.id }" @click="open = false">{{ n.label }}</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav { position: fixed; inset: 0 0 auto 0; z-index: 20; border-bottom: 1px solid transparent;
  background: color-mix(in srgb, var(--bg) 85%, transparent); backdrop-filter: blur(12px);
  transition: border-color .25s; }
.nav.scrolled { border-bottom-color: var(--line); }
.bar { display: flex; align-items: center; justify-content: space-between; height: 4rem; }
.brand { font-weight: 600; text-decoration: none; letter-spacing: -.01em; }
nav { display: flex; gap: 2rem; }
nav a { text-decoration: none; color: var(--muted); font-weight: 500; font-size: .98rem; padding: .3rem 0;
  border-bottom: 2px solid transparent; transition: color .2s, border-color .2s; }
nav a:hover { color: var(--text); }
nav a.on { color: var(--text); border-bottom-color: var(--accent); }
.burger { display: none; background: none; border: 1px solid var(--line); color: var(--text);
  font: 500 .92rem var(--sans); padding: .4rem .9rem; border-radius: 8px; cursor: pointer; }
@media (max-width: 640px) {
  .burger { display: block; }
  nav { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; gap: 0; display: none;
    background: var(--bg); border-bottom: 1px solid var(--line); padding: .5rem var(--pad) 1rem; }
  nav.open { display: flex; }
  nav a { padding: .85rem 0; border-bottom: 0; }
  nav a.on { color: var(--accent); }
}
</style>