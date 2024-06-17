import { Box } from "@mui/material";
import { useFormikWithYup } from "hooks";
import React from "react";
import {
  InitialValue,
  InitialValuesInterface,
  validation,
} from "./utils/formik";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const formik = useFormikWithYup<InitialValuesInterface>({
    initialValues: InitialValue,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    formik.setFieldValue(name, value);
  };

  return <Box>Login</Box>;
};
export default Login;
