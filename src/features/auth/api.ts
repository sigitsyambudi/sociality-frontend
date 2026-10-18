import { apiClient } from "@/api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
  phone?: string;
  username: string;
};

export async function login(request: LoginRequest): Promise<void> {
  await apiClient.post("/api/auth/login", {
    email: request.email,
    password: request.password,
  });
}

export async function register(request: RegisterRequest): Promise<void> {
  const body: Record<string, string> = {
    email: request.email,
    name: request.name,
    password: request.password,
    username: request.username,
  };

  if (request.phone) {
    body.phone = request.phone;
  }

  await apiClient.post("/api/auth/register", body);
}
