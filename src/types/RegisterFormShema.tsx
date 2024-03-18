import { FieldError, UseFormRegister } from "react-hook-form";
import { ZodType, z } from "zod";
export type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  area: string;
  job: string;
  description: string;
};

export type Option = {
  name: string;
  value: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  options?: Option[];
  icon?: React.ReactNode;
  optional?: boolean;
};

export type ValidFieldNames =
  | "email"
  | "username"
  | "password"
  | "confirmPassword"
  | "phone"
  | "area"
  | "job"
  | "description";

export const RegisterShema: ZodType<FormData> = z
  .object({
    username: z.string().min(3, { message: "Username is too short" }),
    phone: z.string().min(8, { message: "Phone is too short" }),
    area: z.string(),
    job: z.string(),
    description: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
