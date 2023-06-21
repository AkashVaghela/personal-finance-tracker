import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "firebase/auth";

const SignIn = () => {
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

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const googleSignInHandler = () => {};

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
        <p className="text-gray-600 ">
          <span className="pl-1 underline capitalize">
            <NavLink to="/forgot-password">forgot password?</NavLink>
          </span>
        </p>
        <button
          type="submit"
          className="p-2 text-gray-100 capitalize rounded bg-emerald-600"
        >
          sign in
        </button>
      </form>

      <p className="mb-6 text-gray-600">
        Do not have account?
        <span className="pl-1 underline">
          <NavLink to="/">create account</NavLink>
        </span>
      </p>

      <span className="block mb-6 text-center uppercase">or</span>

      <button
        className="block w-full p-2 text-center border rounded border-emerald-600"
        onClick={googleSignInHandler}
      >
        sign in with google
      </button>
    </div>
  );
};

export default SignIn;
