# ReVibe

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS096 | Chetan Yadav | b240307-source |

## About

ReVibe is a web application where users can browse and manage listings.
It includes user authentication and an organised interface for viewing listing information.

## Tech stack

- Frontend: EJS, HTML, CSS, Bootstrap and JavaScript
- Backend: Node.js and Express
- Database: MongoDB

## Running locally

### Using Make
```bash
make install
make test
make run
```

### Using Docker Compose
```bash
# Build and run with MongoDB in detached mode
make docker-up

# Stop all running containers
make docker-down
```

## Container Registry

The container image is automatically built and published to GitHub Packages Container Registry on every merge to `main`:
- **Image URL**: `ghcr.io/skit-devops-2026/devops-24eskcs096:latest`

## Observability and Monitoring

ReVibe exposes Prometheus-compliant observability metrics:
- **Health Check Endpoint**: `/health` (returns `{"status":"ok"}`)
- **Prometheus Metrics Endpoint**: `/metrics` (exposes `revibe_http_requests_total`, `revibe_http_request_duration_seconds`, process CPU & memory metrics)
- **Prometheus Config**: Defined in [`monitoring/prometheus.yml`](monitoring/prometheus.yml)
- **Grafana Dashboard**: Importable dashboard specification committed in [`monitoring/dashboard.json`](monitoring/dashboard.json)

## Kubernetes Orchestration

Declarative manifests for Kubernetes cluster deployment are provided under [`k8s/`](k8s/):
```bash
# Deploy MongoDB and ReVibe stack using Kustomize
kubectl apply -k k8s/

# Verify running pods
kubectl get pods -o wide
```
Cluster verification evidence screenshot is committed at [`docs/k8s-pods.png`](docs/k8s-pods.png).

## DevOps Milestones Status

- [x] **M1 (Repository Setup)**: Hygiene checks passing, valid .gitignore, author table, clean commit history.
- [x] **M2 (Branching & Pull Requests)**: Multiple feature branches, 4+ merged PRs with detailed descriptions.
- [x] **M3 (CI Pipeline & Automated Tests)**: GitHub Actions workflow running automated test suite and hygiene checks.
- [x] **M4 (Jenkins Pipeline)**: Declarative `Jenkinsfile` configuring multi-stage build, hygiene, tests, and Docker packaging.
- [x] **M5 (Containerization)**: Production multi-stage `Dockerfile`, `docker-compose.yml`, and container registry publish workflow (`ghcr.io`).
- [x] **M6 (Deployment & Monitoring)**: Live deployment endpoint, Prometheus configuration, Grafana dashboard, `/metrics` endpoint, and deployment screenshot.
- [x] **M7 (Kubernetes)**: Kubernetes Deployment and Service manifests under `k8s/` and pod evidence screenshot in `docs/`.

## Live URL

https://revibe-24eskcs096.onrender.com