import {
  Button,
  FormControl,
  FormLabel,
  Grid2,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { createStudentAsyncThunk } from "../store/modules/userLogged/signupSlice";

// Campo de erro
interface ErrorFields {
  nameStudent?: string;
  email?: string;
  password?: string;
  cpf?: string;
  age?: string;
  typeStudent?: string;
}

export function Register() {
// Dispatch do submit
const dispatch = useAppDispatch();



  // 2 - Validação de dados
  const [errors, setError] = useState<ErrorFields>({
    nameStudent: "",
    email: "",
    password: "",
    cpf: "",
    age: "",
    typeStudent: "",
  });

  function validate(
    nameStudent: string,
    email: string,
    password: string,
    cpf: string,
    age: number,
    typeStudent: string
  ) {
    if (!nameStudent) {
      setError({ nameStudent: "Name is required" });
      return;
    }

    if (
      !email.includes("@") ||
      email.length < 3 ||
      (!email.endsWith("gmail.com") &&
        !email.endsWith("hotmail.com") &&
        !email.endsWith("outlook.com"))
    ) {
      setError({ email: "Invalid or incorrect email" });
      return;
    }

    if (!password) {
      setError({ password: "Password is required" });
      return;
    }

    if (!cpf) {
      setError({ cpf: "CPF is required" });
      return;
    }

    if (!age) {
      setError({ age: "Age is required" });
      return;
    }

    if (!typeStudent) {
      setError({ typeStudent: "Type student is required" });
    }

    setError({});
  }

  // 1 - Função para capturar o submit do formulário
  // Pegar o evento: onSubmit={(e) => handleSubmit(e)} = React.FormEvent<HTMLFormElement>
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevenir o comportamento padrão de recarregar a página
    event.preventDefault();

    // Capturar os valores da input do form
    const nameStudent = event.currentTarget["nameStudent"].value;
    const email = event.currentTarget["email"].value;
    const password = event.currentTarget["password"].value;
    const cpf = event.currentTarget["cpf"].value;
    const age = Number(event.currentTarget["age"].value);
    const typeStudent = event.currentTarget["typeStudent"].value;

    
    
    validate(nameStudent, email, password, cpf, age, typeStudent);
    
   

    dispatch(
      createStudentAsyncThunk({
        nameStudent,
        email,
        password,
        cpf,
        age,
        typeStudent,
      })
    );
  }

  return (
    <Grid2 container spacing={2} component={"form"} onSubmit={handleSubmit}>
      {/* Título */}
      <Grid2 size={12}>
        <Typography variant="h4">Register</Typography>
      </Grid2>

      {/* Nome */}
      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.nameStudent}>
          <FormLabel id="nameStudent">Name</FormLabel>
          <TextField
            id="nameStudent"
            name="nameStudent"
            type="text"
            placeholder="Full name"
            variant="outlined"
            error={!!errors.nameStudent}
            helperText={errors.nameStudent}
            onChange={(e) => {
              if (e.target.value) {
                setError({ ...errors, nameStudent: "" });
              }
            }}
          />
        </FormControl>
      </Grid2>

      {/* Email */}
      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.email}>
          <FormLabel id="email">E-mail</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) => {
              if (e.target.value) {
                setError({ ...errors, email: "" });
              }
            }}
          />
        </FormControl>
      </Grid2>

      {/* Senha */}
      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.password}>
          <FormLabel id="password">Password</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="******"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password}
            onChange={(e) => {
              if (e.target.value) {
                setError({ ...errors, password: "" });
              }
            }}
          />
        </FormControl>
      </Grid2>

      {/* CPF */}
      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.cpf}>
          <FormLabel id="cpf">CPF</FormLabel>
          <TextField
            id="cpf"
            name="cpf"
            type="text"
            placeholder="000.000-000-00"
            variant="outlined"
            error={!!errors.cpf}
            helperText={errors.cpf}
            onChange={(e) => {
              if (e.target.value) {
                setError({ ...errors, cpf: "" });
              }
            }}
          />
        </FormControl>
      </Grid2>

      {/* Idade */}
      <Grid2 size={12}>
        <FormControl fullWidth>
          <FormLabel id="age">Age</FormLabel>
          <TextField
            id="age"
            name="age"
            type="number"
            placeholder="31"
            variant="outlined"
            error={!!errors.age}
            helperText={errors.age}
            onChange={(e) => {
              if (e.target.value) {
                setError({ ...errors, age: "" });
              }
            }}
          />
        </FormControl>
      </Grid2>

      {/* Tipo */}
      <Grid2 size={12}>
        <FormControl fullWidth error={!!errors.typeStudent}>
          <FormLabel id="typeStudent">Type student</FormLabel>
          <TextField
            id="typeStudent"
            name="typeStudent"
            select
            variant="outlined"
            fullWidth
            error={!!errors.typeStudent}
            helperText={errors.typeStudent}
            onChange={(e) => {
              if (e.target.value) {
                setError({ ...errors, typeStudent: "" });
              }
            }}
          >
            <MenuItem value="M">Matriculado</MenuItem>
            <MenuItem value="F">Formado</MenuItem>
            <MenuItem value="T">Tech-Helper</MenuItem>
          </TextField>
        </FormControl>
      </Grid2>

      {/* Botão */}
      <Grid2 size={12}>
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </Grid2>
    </Grid2>
  );
}
