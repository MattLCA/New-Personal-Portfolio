<script setup>
import { ref } from 'vue'
import { services } from '../data'
const active = ref(2)
</script>

<template>
  <section id="services" class="section dark">
    <div class="wrap">
      <h2 class="title">My Quality Services</h2>
      <p class="sub">Clear, reliable web projects built around what you need.</p>
      <ul class="list">
        <li v-for="(s, i) in services" :key="s.title" :class="{ on: active === i }"
            @mouseenter="active = i" @focusin="active = i" tabindex="0">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
          <span class="arrow" aria-hidden="true">{{ active === i ? '↗' : '↘' }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.list li { display: grid; grid-template-columns: 5rem 1fr 1.6fr 3rem; align-items: center; gap: 1.5rem;
  padding: 2.4rem 2rem; border-bottom: 1px solid var(--line); transition: background .35s; outline-offset: -2px; }
.list li.on { background: var(--grad); }
.num { font: 700 1.2rem var(--head); color: var(--muted); }
.on .num, .on .arrow { color: var(--accent); }
.arrow { font-size: 1.8rem; font-weight: 700; color: var(--muted); text-align: right; }
.on .arrow { color: #fff; }
@media (max-width: 760px) {
  .list li { grid-template-columns: 3rem 1fr 2rem; padding: 1.6rem 1rem; }
  .list p { grid-column: 2 / 3; grid-row: 2; }
}
</style>
