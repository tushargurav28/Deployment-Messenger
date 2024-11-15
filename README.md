# Messenger App - DevSecOps Pipeline with Jenkins and Docker

![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221005.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221005.png)
![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221015.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221015.png)
![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221403.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221403.png)
![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221346.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221346.png)
![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241115-173510.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241115-173510.png)






#### Project Overview
This project demonstrates a DevSecOps pipeline for a three-tier application called Messenger App. The CI/CD pipeline, managed with Jenkins, automates code quality analysis, security scanning, and deployment using Docker Compose. The pipeline integrates various tools, including SonarQube for code quality analysis, OWASP Dependency Check for dependency vulnerability scanning, and Trivy for file system scanning. This approach enhances security and stability, ensuring each build meets security and quality standards before deployment.

##### Pipeline Stages
1. **Clone Code from GitHub:** Clones the Messenger App project repository.
2. **SonarQube Quality Analysis:** Analyzes code quality using SonarQube.
3. **OWASP Dependency Check:** Scans for vulnerabilities in project dependencies.
4. **Sonar Quality Gate Scan:** Ensures code meets the defined quality standards.
5. **Trivy File System Scan:** Performs file system scanning to identify vulnerabilities.
6. **Deploy using Docker Compose:** Deploys the application using Docker Compose.




