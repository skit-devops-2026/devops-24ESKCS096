# ReVibe Observability and Monitoring

This document details the metrics collection and dashboarding architecture configured for ReVibe.

## 1. Metrics Exposition
The Express application utilizes `prom-client` to collect:
- Standard Node.js process and runtime metrics (heap memory, CPU usage, active handles, event loop lag).
- Application-level HTTP metrics:
  - `revibe_http_requests_total`: Counter partitioned by HTTP method, route, and status code.
  - `revibe_http_request_duration_seconds`: Histogram measuring response latency with 10 bucket divisions.

The metrics are exposed in standard Prometheus format at:
```http
GET /metrics
```

## 2. Prometheus Scraping Configuration
The scraping configuration is defined in [`monitoring/prometheus.yml`](../monitoring/prometheus.yml):
- Scrapes the application every 5 seconds.
- Discovers targets on `web:8080` (Docker Compose network) and `localhost:8080`.

## 3. Grafana Dashboard
A complete dashboard JSON specification is provided in [`monitoring/dashboard.json`](../monitoring/dashboard.json) containing:
1. HTTP Request Rate (req/s)
2. p95 and p99 Request Latency
3. Process Memory Usage (Heap used vs total)
4. CPU Utilization Rate
5. Application Uptime
