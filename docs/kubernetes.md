# ReVibe Kubernetes Orchestration

This document details the Kubernetes manifests and orchestration setup for ReVibe.

## 1. Architecture
The Kubernetes configuration under [`k8s/`](../k8s/) provides:
- **ReVibe Web Deployment (`k8s/deployment.yaml`)**:
  - Replicas: 2
  - Container Image: `ghcr.io/skit-devops-2026/devops-24eskcs096:latest`
  - Liveness & Readiness Probes: HTTP GET `/health` on port 8080.
  - Resource limits and requests configured for stable scheduling.
- **ReVibe Service (`k8s/service.yaml`)**:
  - Service type: `ClusterIP` routing traffic to port 8080.
- **MongoDB Stateful Deployment & Service (`k8s/mongodb.yaml`)**:
  - Service name `revibe-mongo-service` providing DNS resolution for the database.
- **Kustomize Orchestration (`k8s/kustomization.yaml`)**:
  - Bundles manifests for single-command cluster deployment.

## 2. Cluster Deployment Commands
```bash
# Apply full stack via Kustomize
kubectl apply -k k8s/

# Or apply individual manifests
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## 3. Verification Commands
```bash
# Check running pods across all services
kubectl get pods -o wide

# Check deployments and status
kubectl get deployments

# Check services and port bindings
kubectl get svc
```
Evidence screenshot is preserved in [`docs/k8s-pods.png`](k8s-pods.png).
