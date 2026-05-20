pipeline {
    agent any

    environment {
        IMAGE_NAME = "wanderwise"
        CONTAINER_NAME = "wanderwise-container"
        GEMINI_API_KEY = credentials('GEMINI_API_KEY')
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/AnupPandey04/WanderWise-AI---chatbot.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t $IMAGE_NAME .'
                    } else {
                        bat 'docker build -t %IMAGE_NAME% .'
                    }
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker stop $CONTAINER_NAME || true'
                        sh 'docker rm $CONTAINER_NAME || true'
                    } else {
                        bat 'docker stop %CONTAINER_NAME% || exit 0'
                        bat 'docker rm %CONTAINER_NAME% || exit 0'
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker run -d --name $CONTAINER_NAME -p 80:3000 -e GEMINI_API_KEY=$GEMINI_API_KEY $IMAGE_NAME'
                    } else {
                        bat 'docker run -d --name %CONTAINER_NAME% -p 80:3000 -e GEMINI_API_KEY=%GEMINI_API_KEY% %IMAGE_NAME%'
                    }
                }
            }
        }

        stage('Cleanup Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker system prune -f'
                    } else {
                        bat 'docker system prune -f'
                    }
                }
            }
        }
    }
}