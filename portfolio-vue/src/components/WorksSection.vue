<script setup>
import { ref, computed } from 'vue'
import { works } from '../data'

const filters = ['All', ...new Set(works.flatMap((w) => w.categories))]
const current = ref('All')
const shown = computed(() => current.value === 'All' ? works : works.filter((w) => w.categories.includes(current.value)))
</script>

<template>
  <section id="works" class="section">
    <div class="wrap">
      <h2 class="title">My Recent Works</h2>
      <div class="filters" role="group" aria-label="Filter projects">
        <button v-for="f in filters" :key="f" :class="{ on: current === f }" :aria-pressed="current === f" @click="current = f">{{ f }}</button>
      </div>
      <div class="grid">
        <a v-for="w in shown" :key="w.title" class="card" :href="w.link" target="_blank" rel="noopener"
           :style="{ '--h': w.hue }">
          <div class="art" aria-hidden="true">
            <span class="ghost">{{ w.title.charAt(0) }}</span>
            <div class="chips"><span v-for="t in w.tech" :key="t">{{ t }}</span></div>
          </div>
          <div class="info">
            <h3>{{ w.title }}</h3>
            <p class="kind">{{ w.kind }}</p>
            <p class="text">{{ w.text }}</p>
            <span class="cta">{{ w.cta }} →</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters { display: flex; justify-content: center; gap: .5rem; margin: 2.5rem 0; flex-wrap: wrap; }
.filters button { background: transparent; color: var(--text); border: 1px solid var(--line); border-radius: 8px; padding: .6rem 1.2rem; font: 500 1rem var(--body); transition: all .2s; }
.filters button.on, .filters button:hover { background: var(--text); color: #fff; border-color: var(--text); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); gap: 1.5rem; }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column;
  transition: transform .25s, box-shadow .25s, border-color .25s; }
.card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 10px 30px rgba(0, 0, 0, .07); }
.art { position: relative; aspect-ratio: 16 / 9; display: grid; place-items: center; overflow: hidden;
  background: hsl(var(--h) 30% 94%); }
.ghost { font: 700 7rem var(--head); color: hsl(var(--h) 30% 84%); }
.chips { position: absolute; left: 1rem; bottom: 1rem; display: flex; gap: .4rem; flex-wrap: wrap; }
.chips span { font: 600 .75rem var(--nav); background: #fff; color: var(--text); padding: .25rem .65rem; border-radius: 999px; }
.info { padding: 1.4rem 1.5rem 1.6rem; display: flex; flex-direction: column; gap: .35rem; flex: 1; }
h3 { font: 700 1.5rem var(--head); }
.kind { font-style: italic; color: var(--accent); }
.text { color: var(--muted); font-size: .98rem; }
.cta { margin-top: auto; padding-top: .8rem; color: var(--accent); font: 600 .95rem var(--nav); }
</style>
