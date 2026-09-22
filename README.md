# TaskTracker 📝

## About The Project

TaskTracker is a comprehensive, full-stack web application designed to help individual users efficiently organize, manage, and track their daily tasks and priorities. Built with a robust Java backend utilizing Jakarta Servlets and Hibernate ORM, it seamlessly integrates with a MySQL database to ensure secure data persistence, reliable task state management, and personalized task mapping for each registered account. Whether you are managing personal daily to-dos or structuring long-term project deliverables, TaskTracker provides a clean interface and structured REST API endpoints to streamline your productivity workflow.

---

## 🚀 Features

* **User Authentication:** Secure user registration, authentication, and session management.
* **Task Management:** Full CRUD functionality (Create, Read, Update, Delete) for daily tasks and to-dos.
* **User-Specific Tasks:** Account isolation ensuring user tasks map directly to individual accounts.
* **Database Integration:** Relational persistence handled via Hibernate ORM with MySQL database storage.

---

## 🛠️ Tech Stack

* **Backend:** Java, Jakarta Servlets, Hibernate ORM, Maven
* **Database:** MySQL 8.0+
* **Frontend:** HTML5, CSS3, JavaScript / REST APIs
* **Tools & Server:** Apache Tomcat, HeidiSQL / MySQL Workbench

---

## 📁 Repository Structure

```text
├── backend/         # Java Servlet & Hibernate Backend API (Maven Project)
├── database/        # Database setup and schema SQL scripts
├── frontend/        # Web client source code
├── .gitignore       # Git ignore settings
└── README.md        # Project documentation
```

---

## 💻 Getting Started

### 1. Prerequisites

Ensure you have the following installed on your local machine:
* **JDK 11** or higher
* **Apache Maven**
* **MySQL Server 8.0+**
* **Apache Tomcat Server** (v9+ / v10+)

---

### 2. Database Setup

1. Open your database management tool (HeidiSQL, MySQL Workbench, or CLI).
2. Create and import the database schema using the script located in `/database`:

```sql
SOURCE database/database.sql;
```

3. Update the database configuration in `backend/src/main/resources/hibernate.cfg.xml` with your local MySQL credentials:

```xml
<property name="hibernate.connection.url">jdbc:mysql://localhost:3306/tasktracker</property>
<property name="hibernate.connection.username">YOUR_MYSQL_USERNAME</property>
<property name="hibernate.connection.password">YOUR_MYSQL_PASSWORD</property>
```

---

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build the Maven package:
   ```bash
   mvn clean package
   ```
3. Deploy the generated `.war` file onto your Apache Tomcat application server, or run it directly through your IDE (IntelliJ IDEA / Eclipse).

---

## 📡 API Endpoints

| Method | Endpoint             | Description              |
| :----- | :------------------- | :----------------------- |
| `POST` | `/SignupServlet`     | Register a new user      |
| `POST` | `/LoginServlet`      | Authenticate existing user |
| `GET`  | `/GetTasksServlet`   | Fetch tasks for user     |
| `POST` | `/AddTaskServlet`    | Add a new task           |
| `POST` | `/UpdateTaskServlet` | Update existing task     |
| `POST` | `/DeleteTaskServlet` | Delete a task            |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
