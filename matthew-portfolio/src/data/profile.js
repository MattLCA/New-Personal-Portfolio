// Your CV: drop ONE .pdf into src/assets/ — any file name works. Vite finds it and bundles it,
// so the Download / View buttons never break because of a name mismatch. (No PDF = the buttons are simply hidden.)
const found = import.meta.glob('../assets/*.pdf', { eager: true, query: '?url', import: 'default' })
const cv = Object.values(found)[0] || ''

// Your contact details (from your CV). Used by the navbar, About and the contact section.
// Leave `linkedin` empty to hide the LinkedIn icon/row.
export const profile = {
  name: 'Matthew Neo Adriaanse',
  email: 'adriaanseneo@gmail.com',
  phone: '+27 65 348 9267',
  location: 'Cape Town, South Africa',
  linkedin: 'https://www.linkedin.com/in/matthew-adriaanse-3b5b6628a',
  github: 'https://github.com/MattLCA',
  cv,
  cvFileName: 'Matthew_Adriaanse_CV.pdf'           // name the visitor's download gets, whatever the file is called here
}
export const pretty = url => url.replace(/^https?:\/\/(www\.)?/, '')