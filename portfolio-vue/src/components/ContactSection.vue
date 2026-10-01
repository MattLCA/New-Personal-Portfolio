<script setup>
import { ref, reactive } from 'vue'
import { siGithub } from 'simple-icons'
import { profile } from '../data'

const form = reactive({ name: '', email: '', message: '' })
const status = ref('idle') // idle | sending | sent | error

async function submit() {
  status.value = 'sending'
  try {
    const res = await fetch(profile.formspree, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error('Request failed')
    Object.assign(form, { name: '', email: '', message: '' })
    status.value = 'sent'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section">
    <div class="wrap layout">
      <div class="side">
        <div class="head">
          <h2>Let's work together</h2>
          <p>Got a project, a job opening or a question? Send a message and I'll reply.</p>
        </div>

        <ul class="links">
          <li>
            <a :href="'mailto:' + profile.email">
              <span class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span class="txt"><b>Email</b><span>{{ profile.email }}</span></span>
              <span class="arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a :href="profile.github" target="_blank" rel="noopener">
              <span class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path :d="siGithub.path" /></svg>
              </span>
              <span class="txt"><b>GitHub</b><span>github.com/MattLCA</span></span>
              <span class="arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a :href="profile.linkedin" target="_blank" rel="noopener">
              <span class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                </svg>
              </span>
              <span class="txt"><b>LinkedIn</b><span>Matthew Adriaanse</span></span>
              <span class="arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="panel">
        <div v-if="status === 'sent'" class="done" role="status">
          <span class="ico big" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </span>
          <h3>Message sent</h3>
          <p>Thanks for reaching out. I'll get back to you soon.</p>
          <button type="button" class="ghost" @click="status = 'idle'">Send another message</button>
        </div>

        <form v-else @submit.prevent="submit">
          <div class="two">
            <label>Your name<input v-model.trim="form.name" name="name" autocomplete="name" required /></label>
            <label>Your email<input v-model.trim="form.email" name="email" type="email" autocomplete="email" required /></label>
          </div>
          <label>Message<textarea v-model.trim="form.message" name="message" rows="6" required></textarea></label>
          <button type="submit" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending…' : 'Send message' }}
            <svg v-if="status !== 'sending'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
          <p v-if="status === 'error'" class="err" role="alert">
            The message didn't send. Check your connection and try again, or email me directly.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(2rem, 6vw, 5rem); align-items: start; }
.head { margin-bottom: 2rem; }
.links { list-style: none; display: grid; gap: .75rem; }
.links a { display: flex; align-items: center; gap: 1rem; text-decoration: none; padding: .9rem 1rem;
  border: 1px solid var(--line); border-radius: 16px; transition: border-color .2s, background .2s; }
.links a:hover, .links a:focus-visible { border-color: var(--accent); background: var(--surface); }
.txt { display: grid; min-width: 0; flex: 1; line-height: 1.35; }
.txt b { font-weight: 600; }
.txt span { color: var(--muted); font-size: .95rem; overflow-wrap: anywhere; }
.arrow { color: var(--accent); font-weight: 600; transition: transform .2s; }
.links a:hover .arrow { transform: translate(3px, -3px); }
.ico { flex: none; width: 2.75rem; height: 2.75rem; border-radius: 12px; display: grid; place-items: center;
  color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent); }
.ico svg { width: 1.3rem; height: 1.3rem; }

.panel { background: var(--surface); border: 1px solid var(--line); border-radius: 28px; padding: clamp(1.4rem, 3vw, 2.25rem); }
form { display: grid; gap: 1.1rem; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
label { display: grid; gap: .4rem; font-weight: 600; font-size: .95rem; }
input, textarea { font: inherit; font-weight: 400; color: var(--text); background: var(--bg);
  border: 1px solid var(--line); border-radius: 12px; padding: .8rem 1rem; resize: vertical; width: 100%; }
input:focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent); }
button { justify-self: start; display: inline-flex; align-items: center; gap: .6rem; font: 600 1rem var(--sans);
  background: var(--accent); color: var(--on-accent); border: 0; border-radius: 12px; padding: .9rem 1.6rem; cursor: pointer; transition: background .2s; }
button svg { width: 1.05rem; height: 1.05rem; }
button:hover:not(:disabled) { background: var(--accent-hover); }
button:disabled { opacity: .6; cursor: wait; }
.err { color: var(--error); font-weight: 500; }

.done { text-align: center; padding: 2rem 0; display: grid; justify-items: center; gap: .6rem; }
.ico.big { width: 3.5rem; height: 3.5rem; border-radius: 50%; }
.ico.big svg { width: 1.6rem; height: 1.6rem; }
.done h3 { font: 600 1.5rem var(--sans); letter-spacing: -.02em; }
.done p { color: var(--muted); }
.ghost { background: transparent; color: var(--text); border: 1px solid var(--line); margin-top: .75rem; justify-self: center; }
.ghost:hover:not(:disabled) { background: var(--bg); border-color: var(--accent); }

@media (max-width: 860px) { .layout { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 520px) { .two { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 440px) {
  .links a { gap: .75rem; padding: .8rem; }
  .txt span { font-size: .85rem; }
}
@media (max-width: 380px) {
  .arrow { display: none; }
  .txt span { font-size: .78rem; }
}
</style>