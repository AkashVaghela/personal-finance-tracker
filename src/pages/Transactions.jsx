import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { TransactionsContext } from "../context/TransactionsContext";
import { IoFastFoodOutline } from "react-icons/io5";

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
        <div>
          {transactions.length > 0
            ? transactions.map((item, index) => {
                return (
                  <div key={index} className="rounded shadow">
                    <div className="flex justify-between px-4 py-2 align-middle border-b">
                      <p>{item.date}</p>
                      <p>
                        {item.transactions.reduce((acc, item) => {
                          return (acc += +item.amount);
                        }, 0)}
                      </p>
                    </div>
                    <div>
                      {item.transactions.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex gap-2 px-4 py-2 align-center"
                          >
                            <div className="self-center">
                              <IoFastFoodOutline />
                            </div>
                            <div className="w-full capitalize truncate bg-green-200 grow">
                              <p>{item.category}</p>
                              <p>{item.note}</p>
                            </div>
                            <div>
                              <p>{item.amount}</p>
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
