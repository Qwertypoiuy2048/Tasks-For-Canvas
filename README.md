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

Canvas-only hello-world prototype.

The current branch contains a basic Manifest V3 Chrome extension that runs on Canvas sites hosted at `*.instructure.com`. It adds a temporary panel inside Canvas's `#right-side` sidebar containing the current page URL, document title, first heading, To Do assignments, assignment details, and recent feedback. The panel refreshes when Canvas asynchronously renders assignment To-Dos. The same object is also logged to the browser console. It does not yet call the Canvas API, store data, or authenticate separately.

# Next Steps

[X]. Learn the structure of a Chrome extension and create a minimal extension that loads successfully.
[X]. Restrict the content script to Canvas pages and inspect temporary page information.
[X]. Place the temporary information panel inside Canvas's right sidebar.
[X]. Detect asynchronously rendered assignment To-Dos separately from recent feedback.
[ ]. Determine how Canvas authentication and API access will work.
[ ]. Identify the Canvas assignment information needed for the first version.
[ ]. Write business-layer tests for representing and organizing assignments.
[ ]. Build a simple data service that retrieves assignment information.
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
