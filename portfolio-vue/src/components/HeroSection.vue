<script setup>
import { profile } from '../data'
</script>

<template>
  <section id="top" class="hero">
    <div class="wrap grid">
      <div class="copy">
        <h1>Software developer building clean, responsive web apps.</h1>
        <p class="lede">
          Hi, I'm Matthew, a software development trainee at Life Choices. I work across the full
          stack and enjoy turning ideas into fast, easy-to-use sites.
        </p>
        <div class="actions">
          <a class="btn" href="#projects">View projects</a>
          <a class="link" :href="'mailto:' + profile.email">Get in touch</a>
        </div>
      </div>
      <figure class="portrait">
        <img :src="profile.photo" alt="Portrait of Matthew" width="360" height="450" />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero { padding-top: clamp(7rem, 14vw, 10rem); padding-bottom: clamp(3.5rem, 8vw, 6rem); }
.grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, .6fr); gap: clamp(2rem, 6vw, 5rem); align-items: center; }
h1 { font: 600 clamp(2.3rem, 5.4vw, 4.2rem)/1.08 var(--sans); letter-spacing: -.035em; max-width: 16ch; }
.lede { color: var(--muted); font-size: 1.2rem; max-width: 46ch; margin: 1.5rem 0 2.25rem; }
.actions { display: flex; align-items: center; gap: 1.75rem; flex-wrap: wrap; }
.btn { background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600;
  padding: .9rem 1.6rem; border-radius: 12px; transition: background .2s; }
.btn:hover { background: var(--accent-hover); }
.link { font-weight: 600; text-underline-offset: 5px; text-decoration-color: var(--accent); text-decoration-thickness: 2px; }
.link:hover { color: var(--accent); }

.portrait { position: relative; justify-self: end; width: min(100%, 340px); }
.portrait::before { content: ''; position: absolute; inset: 0; border: 2px solid var(--accent);
  border-radius: 28px; transform: translate(14px, 14px); }
.portrait img { position: relative; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 28px;
  background: var(--surface); }

@media (max-width: 820px) {
  .grid { grid-template-columns: minmax(0, 1fr); }
  .portrait { order: -1; justify-self: start; width: min(55%, 220px); margin-bottom: .75rem; }
}
</style>