pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "dvirlabs/easy-target:${env.BUILD_TAG}"
    }

    stages {

        stage("clone") {
            steps {
                sh 'git clone https://github.com/dvirlabs/easy-target.git'
                sh 'cd easy-target/backend'
            }
        }

        stage("build") {
            steps {
                sh 'docker build -t test-1 .'
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