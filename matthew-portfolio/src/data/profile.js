// Your contact details (from your CV). Used by the navbar, About and the contact section.
// Leave `linkedin` empty to hide the LinkedIn icon/row.
export const profile = {
  name: 'Matthew Neo Adriaanse',
  email: 'adriaanseneo@gmail.com',
  phone: '+27 65 348 9267',
  location: 'Cape Town, South Africa',
  linkedin: 'https://www.linkedin.com/in/matthew-adriaanse-3b5b6628a',
  github: 'https://github.com/MattLCA',
  cv: '/Matthew_Adriaanse_CV.pdf'                // file lives in /public
}
export const pretty = url => url.replace(/^https?:\/\/(www\.)?/, '')