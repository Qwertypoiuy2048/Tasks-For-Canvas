if (isCanvasPage(window.location.href)) {
  function displayCanvasPageInfo() {
    const canvasPageInfo = collectCanvasPageInfo(document, window.location.href);
    const existingMessage = document.querySelector("#canvas-tasks-hello-world");

    console.info("Tasks for Canvas: temporary page information", canvasPageInfo);
    if (existingMessage) {
      updateHelloWorldMessage(existingMessage, canvasPageInfo, document);
    } else {
      addHelloWorldMessage(document, canvasPageInfo);
    }
  }

  displayCanvasPageInfo();

  const observationTarget = document.querySelector("#right-side") || document.body;
  if (typeof MutationObserver !== "undefined" && observationTarget) {
    const observer = new MutationObserver(() => {
      const hasTodoAssignment = document.querySelector(
        '.ToDoSidebarItem svg[label="Assignment"], .ToDoSidebarItem svg[label="Quiz"]',
      );

      if (hasTodoAssignment) {
        displayCanvasPageInfo();
        observer.disconnect();
      }
    });

    observer.observe(observationTarget, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }
}
