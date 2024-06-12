pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        IMAGE_NAME = "dvirlabs/easy-target"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Docker image on Remote Server') {
            steps {
                script {
                    // Get the short commit hash for tagging
                    def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    
                    // Generate the Docker image tag
                    def dockerTag = "${IMAGE_NAME}:${commitHash}"

                    // Use sshagent for SSH credentials
                    sshagent (credentials: ['ssh-credentials-id']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no root@192.168.1.71 << EOF
                            cd easy-target/backend
                            docker build -t ${dockerTag} .
                            echo \$DOCKERHUB_PASSWORD | docker login -u \$DOCKERHUB_USERNAME --password-stdin
                            docker push ${dockerTag}
                            EOF
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
