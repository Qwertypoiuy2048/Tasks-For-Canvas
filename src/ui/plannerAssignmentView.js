function toTodoAssignments(assignments) {
  return assignments.map((assignment) => ({
    ...assignment,
    type: "Assignment",
    details: assignment.dueDate ? [assignment.dueDate] : [],
  }));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    toTodoAssignments,
  };
}
