<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { buildFlowers, heroMap, W0, H0 } from '../lib/flowers'

const { dots, blooms } = buildFlowers()       // seeded, so the arrangement is identical on every load
const root = ref(null)
const tf = ref('scale(1)')
const srcs = ref(blooms.map(() => ''))        // bitmap URLs, filled in once rasterised
let ro, rasterScale = 0, gen = 0, urls = []

// Vector petals are expensive to repaint, so draw every bloom to a bitmap once and let the GPU move the bitmaps around.
async function rasterise(scale) {
  const mine = ++gen
  rasterScale = scale
  const next = await Promise.all(blooms.map(async b => {
    const img = new Image(); img.src = b.src
    await img.decode()
    const c = document.createElement('canvas')
    c.width = Math.ceil(b.W * scale); c.height = Math.ceil(b.H * scale)
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
    const blob = await new Promise(r => c.toBlob(r, 'image/png'))
    return URL.createObjectURL(blob)
  }))
  if (mine !== gen) { next.forEach(URL.revokeObjectURL); return }       // a newer pass superseded this one
  const old = urls; urls = next; srcs.value = next
  setTimeout(() => old.forEach(URL.revokeObjectURL), 500)
}

function fit() {
  const r = root.value.getBoundingClientRect()
  const m = heroMap(r.width, r.height, matchMedia('(max-width:760px)').matches ? 'xMax' : 'xMid')
  tf.value = `translate(${m.ox.toFixed(1)}px, ${m.oy.toFixed(1)}px) scale(${m.s.toFixed(4)})`
  const want = Math.min(2.2, Math.max(1, m.s * (devicePixelRatio || 1)))
  if (!rasterScale || want > rasterScale * 1.3 || want < rasterScale / 1.6) rasterise(want)   // only redo on big size changes
}
onMounted(() => { fit(); ro = new ResizeObserver(fit); ro.observe(root.value) })
onBeforeUnmount(() => { ro?.disconnect(); gen++; urls.forEach(URL.revokeObjectURL) })
</script>

<template>
  <div ref="root" class="bg" aria-hidden="true">
    <div class="stage" :style="{ width: W0 + 'px', height: H0 + 'px', transform: tf }">
      <i class="haze"></i><i class="glow"></i>
      <i v-for="(d, k) in dots" :key="k" class="bk" :style="{ left: d.x - d.r + 'px', top: d.y - d.r + 'px', width: d.r * 2 + 'px', height: d.r * 2 + 'px', opacity: d.o }"></i>
      <div v-for="(b, k) in blooms" :key="b.x + '-' + b.y" class="sw" :class="{ back: b.back }"
           :style="{ left: b.x0 + 'px', top: b.y0 + 'px', width: b.W + 'px', height: b.H + 'px',
                     transformOrigin: `${b.bs - b.x0}px ${740 - b.y0}px`, animationDuration: b.dur + 's', animationDelay: '-' + b.del + 's' }">
        <!-- .ln is what the butterfly reads (data-*) and what leans away from the cursor -->
        <div class="ln" :data-bx="b.bs" :data-hx="b.x" :data-hy="b.y" :data-r="b.r" :data-bf="b.bf ? 1 : null"
             :style="{ transformOrigin: `${b.bs - b.x0}px ${740 - b.y0}px` }">
          <img v-if="srcs[k]" :src="srcs[k]" alt="" draggable="false" />
        </div>
      </div>
    </div>
  </div>
</template>
