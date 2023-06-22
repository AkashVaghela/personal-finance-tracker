import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { state, signOutUser } = useContext(AuthContext);

  return (
    <div>
      <header className="flex p-4 bg-emerald-600 w-100">
        <button
          className="px-4 py-1 ml-auto font-medium capitalize rounded-sm shadow-sm w-fit bg-slate-100 hover:cursor-pointer hover:bg-slate-200 hover:transition-all"
          onClick={signOutUser}
        >
          logout
        </button>
      </header>
    </div>
  );
};

export default Dashboard;
