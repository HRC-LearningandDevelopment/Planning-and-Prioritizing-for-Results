# Planning and Prioritizing for Results

Self-paced e-learning course for the HealthRecon Connect Succession Development Programme. Built from the facilitator-led workshop deck (slide text, tables and speaker notes), restructured for self-paced learning.

Plain HTML, CSS and JavaScript. No build step, no framework, no backend, no login.

## Deploy to GitHub Pages

1. Upload **the contents of this folder** (not the folder itself) to the root of your repository, so `index.html` sits at the top level. Include the hidden `.nojekyll` file.
2. In the repository, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, and save.
3. The course is live at `https://<your-org>.github.io/<repo>/` within a minute or two.

The course must be served over http(s). Opening `index.html` directly from disk works for browsing, but the certificate download is blocked by browsers on `file://` pages. To test locally, run `python3 -m http.server` in this folder and open `http://localhost:8000`.

## Before going live: add the two videos

Open `js/course-data.js` and replace the placeholders near the top:

```js
v1: { url: '[VIDEO_1_URL]', ... }   // shown in Module 2: Urgent vs important
v2: { url: '[VIDEO_2_URL]', ... }   // shown in Module 4: Plan, Do, Review
```

Any YouTube link form works (`watch?v=`, `youtu.be/`, `/embed/`, `/shorts/`). Videos embed through `youtube-nocookie.com`.

**Also update each video's `summary`.** That text is what learners read if they tick "YouTube is blocked on my network". The current summaries are written for the topic of each module, not for your specific videos, so edit them to match what the videos actually say.

## Updating the course: bump the cache version every time

Every CSS and JS tag in `index.html` carries a version, for example `css/styles.css?v=11`. **After any edit, bump the number on every tag** (e.g. to `?v=12`). GitHub Pages and browsers cache aggressively; without the bump, learners may keep running old code. If a change "isn't showing up", check DevTools → Network to confirm the new `?v=` loaded before assuming the code is wrong.

## Where things live

| To change… | Edit |
|---|---|
| Any course text, page order, quizzes, activities, reflection prompts, pass mark | `js/course-data.js` |
| Video URLs and their text summaries | `js/course-data.js` (`VIDEOS`) |
| Look and feel | `css/styles.css` (colours are CSS variables at the top) |
| Activity behaviour (drag/drop, matching, simulations, etc.) | `js/activities.js` |
| Navigation, saving, time tracking, quizzes, videos, reflections | `js/app.js` |
| Certificate and "PDF of my answers" | `js/outputs.js` |

The final knowledge check pass mark is `passMark` in `COURSE` (currently 70%).

## Course structure

- **Welcome:** name for the certificate, how the course works, objectives.
- **Part 1, the foundation (everyone):** Why planning matters · Urgent vs important · The RCM priority lens · Plan, Do, Review.
- **Part 2, choose your path:** Specialist / Senior Analyst, ATL / TL, or AM / Manager. The learner's own path is required; the others are optional to explore.
- **Wrap-up:** key takeaways, final graded knowledge check (10 questions), results, next steps, certificate and PDF download.

**Certificate unlocks when** the learner has entered their name, completed all four Part 1 modules, completed their own path, and passed the final check.

### Activity types

Each activity type was chosen to fit its task. Every completed activity reveals a "Coaching key points" callout.

| Task shape | Activity | Used for |
|---|---|---|
| Sort items into fixed categories | Drag-and-drop (or tap-to-place) buckets | Eisenhower matrix, priority lens, Plan/Do/Review habits, demand vs capacity, impact vs effort |
| Put unique steps in order | Sequence | Daily triage, Monday queue, month-end backwards |
| Genuinely 1:1 pairs | Matching with connector lines | Predictable risk ↔ planning control |
| Explore independent concepts | Flip cards | Costs of poor planning, focus tactics, allocation principles, gap-closing options |
| Find the one thing that matters in data | Scavenger hunt | PHI override in a worklist, capacity warning on a dashboard, trigger breach in weekly indicators |
| Workshop role-plays | Branching decision simulations | One per path |

Sequences accept equally valid alternatives where the workshop allowed judgement (e.g. two interchangeable steps).

## How saving works

Progress, quiz answers, activity state and reflections are saved in the learner's browser (`localStorage`, key `hrc-ppr-v1`) as they work, including mid-activity. Things to know:

- Progress is **per browser, per device**. Switching computers or clearing browser data starts the learner over. "Reset my progress" in the sidebar clears it deliberately.
- Nothing is sent to a server, and there is **no LMS reporting**. Completion evidence is the downloaded certificate PNG and the PDF of answers.
- Time invested counts only while the tab is visible and the learner has interacted in the last 5 minutes. Gaps longer than 15 seconds between ticks (sleep, a frozen background tab) are discarded.

## PDF of answers

Uses jsPDF from cdnjs, loaded only when a learner clicks the button (so a blocked CDN never causes an error on page load). If the CDN is blocked, the button falls back to the browser's print dialog with a formatted report; learners choose "Save as PDF". Both paths include every reflection, activity result and score.

## Fonts

Proxima Nova is included as WOFF with OTF fallback. Proxima Nova is a commercial typeface; confirm your licence covers web embedding on a public site before publishing.

## Accessibility notes

Keyboard operable throughout (every drag-and-drop also works by selecting an item and then a box), visible focus, screen-reader labels on interactive items, `prefers-reduced-motion` respected, and layouts tested at 390 px wide. On narrow screens the matching activity switches to one column and pairs are shown with numbered badges instead of lines.
