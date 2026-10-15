<script setup>
import { ref, reactive } from 'vue'
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
  <section id="contact" class="section dark">
    <div class="wrap">
      <h2 class="title">Let's Work Together</h2>
      <p class="sub">Got a project, a job opening or a question? Send a message and I'll reply.</p>
      <div class="panel">
        <div v-if="status === 'sent'" class="done" role="status">
          <h3>Message sent</h3>
          <p>Thanks for reaching out. I'll get back to you soon.</p>
          <button class="btn" type="button" @click="status = 'idle'">Send another</button>
        </div>
        <form v-else @submit.prevent="submit">
          <label>Name<input v-model.trim="form.name" required autocomplete="name" /></label>
          <label>Email<input v-model.trim="form.email" type="email" required autocomplete="email" /></label>
          <label>Message<textarea v-model.trim="form.message" rows="5" required></textarea></label>
          <p v-if="status === 'error'" class="err" role="alert">Something went wrong. Please try again or email me directly.</p>
          <button class="btn" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? 'Sending…' : 'Send message' }}</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.panel { max-width: 640px; margin: 0 auto; background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: clamp(1.5rem, 4vw, 2.5rem); }
form { display: grid; gap: 1.2rem; }
label { display: grid; gap: .4rem; font: 600 .9rem var(--nav); letter-spacing: .04em; }
input, textarea { background: var(--bg); border: 1px solid var(--line); border-radius: 8px; color: var(--text); padding: .8rem 1rem; font: 400 1rem var(--body); }
input:focus, textarea:focus { outline: 2px solid var(--accent); border-color: transparent; }
.err { color: #b42318; }
.done { text-align: center; display: grid; gap: 1rem; justify-items: center; }
.done h3 { font: 800 1.8rem var(--head); }
</style>
