import { Button } from "@mui/material";
import { useAuth } from "contexts/AuthContext";
import React from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { login } = useAuth();
  return <Button onClick={() => login()} variant="outlined">Login</Button>;
};
export default Login;
