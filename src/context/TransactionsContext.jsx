import { createContext, useReducer, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
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
  const transactionsCol = collection(firestore, "transactions");

  const initialState = [];
  const [transactionState, dispatch] = useReducer(
    transactionsReducer,
    initialState
  );

  useEffect(() => {
    onSnapshot(transactionsCol, (snapshot) => {
      if (snapshot.docs.length > 0) {
        const transactions = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
        });
        setTransactions({ type: "SET_TRANSACTIONS", payload: transactions });
      }
    });
  }, []);

  const setTransactions = (data) => {
    dispatch({ type: "SET_TRANSACTIONS", payload: data });
  };

  return (
    <TransactionsContext.Provider value={{ transactionState, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContextProvider;
