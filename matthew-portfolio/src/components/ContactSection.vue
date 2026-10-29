<script setup>
import { ref } from 'vue'
import { Mail, Phone, Linkedin, Github } from 'lucide-vue-next'
import { profile, pretty } from '../data/profile'

const name = ref(''), email = ref(''), message = ref('')
const sent = ref(false)

// No back-end: this opens the visitor's email app with the message filled in.
// To receive messages directly, swap this for a form service (Formspree, Web3Forms, …) or your own API.
function send() {
  const body = `${message.value}\n\n— ${name.value} (${email.value})`
  location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio message from ${name.value}`)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <footer id="contact" class="ct">
    <div class="w2">
      <div v-reveal>
        <h2>Let’s<br /><i>connect.</i></h2>
        <p class="ctp">I’m open to conversations about developer roles, internships and teams doing meaningful work.</p>
        <form @submit.prevent="send">
          <input v-model.trim="name" type="text" placeholder="Your Name" required autocomplete="name" aria-label="Your name" />
          <input v-model.trim="email" type="email" placeholder="Your Email" required autocomplete="email" aria-label="Your email" />
          <textarea v-model.trim="message" placeholder="Your Message" rows="6" required aria-label="Your message"></textarea>
          <button type="submit" class="send">Send Message</button>
          <p v-if="sent" class="ok" role="status">Opening your email app… if nothing happens, write to {{ profile.email }}.</p>
        </form>
      </div>
      <aside v-reveal="{ delay: 100 }">
        <div class="card2">
          <p class="eb">Find me here</p>
          <h3>Connect with me</h3>
          <ul>
            <li><Mail :size="18" /><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></li>
            <li><Phone :size="18" /><a :href="`tel:${profile.phone.replace(/\s/g, '')}`">{{ profile.phone }}</a></li>
            <li v-if="profile.linkedin"><Linkedin :size="18" /><span class="lab">LinkedIn:</span><a :href="profile.linkedin" target="_blank" rel="noopener">{{ pretty(profile.linkedin) }}</a></li>
            <li><Github :size="18" /><span class="lab">GitHub:</span><a :href="profile.github" target="_blank" rel="noopener">{{ pretty(profile.github) }}</a></li>
          </ul>
        </div>
      </aside>
    </div>
    <div class="w2 cp2"><span>© 2026 {{ profile.name }}</span><span>Built with Vue 3 &amp; Tailwind</span></div>
  </footer>
</template>
