<script setup>
/*
  Cinematic title card shown every time the page loads or refreshes: a crimson rule draws across, the name resolves out of a
  blur, then the screen splits open like curtains onto the hero.
  Skip: click, Esc / Enter / Space, or the Skip button. Not shown with prefers-reduced-motion.
*/
import { ref, onMounted, onBeforeUnmount } from 'vue'

const show = ref(false)
const leaving = ref(false)
let timers = []
const html = document.documentElement

function finish() {
  if (!show.value || leaving.value) return
  leaving.value = true
  html.classList.add('go')                         // releases the hero's entrance animations
  timers.push(setTimeout(() => { show.value = false; html.style.overflow = '' }, 1300))
}
const onKey = e => { if (show.value && ['Escape', 'Enter', ' '].includes(e.key)) { e.preventDefault(); finish() } }

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { html.classList.add('go'); return }
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'    // a refresh always starts at the top
  scrollTo({ top: 0, behavior: 'instant' })
  show.value = true; html.style.overflow = 'hidden'
  timers.push(setTimeout(finish, 3900))
  addEventListener('keydown', onKey)
})
onBeforeUnmount(() => { timers.forEach(clearTimeout); removeEventListener('keydown', onKey); html.style.overflow = '' })
</script>

<template>
  <div v-if="show" class="intro" :class="{ out: leaving }" role="presentation" @click="finish">
    <div class="half top"></div>
    <div class="half bot"></div>
    <div class="center">
      <span class="rule"></span>
      <p class="pre">A portfolio by</p>
      <h1 class="nm"><span>Matthew</span><span>Neo</span><span>Adriaanse</span></h1>
      <p class="sub">Full-stack web developer</p>
    </div>
    <button class="skip" @click.stop="finish">Skip ↵</button>
  </div>
</template>
