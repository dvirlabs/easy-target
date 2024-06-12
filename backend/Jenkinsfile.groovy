pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "dvirlabs/easy-target:${env.BUILD_TAG}"
    }

    stages {

        stage("build") {
            steps {
                echo 'building the application...'
                sh "docker build -t ${DOCKER_IMAGE} ."
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