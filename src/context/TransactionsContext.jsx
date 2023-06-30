import { createContext, useReducer, useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { getFirebase } from "../firebase";

export const TransactionsContext = createContext();

const transactionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return [...action.payload];
    case "ADD_TRANSACTIONS":
      return;
    case "EDIT_TRANSACTION":
      return;
    case "DELETE_TRANSACTION":
      return;
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
const TransactionsContextProvider = ({ children }) => {
  const { firestore } = getFirebase();
  const [userId, setUserId] = useState();
  const [transactionState, dispatch] = useReducer(transactionsReducer, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user?.uid);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const transactionsCol = collection(firestore, "transactions");
      const queryRef = query(transactionsCol, where("userId", "==", userId));
      onSnapshot(queryRef, (snapshot) => {
        if (snapshot.docs.length > 0) {
          const transactions = [];
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            transactions.push({ ...data, id: doc.id });
          });
          dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
        }
      });
    }
  }, [userId]);

  return (
    <TransactionsContext.Provider value={{ transactionState }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContextProvider;
