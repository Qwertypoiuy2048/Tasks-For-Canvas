const test = require("node:test");
const assert = require("node:assert/strict");
const { fetchPlannerAssignments } = require("../../src/data/plannerAssignments.js");

test("requests incomplete planner items for the supplied date range", async () => {
  let requestUrl;
  let requestOptions;

  const fetchImpl = async (url, options) => {
    requestUrl = url;
    requestOptions = options;
    return {
      ok: true,
      async json() {
        return [];
      },
    };
  };

  await fetchPlannerAssignments({
    fetchImpl,
    baseUrl: "https://school.instructure.com",
    startDate: "2026-10-05T06:00:00.000Z",
    endDate: "2026-10-12T05:59:59.999Z",
  });

  assert.equal(
    requestUrl,
    "https://school.instructure.com/api/v1/planner/items?start_date=2026-10-05T06%3A00%3A00.000Z&end_date=2026-10-12T05%3A59%3A59.999Z&order=asc&per_page=20&filter=incomplete_items",
  );
  assert.deepEqual(requestOptions, {
    method: "GET",
    credentials: "include",
  });
});

test("throws a planner request error when Canvas rejects the request", async () => {
  const fetchImpl = async () => ({
    ok: false,
    status: 401,
    statusText: "Unauthorized",
  });

  await assert.rejects(
    fetchPlannerAssignments({
      fetchImpl,
      baseUrl: "https://school.instructure.com",
      startDate: "2026-10-05T06:00:00.000Z",
      endDate: "2026-10-12T05:59:59.999Z",
    }),
    (error) => error.name === "PlannerRequestError" && error.status === 401,
  );
});
