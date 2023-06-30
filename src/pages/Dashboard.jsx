import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TransactionsContext } from "../context/TransactionsContext";
import { MdOutlineAccountCircle, MdOutlineClose } from "react-icons/md";

const navbar = [
  {
    id: 1,
    to: "/transactions",
    title: "transactions",
  },
  {
    id: 2,
    to: "/analysis",
    title: "analysis",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
  });
  const { state, signOutUser } = useContext(AuthContext);
  const { transactionState } = useContext(TransactionsContext);

  useEffect(() => {
    if (!transactionState.length) return;

    const stats = transactionState.reduce(
      (acc, item) => {
        switch (item.type) {
          case "income":
            return { ...acc, totalIncome: acc.totalIncome + +item.amount };
          case "expense":
            return {
              ...acc,
              totalExpense: acc.totalExpense + +item.amount,
            };
          default:
            throw new Error("Invalid transaction type.");
        }
      },
      { totalIncome: 0, totalExpense: 0 }
    );

    const updatedStats = {
      ...stats,
      totalBalance: stats.totalIncome - stats.totalExpense,
    };

    setStats((prev) => ({
      ...prev,
      ...updatedStats,
    }));
  }, [transactionState]);

  const signOutUserHandler = () => {
    signOutUser();
    navigate("/signin");
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <header className="flex justify-end gap-4 px-4 py-2 mb-4 align-middle border-b border-gray-300">
        <NavLink
          to="/transactions/add"
          className="px-4 py-2 font-medium text-[14px] capitalize bg-indigo-500 rounded-xl text-gray-200"
        >
          add transaction
        </NavLink>
        <button
          onClick={() => {
            setDrawer(!drawer);
          }}
        >
          <MdOutlineAccountCircle
            title="account"
            className="text-gray-800 w-7 h-7"
          />
        </button>
      </header>

      {drawer && (
        <div className="fixed top-0 right-0 w-3/4 h-screen overflow-hidden bg-gray-100 drop-shadow-sm tablet:w-72">
          <div className="flex justify-end px-4 py-2 mb-4">
            <button
              onClick={() => {
                setDrawer(!drawer);
              }}
            >
              <MdOutlineClose title="close" className="w-6 h-6 text-gray-800" />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="px-4 py-2 border-b">
              <span className="font-medium">{state?.user?.email}</span>
            </div>
            <nav className="px-4 py-2 border-b">
              <ul>
                {navbar.map((item) => {
                  return (
                    <li key={item.id}>
                      <NavLink to={item.to} className="capitalize">
                        {item.title}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="px-4 py-2">
              <NavLink onClick={signOutUserHandler} className="capitalize">
                log out
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <div className="w-[90vw] mx-auto max-w-5xl">
        <div className="flex flex-col gap-1 mb-4 tablet:flex-row tablet:gap-2 laptop:gap-4">
          <div className="w-full p-2 mb-2 bg-blue-400 rounded shadow-sm">
            {stats.totalBalance}
          </div>
          <div className="w-full p-2 mb-2 bg-orange-400 rounded shadow-sm">
            {stats.totalExpense}
          </div>
          <div className="w-full p-2 mb-2 bg-teal-400 rounded shadow-sm">
            {stats.totalIncome}
          </div>
        </div>
        <div>
          <div className="flex justify-between px-2 py-4 align-middle">
            <h2 className="capitalize">receant transactions</h2>
            <NavLink to="/transactions" className="capitalize">
              view all
            </NavLink>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
