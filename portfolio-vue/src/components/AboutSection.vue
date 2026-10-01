<script setup>
import { about, facts } from '../data'

// Feather-style line icons, one per fact (briefcase, compass, bolt)
const icons = [
  '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
]
</script>

<template>
  <section id="about" class="section alt">
    <div class="wrap">
      <div class="head"><h2>About me</h2></div>
      <div class="grid">
        <div class="text">
          <p class="lead">{{ about[0] }}</p>
          <p v-for="p in about.slice(1)" :key="p" class="more">{{ p }}</p>
        </div>
        <ul class="snapshot">
          <li v-for="(f, i) in facts" :key="f.label">
            <span class="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                   stroke-linecap="round" stroke-linejoin="round" v-html="icons[i % icons.length]"></svg>
            </span>
            <div>
              <h3>{{ f.label }}</h3>
              <p>{{ f.value }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head { margin-bottom: clamp(1.75rem, 4vw, 2.75rem); }
.grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr); gap: clamp(2rem, 6vw, 5rem); align-items: start; }
.lead { font-size: clamp(1.35rem, 2.5vw, 1.8rem); line-height: 1.35; letter-spacing: -.02em; font-weight: 500; margin-bottom: 1.5rem; }
.more { color: var(--muted); max-width: 60ch; margin-bottom: 1.1rem; }

.snapshot { list-style: none; background: var(--bg); border: 1px solid var(--line); border-radius: 24px; padding: .5rem 1.5rem; }
.snapshot li { display: flex; gap: 1rem; padding: 1.25rem 0; }
.snapshot li + li { border-top: 1px solid var(--line); }
.ico { flex: none; width: 2.75rem; height: 2.75rem; border-radius: 12px; display: grid; place-items: center;
  color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); }
.ico svg { width: 1.3rem; height: 1.3rem; }
h3 { font: 600 1.05rem/1.3 var(--sans); margin-bottom: .15rem; }
.snapshot p { color: var(--muted); font-size: .98rem; line-height: 1.5; }
@media (max-width: 860px) { .grid { grid-template-columns: minmax(0, 1fr); } }
</style>