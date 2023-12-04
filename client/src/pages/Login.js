import React from "react";
import * as yup from "yup";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  return <div>Login</div>;
};

export default Login;
