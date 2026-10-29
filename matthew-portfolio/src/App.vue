<script setup>
import ScrollProgress from './components/ScrollProgress.vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import ButterflyCursor from './components/ButterflyCursor.vue'
import IntroSequence from './components/IntroSequence.vue'
</script>

<template>
  <IntroSequence />
  <ScrollProgress />
  <Navbar />
  <main class="w">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
  </main>
  <ContactSection />
  <ButterflyCursor />
</template>
