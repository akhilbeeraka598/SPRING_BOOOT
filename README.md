# Premium 3-Tier Application

A production-ready full-stack application with Spring Boot, React, and MySQL.

## Project Structure
- `frontend/`: React + Vite application with a premium dark-mode UI.
- `backend/`: Spring Boot Java application handling REST APIs and Security.
- `database/`: Data layer with initialization scripts.
- `k8s/`: Kubernetes manifests for cloud deployment.

## Quick Start (Local)
Ensure you have Docker and Docker Compose installed.

1. Clone the repository.
2. Run the entire stack:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`

## Tech Stack
- **Frontend**: React, Vite, Lucide React, Axios.
- **Backend**: Spring Boot 3, Spring Security (JWT), Spring Data JPA.
- **Database**: MySQL 8.0.
- **DevOps**: Docker, Kubernetes.
