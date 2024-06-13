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
                echo 'login to Dockerhub...'
                withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKER_TOKEN')]) {
                    sh 'echo $DOCKER_TOKEN | docker login --username dvirlabs --password-stdin'
                // sh 'docker login -u dvirlabs -p dckr_pat_pPy6gAAksSYnRq0SUFo_-XML9hY'
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