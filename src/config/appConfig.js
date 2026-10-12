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

  // IMPLEMENTED: The panel renderer reads the visibility, title, theme, and density settings.
  display: {
    panelTitle: "Canvas Tasks",
    showTodo: true,
    showGraded: true,
    showCourseNames: true,
    showTaskTypes: true,
    showEmptySections: true,
    showFeedbackComments: true,
    showDueDates: true,
    theme: "light", // light | dark | system
    density: "comfortable", // compact | comfortable | spacious
    // FUTURE CONFIGURATION: Announcements and completed tasks are not displayed yet.
    panelLocation: "right-sidebar", // right-sidebar | floating | page
    showAnnouncements: false,
    showCompleted: false,
    // FUTURE CONFIGURATION: Grouping, sorting, limits, priority colors, and collapsed
    // sections are documented here but are not wired into the renderer yet.
    groupBy: "day",  // day | course
    sortBy: "due-date", // due-date | course | title | type
    sortDirection: "asc", // asc | desc
    maxVisibleTasks: 60,
    collapsedSections: [],
    useColorPriority: true,
    lowPriorityColor: "#fff",
    mediumPriorityColor: "#777",
    highPriorityColor: "#000",
    lowPriorityCutoff: 10,
    mediumPriorityCutoff: 40,
    highPriorityCutoff: 90,
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
};

if (typeof globalThis !== "undefined") {
  globalThis.TasksForCanvasConfig = appConfig;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { appConfig };
}
