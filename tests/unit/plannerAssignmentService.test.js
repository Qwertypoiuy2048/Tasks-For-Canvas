const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getCurrentWeekRange,
  loadWeeklyPlannerAssignments,
  normalizeIncompleteAssignments,
} = require("../../src/services/plannerAssignmentService.js");

test("keeps unsubmitted assignments and normalizes their task fields", () => {
  const items = [
    {
      context_type: "Course",
      course_id: "101",
      plannable_id: "501",
      plannable_type: "assignment",
      plannable_date: "2026-10-08T05:59:59Z",
      submissions: {
        submitted: false,
        graded: false,
        missing: false,
        late: false,
      },
      plannable: {
        title: "Read chapter 1",
        due_at: "2026-10-08T05:59:59Z",
      },
      html_url: "/courses/101/assignments/501",
      context_name: "CSE 199",
    },
    {
      plannable_type: "assignment",
      submissions: { submitted: true },
      plannable: { title: "Already submitted" },
    },
    {
      plannable_type: "announcement",
      submissions: false,
      plannable: { title: "Class announcement" },
    },
  ];

  assert.deepEqual(normalizeIncompleteAssignments(items), [{
    id: "501",
    courseId: "101",
    title: "Read chapter 1",
    course: "CSE 199",
    dueDate: "2026-10-08T05:59:59Z",
    url: "/courses/101/assignments/501",
    submitted: false,
    graded: false,
    missing: false,
    late: false,
  }]);
});

test("loads assignments for the Monday through Sunday week containing a date", async () => {
  const requestedRange = [];
  const assignments = [{
    plannable_type: "assignment",
    plannable_id: "1",
    submissions: { submitted: false },
    plannable: { title: "Study" },
  }];

  const result = await loadWeeklyPlannerAssignments({
    fetchAssignments: async (range) => {
      requestedRange.push(range);
      return assignments;
    },
    now: new Date(2026, 9, 7, 14, 30, 0),
  });

  assert.deepEqual(requestedRange, [{
    startDate: "2026-10-05T06:00:00.000Z",
    endDate: "2026-10-12T05:59:59.999Z",
  }]);
  assert.equal(result[0].title, "Study");
});
