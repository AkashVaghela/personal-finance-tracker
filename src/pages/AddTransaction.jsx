import React, { useState, useContext } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { getFirebase } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const AddTransaction = () => {
  const navigate = useNavigate();
  const { firestore } = getFirebase();
  const transactionsCol = collection(firestore, "transactions");
  const singleTransaction = doc(transactionsCol);

  const initState = {
    date: "",
    amount: 0,
    type: "",
    category: "",
    note: "",
  };
  const [transaction, setTransaction] = useState(initState);
  const { state } = useContext(AuthContext);

  const { date, amount, note } = transaction;

  const submitHandler = (e) => {
    e.preventDefault();
    setDoc(singleTransaction, { ...transaction, userId: state.user.uid });
    navigate("/transactions");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

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
          <h1>add transaction</h1>
        </div>

        <form onSubmit={submitHandler}>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={changeHandler}
          />

          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="amount"
            min="0"
            value={amount}
            onChange={changeHandler}
          />

          <select name="type" id="type" onChange={changeHandler}>
            <option value="">--Please select type--</option>
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>

          <select name="category" id="category" onChange={changeHandler}>
            <option value="">--Please select category--</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>

          <textarea
            name="note"
            id="note"
            cols="30"
            rows="10"
            placeholder="note"
            value={note}
            onChange={changeHandler}
          ></textarea>

          <button type="submit">add transaction</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
