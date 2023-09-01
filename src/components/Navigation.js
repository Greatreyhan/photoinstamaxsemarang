import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { useLocation } from "react-router-dom";
import { useFirebase } from "../FirebaseContext";

const Navigation = () => {
  const { user } = useFirebase();
  const location = useLocation();
  return (
    <nav className="w-full fixed bg-white bg-opacity-70 z-50">
      <div className="flex w-10/12 justify-between items-center mx-auto">
        <div className="w-14">
          <img className="w-full" src={Logo} />
        </div>
        <div className="flex flex-1 justify-end items-center text-slate-700">
          <Link className={location.pathname == "/" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold`: `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/">Home</Link>
          <Link className={location.pathname == "/products" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold`: `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/products">Products</Link>
          <Link className={location.pathname == "/tutorial" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold`: `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/tutorial">Order Tutorial</Link>
          <a href="#contact" className={`hover:font-semibold hover:text-slate-950 font-medium m-3`}>Contact</a>
          {user ? 
          <Link className={`font-medium m-3 py-1.5 text-amber-50 px-7 rounded-sm bg-amber-900 capitalize`} to="/profile">{user.email.match(/([^@]*)@/)[1]}</Link>
          :
          <Link className={`font-medium m-3 py-1.5 text-amber-50 px-7 rounded-sm bg-amber-900`} to="/login">Login</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
