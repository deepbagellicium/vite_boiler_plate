import * as yup from "yup";

export enum LoginFormikKeys {
  Email = "email",
  Password = "password",
}
export interface InitialValuesInterface {
  [LoginFormikKeys.Email]: string;
  [LoginFormikKeys.Password]: string;
}

export const InitialValue = {
  [LoginFormikKeys.Email]: "",
  [LoginFormikKeys.Password]: "",
};

export const validation = yup.object({
  [LoginFormikKeys.Email]: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  [LoginFormikKeys.Password]: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
