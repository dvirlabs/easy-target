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
                    sh  '''
                        docker run -d --name prometheus -p 9090:9090 prom/prometheus -v $(pwd)/targets.yml/etc/prometheus/targets.yml
                    '''
                    sleep 10
                    try {
                        sh '''
                            curl -X GET http://localhost:8000/get_targets
                        '''
                        // Test add_target API
                        sh '''
                            curl -X POST http://localhost:8000/add_target \
                                 -H "Content-Type: application/json" \
                                 -d \'{"target_ip": "8.8.8.8", "port": 1111}\'
                        '''
                        echo 'add_target API test passed'

                        // Test get_targets API
                        sh '''
                            curl -XGET http://localhost:8000/get_targets
                        '''
                        echo 'get_targets API test passed' 
                        
                        // Test remove_target API
                        sh '''
                            curl -X DELETE http://localhost:8000/remove_target \
                                 -H "Content-Type: application/json" \
                                 -d \'{"target_ip": "8.8.8.8", "port": 1111}\'
                        '''
                        echo 'remove_target API test passed'
                    } catch (Exception e) {
                        error("API test failed: ${e.message}")
                    } finally {
                        sh 'docker stop backend-container'
                        sh 'docker rm backend-container'
                        sh 'docker stop prometheus'
                        sh 'docker rm prometheus'
                    }
                }
            }
        }

        stage("Push image") {
            steps {
                echo 'Push to Dockerhub...'
                sh "docker push ${DOCKER_IMAGE}"
            }
        }

    }

    post {
        always {
            // Clean up docker containers in case of failure
            sh 'docker rm -f backend-container || true'
        }
    }
}
