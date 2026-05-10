# 🛒 QuickCart - Full DevOps eCommerce Frontend (CI/CD + Docker + SonarQube + AWS)

QuickCart is an open-source **Next.js eCommerce frontend project** designed with modern UI/UX and real-world **DevOps practices**.

It demonstrates a complete production-like workflow including:

- CI/CD automation using Jenkins  
- Code quality analysis using SonarQube  
- Docker containerization  
- Deployment on AWS VPC (EC2-based infrastructure)

---

# 🚀 Tech Stack

- ⚡ Next.js
- 🎨 Tailwind CSS
- 🐳 Docker
- 🔧 Jenkins (CI/CD Pipeline)
- 🧪 SonarQube (Code Quality Analysis)
- ☁️ AWS (VPC, EC2, Security Groups)
- 🌐 Nginx (Optional reverse proxy)

---

# ✨ Features

- Modern responsive eCommerce UI
- Fast and optimized Next.js application
- Reusable component-based architecture
- Dockerized application
- Automated CI/CD pipeline
- Code quality checks using SonarQube
- Cloud deployment on AWS VPC
- Production-ready DevOps workflow

---

# 🏗️ System Architecture
GitHub Repository
↓
Jenkins CI/CD Pipeline
↓
SonarQube Code Quality Analysis
↓
Docker Image Build
↓
Docker Container Deployment
↓
AWS EC2 (Inside VPC)
↓
Public Access via IP / Load Balancer


---

# 🧪 SonarQube (Code Quality)

SonarQube is used to ensure clean and maintainable code.

## It analyzes:

- Bugs
- Security Vulnerabilities
- Code Smells
- Duplications
- Maintainability Rating

---

## 📜 Jenkins Stage: SonarQube Analysis

```groovy
stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh '''
                npx sonar-scanner \
                -Dsonar.projectKey=quickcart \
                -Dsonar.projectName=QuickCart \
                -Dsonar.sources=. \
                -Dsonar.host.url=$SONAR_HOST_URL \
                -Dsonar.login=$SONAR_AUTH_TOKEN
            '''
        }
    }
}

☁️ AWS Deployment (VPC Architecture)
🌐 Infrastructure
VPC with public subnet
Internet Gateway attached
Route tables configured
🖥️ EC2 Instance
Ubuntu 22.04 LTS
Docker installed
Jenkins agent or SSH deployment

 MIT License
