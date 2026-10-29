<script setup>
// Edit these entries (details come from your CV).
const jobs = [
  { role: 'Intern', company: 'LC Studio', dates: '2026 – Present',
    points: ['Gaining practical, real-world experience in a working studio alongside experienced professionals.',
             'Applying the web development skills built at Life Choices Academy to real tasks and deliverables.',
             'Collaborating with the team, taking feedback on board and growing in speed and quality of work.'] },
  { role: 'Software Development Student', company: 'Life Choices Academy', dates: '2026 – Present',
    points: ['Progressed through the programme’s modules, building real projects in teams using Agile/Scrum practices.',
             'HR Management System: built the HR section and the Node.js/Express and MySQL back-end with JWT login, payroll and performance APIs.',
             'Rentosphere: completed the front-end and worked on the Node.js and MySQL back-end (users, listings and bookings).',
             'Web Scraping Analytics Dashboard: built the Vue 3 front-end and merged it with a teammate’s Flask back-end as part of Team Alpha.'] },
  { role: 'Customer Sales Assistant', company: 'Woolworths', dates: 'Apr 2024 – Mar 2026',
    points: ['Served customers in a fast-paced retail environment, answering queries and helping them find what they needed.',
             'Handled sales, stock and merchandising tasks to keep the store presentable and well stocked.',
             'Worked as part of a team to keep day-to-day store operations running smoothly.'] }
]
</script>

<template>
  <section class="b" id="experience">
    <p class="eb">Career / 02</p>
    <h2 class="d">Experience<i>.</i></h2>
    <ol class="tl" style="padding:0">
      <li v-for="(j, i) in jobs" :key="j.role" v-reveal="{ delay: i * 60 }">
        <div class="r"><h3>{{ j.role }}</h3><time>{{ j.dates }}</time></div>
        <p class="c">{{ j.company }}</p>
        <ul><li v-for="p in j.points" :key="p">{{ p }}</li></ul>
      </li>
    </ol>
  </section>
</template>
