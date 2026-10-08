const appConfig = {
  weekStartsOn: 1,
  rangeDays: 7,
  planner: {
    endpoint: "/api/v1/planner/items",
    order: "asc",
    perPage: 20,
    filter: "incomplete_items",
  },
};

if (typeof globalThis !== "undefined") {
  globalThis.TasksForCanvasConfig = appConfig;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { appConfig };
}
