# Matthew — Portfolio (Vue 3 + Tailwind)

    npm install
    npm run dev       # http://localhost:5173
    npm run build     # production build in /dist

## Where to edit
| What | File |
|---|---|
| Name, tagline, hero buttons | `components/HeroSection.vue` |
| Bio, facts, interests | `components/AboutSection.vue` |
| Jobs (replace the "Add …" fields) | `components/ExperienceSection.vue` |
| Skills / keycaps / shortcuts | `components/SkillsSection.vue` |
| Email, phone, LinkedIn, GitHub (navbar, contact, credits) | `src/data/profile.js` |
| Contact form + layout | `components/ContactSection.vue` |
| Projects (text, links, pictures) | `components/ProjectsSection.vue` + `src/assets/projects/` |
| About photo / certificates / CV buttons | `src/assets/me.jpg`, `components/AboutSection.vue`, `public/Matthew_Adriaanse_CV.pdf` |
| Colours, light/dark tokens, all CSS | `src/style.css` |
| Flower layout (positions, sizes, seed) | `src/lib/flowers.js` (`FL` array) |

Intro: the title-card intro plays on every load/refresh (skip with click or Esc). Edit it in `components/IntroSequence.vue`.
Light/dark: the site starts in light mode; the sun/moon button in the navbar switches and remembers the choice.
Butterfly: click it to make it follow your cursor; Esc lets it go.