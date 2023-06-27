import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";

const Transactions = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-[90vw] mx-auto max-w-5xl">
        <div className="flex gap-1 py-2 align-middle">
          <NavLink to="/dashboard">
            <MdOutlineArrowBack
              title="account"
              className="w-8 h-8 text-gray-500"
            />
          </NavLink>
          <h1>transactions</h1>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
