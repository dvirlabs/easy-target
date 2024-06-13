pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "dvirlabs/easy-target:backend-${BUILD_NUMBER}"
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
                sh 'docker login -u dvirlabs -p dckr_pat_pPy6gAAksSYnRq0SUFo_-XML9hY'
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