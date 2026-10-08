const test = require("node:test");
const assert = require("node:assert/strict");
const {
  toTodoAssignments,
} = require("../../src/ui/plannerAssignmentView.js");

test("adapts normalized planner assignments to the existing To Do card shape", () => {
  assert.deepEqual(
    toTodoAssignments([{
      id: "501",
      title: "Read chapter 1",
      course: "CSE 199",
      dueDate: "2026-10-08T05:59:59Z",
      url: "/courses/101/assignments/501",
    }]),
    [{
      id: "501",
      title: "Read chapter 1",
      course: "CSE 199",
      dueDate: "2026-10-08T05:59:59Z",
      url: "/courses/101/assignments/501",
      type: "Assignment",
      details: ["2026-10-08T05:59:59Z"],
    }],
  );
});
