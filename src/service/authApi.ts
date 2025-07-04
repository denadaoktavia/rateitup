import API from "@/lib/axios";
import type { ApiResponse } from "@/utils/Interface";
export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    username: string;
    role: string;
  };
  token: string;
}

export const login = async (
  payload: LoginPayload
): Promise<ApiResponse<AuthResponse>> => {
  const res = await API.post("/auth/login", payload);
  return res.data;
};

export const registerAccount = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const res = await API.post("/auth/register", payload);
  return res.data;
};
