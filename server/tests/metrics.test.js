const express = require("express");
const request = require("supertest");
const { metricsMiddleware, metricsHandler } = require("../utils/metrics");

const app = express();
app.use(metricsMiddleware);
app.get("/metrics", metricsHandler);
app.get("/ping", (req, res) => res.json({ message: "pong" }));

describe("GET /metrics", () => {
  it("returns prometheus formatted metrics", async () => {
    await request(app).get("/ping");
    const response = await request(app).get("/metrics");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("revibe_http_requests_total");
    expect(response.text).toContain("revibe_");
  });
});
