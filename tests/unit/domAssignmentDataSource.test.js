const test = require("node:test");
const assert = require("node:assert/strict");
const {
  collectCanvasPageInfo,
} = require("../../src/data/domAssignmentDataSource.js");

test("collects the dashboard data used by the scraper fallback", () => {
  const document = {
    title: "Dashboard",
    querySelector: () => null,
    querySelectorAll: () => [],
  };

  assert.deepEqual(
    collectCanvasPageInfo(document, "https://school.instructure.com/dashboard"),
    {
      url: "https://school.instructure.com/dashboard",
      title: "Dashboard",
      heading: "",
      assignmentLinks: [],
      todoAssignments: [],
      feedback: [],
    },
  );
});
