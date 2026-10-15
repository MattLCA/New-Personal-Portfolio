<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { nav } from '../data'

const open = ref(false)
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 8 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <div class="wrap bar">
      <a class="logo" href="#top" aria-label="Home">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M8 38V12l16 18 16-18v26" />
        </svg>
      </a>
      <button class="burger" :aria-expanded="open" aria-controls="links" @click="open = !open">{{ open ? 'Close' : 'Menu' }}</button>
      <nav id="links" :class="{ open }" aria-label="Main">
        <a v-for="n in nav" :key="n.id" :href="'#' + n.id" @click="open = false">{{ n.label }}</a>
        <a class="btn hire" href="#contact" @click="open = false">Hire me!</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav { position: fixed; inset: 0 0 auto 0; z-index: 20; transition: background .3s, border-color .3s; border-bottom: 1px solid transparent; }
.nav.scrolled { background: rgba(250, 250, 249, .85); backdrop-filter: blur(12px); border-bottom-color: var(--line); }
.bar { display: flex; align-items: center; justify-content: space-between; height: 5rem; }
.logo { width: 2.8rem; height: 2.8rem; color: var(--text); }
nav { display: flex; align-items: center; gap: 2.2rem; }
nav a:not(.btn) { font: 500 .95rem var(--nav); letter-spacing: .1em; text-transform: uppercase; transition: color .2s; }
nav a:not(.btn):hover { color: var(--accent); }
.hire { border-radius: 8px; padding: .8rem 1.6rem; text-transform: uppercase; letter-spacing: .1em; font-size: .95rem; }
.burger { display: none; background: none; border: 1px solid var(--line); color: var(--text); padding: .45rem .9rem; border-radius: 8px; }
@media (max-width: 960px) {
  .burger { display: block; }
  nav { position: absolute; top: 5rem; left: 0; right: 0; flex-direction: column; align-items: flex-start; gap: 1.2rem;
    padding: 1.5rem var(--pad); background: rgba(250, 250, 249, .98); border-bottom: 1px solid var(--line); display: none; }
  nav.open { display: flex; }
}
</style>
