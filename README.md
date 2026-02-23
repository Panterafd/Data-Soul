# 🛒 Data Soul E-commerce Infrastructure

This project was developed during an industrial internship at **Data Soul LLP**. It focuses on building and automating the infrastructure for a multi-vendor electronics marketplace specialized in laptops, smartphones, and computers.

## 🌟 Key Features
* **Containerization:** Full system isolation using Docker and Docker Compose.
* **Reverse Proxy:** Nginx configured for secure traffic routing and SSL termination.
* **CI/CD Pipeline:** Fully automated deployment via GitHub Actions (Auto-deploy on `git push`).
* **Scalable Architecture:** Separate containers for Frontend, Backend, and PostgreSQL database.

## 🛠 Tech Stack
* **DevOps:** Docker, Docker Compose, GitHub Actions, Nginx.
* **Database:** PostgreSQL.
* **App Logic:** Alibaba-style vendor management & Admin Dashboard.



## 🏗 Infrastructure Design
The system follows a microservices-inspired architecture:
- **Nginx Container:** Handles incoming requests on port 80/443 and routes them to the app.
- **App Container:** Runs the core logic, including the Admin Panel for managing products (CRUD operations for laptop/smartphone specs).
- **DB Container:** A secured PostgreSQL instance with persistent data volumes.



## 🚀 Quick Start
To deploy this system on your local machine or server, run:

```bash
# Clone the repository
git clone [https://github.com/yourusername/data-soul-ecommerce.git](https://github.com/yourusername/data-soul-ecommerce.git)

# Navigate to directory
cd data-soul-ecommerce

# Start the automated infrastructure
docker-compose up -d --build
