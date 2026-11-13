# SkillBridge AI

**Integrated Career Development, Local Skill Training & Employment Opportunities Platform**

*Learn Today. Build Tomorrow. Lead the Future.*

**Live website:** https://likhithgowdacr2007-maker.github.io/SkillBridge-AI/

Built for the Seva First Innovation Challenge 2026 (Theme: Shikshit & Kaushal Bharat, Track A: Product / Technology, Category: University/College).

---

## The problem

Many college students do not know which career suits them, which skills to learn first, which projects to build, or where to find hackathons, training and jobs. This information is spread across many websites, so students lose time or start too late. Students from non-engineering courses and from colleges with little career counselling have even less guidance.

## The solution

SkillBridge AI is one website that guides a student from choosing a career to getting ready for a job:

**Discover → Learn → Build → Compete → Apply**

## Features

**Career guidance**
- Student profile with degree, branch, year, interests, skills and career goal (asked once, saved after that)
- Five degrees: B.E / B.Tech, BCA, B.Sc, B.Com and BBA, each with branches
- Degree paths: entry roles, next-step exams and studies, and matching careers
- Career explorer with 12 careers and side-by-side comparison
- 6-question career quiz with rule-based scoring (the answers behind each score are shown)
- Personalised roadmap that removes skills the student already has and shortens time estimates in later years
- Free courses from official providers, projects with a portfolio tracker, skill gap analyser, dashboard and placement preparation

**Opportunities**
- Hackathons and national-level competitions with date, venue, fee or prize, eligibility, official link, countdown, filters and "Add to calendar"
- Jobs and internships with salary and theme filters
- Local Hub: local skill training, job fairs and walk-in drives, and government schemes
- Placed Students page with verified placement records (names shortened, salary shown only with consent)
- Listings with a last date hide themselves after it

**Accounts and admin**
- Gmail sign-up with a one-time onboarding
- Optional first-time email OTP verification (Supabase), then login with email and password only
- Admin area: add listings and verified placements, download the JSON files, and see a student activity table and counts

## How it works

- **Quiz scoring:** each answer adds points to certain careers. Totals are shown as percentages with the answers that caused them.
- **Roadmap:** takes the skill list of the chosen career, removes skills the student already has, and groups the rest into stages. In years 3 and 4 the time estimates are reduced.
- **Skill gap score:** required skills the student has, divided by required skills.
- **Expiry:** a listing is shown until its last date. Yearly contests without a fixed date stay visible as "Plan ahead".

## Technology

- HTML, CSS and JavaScript in a single page (`index.html`), hosted on GitHub Pages
- GitHub Actions + Python for the daily listings update
- Supabase Auth (optional) for email OTP
- No paid services are needed to run the prototype

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole website |
| `listings.json` | Hackathons, jobs, training, fairs and schemes added by the admin or the daily update |
| `placements.json` | Verified placement records added by the admin |
| `update_listings.py` | Removes expired listings and adds new hackathons (Devpost) and jobs (Adzuna) |
| `.github/workflows/update-listings.yml` | Runs the update script every day |

## Run it on your computer

Open `index.html` in Chrome or Edge. To also load the JSON files, run `python -m http.server` in this folder and open http://localhost:8000.

## Publish it

1. Upload all files to a GitHub repository.
2. Go to **Settings → Pages**, choose branch **main** and folder **/ (root)**, then Save.

## Automatic updates

The workflow runs every day (and can be started by hand from the **Actions** tab):

1. Deletes listings whose last date has passed, and undated listings that were last checked more than 60 days ago.
2. Adds open online or India hackathons from Devpost (the 10 soonest).
3. Optional: adds fresh India jobs from Adzuna. Each job hides itself 30 days after posting. This needs two repository secrets, `ADZUNA_APP_ID` and `ADZUNA_APP_KEY` (free keys from developer.adzuna.com). Without them this step is skipped.

In **Settings → Actions → General → Workflow permissions**, choose **Read and write permissions** so the workflow can save `listings.json`.

## Admin

- Log in with the admin account set inside `index.html` (`ADMIN` and `AH`). `AH` is the SHA-256 code of `adminname:password`. To change the password, run `echo -n "adminname:newpassword" | sha256sum` and paste the result as `AH`. Do not publish the password.
- Add a listing or placement, click **Download**, then upload the JSON file to the repository (**Add file → Upload files**). Students see it about a minute later.
- Add only information from official sources, and check proof (such as an offer letter) before adding a placement.

## Email OTP setup (optional)

1. Create a free project at supabase.com.
2. Authentication → Email Templates → **Confirm signup**: include `{{ .Token }}` in the message so students receive a code.
3. Authentication → Providers → Email: keep **Confirm email** on.
4. Project Settings → API: copy the Project URL and the **anon** (public) key into `const SB_URL='',SB_KEY='';` in `index.html`. Never use the `service_role` key.
5. For many users, connect your own email service under Authentication → SMTP, because the built-in sender allows only a few emails per hour.

Without these keys the site uses the simple Gmail sign-up with no OTP.

## Honest limits

- Listings are a snapshot checked on the date shown on each card. Dates change, so confirm on the official page before applying. Pay is shown only where it is stated.
- The role targets in the skill gap analyser are illustrative templates, not real job postings.
- Student profiles, roadmaps and saved items are stored in each student's own browser. The admin student table shows only students who signed up in that browser.
- No student pilot or survey has been done yet, and no measured results are claimed.

## Planned

- React + TypeScript version with a Supabase database, so all data works on any device
- Separate job-seeker accounts and student-submitted placements with admin approval
- Verified listings managed by college admins, and later AI features such as a career chatbot and resume feedback
