const appConfig = {
  // IMPLEMENTED: The planner service uses these values at runtime.
  weekStartsOn: 1,
  rangeDays: 7,
  planner: {
    endpoint: "/api/v1/planner/items",
    order: "asc",
    perPage: 20,
    filter: "incomplete_items",
  },

  // FUTURE CONFIGURATION: These values document the intended display settings.
  // They are not read by the UI yet, so changing them currently has no effect.
  display: {
    panelLocation: "right-sidebar", // right-sidebar | floating | page
    panelTitle: "Canvas Tasks",
    showTodo: true,
    showGraded: true,
    showAnnouncements: false,
    showCompleted: false,
    showEmptySections: true,
    groupByCourse: false,
    sortBy: "canvas-order", // canvas-order | due-date | course | title | type
    sortDirection: "asc", // asc | desc
    maxVisibleTasks: null,
    collapsedSections: [],
    theme: "canvas-light", // canvas-light | light | dark | system
    density: "comfortable", // compact | comfortable | spacious
    showCourseNames: true,
    showTaskTypes: true,
    showDueDates: true,
    showFeedbackComments: true,
  },

  // FUTURE CONFIGURATION: These values describe which Canvas items count as tasks.
  // The current service still only keeps un-submitted planner assignments.
  tasks: {
    rangeMode: "current-week", // today | current-week | next-7-days | next-14-days | all-upcoming
    includeOverdue: true,
    includeAssignments: true,
    includeQuizzes: true,
    includeDiscussions: false,
    includeAnnouncements: false,
    includeCalendarEvents: false,
    includeMissing: true,
    includeLate: true,
    includeExcused: false,
    includeGraded: false,
    courseFilter: "all", // all | selected | excluded
    selectedCourseIds: [],
    excludedCourseIds: [],
    hideWithoutDueDates: false,
  },

  // FUTURE CONFIGURATION: The current data-source choice and refresh behavior are fixed.
  // The planner request and DOM fallback are currently selected by contentScript.js.
  data: {
    source: "planner-with-dom-fallback", // planner | dom | planner-with-dom-fallback
    timezone: "browser-local", // browser-local | utc | configured
    refreshMode: "initial-and-canvas-mutations", // initial | interval | initial-and-canvas-mutations
    refreshIntervalMinutes: 5,
    enablePagination: true,
    cacheResults: false,
    cacheDurationMinutes: 5,
  },

  // FUTURE CONFIGURATION: The current links open using Canvas's default navigation.
  interaction: {
    openLinksInNewTab: false,
    enableTaskCompletion: false,
    confirmTaskCompletion: true,
    rememberCollapsedSections: true,
    enableKeyboardShortcuts: false,
  },

  // FUTURE CONFIGURATION: Notifications and reminders do not exist yet.
  notifications: {
    enabled: false,
    remindBeforeMinutes: 1440,
    includeOverdue: true,
    includeMissing: true,
    dailySummary: false,
  },

  // FUTURE CONFIGURATION: No preferences or task history are stored yet.
  storage: {
    preferenceScope: "per-canvas-site", // global | per-canvas-site
    syncPreferences: false,
    saveTaskHistory: false,
    retentionDays: 30,
  },
};

if (typeof globalThis !== "undefined") {
  globalThis.TasksForCanvasConfig = appConfig;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { appConfig };
}
