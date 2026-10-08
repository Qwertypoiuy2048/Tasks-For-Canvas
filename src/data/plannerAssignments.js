const plannerRequestConfig = typeof module !== "undefined" && module.exports
  ? require("../config/appConfig.js").appConfig
  : globalThis.TasksForCanvasConfig;

function buildPlannerItemsUrl(baseUrl, startDate, endDate, config = plannerRequestConfig) {
  const url = new URL(config.planner.endpoint, baseUrl);
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);
  url.searchParams.set("order", config.planner.order);
  url.searchParams.set("per_page", String(config.planner.perPage));
  url.searchParams.set("filter", config.planner.filter);
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
