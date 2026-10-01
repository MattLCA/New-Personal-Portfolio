// Edit this file to update the site. Add a project by adding an object to `projects`.
export const profile = {
  name: 'Matthew Neo Adriaanse',
  email: 'adriaansematthewneo@gmail.com',
  photo: 'https://i.ibb.co/C58KFGx1/IMG-1226-me.jpg',
  github: 'https://github.com/MattLCA',
  linkedin: 'https://www.linkedin.com/in/matthew-adriaanse-3b5b6628a/',
  formspree: 'https://formspree.io/f/xrednojl',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const about = [
  "I'm currently a trainee at Life Choices, building a solid foundation in software development. What hooked me was creating digital experiences that are fast, reliable and easy to use.",
  "I work across the full stack: shaping responsive interfaces with clean styles, then wiring up the backend logic behind them. For me, coding is about solving real problems with clear structure.",
  "I do my best work with people who share ideas openly. Away from the screen, I'm reading about new frameworks and architecture, or outdoors.",
]

export const facts = [
  { label: 'Right now', value: 'Software Development Trainee at Life Choices' },
  { label: 'Interested in', value: 'Full-stack web development, responsive design, performance' },
  { label: 'Strengths', value: 'Learning fast, solving problems with others, layout structure' },
]

export const projects = [
  {
    title: 'Bootstrap Store (The Noodle Bar)',
    text: 'A responsive online store for a noodle restaurant, with mobile-friendly navigation, a menu and a clean shopping layout.',
    tech: ['HTML', 'Bootstrap'],
    link: 'https://mattlca.github.io/html-bootstrap/',
    cta: 'Visit site',
  },
  {
    title: 'Art Gallery',
    text: 'A responsive gallery that shows artwork in a structured, clean layout on every screen size.',
    tech: ['HTML', 'CSS'],
    link: 'https://github.com/MattLCA/Week-2-Exercise-2',
    cta: 'View code',
  },
  {
    title: 'Python Mini Toolkit',
    text: 'A beginner-friendly toolkit with a to-do list, grade calculator, quiz and number guessing game.',
    tech: ['Python'],
    link: 'https://github.com/MattLCA/Python-program.git',
    cta: 'View code',
  },
  {
    title: 'This portfolio',
    text: 'Rebuilt as a Vue 3 single-page app. Content lives in one data file, so adding a project takes a few lines.',
    tech: ['Vue 3', 'Vite', 'CSS'],
    link: 'https://github.com/MattLCA/Personal-Portfolio',
    cta: 'View code',
  },
]

export const skills = [
  { group: 'Front end', items: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Bootstrap'] },
  { group: 'Back end', items: ['Python'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
]
