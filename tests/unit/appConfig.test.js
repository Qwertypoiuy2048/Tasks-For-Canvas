const test = require("node:test");
const assert = require("node:assert/strict");
const { appConfig } = require("../../src/config/appConfig.js");

test("defines the implemented configuration defaults", () => {
  assert.deepEqual(appConfig.weekStartsOn, 1);
  assert.deepEqual(appConfig.rangeDays, 7);
  assert.deepEqual(appConfig.planner, {
    endpoint: "/api/v1/planner/items",
    order: "asc",
    perPage: 20,
    filter: "incomplete_items",
  });
});

test("defines future configuration areas without enabling them yet", () => {
  assert.equal(appConfig.display.panelLocation, "right-sidebar");
  assert.equal(appConfig.tasks.includeOverdue, true);
  assert.equal(appConfig.data.source, "planner-with-dom-fallback");
  assert.equal(appConfig.interaction.openLinksInNewTab, false);
  assert.equal(appConfig.notifications.enabled, false);
});
