<script setup>
import { ref } from 'vue'
import rentosphere from '../assets/projects/rentosphere.jpg'
import hrManagement from '../assets/projects/hr-management.jpg'
import webScraping from '../assets/projects/web-scraping.jpg'
import noodleBar from '../assets/projects/noodle-bar.jpg'

// Edit text/links here. `pos` is the CSS object-position used to crop the picture inside its frame.
// Leave `live` empty to hide the "View project" link.
const projects = [
  { title: 'Rentosphere', tags: ['Vue', 'Express', 'MySQL'], image: rentosphere, pos: 'left center',
    live: 'https://e-commerce-project-ca0q.onrender.com', code: 'https://github.com/TaShepsta/E-Commerce-project',
    desc: 'A team-built rental marketplace connecting product owners with people who need items temporarily, from trailers and tools to appliances and event equipment.',
    more: 'I completed the front-end (browse, categories, cart and checkout, owner listings and earnings, login and signup) and worked on the Node.js and MySQL back-end for users, listings and bookings.' },
  { title: 'HR Management System', tags: ['Node.js', 'Express', 'MySQL', 'JWT'], image: hrManagement, pos: 'center',
    live: 'https://hr-management-ujr8.onrender.com', code: 'https://github.com/MattLCA/Module-2-Core-Project',
    desc: 'A full-stack HR system for ModernTech Solutions with separate portals for HR administrators and employees.',
    more: 'I built the HR section (dashboard, employees, payroll, performance and login) plus the Node.js/Express and MySQL back-end, with JWT login and the payroll and performance APIs. It is deployed live on Render.' },
  { title: 'Web Scraping Analytics Dashboard', tags: ['Vue', 'Flask', 'Python', 'Scrum'], image: webScraping, pos: 'left top',
    live: 'https://lnkd.in/dQS2-fjx', code: 'https://github.com/Khaalid-hattas/Team-Alpha-python-vue-showcase',
    desc: 'A real-time dashboard that scrapes live headlines through a Flask API and shows them in a reactive Vue interface.',
    more: 'A two-week Agile Scrum capstone with Team Alpha. I built the Vue 3 front-end, including the system metrics panel, navbar, front-page blocks and pipeline feed, and merged it with a teammate’s Flask back-end.' },
  { title: 'The Noodle Bar', tags: ['HTML', 'CSS', 'Bootstrap'], image: noodleBar, pos: 'center',
    live: '', code: 'https://github.com/MattLCA/html-bootstrap',
    desc: 'A restaurant concept website that balances editorial storytelling with an animated hero background and a product card layout.',
    more: 'Built with HTML and Bootstrap 5 across four pages (home, products, about and contact), with specials like spicy ramen and veggie options.' }
]
const N = projects.length
const i = ref(0), dx = ref(0), dragging = ref(false)
let startX = 0, moved = 0

const go = n => { i.value = Math.max(0, Math.min(N - 1, n)) }
function down(e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  dragging.value = true; startX = e.clientX; moved = 0
}
function move(e) {
  if (!dragging.value) return
  dx.value = e.clientX - startX; moved = Math.max(moved, Math.abs(dx.value))
}
function up() {
  if (!dragging.value) return
  dragging.value = false
  if (dx.value < -60) go(i.value + 1); else if (dx.value > 60) go(i.value - 1)
  dx.value = 0
}
const pick = k => { if (moved < 6) go(k) }          // click a neighbouring card to bring it to the centre
</script>

<template>
  <section class="b" id="projects">
    <div class="hd" v-reveal>
      <div><p class="eb">Works / 03</p><h2 class="d">Projects<i>.</i></h2></div>
      <p class="n">A curated selection of full-stack applications, client platforms, and responsive layouts.</p>
    </div>

    <div class="car" tabindex="0" role="region" aria-roledescription="carousel" aria-label="Projects"
         @keydown.left.prevent="go(i - 1)" @keydown.right.prevent="go(i + 1)">
      <div class="ctrack" :class="{ drag: dragging }" :style="{ '--i': i, '--dx': dx + 'px' }"
           @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" @pointerleave="up">
        <article v-for="(p, k) in projects" :key="p.title" class="cs" :class="{ on: i === k }"
                 :aria-hidden="i !== k" @click="pick(k)">
          <div class="ci">
            <img :src="p.image" :alt="`${p.title} screenshot`" :style="{ objectPosition: p.pos }" draggable="false" />
            <span class="cn">0{{ k + 1 }}</span>
          </div>
          <div class="cb">
            <div class="tg"><span v-for="t in p.tags" :key="t">{{ t }}</span></div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <p class="more">{{ p.more }}</p>
            <div class="cl">
              <a v-if="p.live" :href="p.live" target="_blank" rel="noopener" :tabindex="i === k ? 0 : -1">View project ↗</a>
              <a v-if="p.code" :href="p.code" target="_blank" rel="noopener" :tabindex="i === k ? 0 : -1" :class="{ dim: p.live }">Code ↗</a>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="cc">
      <button class="ib big" :disabled="i === 0" aria-label="Previous project" @click="go(i - 1)">←</button>
      <div class="cdots" role="tablist">
        <button v-for="(p, k) in projects" :key="p.title" :class="{ on: i === k }" role="tab"
                :aria-selected="i === k" :aria-label="p.title" @click="go(k)"></button>
      </div>
      <span class="cct" aria-live="polite">0{{ i + 1 }} / 0{{ N }}</span>
      <button class="ib big" :disabled="i === N - 1" aria-label="Next project" @click="go(i + 1)">→</button>
    </div>
  </section>
</template>
