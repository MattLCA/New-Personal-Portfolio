<script setup>
import { ArrowDown } from 'lucide-vue-next'
import FlowerField from './FlowerField.vue'
</script>

<template>
  <div id="top" class="hero">
    <FlowerField />
    <div class="ht">
      <p class="eb">— Hi, I am</p>
      <h1>Matthew<i>.</i></h1>
      <p style="font-size:18px;margin:16px 0 8px">Full-Stack Web Developer</p>
      <p style="max-width:420px;font-size:14px;color:var(--mute);margin:0 0 32px">Developer intern at LC Studio and software development student at Life Choices Academy, building full-stack apps with Vue, Node and MySQL.</p>
      <div class="hb">
        <a class="btn s" href="#projects">View my work</a>
        <a class="btn" href="#contact">Let’s talk</a>
      </div>
      <a class="sc" href="#about"><span class="sci"><ArrowDown :size="15" /></span>Scroll to explore</a>
    </div>
  </div>
</template>