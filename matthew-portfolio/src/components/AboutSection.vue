<script setup>
import { Download, ExternalLink } from 'lucide-vue-next'
import photo from '../assets/me.jpg'
import { profile } from '../data/profile'

// Certifications & education — edit freely
const certs = [
  'Full-Stack Web Development | Life Choices Academy (2026)',
  'Introduction to Cybersecurity | Cisco',
  'Introduction to Data Science | Cisco',
  'Certificate of Excellence, Top Achiever | Life Choices Academy',
  'National Senior Certificate (Matric) | Westridge High School (2022)'
]
</script>

<template>
  <section class="b" id="about">
    <div class="hd" v-reveal>
      <div><p class="eb">About me / 01</p><h2 class="d">About<i>.</i></h2></div>
      <p class="n">Developer, teammate and a big movie fan.</p>
    </div>
    <div class="ab2">
      <figure class="me" v-reveal>
        <div class="frame"><img :src="photo" alt="Matthew smiling" loading="lazy" /></div>
        <figcaption>Based in {{ profile.location }}</figcaption>
      </figure>

      <div class="abt" v-reveal="{ delay: 80 }">
        <p class="lead">I’m a developer intern at LC Studio and a software development student at Life Choices Academy. I enjoy turning ideas into practical full-stack web apps, in a team or on my own.</p>

        <div class="sep two">
          <div>
            <h3>My journey</h3>
            <p>I started in retail at Woolworths, then moved into full-stack development at Life Choices Academy, building real projects in Agile/Scrum teams.</p>
          </div>
          <div>
            <h3>Off the clock</h3>
            <p>Competitive games, the football pitch, hikes and a good film.</p>
          </div>
        </div>

        <div class="sep">
          <h3>Certifications &amp; education</h3>
          <ol class="certs">
            <li v-for="(c, i) in certs" :key="c"><span>0{{ i + 1 }}</span>{{ c }}</li>
          </ol>
        </div>

        <div class="cvb">
          <a class="btn s" :href="profile.cv" download><Download :size="15" /> Download CV</a>
          <a class="btn" :href="profile.cv" target="_blank" rel="noopener"><ExternalLink :size="15" /> View CV</a>
        </div>
      </div>
    </div>
  </section>
</template>