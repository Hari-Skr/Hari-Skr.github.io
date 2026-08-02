# S Hari Sankar — Portfolio

> A visual portfolio for backend engineering, data systems, and applied AI work.

This is a Vite + React portfolio designed around a scrolling journey: introduction, working range, professional experience, selected projects, education, credentials, and contact.

## Quick start

### Requirements

- Node.js 20.19 or newer
- npm

### Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Check the project

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` creates the production files in `dist/`. `npm run preview` serves that production build locally so you can check it before deploying.

## Edit the portfolio content

Most content lives in one file:

```text
src/data/portfolio.js
```

You can update the text, links, dates, skills, work history, projects, education, and certifications there without touching the page layout or styling.

### What each section controls

| Data export | Used for |
| --- | --- |
| `profile` | Name, role, location, email, phone, GitHub, LinkedIn, and short summary |
| `about` | About section paragraphs |
| `education` | Degree, specialization, university, period, and award |
| `skillGroups` | Skill categories and skill chips |
| `experience` | Work history cards, company links, summaries, highlights, and logos |
| `projects` | Selected project cards and technology stacks |
| `certifications` | Credential links and descriptions |

### Example: update your profile

```js
export const profile = {
  name: 'Your Name',
  role: 'Your Role',
  location: 'Your City, Country',
  email: 'you@example.com',
  phone: '+00 0000000000',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-username',
  summary: 'A short introduction about the work you do.',
}
```

Keep the existing property names. The page reads those names to place content in the correct locations.

### Add or edit a work experience

Add another object to the `experience` array:

```js
{
  period: 'Jan — Dec 2026',
  company: 'Company Name',
  role: 'Your Role',
  logo: {
    src: '/company-logo.png',
    width: 96,
    height: 36,
  },
  website: 'https://company.example.com',
  summary: 'One sentence describing the role.',
  highlights: [
    'A measurable contribution.',
    'A system, feature, or process you built.',
    'A result or responsibility worth highlighting.',
  ],
}
```

The `width` and `height` values control how the logo is displayed. They let rectangular wordmarks and square marks keep their own proportions without adding a circle or border.

## Add images and other public assets

Put files that should be served directly by the site in:

```text
public/
```

Reference them from the data file with a root-relative path:

```js
logo: {
  src: '/company-logo.png',
  width: 110,
  height: 36,
}
```

For filenames containing spaces, use the URL-encoded path, for example:

```js
src: '/Metro%20global.jpeg'
```

Prefer simple filenames such as `metro-global.jpeg` or `company-logo.png` for new assets. Keep logos reasonably compressed so the portfolio loads quickly.

## Project structure

```text
.
├── public/                 # Images, favicon, and files served as-is
├── src/
│   ├── components/         # Page sections and reusable UI pieces
│   ├── data/               # Portfolio content — edit this first
│   ├── hooks/              # Scroll and interaction helpers
│   ├── styles/             # Theme, layout, responsive, and motion styles
│   ├── App.jsx             # Page composition
│   └── main.jsx            # React entry point
├── index.html              # Metadata, title, fonts, and favicon
├── package.json            # Scripts and dependencies
└── vite.config.js          # Vite configuration
```

### When do I need to edit code?

For normal updates—new text, links, projects, skills, credentials, or images—edit `src/data/portfolio.js` only.

Edit the components or styles when you want to change the layout, navigation, section structure, animations, colors, or typography. If you change `index.html`, update the page title and meta description there as well.

## Deployment

Build the site first:

```bash
npm run build
```

Deploy the generated `dist/` directory to any static hosting provider. For platforms that build directly from Git, use:

- Build command: `npm run build`
- Output directory: `dist`

## Useful checklist before publishing

- Update the content in `src/data/portfolio.js`.
- Check every external link and email address.
- Add or replace images in `public/`.
- Run `npm run lint`.
- Run `npm run build`.
- Open the production preview with `npm run preview`.
- Test the layout on a phone-sized screen as well as desktop.

## License

This portfolio is personal work. Reuse the structure for your own site, but replace the personal content, images, and branding before publishing it as your own.
