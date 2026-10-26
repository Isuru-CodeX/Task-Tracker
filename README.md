# TaskTracker 📝

TaskTracker is a comprehensive, full-stack application designed to help individual users efficiently organize, manage, and track their daily tasks and priorities. Built with a robust Java backend utilizing Jakarta Servlets and Hibernate ORM, it seamlessly integrates with a MySQL database to ensure secure data persistence, reliable task state management, and personalized task mapping for each registered account. The frontend is built with React Native and Expo, offering a native mobile experience. Whether you are managing personal daily to-dos or structuring long-term project deliverables, TaskTracker provides a clean interface and structured REST API endpoints to streamline your productivity workflow.

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

## Screenshots

*Add screenshots of the application's main pages here.*

*(Example placeholder)*
![Application Screenshot](font-end/assets/images/splash-icon.png)

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

```text
tasktracker/
├── back-end/        # Java Servlet & Hibernate Backend API (Maven Project)
├── database/        # Database setup and schema SQL scripts
├── font-end/        # React Native (Expo) client source code
├── .gitignore       # Git ignore settings
└── README.md        # Project documentation
```

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
