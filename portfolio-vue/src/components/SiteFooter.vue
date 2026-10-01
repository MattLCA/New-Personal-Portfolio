<script setup>
import { profile } from '../data'
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="wrap row">
      <p>© {{ year }} {{ profile.name }}</p>
      <nav aria-label="Footer">
        <a :href="profile.github" target="_blank" rel="noopener">GitHub</a>
        <a :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="'mailto:' + profile.email">Email</a>
        <a class="top" href="#top">
          Back to top
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
        </a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
footer { background: var(--surface); border-top: 1px solid var(--line); padding-block: 2rem; color: var(--muted); font-size: .95rem; }
.row { display: flex; justify-content: space-between; align-items: center; gap: 1rem 2rem; flex-wrap: wrap; }
nav { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
a { color: var(--muted); text-underline-offset: 4px; }
a:hover { color: var(--accent); }
.top { display: inline-flex; align-items: center; gap: .4rem; font-weight: 600; color: var(--text); text-decoration: none; }
.top svg { width: 1rem; height: 1rem; }
.top:hover { color: var(--accent); }
</style>