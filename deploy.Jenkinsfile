pipeline {
    agent any

    environment {
        IMAGE_NAME = "prabeshdevops/nextjs-app"
        IMAGE_TAG  = "latest"

        DEPLOY_SERVER = "54.90.215.27"
        DEPLOY_USER   = "ubuntu"
        DEPLOY_PORT   = "22"

        APP_NAME = "nextjs-app"
        APP_PORT = "3000"
        

        ENV_FILE = "/home/ubuntu/.nextjs.env"
    }

    stages {

        stage('📥 Pull Docker Image') {
            steps {
                sshagent(['deployment-server-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p ${DEPLOY_PORT} ${DEPLOY_USER}@${DEPLOY_SERVER} \
                    docker pull ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('🛑 Clean Old Container & Free Port') {
            steps {
                sshagent(['deployment-server-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p ${DEPLOY_PORT} ${DEPLOY_USER}@${DEPLOY_SERVER} '
                    docker rm -f ${APP_NAME} || true &&
                    sudo fuser -k ${APP_PORT}/tcp || true
                    '
                    """
                }
            }
        }

        stage('🚀 Run New Container') {
            steps {
                sshagent(['deployment-server-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p ${DEPLOY_PORT} ${DEPLOY_USER}@${DEPLOY_SERVER} '
                    docker run -d \
                    --name ${APP_NAME} \
                    -p ${APP_PORT}:3000 \
                    --env-file ${ENV_FILE} \
                    ${IMAGE_NAME}:${IMAGE_TAG}
                    '
                    """
                }
            }
        }

        stage('🔍 Health Check') {
            steps {
                sshagent(['deployment-server-ssh']) {
                    sh """
                    sleep 15
                    curl -f http://${DEPLOY_SERVER}:${APP_PORT} || exit 1
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }

        failure {
            echo '❌ Deployment Failed! Check logs.'
        }
    }
}


