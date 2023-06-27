import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { state, emailSignIn, googleSignIn } = useContext(AuthContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    emailSignIn(input.email, input.password);
  };

  const googleSignInHandler = () => {
    googleSignIn();
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-[90vw] mx-auto mobile-l:w-80">
        <form className="flex flex-col gap-4 mb-4" onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            id="email"
            placeholder="email"
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            id="password"
            placeholder="password"
            className="p-2 border rounded"
          />
          <p className="text-gray-600 ">
            <span className="pl-1 underline capitalize">
              <NavLink to="/forgot-password">forgot password?</NavLink>
            </span>
          </p>
          <button
            type="submit"
            className="p-2 text-gray-100 capitalize bg-green-600 rounded"
          >
            sign in
          </button>
        </form>

        <p className="mb-6 text-gray-600">
          Do not have account?
          <span className="pl-1 underline">
            <NavLink to="/signup">create account</NavLink>
          </span>
        </p>

        <span className="block mb-6 text-center uppercase">or</span>

        <button
          className="block w-full p-2 text-center border border-green-600 rounded"
          onClick={googleSignInHandler}
        >
          continue with google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
