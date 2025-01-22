import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseAPI } from "../../../configs/services/api.service";
import { LoginRequest } from "../../../utils/types/auth";
import { loginService } from "../../../configs/services/auth.service";
import { showAlert } from "../alert/alertSlice";

// AsyncThunk para login
export const loginAsyncThunk = createAsyncThunk<
  ResponseAPI,
  LoginRequest,
  { rejectValue: string }
>(
  "userLogged/loginAsyncThunk",
  async (data: LoginRequest, { dispatch, rejectWithValue }) => {
    const { email, password } = data;

    try {
      // Chamada à API de login
      const response = await loginService({ email, password });

      // Exibe alerta de erro
      if (!response.ok) {
        dispatch(
          showAlert({
            message: response.message,
            type: "error",
          })
        );
        return rejectWithValue(response.message); // Passa o erro para o estado `rejected`
      }

      // Exibe alerta de sucesso
      dispatch(
        showAlert({
          message: response.message,
          type: "success",
        })
      );

      return {
        ...response,
        data: {
          ...response.data,
        },
      };

      // Retorna erro genérico
    } catch {
      return rejectWithValue("Failed to connect to the server");
    }
  }
);

// Estado inicial da slice
interface InitialState {
  ok: boolean;
  message: string;
  token: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  ok: false,
  message: "",
  token: "",
  student: {
    email: "",
    id: "",
    name: "",
  },
  loading: false,
  error: null,
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState: initialState,
  reducers: {
    logout() {
      return initialState; // Reseta o estado ao fazer logout
    },
  },
  extraReducers(builder) {
    builder
      // Estado pendin = requisição em andamento
      .addCase(loginAsyncThunk.pending, (state) => {
        state.loading = true; // Ativa o loading
        state.error = null; // Limpa erros anteriores
      })

      // Estado fulfilled = requisição concluída
      .addCase(
        loginAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseAPI>) => {
          state.loading = false; // Finaliza o loading
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          // Só posso atribuir token e student quando o ok for true
          if (action.payload.ok) {
            state.token = action.payload.data.token;
            state.student = action.payload.data.student;
          }
        }
      )

      // Estado rejected = requisição rejeitada
      .addCase(loginAsyncThunk.rejected, (state, action) => {
        state.loading = false; // Finaliza o loading
        state.ok = false;
        state.error = action.payload || "Unexpected error occurred"; // Mensagem de erro
      });
  },
});

export const { logout } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
