import { useEffect, useState } from "react";
import LabeledInput from "./LabeledInput";
import StyledButton from "./StyledButton";
import { Link, useNavigate } from "react-router-dom";
import { SigninInput, SignupInput } from "@dev_ay/blog-common-v1";
import axios from "axios";

export const Auth = ({ usedFor }: { usedFor: string }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/blogs");
    }
  });

  async function handleSubmit() {
    try {
      if (usedFor === "SignUp") {
        const signUpInput: SignupInput = { name: username, email, password };
        const data = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
          signUpInput
        );
        console.log("jwt : " + data);
        localStorage.setItem("jwt", data.data.token);
      } else {
        const signInInput: SigninInput = { email, password };
        const data = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,
          signInInput
        );
        console.log("jwt : " + data.data);
        localStorage.setItem("jwt", data.data.token);
      }
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col p-10 gap-5">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black">
          {usedFor === "SignUp" ? "Create an Account" : "Login Here"}
        </span>

        <span className="text-sm font-light">
          {usedFor === "SignUp"
            ? "Already have an account?  "
            : "Create an Account  "}
          <Link
            to={usedFor == "SignUp" ? "/signin" : "/signup"}
            className="text-slate-400"
          >
            <span className="underline">
              {usedFor === "SignUp" ? "Sign In" : "Sign Up"}
            </span>
          </Link>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 pt-5">
        {usedFor === "SignUp" && (
          <LabeledInput
            labelValue="Username"
            inputType="text"
            placeholderValue="Enter your username"
            onChangeMethod={(e) => {
              setUsername(e.target.value);
            }}
          />
        )}

        <LabeledInput
          labelValue="Email"
          inputType="text"
          placeholderValue="abdc@xyz.com"
          onChangeMethod={(e) => {
            setEmail(e.target.value);
          }}
        />
        <LabeledInput
          labelValue="Password"
          inputType="password"
          placeholderValue="Enter your Password"
          onChangeMethod={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="pt-5">
        <StyledButton
          buttonValue={usedFor === "SignUp" ? "Sign Up" : "Sign In"}
          onClickMethod={handleSubmit}
        />
      </div>
    </div>
  );
};
