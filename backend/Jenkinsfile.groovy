pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "easy-target-backend"
        DOCKER_CREDENTIALS_ID = 'Dockerhub_Auth'
        DOCKER_REPO = 'dvirlabs/easy-target-backend'
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker image') {
            steps {
                script {
                    // Get the short commit ID
                    def commitId = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    DOCKER_IMAGE = "${DOCKER_REPO}:${commitId}"
                    
                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        // No operation needed here; the registry is configured
                    }
                }
            }
        }

        stage('Push Docker image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }
    }
}
