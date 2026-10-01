<script setup>
import { projects } from '../data'

// Each card gets a small illustration. Set `preview` on a project in data.js
// ('store' | 'gallery' | 'terminal' | 'page') or let it cycle in order.
const kinds = ['store', 'gallery', 'terminal', 'page']
const kindOf = (p, i) => p.preview || kinds[i % kinds.length]
</script>

<template>
  <section id="projects" class="section">
    <div class="wrap">
      <div class="head">
        <h2>Projects</h2>
        <p>Things I've built while learning, from first scripts to full sites.</p>
      </div>

      <ul class="grid">
        <li v-for="(p, i) in projects" :key="p.title">
          <a class="card" :href="p.link" target="_blank" rel="noopener">
            <div class="preview" aria-hidden="true">
              <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
                <!-- Online store -->
                <template v-if="kindOf(p, i) === 'store'">
                  <rect class="fr" x="40" y="22" width="320" height="181" rx="10" />
                  <path class="sf" d="M40 44V32a10 10 0 0 1 10-10h300a10 10 0 0 1 10 10v12z" />
                  <circle class="ln" cx="54" cy="33" r="3" /><circle class="ln" cx="65" cy="33" r="3" /><circle class="ln" cx="76" cy="33" r="3" />
                  <rect class="ac2" x="54" y="54" width="292" height="74" rx="8" />
                  <rect class="tx" x="70" y="68" width="112" height="9" rx="4.5" />
                  <rect class="mu" x="70" y="85" width="84" height="5" rx="2.5" />
                  <rect class="ac" x="70" y="103" width="46" height="15" rx="7.5" />
                  <path class="ac" d="M262 94h56a28 28 0 0 1-56 0z" />
                  <path class="steam" d="M272 90c0-9 6-12 6-20M290 90c0-9 6-12 6-20M308 90c0-9 6-12 6-20" />
                  <rect class="sf" x="54" y="138" width="92" height="52" rx="8" /><circle class="ac3" cx="72" cy="156" r="9" /><rect class="mu" x="88" y="152" width="44" height="5" rx="2.5" /><rect class="mu" x="88" y="162" width="28" height="5" rx="2.5" />
                  <rect class="sf" x="154" y="138" width="92" height="52" rx="8" /><circle class="ac3" cx="172" cy="156" r="9" /><rect class="mu" x="188" y="152" width="44" height="5" rx="2.5" /><rect class="mu" x="188" y="162" width="28" height="5" rx="2.5" />
                  <rect class="sf" x="254" y="138" width="92" height="52" rx="8" /><circle class="ac3" cx="272" cy="156" r="9" /><rect class="mu" x="288" y="152" width="44" height="5" rx="2.5" /><rect class="mu" x="288" y="162" width="28" height="5" rx="2.5" />
                </template>

                <!-- Gallery -->
                <template v-else-if="kindOf(p, i) === 'gallery'">
                  <rect class="fr" x="40" y="22" width="320" height="181" rx="10" />
                  <path class="sf" d="M40 44V32a10 10 0 0 1 10-10h300a10 10 0 0 1 10 10v12z" />
                  <circle class="ln" cx="54" cy="33" r="3" /><circle class="ln" cx="65" cy="33" r="3" /><circle class="ln" cx="76" cy="33" r="3" />
                  <rect class="ac3" x="56" y="56" width="68" height="60" rx="7" /><rect class="ac2" x="56" y="124" width="68" height="68" rx="7" />
                  <rect class="ac2" x="132" y="56" width="68" height="84" rx="7" /><rect class="ac" x="132" y="148" width="68" height="44" rx="7" />
                  <rect class="ac" x="208" y="56" width="68" height="44" rx="7" /><rect class="ac3" x="208" y="108" width="68" height="84" rx="7" />
                  <rect class="ac2" x="284" y="56" width="62" height="68" rx="7" /><rect class="ac3" x="284" y="132" width="62" height="60" rx="7" />
                </template>

                <!-- Terminal -->
                <template v-else-if="kindOf(p, i) === 'terminal'">
                  <rect class="term" x="40" y="22" width="320" height="181" rx="10" />
                  <circle class="dot" cx="56" cy="38" r="3.5" /><circle class="dot" cx="68" cy="38" r="3.5" /><circle class="dot" cx="80" cy="38" r="3.5" />
                  <text x="58" y="72" class="code"><tspan class="prompt">$</tspan> python toolkit.py</text>
                  <text x="58" y="98" class="code out">1  To-do list</text>
                  <text x="58" y="116" class="code out">2  Grade calculator</text>
                  <text x="58" y="134" class="code out">3  Quiz</text>
                  <text x="58" y="152" class="code out">4  Number guessing game</text>
                  <text x="58" y="180" class="code"><tspan class="prompt">&gt;</tspan> _</text>
                </template>

                <!-- Web page -->
                <template v-else>
                  <rect class="fr" x="40" y="22" width="320" height="181" rx="10" />
                  <path class="sf" d="M40 44V32a10 10 0 0 1 10-10h300a10 10 0 0 1 10 10v12z" />
                  <circle class="ln" cx="54" cy="33" r="3" /><circle class="ln" cx="65" cy="33" r="3" /><circle class="ln" cx="76" cy="33" r="3" />
                  <rect class="tx" x="58" y="64" width="150" height="12" rx="6" />
                  <rect class="tx" x="58" y="84" width="118" height="12" rx="6" />
                  <rect class="mu" x="58" y="108" width="140" height="5" rx="2.5" />
                  <rect class="mu" x="58" y="119" width="108" height="5" rx="2.5" />
                  <rect class="ac" x="58" y="140" width="56" height="17" rx="8.5" />
                  <rect class="mu" x="126" y="146" width="40" height="5" rx="2.5" />
                  <rect class="outline" x="262" y="68" width="84" height="106" rx="12" />
                  <rect class="ac2" x="254" y="60" width="84" height="106" rx="12" />
                  <circle class="ac3" cx="296" cy="96" r="14" />
                  <path class="ac3" d="M268 166v-14a28 24 0 0 1 56 0v14z" />
                </template>
              </svg>
            </div>

            <div class="info">
              <h3>{{ p.title }}</h3>
              <p>{{ p.text }}</p>
              <ul class="tech">
                <li v-for="t in p.tech" :key="t">{{ t }}</li>
              </ul>
              <span class="go">{{ p.cta }} <span class="arrow" aria-hidden="true">↗</span></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.grid { list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
.card { display: flex; flex-direction: column; height: 100%; text-decoration: none; background: var(--surface);
  border: 1px solid var(--line); border-radius: 24px; padding: .65rem; transition: border-color .2s, box-shadow .2s; }
.card:hover, .card:focus-visible { border-color: var(--accent); box-shadow: 0 12px 32px -16px color-mix(in srgb, var(--accent) 45%, transparent); }

.preview { border-radius: 16px; overflow: hidden; aspect-ratio: 16 / 9;
  background: color-mix(in srgb, var(--accent) 9%, var(--bg)); }
.preview svg { width: 100%; height: 100%; display: block; transition: transform .35s; }
.card:hover .preview svg { transform: scale(1.04); }

.info { display: flex; flex-direction: column; flex: 1; padding: 1.25rem .85rem .85rem; }
h3 { font: 600 1.3rem/1.25 var(--sans); letter-spacing: -.02em; margin-bottom: .45rem; }
.info > p { color: var(--muted); margin-bottom: 1.1rem; }
.tech { list-style: none; display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: 1.25rem; }
.tech li { font-size: .86rem; font-weight: 500; background: var(--bg); border: 1px solid var(--line); padding: .12rem .65rem; border-radius: 8px; }
.go { margin-top: auto; color: var(--accent); font-weight: 600; }
.arrow { display: inline-block; transition: transform .2s; }
.card:hover .arrow { transform: translate(3px, -3px); }

/* illustration colors */
.fr { fill: var(--bg); stroke: var(--line); stroke-width: 1.5; }
.sf { fill: var(--surface); } .bg { fill: var(--bg); } .ln { fill: var(--line); }
.ac { fill: var(--accent); }
.ac2 { fill: color-mix(in srgb, var(--accent) 20%, transparent); }
.ac3 { fill: color-mix(in srgb, var(--accent) 45%, transparent); }
.tx { fill: var(--text); } .mu { fill: var(--muted); opacity: .45; }
.steam { fill: none; stroke: var(--accent); stroke-width: 3; stroke-linecap: round; opacity: .6; }
.outline { fill: none; stroke: var(--accent); stroke-width: 2; }
.term { fill: #0f1719; } .dot { fill: #3a4a4d; }
.code { font: 500 12px ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; fill: #d7e3e3; }
.code.out { fill: #93a8ab; } .prompt { fill: #4cc9b0; }

@media (max-width: 820px) { .grid { grid-template-columns: minmax(0, 1fr); } }
</style>