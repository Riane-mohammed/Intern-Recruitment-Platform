# Intern Recruitment Platform

This project is aimed at creating a web application to facilitate the intern recruitment process by allowing candidates to take technical tests online. 

## Technologies Used

- Frontend: React.js, Material-UI, Redux, Redux Saga
- Backend: Spring Boot
- Database: MySQL
  
## Features

- **Authentication**: Login for admins.
- **Dashboard**: Overview of key metrics and statistics.
- **Test Management**: Create, edit, and delete tests with various levels and types.
- **Question Management**: Add, edit, and delete questions for tests.
- **Liste Management**: edit, and delete candidates.
- **Quiz Creation**: Compile tests into quizzes for candidate evaluation.
- **Email Sending**: Send test links to candidates via email.
- **Result Tracking**: View and analyze candidate test results, including score details and leaderboards.
- **Acceptance Email**: Send acceptance emails to candidates based on their test scores.

## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites

- Node.js and npm installed
- Java Development Kit (JDK)
- MySQL database

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yourusername/recruitment-management-system.git
   ```
2. Install NPM packages for frontend
   ```sh
   cd frontend
   npm install
   ```
3. Install dependencies for backend (using Maven for Spring Boot)
   ```sh
   cd backend
   mvn install
   ```
4. Configure your MySQL database settings in `application.properties` for backend

5. Start the backend server
   ```sh
   mvn spring-boot:run
   ```
6. Start the frontend development server
   ```sh
   npm start
   ```
7. Open your browser and navigate to `http://localhost:3000` to view the app

## Usage

- Login as admin to access the dashboard and manage tests, questions, candidates, and quizzes.
- Create tests, add questions, compile quizzes, and send test links to candidates.
- View candidate results and send acceptance emails based on scores.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Project Link: [https://github.com/Riane-mohammed/Intern-Recruitment-Platform](https://github.com/Riane-mohammed/Intern-Recruitment-Platform)
