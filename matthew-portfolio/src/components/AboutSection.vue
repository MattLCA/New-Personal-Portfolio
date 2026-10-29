<script setup>
import photo from '../assets/me.jpg'

const facts = [
  { k: 'Currently', v: 'Developer Intern, LC Studio' },
  { k: 'Studying', v: 'Software Development, Life Choices Academy' },
  { k: 'Focus', v: 'Vue · Node.js · MySQL' },
  { k: 'Languages', v: 'English · Afrikaans' },
  { k: 'Based in', v: 'Cape Town, South Africa' }
]
const softSkills = ['Active listening', 'Collaboration', 'Conflict resolution', 'Critical thinking', 'Management', 'Patience']
const interests = ['Competitive gaming', 'Football', 'Hiking', 'Movies']
</script>

<template>
  <section class="b" id="about">
    <div class="hd" v-reveal>
      <div><p class="eb">About me / 01</p><h2 class="d">About<i>.</i></h2></div>
      <p class="n">Developer, teammate and a big movie fan.</p>
    </div>
    <div class="ab2">
      <figure class="me" v-reveal>
        <div class="frame"><img :src="photo" alt="Matthew looking out over the sea" loading="lazy" /></div>
      </figure>
      <div class="abt" v-reveal="{ delay: 80 }">
        <p>I’m a developer currently interning at LC Studio, a youth talent incubator, where I work on real-world projects, sharpen my team workflows and learn to deliver high-quality code.</p>
        <p>I’m also a software development student at Life Choices Academy, where I’ve built full-stack apps in Agile/Scrum teams. I take instruction well, work just as well on my own, and like working out exactly what a task needs before delivering something the team can rely on. I’m eager to keep growing and turn my training into job-ready skills.</p>
        <p>Away from the screen I love competitive games, the football pitch, hikes and a good film. A tough match or a tricky bug, I enjoy the challenge and working well with a team.</p>
        <dl><div v-for="f in facts" :key="f.k"><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div></dl>
        <p class="chl">How I work</p>
        <ul class="ch"><li v-for="i in softSkills" :key="i">{{ i }}</li></ul>
        <p class="chl">Off the clock</p>
        <ul class="ch"><li v-for="i in interests" :key="i">{{ i }}</li></ul>
      </div>
    </div>
  </section>
</template>
