# TaskTracker 📝

TaskTracker is a comprehensive, full-stack application designed to help individual users efficiently organize, manage, and track their daily tasks and priorities. Built with a robust Java backend utilizing Jakarta Servlets and Hibernate ORM, it seamlessly integrates with a MySQL database to ensure secure data persistence, reliable task state management, and personalized task mapping for each registered account. The frontend is built with React Native and Expo, offering a native mobile experience. Whether you are managing personal daily to-dos or structuring long-term project deliverables, TaskTracker provides a clean interface and structured REST API endpoints to streamline your productivity workflow.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Architecture Overview

TaskTracker follows a classic multi-tier architecture, dividing responsibilities into distinct layers for maintainability, scalability, and security.

### Frontend Architecture
The mobile client is built using **React Native** and **Expo**, providing a single codebase that runs on both iOS and Android. It uses functional components and hooks for state management. Navigation is handled by Expo Router, offering a seamless user experience. Networking is implemented via the Fetch API, calling our custom REST endpoints securely. The user interface emphasizes ease of use, leveraging Expo's native modules to deliver a fast and responsive mobile experience.

### Backend Architecture
The backend is a monolithic service built with **Java** and **Jakarta Servlets**, deployed typically on an Apache Tomcat server. It receives HTTP requests, processes business logic, and manages data persistence. We use **Hibernate ORM** to abstract database interactions, mapping our Java domain models (such as `User` and `Task`) directly to our relational database schema. This decoupled design allows us to scale the backend application layer independently of the database.

### Database Architecture
Data is persisted in a **MySQL** relational database. The schema consists of two primary tables: `users` and `tasks`. A one-to-many relationship links users to their specific tasks using foreign key constraints (`fk_tasks_users`), enforcing referential integrity. The database is strictly normalized to minimize redundancy.

## Features

- **User Authentication:** Secure user registration, authentication, and session management.
- **Task Management:** Full CRUD functionality (Create, Read, Update, Delete) for daily tasks and to-dos.
- **User-Specific Tasks:** Account isolation ensuring user tasks map directly to individual accounts.
- **Database Integration:** Relational persistence handled via Hibernate ORM with MySQL database storage.
- **Mobile Experience:** Cross-platform mobile frontend built with React Native and Expo.

## Technologies Used

- **Frontend:** React Native, Expo, TypeScript
- **Backend:** Java, Jakarta Servlets, Hibernate ORM
- **Database:** MySQL 8.0+
- **Tools:** Maven, Apache Tomcat, Node.js, Git, HeidiSQL / MySQL Workbench

## Prerequisites

Before running the project, install the required software:

- **JDK 11** or higher
- **Apache Maven**
- **MySQL Server 8.0+**
- **Apache Tomcat Server** (v9+ / v10+)
- **Node.js** (for frontend)
- **Git**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tasktracker.git
   ```

2. Open the project directory:

   ```bash
   cd tasktracker
   ```

3. Setup both Backend and Frontend dependencies as described below.

4. Configure the database and environment variables.

## Database Setup

1. Open your database management tool (HeidiSQL, MySQL Workbench, or CLI).
2. Create the required database.
3. Import the SQL file provided in the repository:

   ```sql
   SOURCE database/database.sql;
   ```

4. Configure the database connection using your local environment variables.

## Configuration

Set the required environment variables in your execution environment to configure Hibernate securely.

```bash
export DB_USER=YOUR_MYSQL_USERNAME
export DB_PASSWORD=YOUR_MYSQL_PASSWORD
```

*Note: Do not commit real passwords, API keys, or other secrets.*

## Running the Project

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd back-end
   ```
2. Build the Maven package:
   ```bash
   mvn clean package
   ```
3. Deploy the generated `.war` file onto your Apache Tomcat application server, or run it directly through your IDE (IntelliJ IDEA / Eclipse).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd font-end
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint             | Description              |
| :----- | :------------------- | :----------------------- |
| `POST` | `/SignupServlet`     | Register a new user      |
| `POST` | `/LoginServlet`      | Authenticate existing user |
| `GET`  | `/GetTasksServlet`   | Fetch tasks for user     |
| `POST` | `/AddTaskServlet`    | Add a new task           |
| `POST` | `/UpdateTaskServlet` | Update existing task     |
| `POST` | `/DeleteTaskServlet` | Delete a task            |

## Project Structure

### Root Overview
```text
tasktracker/
├── back-end/        # Java Servlet & Hibernate Backend API (Maven Project)
├── database/        # Database setup and schema SQL scripts
├── font-end/        # React Native (Expo) client source code
├── .gitignore       # Git ignore settings
└── README.md        # Project documentation
```

### Detailed Component Breakdown

**Frontend (`font-end/`)**
- `app/`: Contains the Expo Router file-based navigation screens (e.g., `login.tsx`, `tasks.tsx`).
- `services/`: API interaction logic (`api.ts`) and local storage (`authStorage.ts`).
- `models/`: TypeScript interfaces representing domain objects (`Task.ts`).
- `assets/`: Static resources like fonts and images.

**Backend (`back-end/`)**
- `src/main/java/servlet/`: Controller classes handling incoming HTTP requests.
- `src/main/java/model/`: JPA entities mapping to database tables.
- `src/main/java/dao/`: Data Access Objects interacting directly with Hibernate.
- `src/main/java/config/`: Configuration classes like `HibernateUtil` for database session management.

**Database (`database/`)**
- `database.sql`: The primary dump file for creating the schema and seeding initial testing data.

## Testing

### Frontend
To run the automated tests and linting on the frontend, navigate to the `font-end` directory and run:

```bash
cd font-end
npm run test
npm run lint
```

### Backend
The backend currently lacks an automated test suite. Setting up JUnit for testing servlets and Hibernate mappings is planned for the future.

## Known Issues

- The execution sandbox environment may lack a pre-configured MySQL/MariaDB server, which prevents the execution of database-dependent backend code or performance benchmarks without mocking.
- The `jest-expo` dependency version must match the installed `expo` version in the `font-end` directory to prevent Jest suite execution failures.

## Future Improvements

- Add a comprehensive automated test suite (JUnit) for the backend.
- Enhance error handling and input validation in both backend servlets and frontend forms.
- Introduce advanced task features like categories, due dates, and reminders.
- Implement token-based authentication (JWT) for improved security over session management.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open-source and available under the [MIT License](LICENSE).
