<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import WorksSection from './components/WorksSection.vue'
import ResumeSection from './components/ResumeSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <NavBar />
  <main id="main">
    <HeroSection />
    <ServicesSection />
    <WorksSection />
    <ResumeSection />
    <SkillsSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
