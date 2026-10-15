<script setup>
import { skills } from '../data'
</script>

<template>
  <section id="skills" class="section">
    <div class="wrap">
      <h2 class="title">My Skills</h2>
      <p class="sub">The languages and tools I use to build and ship projects.</p>
      <ul class="grid">
        <li v-for="s in skills" :key="s.name" tabindex="0" :style="{ '--c': s.color }">
          <div class="box">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="s.path" /></svg>
          </div>
          <span>{{ s.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1.5rem; }
li { display: flex; flex-direction: column; align-items: center; gap: 1.2rem; outline: none; }
.box { width: 100%; max-width: 170px; aspect-ratio: 1; display: grid; place-items: center; border-radius: 28px;
  border: 1px solid transparent; color: #8d8799; transition: all .3s; }
.box svg { width: 3.6rem; height: 3.6rem; }
span { font: 500 1.05rem var(--body); color: var(--accent-2); }
li:hover .box, li:focus-visible .box { border-color: var(--line); background: var(--card); color: var(--c); transform: translateY(-4px); }
</style>
