import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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

const transactions = [
  {
    id: 1,
    category: "food",
    amount: "amount",
    details: "Details",
    date: "01/01/2022",
  },
];

// group items by same date here

const Dashboard = () => {
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);
  const { state, signOutUser } = useContext(AuthContext);

  const signOutUserHandler = () => {
    signOutUser();
    navigate("/signin");
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <header className="flex justify-end gap-4 px-4 py-2 mb-4 align-middle border-b">
        <NavLink to="/transactions/add">add transaction</NavLink>
        <button
          onClick={() => {
            setDrawer(!drawer);
          }}
        >
          <MdOutlineAccountCircle
            title="account"
            className="w-8 h-8 text-gray-500"
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
              <MdOutlineClose title="close" className="w-8 h-8 text-gray-500" />
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
          <div className="w-full p-2 mb-2 bg-blue-400 rounded shadow-sm">1</div>
          <div className="w-full p-2 mb-2 bg-orange-400 rounded shadow-sm">
            2
          </div>
          <div className="w-full p-2 mb-2 bg-teal-400 rounded shadow-sm">3</div>
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
