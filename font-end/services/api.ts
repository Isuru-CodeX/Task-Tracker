import { Task, UpdateTaskPayload } from "../models/Task";
import { AuthUser } from "./authStorage";

const BASE_URL = "http://10.0.2.2:8080/TaskTrackerBackend";

async function readError(res: Response): Promise<string> {
  const raw = await res.text();
  if (!raw) return `Request failed (${res.status})`;

  try {
    const obj = JSON.parse(raw);
    return obj?.message || raw;
  } catch {
    return raw;
  }
}

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<void> => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  if (!res.ok) throw new Error(await readError(res));
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthUser> => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as AuthUser;
};

export const getTasks = async (userId: number): Promise<Task[]> => {
  const res = await fetch(`${BASE_URL}/tasks?userId=${userId}`);
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as Task[];
};

export const addTask = async (
  userId: number,
  title: string,
  description: string,
): Promise<void> => {
  const res = await fetch(`${BASE_URL}/addTask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title, description }),
  });

  if (!res.ok) throw new Error(await readError(res));
};

export const updateTask = async (payload: UpdateTaskPayload): Promise<void> => {
  const res = await fetch(`${BASE_URL}/updateTask`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await readError(res));
};

export const deleteTask = async (id: number, userId: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/deleteTask?id=${id}&userId=${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(await readError(res));
};
