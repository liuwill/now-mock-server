pipeline {
    agent { docker 'node' }
    stages {
        stage('Build') {
            steps {
                sh 'npm install && npm lint'
            }
        }
        stage('Test'){
            steps {
                sh 'npm install && npm lint'
            }
        }
    }
}
