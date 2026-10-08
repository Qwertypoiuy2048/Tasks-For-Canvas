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

const getCanvasPageInfo = typeof module !== "undefined" && module.exports
  ? require("../data/domAssignmentDataSource.js").collectCanvasPageInfo
  : globalThis.CanvasDomAssignmentDataSource.collectCanvasPageInfo;

function updateHelloWorldMessage(message, pageInfo) {
  const document = arguments[2];
  if (!pageInfo || !document || typeof message.append !== "function") {
    message.textContent = pageInfo
      ? `Hello World\n${JSON.stringify(pageInfo, null, 2)}`
      : "Hello World";
    return;
  }

  message.textContent = "";
  message.append(createTextElement(document, "div", "canvas-tasks-page-info", pageInfo.title || "Canvas"));
  message.append(createAssignmentSection(
    document,
    "To Do",
    "canvas-tasks-todo",
    pageInfo.todoAssignments || [],
    false,
  ));
  message.append(createAssignmentSection(
    document,
    "Graded Assignments",
    "canvas-tasks-graded",
    pageInfo.feedback || [],
    true,
  ));
}

function createTextElement(document, tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createAssignmentSection(document, heading, sectionName, assignments, isFeedback) {
  const section = createTextElement(
    document,
    "section",
    `canvas-tasks-section ${sectionName}`,
    "",
  );
  section.append(createTextElement(document, "h3", "canvas-tasks-section-heading", heading));

  if (assignments.length === 0) {
    section.append(createTextElement(document, "p", "canvas-tasks-empty", "None found."));
    return section;
  }

  assignments.forEach((assignment) => {
    const card = createTextElement(document, "article", "canvas-tasks-assignment", "");
    const title = assignment.title || "Untitled assignment";
    if (!isFeedback && assignment.url) {
      const link = createTextElement(document, "a", "canvas-tasks-assignment-title", title);
      link.href = assignment.url;
      card.append(link);
    } else {
      card.append(createTextElement(document, "div", "canvas-tasks-assignment-title", title));
    }

    if (!isFeedback && assignment.type) {
      card.append(createTextElement(document, "div", "canvas-tasks-assignment-type", assignment.type));
    }

    if (assignment.course) {
      card.append(createTextElement(document, "div", "canvas-tasks-assignment-course", assignment.course));
    }

    if (isFeedback) {
      if (assignment.grade) {
        card.append(createTextElement(document, "div", "canvas-tasks-assignment-grade", assignment.grade));
      }
      if (assignment.comment) {
        card.append(createTextElement(document, "div", "canvas-tasks-assignment-comment", assignment.comment));
      }
    } else if (assignment.details && assignment.details.length > 0) {
      card.append(createTextElement(
        document,
        "div",
        "canvas-tasks-assignment-details",
        assignment.details.join(" • "),
      ));
    }

    section.append(card);
  });

  return section;
}

function addHelloWorldMessage(document, pageInfo) {
  const message = document.createElement("div");
  message.id = "canvas-tasks-hello-world";
  updateHelloWorldMessage(message, pageInfo, document);
  const sidebar = typeof document.querySelector === "function"
    ? document.querySelector("#right-side")
    : null;
  (sidebar || document.body).append(message);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    addHelloWorldMessage,
    collectCanvasPageInfo: getCanvasPageInfo,
    isCanvasPage,
    updateHelloWorldMessage,
  };
}
