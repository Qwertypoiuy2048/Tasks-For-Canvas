function collectTodoAssignments(document) {
  return Array.from(document.querySelectorAll(".ToDoSidebarItem"))
    .map((item) => ({
      item,
      icon: item.querySelector('svg[label="Assignment"]') || item.querySelector('svg[label="Quiz"]'),
    }))
    .filter(({ icon }) => icon)
    .map((item) => {
      const link = item.item.querySelector('[data-testid="todo-sidebar-item-title"] a');
      const course = item.item.querySelector(".ToDoSidebarItem__Info > span");
      const details = Array.from(
        item.item.querySelectorAll('[data-testid="ToDoSidebarItem__InformationRow"] li'),
      )
        .map((detail) => detail.textContent.trim())
        .filter(Boolean);

      return {
        title: link ? link.textContent.trim() : "",
        type: item.icon.getAttribute
          ? item.icon.getAttribute("label") || "Assignment"
          : item.icon.label || "Assignment",
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

if (typeof globalThis !== "undefined") {
  globalThis.CanvasDomAssignmentDataSource = {
    collectCanvasPageInfo,
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    collectCanvasPageInfo,
  };
}
