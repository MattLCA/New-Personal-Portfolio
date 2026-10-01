<script setup>
import { siHtml5, siCss, siJavascript, siVuedotjs, siBootstrap, siPython, siGit, siGithub } from 'simple-icons'
import { skills } from '../data'

// Brand icons by skill name. Anything not listed (like VS Code) falls back to a code icon.
const brand = {
  'html5': siHtml5, 'css3': siCss, 'javascript': siJavascript, 'vue.js': siVuedotjs,
  'bootstrap': siBootstrap, 'python': siPython, 'git': siGit, 'github': siGithub,
}
const tiles = skills.flatMap((g) => g.items.map((name) => ({ name, group: g.group, icon: brand[name.toLowerCase()] })))
</script>

<template>
  <section id="skills" class="section alt">
    <div class="wrap">
      <div class="head">
        <h2>Skills</h2>
        <p>The languages and tools I use to build responsive, user-friendly apps.</p>
      </div>
      <ul class="grid">
        <li v-for="t in tiles" :key="t.name">
          <span class="ico" aria-hidden="true">
            <svg v-if="t.icon" viewBox="0 0 24 24" fill="currentColor"><path :d="t.icon.path" /></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                 stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <div>
            <h3>{{ t.name }}</h3>
            <p>{{ t.group }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.grid { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.grid li { display: flex; align-items: center; gap: 1rem; background: var(--bg); border: 1px solid var(--line);
  border-radius: 18px; padding: 1.1rem 1.25rem; transition: border-color .2s; }
.grid li:hover { border-color: var(--accent); }
.ico { flex: none; width: 3rem; height: 3rem; border-radius: 14px; display: grid; place-items: center;
  color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); }
.ico svg { width: 1.5rem; height: 1.5rem; }
h3 { font: 600 1.05rem/1.3 var(--sans); }
p { color: var(--muted); font-size: .9rem; line-height: 1.4; }
@media (max-width: 820px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 440px) { .grid li { padding: .9rem; gap: .75rem; } .ico { width: 2.6rem; height: 2.6rem; } }
</style>