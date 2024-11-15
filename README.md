# Messenger App - DevSecOps Pipeline with Jenkins and Docker

#### Project Overview
This project demonstrates a DevSecOps pipeline for a three-tier application called Messenger App. The CI/CD pipeline, managed with Jenkins, automates code quality analysis, security scanning, and deployment using Docker Compose. The pipeline integrates various tools, including SonarQube for code quality analysis, OWASP Dependency Check for dependency vulnerability scanning, and Trivy for file system scanning. This approach enhances security and stability, ensuring each build meets security and quality standards before deployment.

![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221005.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221005.png) 
![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221403.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221403.png)
![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221346.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241114-221346.png)


##### Pipeline Stages
1. **Clone Code from GitHub:** Clones the Messenger App project repository.
2. **SonarQube Quality Analysis:** Analyzes code quality using SonarQube.
3. **OWASP Dependency Check:** Scans for vulnerabilities in project dependencies.
4. **Sonar Quality Gate Scan:** Ensures code meets the defined quality standards.
5. **Trivy File System Scan:** Performs file system scanning to identify vulnerabilities.
6. **Deploy using Docker Compose:** Deploys the application using Docker Compose.


### Installation
- Prerequisites
- Jenkins
- Docker & Docker Compose
- SonarQube
- OWASP Dependency Check
- Trivy

### Installation on Ubuntu
1. Install Jenkins:

```bash
sudo apt update
sudo apt install openjdk-11-jdk -y
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins

```

2. Install Docker and Docker Compose:

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
# Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

3. Install SonarQube:

 ```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
 ```

4. Install Trivy:

```bash
sudo apt update
sudo apt install -y wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt update
sudo apt install trivy -y
```


## Creating the Jenkins Pipeline

1. Open Jenkins and create a new Pipeline project.
2. In the pipeline configuration, use the following script:

```bash
pipeline {
    agent any
    environment {
        SONAR_HOME = tool "Sonar"
    }
    stages {
        stage("Clone Code from GitHub") {
            steps {
                git url: "https://github.com/tushargurav28/Deployment-Messenger.git", branch: "main"
            }
        }
        stage("SonarQube Quality Analysis") {
            steps {
                withSonarQubeEnv("Sonar") {
                    sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=Messenger -Dsonar.projectKey=Messenger"
                }
            }
        }
        stage("OWASP Dependency Check") {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'dc'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage("Sonar Quality Gate Scan") {
            steps {
                timeout(time: 2, unit: "MINUTES") {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
        stage("Trivy File System Scan") {
            steps {
                sh "trivy fs --format table -o trivy-fs-report.html ."
            }
        }
        stage("Deploy using Docker compose") {
            steps {
                sh "docker-compose up -d"
            }
        }
    }
}


```

3. Run the pipeline to initiate the build and deployment process.

## Screenshot 

![https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241115-173510.png](https://github.com/tushargurav28/Deployment-Messenger/blob/main/images/Screenshot-20241115-173510.png)

