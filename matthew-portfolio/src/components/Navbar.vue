<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Github, Linkedin, Mail, Sun, Moon } from 'lucide-vue-next'
import { profile } from '../data/profile'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
]
const active = ref('')
const scrolled = ref(false)
const open = ref(false)
const dark = ref(document.documentElement.dataset.theme === 'dark')
let io
const onScroll = () => { scrolled.value = scrollY > 8 }

function toggleTheme() {
  const root = document.documentElement
  dark.value = !dark.value
  if (dark.value) root.dataset.theme = 'dark'; else delete root.dataset.theme
  try { localStorage.setItem('theme', dark.value ? 'dark' : 'light') } catch { /* storage unavailable */ }
}

onMounted(() => {
  onScroll(); addEventListener('scroll', onScroll, { passive: true })
  io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) active.value = `#${e.target.id}` }),
    { rootMargin: '-40% 0px -55% 0px' }
  )
  links.forEach(l => { const el = document.querySelector(l.href); if (el) io.observe(el) })
})
onBeforeUnmount(() => { removeEventListener('scroll', onScroll); io?.disconnect() })
</script>

<template>
  <header class="fl" :class="{ s: scrolled }">
    <nav class="nb" aria-label="Primary">
      <a href="#top" class="lo"><b>m<i>.</i></b></a>
      <ul>
        <li v-for="l in links" :key="l.href">
          <a :href="l.href" :class="{ act: active === l.href }">{{ l.label }}</a>
        </li>
      </ul>
      <button class="mb" :aria-expanded="open" @click="open = !open">Menu <span class="bars"></span></button>
      <div class="soc">
        <a class="ib" :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub"><Github :size="16" /></a>
        <a v-if="profile.linkedin" class="ib" :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><Linkedin :size="16" /></a>
        <a class="ib" :href="`mailto:${profile.email}`" aria-label="Email me"><Mail :size="16" /></a>
        <button class="ib" :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'" :aria-pressed="dark" @click="toggleTheme">
          <Sun v-if="dark" :size="16" /><Moon v-else :size="16" />
        </button>
      </div>
    </nav>
    <ul v-if="open" class="dd">
      <li v-for="l in links" :key="l.href"><a :href="l.href" @click="open = false">{{ l.label }}</a></li>
    </ul>
  </header>
</template>
