const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");

test("manifest scripts can load together in the extension context", () => {
  const context = { console, URL };
  context.globalThis = context;

  const scriptPaths = [
    "src/config/appConfig.js",
    "src/data/domAssignmentDataSource.js",
    "src/ui/helloWorldMessage.js",
    "src/data/plannerAssignments.js",
    "src/services/plannerAssignmentService.js",
    "src/ui/plannerAssignmentView.js",
  ];

  for (const scriptPath of scriptPaths) {
    const absolutePath = path.join(__dirname, "../..", scriptPath);
    vm.runInNewContext(fs.readFileSync(absolutePath, "utf8"), context, {
      filename: scriptPath,
    });
  }

  assert.equal(typeof context.isCanvasPage, "function");
  assert.equal(typeof context.fetchPlannerAssignments, "function");
  assert.equal(typeof context.loadWeeklyPlannerAssignments, "function");
});
