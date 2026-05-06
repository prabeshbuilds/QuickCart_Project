pipeline {
    agent any

    triggers {
    githubPush()
    }
    environment {
        APP_NAME   = "nextjs-app"
        IMAGE_NAME = "prabeshdevops/nextjs-app"
        IMAGE_TAG  = "latest"

        DEPLOY_SERVER = "50.16.100.161"
        DEPLOY_USER   = "ubuntu"
        DEPLOY_PORT   = "22"

        APP_PORT = "3000"
    }

    stages {

        stage('🚀 Deploy to Server') {
            steps {
                sshagent(['deployment-ssh']) {
                    sh '''
                        set -e

                        echo "🚀 Connecting to server..."

                        ssh -o StrictHostKeyChecking=no -p $DEPLOY_PORT $DEPLOY_USER@$DEPLOY_SERVER "
                            set -e

                            echo '📥 Pulling latest Docker image...'
                            docker pull $IMAGE_NAME:$IMAGE_TAG

                            echo '🛑 Stopping old container if exists...'
                            docker stop $APP_NAME || true
                            docker rm $APP_NAME || true

                            echo '▶️ Starting new container...'
                            docker run -d \
                                --name $APP_NAME \
                                --restart unless-stopped \
                                -p $APP_PORT:3000 \
                                $IMAGE_NAME:$IMAGE_TAG

                            echo '🔍 Checking running containers...'
                            docker ps | grep $APP_NAME || true
                        "
                    '''
                }
            }
        }

        stage('🔍 Health Check') {
            steps {
                sh '''
                    echo "Checking application health..."

                    curl -f http://$DEPLOY_SERVER:$APP_PORT || {
                        echo "❌ Health check failed"
                        exit 1
                    }

                    echo "✅ App is running successfully"
                '''
            }
        }
    }
// 
    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}