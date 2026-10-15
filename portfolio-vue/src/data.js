// Edit this file to update the site.
import {
  siHtml5, siCss, siJavascript, siVuedotjs, siBootstrap, siPython, siGit, siGithub,
} from 'simple-icons'

export const profile = {
  name: 'Matthew Neo Adriaanse',
  firstName: 'Matthew',
  role: 'Web Developer',
  tagline:
    'I build fast, responsive web interfaces and wire up the logic behind them, turning real problems into clear, working software.',
  email: 'adriaansematthewneo@gmail.com',
  photo: 'https://i.ibb.co/C58KFGx1/IMG-1226-me.jpg',
  github: 'https://github.com/MattLCA',
  linkedin: 'https://www.linkedin.com/in/matthew-adriaanse-3b5b6628a/',
  formspree: 'https://formspree.io/f/xrednojl',
}

export const nav = [
  { id: 'services', label: 'Services' },
  { id: 'works', label: 'Works' },
  { id: 'resume', label: 'Resume' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const services = [
  { title: 'Web Development', text: 'Clean, accessible pages and apps built with HTML, CSS, JavaScript and Vue.js.' },
  { title: 'Responsive Design', text: 'Layouts that look right and work well on phones, tablets and desktops.' },
  { title: 'Back-end Logic', text: 'Python programs and the server-side logic that sits behind an interface.' },
  { title: 'Teamwork & Git', text: 'Collaborating through GitHub, clear commits and code other people can read.' },
]

export const works = [
  {
    title: 'The Noodle Bar',
    kind: 'Bootstrap online store',
    text: 'A responsive store for a noodle restaurant with mobile-friendly navigation and a menu.',
    categories: ['Web'],
    tech: ['HTML', 'Bootstrap'],
    link: 'https://mattlca.github.io/html-bootstrap/',
    cta: 'Visit site',
    hue: 172,
  },
  {
    title: 'Art Gallery',
    kind: 'Responsive gallery',
    text: 'Artwork presented in a structured, clean layout on every screen size.',
    categories: ['Web'],
    tech: ['HTML', 'CSS'],
    link: 'https://github.com/MattLCA/Week-2-Exercise-2',
    cta: 'View code',
    hue: 190,
  },
  {
    title: 'Python Mini Toolkit',
    kind: 'Python programs',
    text: 'A to-do list, grade calculator, quiz and number guessing game.',
    categories: ['Python'],
    tech: ['Python'],
    link: 'https://github.com/MattLCA/Python-program.git',
    cta: 'View code',
    hue: 205,
  },
  {
    title: 'This Portfolio',
    kind: 'Vue 3 single-page app',
    text: 'Built with Vue 3 and Vite. All content lives in one data file.',
    categories: ['Web', 'Vue'],
    tech: ['Vue 3', 'Vite', 'CSS'],
    link: 'https://github.com/MattLCA/Personal-Portfolio',
    cta: 'View code',
    hue: 160,
  },
]

export const resume = {
  experience: [
    { period: 'Present', title: 'Software Development Trainee', place: 'Life Choices Academy' },
  ],
  education: [
    { period: 'Present', title: 'Software Development Programme', place: 'Life Choices Academy' },
  ],
}

const icon = (i) => ({ path: i.path, color: '#' + i.hex })
export const skills = [
  { name: 'HTML5', ...icon(siHtml5) },
  { name: 'CSS3', ...icon(siCss) },
  { name: 'JavaScript', ...icon(siJavascript) },
  { name: 'Vue.js', ...icon(siVuedotjs) },
  { name: 'Bootstrap', ...icon(siBootstrap) },
  { name: 'Python', ...icon(siPython) },
  { name: 'Git', ...icon(siGit) },
  { name: 'GitHub', ...icon(siGithub) },
]
