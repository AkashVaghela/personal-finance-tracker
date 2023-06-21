import React, { useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getFirebase } from "../firebase";

const SignUp = () => {
  const { auth } = getFirebase();
  const googleProvier = new GoogleAuthProvider(auth);

  const [_, setUser] = useContext(AuthContext);
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
    const result = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
    localStorage.setItem(
      "firebase_token",
      JSON.stringify(result._tokenResponse)
    );
    setUser((prevState) => ({
      ...prevState,
      user: result.user,
    }));
  };

  const googleSignUpHandler = async () => {
    const result = await signInWithPopup(auth, googleProvier);
    localStorage.setItem(
      "firebase_token",
      JSON.stringify(result._tokenResponse)
    );
    setUser((prevState) => ({
      ...prevState,
      user: result.user,
    }));
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
          className="p-2 text-gray-100 capitalize rounded bg-emerald-600"
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
        className="block w-full p-2 text-center border rounded border-emerald-600"
        onClick={googleSignUpHandler}
      >
        sign up with google
      </button>
    </div>
  );
};

export default SignUp;
