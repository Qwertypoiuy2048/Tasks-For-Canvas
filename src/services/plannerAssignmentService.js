function normalizeIncompleteAssignments(items) {
  return items
    .filter((item) => (
      item &&
      item.plannable_type === "assignment" &&
      item.submissions &&
      item.submissions.submitted === false
    ))
    .map((item) => ({
      id: item.plannable_id,
      courseId: item.course_id,
      title: item.plannable && item.plannable.title,
      course: item.context_name,
      dueDate: item.plannable && item.plannable.due_at,
      url: item.html_url,
      submitted: item.submissions.submitted,
      graded: item.submissions.graded,
      missing: item.submissions.missing,
      late: item.submissions.late,
    }));
}

function getCurrentWeekRange(now = new Date()) {
  const start = new Date(now);
  const daysSinceMonday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - daysSinceMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  end.setMilliseconds(end.getMilliseconds() - 1);

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}

async function loadWeeklyPlannerAssignments({ fetchAssignments, now = new Date() }) {
  const range = getCurrentWeekRange(now);
  const items = await fetchAssignments(range);
  return normalizeIncompleteAssignments(items);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getCurrentWeekRange,
    loadWeeklyPlannerAssignments,
    normalizeIncompleteAssignments,
  };
}
