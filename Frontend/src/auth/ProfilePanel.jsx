import React, { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { dataContext } from "../context/UserContext";

const ProfilePanel = () => {
  const {
    showProfile, setShowProfile,
    user, setUser
  } = useContext(dataContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
  };

  return (
    <div className={`fixed top-0 right-0 w-[35vw] h-full bg-white shadow-xl p-8 transition-all duration-500
      ${showProfile ? "translate-x-0" : "translate-x-full"}`}>

      <header className="flex justify-between">
        <span className="text-green-400 font-semibold">Profile</span>
        <RxCross1 onClick={() => setShowProfile(false)} className="cursor-pointer" />
      </header>

      <div className="mt-10 flex flex-col items-center gap-4">
        <FaUserCircle className="w-20 h-20 text-green-400" />
        <h2 className="text-xl font-semibold">{user?.name}</h2>
        <p className="text-gray-400">{user?.email}</p>

        <button
          onClick={logout}
          className="mt-6 bg-red-400 text-white px-6 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePanel;
