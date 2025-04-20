# 🧩 Cloud-Based Microservices System

A **scalable**, **secure**, and **modular** microservices application built with Node.js, Express, MongoDB Atlas and React. It consists of two core backend services and a React frontend, all containerized with Docker and deployed via CI/CD to AWS ECS/ECR and Netlify.

---

## 🚀 Project Overview

This system is designed to manage users and inventory through two independent, RESTful microservices. Each service runs in its own Docker container and connects to a shared MongoDB Atlas cluster. A React-based frontend communicates with both services over well‑defined HTTP APIs.

---

## 🛠️ Core Components

### 1. User Management Service (`user-service`)
- **Features**:  
  - User registration & login  
  - JWT‑based authentication  
  - Password reset via OTP  
- **Tech**: Node.js, Express, Mongoose, MongoDB Atlas  
- **Entry Point**: `user-service/src/app.js`

### 2. Inventory Management Service (`inventory-service`)
- **Features**:  
  - Add / edit / delete / view items  
  - Increase / decrease item quantities  
  - Report generation: monthly & range‑based summaries, transaction details  
- **Tech**: Node.js, Express, Mongoose, MongoDB Atlas  
- **Entry Point**: `inventory-service/src/app.js`

### 3. Frontend (`frontend`)
- **Tech**: React, Tailwind CSS, Bootstrap  
- **Deployment**: Netlify  
- **Build Output**: `frontend/build`

---

## 🔄 CI/CD Pipeline

Managed via **GitHub Actions** (`.github/workflows/ci-cd.yml`):

1. **Checkout & Setup**  
2. **Static Analysis & Security**  
   - SonarCloud code quality  
   - Snyk vulnerability scanning  
3. **Docker Build & Push**  
   - Build backend images  
   - Push to AWS ECR  
4. **ECS Redeployment**  
   - Force‑new‑deployment on AWS ECS services  
5. **Frontend Build & Deploy**  
   - `npm ci && npm run build`  
   - Deploy to Netlify using official Action  

---

## 📡 API Endpoints

### User Service (`/api/auth`)
| Route               | Method | Description                    |
|---------------------|--------|--------------------------------|
| `/register`         | POST   | Register a new user            |
| `/login`            | POST   | Authenticate and obtain JWT    |
| `/forgot-password`  | POST   | Send OTP to reset password     |
| `/verify-otp`       | POST   | Verify password‑reset OTP      |
| `/reset-password`   | POST   | Reset password with OTP        |
| `/profile`          | GET    | Get current user profile       |
| `/profile`          | PUT    | Update user profile            |
| `/delete-account`   | DELETE | Delete the user’s account      |

### Inventory Service (`/api/items`)
| Route                                                    | Method | Description                                  |
|----------------------------------------------------------|--------|----------------------------------------------|
| `/`                                                      | GET    | List all inventory items                     |
| `/`                                                      | POST   | Create a new item                            |
| `/:id`                                                   | PUT    | Update an existing item                      |
| `/:id`                                                   | DELETE | Remove an item                               |
| `/:id/increase`                                          | PATCH  | Increase an item’s quantity                  |
| `/:id/decrease`                                          | PATCH  | Decrease an item’s quantity                  |
| `/max-decrease/:userId/:date`                            | GET    | Most‑decreased item in a given month         |
| `/min-decrease/:userId/:date`                            | GET    | Least‑decreased item in a given month        |
| `/max-decrease-range/:userId`                            | GET    | Most‑decreased item across a date range      |
| `/min-decrease-range/:userId`                            | GET    | Least‑decreased item across a date range     |
| `/item-transactions/:itemCode/:userId/:startDate/:endDate/:action` | GET    | Transaction details for a specific item/action |
| `/increased-summary/:userId/:startDate/:endDate`         | GET    | Summary of all increases in a date range     |

---

## ☁️ Cloud Infrastructure

| Component            | Service / Tool             | Tier     |
|----------------------|----------------------------|----------|
| Backend Containers   | AWS ECS (Fargate)          | Free     |
| Container Registry   | AWS ECR                    | Free     |
| Database             | MongoDB Atlas              | Free     |
| Frontend Hosting     | Netlify                    | Free     |
| CI/CD                | GitHub Actions             | Free     |
| Security Scanning    | Snyk / SonarCloud          | Free     |

---

## 🧪 Technologies Used

- **Node.js** & **Express**  
- **MongoDB Atlas** (Mongoose)  
- **React**, **Tailwind CSS**, **Bootstrap**  
- **Docker**, **AWS ECS/ECR**, **Netlify**  
- **GitHub Actions**, **Snyk**, **SonarCloud**

---

## 📁 Folder Structure
![image](https://github.com/user-attachments/assets/ce5a253b-580b-4c38-9f0f-bfb1410e57f8)





