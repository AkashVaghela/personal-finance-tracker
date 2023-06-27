import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { state, emailSignUp, googleSignIn } = useContext(AuthContext);
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
    emailSignUp(input.email, input.password);
  };

  const googleSignUpHandler = () => {
    googleSignIn();
  };

  return (
    <div className="max-w-xs mx-auto mt-64">
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
        <button
          type="submit"
          className="p-2 text-gray-100 capitalize bg-green-600 rounded"
        >
          create account
        </button>
      </form>

      <p className="mb-6 text-gray-600">
        already have an account?
        <span className="pl-1 underline">
          <NavLink to="/signin">sign in</NavLink>
        </span>
      </p>

      <span className="block mb-6 text-center uppercase">or</span>

      <button
        className="block w-full p-2 text-center border border-green-600 rounded"
        onClick={googleSignUpHandler}
      >
        sign up with google
      </button>
    </div>
  );
};

export default SignUp;
