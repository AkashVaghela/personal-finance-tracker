import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { TransactionsContext } from "../context/TransactionsContext";
import { IoFastFoodOutline } from "react-icons/io5";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const Transactions = () => {
  const { transactionState } = useContext(TransactionsContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const objectsMap = new Map();

    if (transactionState.length) {
      transactionState.forEach((obj) => {
        const key = obj.date + obj.type;

        if (objectsMap.has(key)) {
          const existingObj = objectsMap.get(key);

          existingObj.transactions.push({
            category: obj.category,
            amount: obj.amount,
            note: obj.note,
          });
        } else {
          const newObj = {
            date: obj.date,
            type: obj.type,
            transactions: [
              {
                category: obj.category,
                amount: obj.amount,
                note: obj.note,
              },
            ],
          };
          objectsMap.set(key, newObj);
        }
      });

      setTransactions((prevTransactions) => {
        const updatedTransactions = [...prevTransactions];

        Array.from(objectsMap.values()).forEach((newItem) => {
          const exists = prevTransactions.some(
            (item) => item.date === newItem.date && item.type === newItem.type
          );
          if (!exists) {
            updatedTransactions.push(newItem);
          }
        });

        return updatedTransactions;
      });
    }
  }, [transactionState]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-[90vw] mx-auto max-w-2xl">
        <div className="flex gap-1 py-4 align-middle">
          <NavLink to="/dashboard">
            <MdOutlineArrowBack
              title="account"
              className="w-6 h-6 text-gray-800"
            />
          </NavLink>
          <h1 className="font-semibold text-[18px] capitalize leading-[24px]">
            transactions
          </h1>
        </div>
        <div>
          {transactions.length > 0
            ? transactions.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mb-2 border border-gray-300 rounded"
                  >
                    <div className="flex justify-between px-4 py-2 font-semibold text-gray-800 align-middle border-b border-gray-300">
                      <p>{formatDate(item.date)}</p>
                      <p
                        className={`${
                          item.type === "income"
                            ? "text-emerald-500"
                            : "text-pink-500"
                        } font-semibold`}
                      >
                        {item.type === "income" ? "\u002B" : "\u2212"}
                        {item.transactions.reduce((acc, item) => {
                          return (acc += +item.amount);
                        }, 0)}
                      </p>
                    </div>
                    <div>
                      {item.transactions.map((transaction, index) => {
                        return (
                          <div
                            key={index}
                            className="flex gap-4 px-4 py-3 align-center"
                          >
                            <div className="self-center p-2 rounded bg-emerald-500">
                              <IoFastFoodOutline className="block w-6 h-6" />
                            </div>
                            <div className="w-full capitalize truncate grow">
                              <p className="font-medium text-gray-600">
                                {transaction.category}
                              </p>
                              <p className="text-gray-400 text-[14px]">
                                {transaction.note}
                              </p>
                            </div>
                            <div>
                              <p>{transaction.amount}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : "Loading transactions..."}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
