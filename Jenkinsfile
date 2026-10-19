pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        IMAGE_NAME = 'devops-24eskcs096'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source repository...'
                checkout scm
            }
        }

        stage('Hygiene Check') {
            steps {
                echo 'Running repository hygiene validation...'
                sh 'bash scripts/hygiene.sh'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing application dependencies...'
                sh 'make install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Executing automated test suite...'
                sh 'make test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker container image...'
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Verify Docker Compose') {
            steps {
                echo 'Validating Docker Compose orchestration configuration...'
                sh 'docker compose config'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Jenkins Pipeline build #${env.BUILD_NUMBER} completed successfully!"
        }
        failure {
            echo "Jenkins Pipeline build #${env.BUILD_NUMBER} encountered a failure."
        }
    }
}
