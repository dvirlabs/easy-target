pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dvirlabs/easy-target:back-v1"
        DOCKER_CREDENTIALS_ID = 'Dockerhub_Auth'
        DOCKER_REPO = 'dvirlabs/easy-target'
        SSH_CREDENTIALS_ID = 'remote-server-ssh'
        REMOTE_SERVER_IP = '192.168.1.71'
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Docker image on Remote Server') {
            steps {
                script {
                    // Get the short commit ID
                    def commitId = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    DOCKER_IMAGE = "${DOCKER_REPO}:${commitId}"

                    // Define commands to run on the remote server
                    def remoteCommands = """
                        cd ${WORKSPACE}
                        docker build -t ${DOCKER_IMAGE} .
                        docker login -u \$DOCKERHUB_USERNAME -p \$DOCKERHUB_PASSWORD
                        docker push ${DOCKER_IMAGE}
                    """

                    // Execute commands on the remote server
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh "ssh -o StrictHostKeyChecking=no -l jenkins ${REMOTE_SERVER_IP} '${remoteCommands}'"
                    }
                }
            }
        }
    }

    environment {
        DOCKERHUB_USERNAME = credentials('dockerhub-username')
        DOCKERHUB_PASSWORD = credentials('dockerhub-password')
    }
}
