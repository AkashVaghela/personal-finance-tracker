import React from "react";

const SignUp = () => {
  return (
    <div className="max-w-sm mx-auto mt-64">
      <form className="flex flex-col gap-4 mb-6">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="p-2 rounded border"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="p-2 rounded border"
        />
        <button
          type="submit"
          className="p-2 rounded capitalize text-gray-100 bg-emerald-600"
        >
          create account
        </button>
      </form>

      <p className="mb-6 text-gray-600">
        already have an account?
        <span className="pl-1 underline">
          <a href="">sign in</a>
        </span>
      </p>

      <span className="block text-center uppercase mb-6">or</span>

      <button className="block w-full text-center p-2 rounded border">
        sign up with google
      </button>
    </div>
  );
};

export default SignUp;
