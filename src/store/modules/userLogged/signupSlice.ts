import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student, studentRequest } from "../../../utils/types/student";
import { showAlert } from "../alert/alertSlice";
import { ResponseAPI } from "../../../configs/services/api.service";
import { signupService } from "../../../configs/services/auth.service";

// Estado inicial
interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  student: Student;
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  student: {
    id: "",
    name: "",
    cpf: "",
    age: null,
    email: "",
    studentType: "M",
    registeredAt: "",
    assessments: [],
  },
};

// Thunk para lidar com o registro de estudante
export const signupAsyncThunk = createAsyncThunk(
  "student/signup",
  async (data: studentRequest, { dispatch }) => {
    const { name, email, password, cpf, age, studentType } = data;

    // Faz a chamada ao serviço de registro
    const response = await signupService({
      name,
      email,
      password,
      cpf,
      age,
      studentType,
    });

   

    // Exibe alertas baseados no status da resposta
    dispatch(
      showAlert({
        message: response.message,
        type: "error",
      })
    );
    return response;
  }
);

// Slice para gerenciar estado do registro
const studentCreatedSlice = createSlice({
  name: "studentSignup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signupAsyncThunk.pending, (state) => {
        state.loading = true;
        state.message = "";
      })
      .addCase(
        signupAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseAPI>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          // Atualiza o estado do estudante somente se o registro for bem-sucedido
          if (action.payload.ok) {
            state.student = action.payload.data;
          }
        }
      )
      .addCase(createStudentAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.ok = false;
        state.message = "Erro no Registro"; // Mensagem padrão em caso de falha
      });
  },
});

// Exporta o reducer
export const studentCreatedReducer = studentCreatedSlice.reducer;
