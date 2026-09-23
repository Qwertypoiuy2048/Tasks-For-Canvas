# Canvas Tasks 

**Student Name** Evan Crenshaw

**Product Title** Canvas Tasks

### Your Product
*What would you like your product to do? What would you like to have made or learned by the end of Sprint 3?
Why did you choose this product?
What are you excited to learn or experience?
Who could this product help or be useful for?*

I chose this project because I and lots of my friends used the tasks for Canvas extension, but this semester they folded it into Better Canvas. I don't like Better Canvas because it changes everything and sticks its grubby little fingers all over my business. 
My vision for this project is a fully customizable and minimally invasive tasks widget that will display tasks to be done, a chart with completion percentage for each class, recently completed tasks, recently graded tasks, and announcements. I would also like it to be as self-sufficient as possible.


### Things that might be tricky

I have no previous knowledge of Chrome extensions, API calls to Canvas, or widgets

### My Plan for the First Three Sprints
#### Sprint 1 (Weeks 2-3)
Framework, Chrome extension basics, pulling information from Canvas
#### Sprint 2 (Weeks 4-5) 
Creating widgets, editing Canvas homepage
#### Sprint 3 (Weeks 6-7)
Customization and automation


# Update Log
### Current Working project specs
Scaffolding present

The current branch contains a basic Manifest V3 Chrome extension. It automatically adds a small “Hello World” message to ordinary HTTP and HTTPS webpages. It does not yet connect to Canvas, call an API, store data, or modify the page in any other way.

# Next Steps
[X]. Learn the structure of a Chrome extension and create a minimal extension that loads successfully.
[ ]. Determine how Canvas authentication and API access will work.
[ ]. Identify the Canvas assignment information needed for the first version.
[ ]. Write business-layer tests for representing and organizing assignments.
[ ]. Build a simple data service that retrieves assignment information.
[ ]. Display a basic task list on the Canvas dashboard.
[ ]. Add a simple completion count or percentage.
[ ]. Test the extension using sample or mocked Canvas data before connecting it fully to live data.

### Running the extension locally
1. Run `npm test` to verify the unit test.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode**.
4. Select **Load unpacked** and choose this project folder.
5. Open or refresh an ordinary HTTP or HTTPS webpage.

The extension does not run on restricted Chrome pages such as `chrome://extensions`.


Copyright 2026 Brigham Young University-Idaho
