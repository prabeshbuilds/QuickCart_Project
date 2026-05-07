pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        APP_NAME      = "nextjs-app"
        IMAGE_NAME    = "prabeshdevops/nextjs-app"
        IMAGE_TAG     = "${env.GIT_COMMIT.take(7)}"

        DEPLOY_SERVER = "98.91.218.118"
        DEPLOY_USER   = "ubuntu"
        DEPLOY_PORT   = "22"

        APP_PORT      = "3000"
        ENV_FILE = "/home/ubuntu/.env"
    }

    stages {

        stage('📥 Pull Docker Image') {
            steps {
                sshagent(['deployment-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p $DEPLOY_PORT $DEPLOY_USER@$DEPLOY_SERVER \\
                        'docker pull $IMAGE_NAME:$IMAGE_TAG'
                    """
                }
            }
        }

        stage('🛑 Stop Old Container') {
            steps {
                sshagent(['deployment-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p $DEPLOY_PORT $DEPLOY_USER@$DEPLOY_SERVER \\
                        'docker stop $APP_NAME || true && docker rm $APP_NAME || true'
                    """
                }
            }
        }

        stage('🚀 Run New Container') {
            steps {
                sshagent(['deployment-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p $DEPLOY_PORT $DEPLOY_USER@$DEPLOY_SERVER \\
                        'docker run -d \
                            --name $APP_NAME \
                            --restart unless-stopped \
                            -p $APP_PORT:3000 \
                            $IMAGE_NAME:$IMAGE_TAG'
                    """
                }
            }
        }

        stage('🔍 Health Check') {
            steps {
                sh """
                    echo "Checking application health..."

                    curl -f --max-time 10 http://$DEPLOY_SERVER:$APP_PORT || {
                        echo "❌ Health check failed"
                        exit 1
                    }

                    echo "✅ Application is running successfully"
                """
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}