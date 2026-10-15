<script setup>
import { profile } from '../data'
import { siGithub } from 'simple-icons'
</script>

<template>
  <section id="top" class="hero">
    
    <div class="wrap grid">
      <div class="copy">
        <p class="hi">I am {{ profile.firstName }}</p>
        <h1>{{ profile.role }} <span class="amp">+</span> Problem Solver</h1>
        <p class="lead">{{ profile.tagline }}</p>
        <div class="actions">
          <a class="btn" href="#works">View my work</a>
          <a class="soc" :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path :d="siGithub.path" /></svg>
          </a>
          <a class="soc" :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a class="soc" :href="'mailto:' + profile.email" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
      <div class="photo">
        <img :src="profile.photo" :alt="'Portrait of ' + profile.name" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; padding: 7rem 0 4rem; overflow: hidden; }
.grid { position: relative; display: grid; grid-template-columns: 1.1fr .9fr; gap: 3rem; align-items: center; }
.hi { font: 600 clamp(1.3rem, 3vw, 1.8rem) var(--head); color: var(--muted); }
h1 { font: 700 clamp(2.6rem, 6.5vw, 4.4rem)/1.1 var(--head); margin: 1.2rem 0 1.6rem; color: var(--text); letter-spacing: -.02em; }
.lead { font-size: 1.2rem; color: var(--muted); max-width: 34rem; }
.actions { display: flex; align-items: center; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap; }
.soc { width: 3.2rem; height: 3.2rem; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center;
  color: var(--text); transition: background .2s, color .2s, border-color .2s; }
.soc:hover { background: var(--text); color: #fff; border-color: var(--text); }
.soc svg { width: 1.3rem; height: 1.3rem; }
.photo { justify-self: center; width: min(100%, 460px); aspect-ratio: 1; border-radius: 24px;
  border: 1px solid var(--line); overflow: hidden; }
.photo img { width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 860px) {
  .grid { grid-template-columns: 1fr; }
  .photo { order: -1; width: min(70%, 320px); }
}
</style>
