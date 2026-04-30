import React from "react";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const UserDetails = ({ user, closeOverlayProfile }) => {
    if (!user) return null;

    return (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-white flex justify-start items-center flex-col pt-12 z-[1000] cursor-pointer"
          onClick={closeOverlayProfile}
        >
            <img
                src={`${API_BASE}/${user.profilePicture}`}
                alt="Profile"
                className="w-[200px] h-[200px] rounded-full object-cover object-center mb-5"
            />
            <h2 className="text-black">{user.username}</h2>
            <p className="text-black">{user.phone}</p>
        </div>
    );
};

export default UserDetails;

