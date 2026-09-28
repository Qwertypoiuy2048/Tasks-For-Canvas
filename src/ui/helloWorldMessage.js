function isCanvasPage(url) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return hostname === "canvas" ||
      hostname.startsWith("canvas.") ||
      hostname.endsWith(".instructure.com");
  } catch {
    return false;
  }
}

function collectTodoAssignments(document) {
  return Array.from(document.querySelectorAll(".ToDoSidebarItem"))
    .filter((item) => item.querySelector('svg[label="Assignment"]'))
    .map((item) => {
      const link = item.querySelector('[data-testid="todo-sidebar-item-title"] a');
      const course = item.querySelector(".ToDoSidebarItem__Info > span");
      const details = Array.from(
        item.querySelectorAll('[data-testid="ToDoSidebarItem__InformationRow"] li'),
      )
        .map((detail) => detail.textContent.trim())
        .filter(Boolean);

      return {
        title: link ? link.textContent.trim() : "",
        course: course ? course.textContent.trim() : "",
        details,
        url: link ? link.href : "",
      };
    });
}

function collectFeedback(document) {
  return Array.from(document.querySelectorAll(".event-details")).map((event) => {
    const title = event.querySelector(".recent_feedback_title");
    const course = event.querySelector(".event-details__context");
    const paragraphs = Array.from(event.querySelectorAll("p"));

    return {
      title: title ? title.textContent.trim() : "",
      course: course ? course.textContent.trim() : "",
      grade: paragraphs[1] ? paragraphs[1].textContent.trim() : "",
      comment: paragraphs[2] ? paragraphs[2].textContent.trim() : "",
    };
  });
}

function collectCanvasPageInfo(document, url) {
  const heading = document.querySelector("h1");
  const assignmentLinks = Array.from(
    document.querySelectorAll('a[href*="assignments"]'),
  )
    .map((link) => link.textContent.trim())
    .filter(Boolean);

  return {
    url,
    title: document.title,
    heading: heading ? heading.textContent.trim() : "",
    assignmentLinks,
    todoAssignments: collectTodoAssignments(document),
    feedback: collectFeedback(document),
  };
}

function updateHelloWorldMessage(message, pageInfo) {
  message.textContent = pageInfo
    ? `Hello World\n${JSON.stringify(pageInfo, null, 2)}`
    : "Hello World";
}

function addHelloWorldMessage(document, pageInfo) {
  const message = document.createElement("div");
  message.id = "canvas-tasks-hello-world";
  updateHelloWorldMessage(message, pageInfo);
  const sidebar = typeof document.querySelector === "function"
    ? document.querySelector("#right-side")
    : null;
  (sidebar || document.body).append(message);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    addHelloWorldMessage,
    collectCanvasPageInfo,
    isCanvasPage,
    updateHelloWorldMessage,
  };
}
