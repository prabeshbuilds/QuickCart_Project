pipeline {
    agent any

    environment {
        IMAGE_NAME = "prabeshdevops/nextjs-app"
        IMAGE_TAG  = "latest"

        DEPLOY_SERVER = "98.91.218.118"
        DEPLOY_USER   = "ubuntu"
        DEPLOY_PORT   = "22"

        APP_NAME = "nextjs-app"
        APP_PORT = "3000"
    }

    stages {

        stage('📥 Pull Docker Image') {
            steps {
                sshagent(['ubuntu']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p ${DEPLOY_PORT} ${DEPLOY_USER}@${DEPLOY_SERVER} \
                    docker pull ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('🛑 Stop Old Container') {
            steps {
                sshagent(['ubuntu']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p ${DEPLOY_PORT} ${DEPLOY_USER}@${DEPLOY_SERVER} '
                    docker stop ${APP_NAME} || true &&
                    docker rm ${APP_NAME} || true
                    '
                    """
                }
            }
        }

        stage('🚀 Run New Container') {
            steps {
                sshagent(['ubuntu']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p ${DEPLOY_PORT} ${DEPLOY_USER}@${DEPLOY_SERVER} '
                    docker run -d \
                    --name ${APP_NAME} \
                    -p ${APP_PORT}:3000 \
                    ${IMAGE_NAME}:${IMAGE_TAG}
                    '
                    """
                }
            }
        }

        stage('🔍 Health Check') {
            steps {
                sh """
                sleep 10
                curl http://${DEPLOY_SERVER}:${APP_PORT}
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }

        failure {
            echo '❌ Deployment Failed!'
        }
    }
}