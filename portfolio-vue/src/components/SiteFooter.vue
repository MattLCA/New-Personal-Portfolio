<script setup>
import { profile } from '../data'
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="wrap">
      <p>© {{ year }} {{ profile.name }}</p>
      <a :href="profile.github" target="_blank" rel="noopener">GitHub</a>
    </div>
  </footer>
</template>

<style scoped>
footer { border-top: 1px solid var(--line); padding: 2rem 0; color: var(--muted); font-size: .95rem; }
.wrap { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
a:hover { color: var(--accent-2); }
</style>
