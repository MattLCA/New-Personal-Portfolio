<script setup>
import { resume } from '../data'
const cols = [
  { heading: 'My Experience', items: resume.experience },
  { heading: 'My Education', items: resume.education },
]
</script>

<template>
  <section id="resume" class="section dark">
    <div class="wrap cols">
      <div v-for="c in cols" :key="c.heading">
        <h2>{{ c.heading }}</h2>
        <ul>
          <li v-for="it in c.items" :key="it.title">
            <p class="period">{{ it.period }}</p>
            <h3>{{ it.title }}</h3>
            <p class="place">{{ it.place }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
h2 { font: 700 clamp(1.8rem, 4vw, 2.6rem) var(--head); margin-bottom: 2rem; color: var(--text); }
li { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 2rem 2.4rem; transition: border-color .3s; }
li:hover { border-color: var(--accent); }
.period { font: 600 1.1rem var(--head); color: var(--accent); }
h3 { font: 700 1.6rem var(--head); text-transform: uppercase; margin: .4rem 0; }
@media (max-width: 860px) { .cols { grid-template-columns: 1fr; } }
</style>
