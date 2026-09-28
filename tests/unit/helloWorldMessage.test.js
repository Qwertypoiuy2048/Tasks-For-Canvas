const test = require("node:test");
const assert = require("node:assert/strict");
const {
  addHelloWorldMessage,
  collectCanvasPageInfo,
  isCanvasPage,
  updateHelloWorldMessage,
} = require("../../src/ui/helloWorldMessage.js");

test("adds a Hello World message to the page", () => {
  const message = { textContent: "", id: "" };
  const document = {
    createElement: () => message,
    body: {
      appended: null,
      append: (element) => {
        document.body.appended = element;
      },
    },
  };

  addHelloWorldMessage(document);

  assert.equal(message.id, "canvas-tasks-hello-world");
  assert.equal(message.textContent, "Hello World");
  assert.equal(document.body.appended, message);
});

test("updates an existing message with refreshed Canvas information", () => {
  const message = { textContent: "old information" };

  updateHelloWorldMessage(message, { todoAssignments: [{ title: "New task" }] });

  assert.match(message.textContent, /New task/);
  assert.doesNotMatch(message.textContent, /old information/);
});

test("adds the temporary information inside Canvas's right sidebar", () => {
  const message = { textContent: "", id: "" };
  const sidebar = {
    appended: null,
    append: (element) => {
      sidebar.appended = element;
    },
  };
  const document = {
    createElement: () => message,
    querySelector: (selector) => selector === "#right-side" ? sidebar : null,
    body: {
      append: () => assert.fail("should append to the Canvas sidebar"),
    },
  };

  addHelloWorldMessage(document, { title: "Dashboard" });

  assert.equal(sidebar.appended, message);
  assert.match(message.textContent, /Dashboard/);
});

test("recognizes an Instructure Canvas page", () => {
  assert.equal(isCanvasPage("https://school.instructure.com/courses/123"), true);
});

test("does not recognize an unrelated webpage as Canvas", () => {
  assert.equal(isCanvasPage("https://example.com"), false);
});

test("collects temporary page information from Canvas", () => {
  const todoItem = {
    querySelector: (selector) => {
      if (selector === 'svg[label="Assignment"]') return {};
      if (selector === '[data-testid="todo-sidebar-item-title"] a') {
        return { textContent: "Sprint 1 Video Update", href: "/courses/1/assignments/2" };
      }
      if (selector === ".ToDoSidebarItem__Info > span") {
        return { textContent: "Freshman Discovery Project" };
      }
      return null;
    },
    querySelectorAll: (selector) => {
      if (selector === '[data-testid="ToDoSidebarItem__InformationRow"] li') {
        return [{ textContent: "1 points" }, { textContent: "Sep 28 at 11:59pm" }];
      }
      return [];
    },
  };
  const document = {
    title: "Dashboard",
    querySelector: (selector) => {
      if (selector === "h1") return { textContent: "Welcome to Canvas" };
      return null;
    },
    querySelectorAll: (selector) => {
      if (selector === ".ToDoSidebarItem") return [todoItem];
      if (selector === 'a[href*="assignments"]') {
        return [
          { textContent: "Read chapter 1", href: "/courses/123/assignments/1" },
          { textContent: "Submit project", href: "/courses/123/assignments/2" },
        ];
      }
      return [];
    },
  };

  assert.deepEqual(
    collectCanvasPageInfo(document, "https://school.instructure.com/dashboard"),
    {
      url: "https://school.instructure.com/dashboard",
      title: "Dashboard",
      heading: "Welcome to Canvas",
      assignmentLinks: [
        "Read chapter 1",
        "Submit project",
      ],
      todoAssignments: [
        {
          title: "Sprint 1 Video Update",
          course: "Freshman Discovery Project",
          details: ["1 points", "Sep 28 at 11:59pm"],
          url: "/courses/1/assignments/2",
        },
      ],
      feedback: [],
    },
  );
});
