# Canvas Tasks

**Student Name** Evan Crenshaw

**Product Title** Canvas Tasks

### Your Product

I chose this project because I and lots of my friends used the Tasks for Canvas extension, but this semester they folded it into Better Canvas. I don't like Better Canvas because it changes everything and sticks its grubby little fingers all over my business.

My vision for this project is a fully customizable and minimally invasive tasks widget that will display tasks to be done, a chart with completion percentage for each class, recently completed tasks, recently graded tasks, and announcements. I would also like it to be as self-sufficient as possible.

### Things that might be tricky

I have no previous knowledge of Chrome extensions, API calls to Canvas, or widgets.

### My Plan for the First Three Sprints

#### Sprint 1 (Weeks 2-3)

Framework, Chrome extension basics, pulling information from Canvas

#### Sprint 2 (Weeks 4-5)

Creating widgets, editing Canvas homepage

#### Sprint 3 (Weeks 6-7)

Customization and automation

# Update Log

### Current Working project specs

Canvas-only prototype with a temporary dashboard panel.

The current branch contains a basic Manifest V3 Chrome extension that runs on Canvas sites hosted at `*.instructure.com`. It adds a temporary panel inside Canvas's `#right-side` sidebar with separate To Do and Graded Assignments sections. Each assignment, quiz, or feedback item is rendered in its own bordered card. The panel refreshes when Canvas asynchronously renders assignment or quiz To-Dos. The same object is also logged to the browser console. It does not yet call the Canvas API, store data, or authenticate separately.

The current implementation still reads only information rendered in the Canvas dashboard DOM, so it cannot reliably show every incomplete assignment across all courses.

The code is organized by responsibility: `src/config/` contains changeable settings, `src/data/` contains Canvas data sources, `src/services/` contains filtering and date rules, and `src/ui/` contains rendering and extension entrypoint code. The current `src/config/appConfig.js` sets the first day of the week, the number of days to display, and planner request values in one place. `rangeDays: 7` shows one week; it can be changed to `3` for a few days or `14` for two weeks. The manifest loads these classic scripts in a tested order so their shared extension context does not redeclare identifiers.

#### Planner endpoint investigation

The current research indicates that Canvas's own frontend requests `/api/v1/planner/items` and can return planner items from multiple courses when no course-specific `context_codes[]` parameters are supplied. The endpoint appears to support `start_date` and `end_date` ISO-8601 parameters, and its results can include announcements as well as assignments.

The repository now contains a tested data-access request module for building this request, sending it with the browser-managed session, parsing a successful JSON response, and reporting HTTP failures. The content script now tries planner data first and keeps the existing scraped dashboard data as a fallback when the planner request fails. Before relying on this live path, we still need to verify the authenticated request in Chrome, determine whether pagination is required, and improve the separation of the scraper into its own data-source file. No Canvas tokens, cookies, CSRF values, or copied browser headers will be added to the project.

#### Initial planner feature decisions

- The first weekly view will run from Monday through Sunday.
- Weekly boundaries will initially use the browser's local timezone because it is the simplest useful default. A future settings feature should allow the user to choose a timezone.
- The planner request will be the preferred assignment source.
- The existing dashboard DOM scraper will remain available as a separate data-source module and fallback path if the planner request is unavailable or fails.
- The current panel layout should be preserved where practical, but adapting the layout is lower priority than reliably retrieving planner assignments.
- For the first version, an assignment is considered incomplete when Canvas reports `submissions.submitted === false`. More detailed handling of graded, missing, late, excused, and other submission states can be added later.

# Next Steps

[X]. Learn the structure of a Chrome extension and create a minimal extension that loads successfully.
[X]. Restrict the content script to Canvas pages and inspect temporary page information.
[X]. Place the temporary information panel inside Canvas's right sidebar.
[X]. Detect asynchronously rendered assignment To-Dos separately from recent feedback.
[X]. Render To-Dos and graded assignments in separate sections with individual cards.
[X]. Include Quiz To-Do items alongside Assignment To-Do items.
[X]. Investigate Canvas's planner endpoint, planner item types, and date-range parameters used by Canvas's frontend.
[ ]. Verify the planner request works from the extension content script in Chrome.
[ ]. Determine whether planner response pagination is required.
[X]. Decide on Monday–Sunday weeks using the browser's local timezone for the first version.
[X]. Identify the initial assignment information and map it to the existing UI data model.
[ ]. Write business-layer tests for representing and organizing assignments.
[X]. Build and test the initial data-access request module for planner items.
[X]. Filter planner results to incomplete assignments and normalize them into the app's task model.
[X]. Separate the existing DOM scraper into a reusable fallback data-source module.
[ ]. Display a basic task list on the Canvas dashboard.
[ ]. Add a simple completion count or percentage.
[ ]. Test the extension using sample or mocked Canvas data before connecting it fully to live data.

### Running the extension locally

1. Run `npm test` to verify the unit tests.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode**.
4. Select **Load unpacked** and choose this project folder.
5. Open or refresh a Canvas page hosted at an `instructure.com` address.

The extension does not run on unrelated webpages or restricted Chrome pages such as `chrome://extensions`. On a Canvas page, open DevTools and check the Console for the temporary page-information dump. If Canvas has not rendered `#right-side`, the panel falls back to the document body.

Copyright 2026 Brigham Young University-Idaho
