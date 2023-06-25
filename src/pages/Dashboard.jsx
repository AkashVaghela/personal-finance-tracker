import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navbar = [
  {
    id: 1,
    to: "/dashboard",
    title: "dashboard",
  },
  {
    id: 2,
    to: "/transactions",
    title: "transactions",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, signOutUser } = useContext(AuthContext);

  const signOutUserHandler = () => {
    signOutUser();
    navigate("/signin");
  }

  return (
    <div>
      <header className="flex items-center p-4 w-100 justify-between border-b">
        <nav>
          <ul className="flex">
            {navbar.map((item) => {
              return (<li key={item.id}>
                <NavLink to={item.to} className="font-medium text-gray-900 capitalize mr-6">
                  {item.title}
                </NavLink>
              </li>);
            })}
          </ul>
        </nav>
        <button
          className="px-6 py-2 font-bold capitalize rounded-3xl shadow-sm w-fit border border-green-600 hover:cursor-pointer hover:bg-green-600 hover:transition-all"
          onClick={signOutUserHandler}
        >
          logout
        </button>
      </header>
    </div>
  );
};

export default Dashboard;
