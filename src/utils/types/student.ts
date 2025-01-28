import { Assessment } from "./assessment";

export type StudentType = "M" | "F" | "T";

export interface Student {
  id: string;
  name: string;
  cpf: string;
  age: number | null;
  email: string;
  studentType: StudentType;
  registeredAt: string;
  assessments: Assessment[];
}

export interface studentRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  age: number;
  studentType: StudentType;
}

// export interface TypeStudent {
//   student: string;
//   techHelper: string;
//   graduated: string;
// }
