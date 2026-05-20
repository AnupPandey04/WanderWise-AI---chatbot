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
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop $CONTAINER_NAME || true'
                sh 'docker rm $CONTAINER_NAME || true'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d --name $CONTAINER_NAME -p 80:3000 -e GEMINI_API_KEY=$GEMINI_API_KEY $IMAGE_NAME'
            }
        }
    }
}