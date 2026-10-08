function buildPlannerItemsUrl(baseUrl, startDate, endDate) {
  const url = new URL("/api/v1/planner/items", baseUrl);
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);
  url.searchParams.set("order", "asc");
  url.searchParams.set("per_page", "20");
  url.searchParams.set("filter", "incomplete_items");
  return url.toString();
}

class PlannerRequestError extends Error {
  constructor(status, statusText) {
    super(`Canvas planner request failed with status ${status}.`);
    this.name = "PlannerRequestError";
    this.status = status;
    this.statusText = statusText;
  }
}

async function fetchPlannerAssignments({
  fetchImpl = fetch,
  baseUrl,
  startDate,
  endDate,
}) {
  const response = await fetchImpl(
    buildPlannerItemsUrl(baseUrl, startDate, endDate),
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new PlannerRequestError(response.status, response.statusText);
  }

  return response.json();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    buildPlannerItemsUrl,
    fetchPlannerAssignments,
    PlannerRequestError,
  };
}
