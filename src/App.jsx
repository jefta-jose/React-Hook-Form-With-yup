import "./App.css";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

function App() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email().required("Email is required"),
    age: yup.number("Age must be a number").positive("Age must be a positive number").required("Age is required"),
    password: yup.string().required("password is required").matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/
      , "Must Contain 4 Chars, 1 Uppercase, 1 Lowercase, 1 Number & 1 special Char"
    ),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <>
          <input type="text" placeholder="Full name" {...register("fullName")} />
          <p>{errors.fullName?.message}</p>
        </>
        <>
          <input type="text" placeholder="Email..." {...register("email")} />
          <p>{errors.email?.message}</p>
        </>
        <>
          <input type="number" placeholder="Age..." {...register("age")} />
          <p>{errors.age?.message}</p>
        </>
        <>
          <input type="password" placeholder="Password..." {...register("password")} />
          <p>{errors.password?.message}</p>
        </>
        <>
          <input
            type="password" placeholder="Confirm Password..."  {...register("confirmPassword")} />
          <p>{errors.confirmPassword?.message}</p>
        </>
        <input type="submit" value="Submit" style={{ width: "50%" }} />
      </form>
    </>
  );
}

export default App;
