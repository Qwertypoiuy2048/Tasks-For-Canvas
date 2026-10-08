if (isCanvasPage(window.location.href)) {
  function displayCanvasPageInfo(pageInfo = collectCanvasPageInfo(document, window.location.href)) {
    const canvasPageInfo = pageInfo;
    const existingMessage = document.querySelector("#canvas-tasks-hello-world");

    console.info("Tasks for Canvas: temporary page information", canvasPageInfo);
    if (existingMessage) {
      updateHelloWorldMessage(existingMessage, canvasPageInfo, document);
    } else {
      addHelloWorldMessage(document, canvasPageInfo);
    }
  }

  let plannerLoaded = false;
  const initialPageInfo = collectCanvasPageInfo(document, window.location.href);
  displayCanvasPageInfo(initialPageInfo);

  loadWeeklyPlannerAssignments({
    fetchAssignments: ({ startDate, endDate }) => fetchPlannerAssignments({
      fetchImpl: window.fetch.bind(window),
      baseUrl: window.location.origin,
      startDate,
      endDate,
    }),
  })
    .then((assignments) => {
      const plannerPageInfo = {
        ...initialPageInfo,
        todoAssignments: toTodoAssignments(assignments),
      };
      plannerLoaded = true;
      console.info("Tasks for Canvas: planner assignments", assignments);
      displayCanvasPageInfo(plannerPageInfo);
    })
    .catch((error) => {
      console.warn("Tasks for Canvas: planner request unavailable; keeping scraped assignments", error);
    });

  const observationTarget = document.querySelector("#right-side") || document.body;
  if (typeof MutationObserver !== "undefined" && observationTarget) {
    const observer = new MutationObserver(() => {
      const hasTodoAssignment = document.querySelector(
        '.ToDoSidebarItem svg[label="Assignment"], .ToDoSidebarItem svg[label="Quiz"]',
      );

      if (hasTodoAssignment && !plannerLoaded) {
        displayCanvasPageInfo();
        observer.disconnect();
      }
    });

    observer.observe(observationTarget, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }
}
