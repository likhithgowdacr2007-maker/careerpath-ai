# CareerPath AI

A career guidance website for college students (especially engineering students from first year).
It helps a student choose a career domain and follow a personalised roadmap of skills, free courses,
projects, hackathons, internships and placement preparation.

> **Prototype notice:** this is a front-end only project. Listings marked DEMO are sample data, the quiz
> and skill-gap tool use simple scoring rules (not a trained AI model), and accounts and progress are saved
> only in the visitor's own browser (localStorage). There is no server or database yet.

## Features
- Home page, student profile, career explorer (compare up to 3 careers)
- 6-question career quiz that explains its recommendations
- Personalised roadmap that adapts to the student's year and known skills
- Free courses, project ideas with progress tracking
- Hackathons, internships and jobs (demo data), skill-gap analyser
- Dashboard, placement preparation, demo sign-up/login, admin page for adding listings

## Tech
Plain HTML, CSS and JavaScript. No build step, no framework, no paid services.

## Project structure
```
careerpath-ai/
  index.html        page skeleton and script loading order
  css/
    style.css       all styling
  js/
    data.js         skills, careers, projects, quiz questions, demo listings
    state.js        app state, localStorage, helpers, roadmap builder
    pages.js        one function per page
    auth.js         demo sign-up / login / logout
    tools.js        admin listings, filters, skill-gap calculator
    quiz.js         quiz scoring and result page
    actions.js      small button actions
    app.js          router and start-up
```

## Run it on your computer
1. Download or clone this repository.
2. Double-click `index.html` (it opens in Chrome or Edge).

## Put it online with GitHub Pages
1. Create a new repository on GitHub and upload all the files, keeping the `css` and `js` folders.
2. Open **Settings > Pages**.
3. Under **Branch**, choose `main` and the `/ (root)` folder, then press **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Next steps
- Real backend and database (for example Supabase) with proper authentication
- Move to React with TypeScript
- Verified, real opportunity listings
- AI recommendations through a server (never put secret API keys in browser code)
