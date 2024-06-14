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

        stage("Push image") {
            steps {
                echo 'push to dockerhub...'
                sh "docker push ${DOCKER_IMAGE}"
            }

        }

    }

}