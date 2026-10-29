<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const p = ref(0)
let raf = 0
const update = () => {
  raf = 0
  const max = document.documentElement.scrollHeight - innerHeight
  p.value = max > 0 ? scrollY / max : 0
}
const onScroll = () => { raf ||= requestAnimationFrame(update) }
onMounted(() => { update(); addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
</script>

<template><div id="pr" :style="{ transform: `scaleX(${p})` }"></div></template>
