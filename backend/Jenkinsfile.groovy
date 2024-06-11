pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dvirlabs/easy-target:back-v1"
        DOCKER_CREDENTIALS_ID = 'Auth_Dockerhub'
        DOCKER_REPO = 'dvirlabs/easy-target'
        SSH_CREDENTIALS_ID = 'remote-server-ssh'
        REMOTE_SERVER_IP = '192.168.1.71'
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']], // Adjust this if your main branch is named differently
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    userRemoteConfigs: [[url: 'https://github.com/dvirlabs/easy-target.git']]
                ])
            }
        }

        stage('Build and Push Docker image on Remote Server') {
            steps {
                script {
                    // Get the short commit ID
                    def commitId = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    def dockerImage = "${DOCKER_REPO}:${commitId}"

                    // Define commands to run on the remote server
                    def remoteCommands = """
                        cd ${WORKSPACE}
                        docker build -t ${dockerImage} .
                        echo \$DOCKERHUB_PASSWORD | docker login -u \$DOCKERHUB_USERNAME --password-stdin
                        docker push ${dockerImage}
                    """

                    // Execute commands on the remote server
                    withCredentials([usernamePassword(credentialsId: 'Auth_Dockerhub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sshagent([SSH_CREDENTIALS_ID]) {
                            sh "ssh -o StrictHostKeyChecking=no -l jenkins ${REMOTE_SERVER_IP} '${remoteCommands}'"
                        }
                    }
                }
            }
        }
    }
}
