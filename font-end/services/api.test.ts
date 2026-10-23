import { signup, login, getTasks, addTask, updateTask, deleteTask } from "./api";

// Mock global fetch
global.fetch = jest.fn();

const mockFetch = fetch as jest.Mock;

describe("api services", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("signup", () => {
    it("should successfully signup a user", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      await signup("John", "Doe", "john@example.com", "password123");

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://10.0.2.2:8080/TaskTrackerBackend/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "password123",
          }),
        }
      );
    });

    it("should throw an error on failed signup (JSON error)", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => JSON.stringify({ message: "Email already exists" }),
      });

      await expect(
        signup("John", "Doe", "john@example.com", "password123")
      ).rejects.toThrow("Email already exists");
    });

    it("should throw an error on failed signup (plain text error)", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => "Internal Server Error",
      });

      await expect(
        signup("John", "Doe", "john@example.com", "password123")
      ).rejects.toThrow("Internal Server Error");
    });

    it("should throw a default error when text is empty", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => "",
      });

      await expect(
        signup("John", "Doe", "john@example.com", "password123")
      ).rejects.toThrow("Request failed (404)");
    });
  });

  describe("getTasks", () => {
    it("should successfully fetch tasks", async () => {
      const mockTasks = [{ id: 1, title: "Test task", description: "Task description" }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await getTasks(1);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://10.0.2.2:8080/TaskTrackerBackend/tasks?userId=1"
      );
      expect(result).toEqual(mockTasks);
    });

    it("should throw an error on failed getTasks", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => JSON.stringify({ message: "Failed to fetch tasks" }),
      });

      await expect(getTasks(1)).rejects.toThrow("Failed to fetch tasks");
    });
  });

  describe("addTask", () => {
    it("should successfully add a task", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      await addTask(1, "New Task", "Description");

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://10.0.2.2:8080/TaskTrackerBackend/addTask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: 1, title: "New Task", description: "Description" }),
        }
      );
    });

    it("should throw an error on failed addTask", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => JSON.stringify({ message: "Invalid payload" }),
      });

      await expect(addTask(1, "New Task", "Description")).rejects.toThrow("Invalid payload");
    });
  });

  describe("updateTask", () => {
    it("should successfully update a task", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      const payload = {
        id: 1,
        userId: 1,
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
      };

      await updateTask(payload);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://10.0.2.2:8080/TaskTrackerBackend/updateTask",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
    });

    it("should throw an error on failed updateTask", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => JSON.stringify({ message: "Task not found" }),
      });

      const payload = {
        id: 1,
        userId: 1,
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
      };

      await expect(updateTask(payload)).rejects.toThrow("Task not found");
    });
  });

  describe("deleteTask", () => {
    it("should successfully delete a task", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      await deleteTask(1, 1);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://10.0.2.2:8080/TaskTrackerBackend/deleteTask?id=1&userId=1",
        {
          method: "DELETE",
        }
      );
    });

    it("should throw an error on failed deleteTask", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        text: async () => JSON.stringify({ message: "Not authorized" }),
      });

      await expect(deleteTask(1, 1)).rejects.toThrow("Not authorized");
    });
  });

  describe("login", () => {
    it("should successfully login a user and return AuthUser", async () => {
      const mockAuthUser = { id: 1, email: "john@example.com" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAuthUser,
      });

      const result = await login("john@example.com", "password123");

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "http://10.0.2.2:8080/TaskTrackerBackend/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "john@example.com",
            password: "password123",
          }),
        }
      );
      expect(result).toEqual(mockAuthUser);
    });

    it("should throw an error on failed login", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => JSON.stringify({ message: "Invalid credentials" }),
      });

      await expect(login("john@example.com", "wrongpassword")).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });
});
