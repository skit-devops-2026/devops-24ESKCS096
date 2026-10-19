const client = require("prom-client");

const register = new client.Registry();

client.collectDefaultMetrics({
  app: "revibe",
  prefix: "revibe_",
  timeout: 5000,
  register,
});

const httpRequestCounter = new client.Counter({
  name: "revibe_http_requests_total",
  help: "Total number of HTTP requests processed",
  labelNames: ["method", "route", "status_code"],
});
register.registerMetric(httpRequestCounter);

const httpRequestDuration = new client.Histogram({
  name: "revibe_http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
});
register.registerMetric(httpRequestDuration);

const metricsMiddleware = (req, res, next) => {
  const start = process.hrtime();
  res.on("finish", () => {
    const elapsed = process.hrtime(start);
    const durationInSeconds = elapsed[0] + elapsed[1] / 1e9;
    const route = req.route ? req.route.path : req.path;
    httpRequestCounter.inc({
      method: req.method,
      route: route || req.path,
      status_code: res.statusCode,
    });
    httpRequestDuration.observe(
      {
        method: req.method,
        route: route || req.path,
        status_code: res.statusCode,
      },
      durationInSeconds
    );
  });
  next();
};

const metricsHandler = async (req, res) => {
  try {
    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
};

module.exports = {
  register,
  metricsMiddleware,
  metricsHandler,
  httpRequestCounter,
  httpRequestDuration,
};
