pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "dvirlabs/easy-target:backend-v${BUILD_NUMBER}"
    }

    stages {

        stage("build") {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} backend/."
            }
        }


        stage("login") {
            steps {
                echo 'Login to Dockerhub...'
                withCredentials([string(credentialsId: 'Docker_Auth', variable: 'DOCKER_TOKEN')]) {
                    sh 'echo $DOCKER_TOKEN | docker login --username dvirlabs --password-stdin'
                }
            }
        }

        stage("test") {
            steps {
                echo 'Run and test the Docker container...'
                script {
                    sh "docker run -d --name backend-container -p 8000:8000 ${DOCKER_IMAGE}"
                    sleep 10 // Wait for the container to be fully up and running
                    try {
                        sh 'curl -f http://localhost:8000/get_targets'
                        echo 'API test passed'
                    } catch (Exception e) {
                        error("API test failed: ${e.message}")
                    } finally {
                        sh 'docker stop backend-container'
                        sh 'docker rm backend-container'
                    }
                }
            }
        }

        stage("Push image") {
            steps {
                echo 'push to dockerhub...'
                sh "docker push ${DOCKER_IMAGE}"
            }

        }

    }

}