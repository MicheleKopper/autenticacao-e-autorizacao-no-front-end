import { LoginRequest, SignupRequest } from "../../utils/types/auth";
import { api, ResponseAPI } from "./api.service";

// Auth service = serviço de autenticação

// Login service = serviço de login
export async function loginService(
  data: Omit<LoginRequest, "remember">,
  token: string
): Promise<ResponseAPI> {
  if (!token) {
    throw new Error("Token de autenticação não fornecido.");
  }

  try {
    const response = await api.post("/login", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: error.response.data.message,
    };
  }
}

// Signup service = serviço de inscrição
export async function signupService(data: SignupRequest): Promise<ResponseAPI> {
  try {
    const response = await api.post("signup", data);

    return {
      ok: response.data.ok,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      ok: error.response.data.ok,
      message: error.response.data.message,
    };
  }
}
