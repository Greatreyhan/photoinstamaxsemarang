import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";

const Navigation = () => {
  return (
    <nav className="w-full fixed bg-white bg-opacity-70">
      <div className="flex w-10/12 justify-between items-center mx-auto">
        <div className="w-12">
          <img className="w-full" src={Logo} />
        </div>
        <div className="flex flex-1 justify-end items-center text-slate-700">
          <Link className="text-amber-950 m-3 border-b-2 border-amber-900 font-bold" to="/">Home</Link>
          <Link className="hover:font-semibold hover:text-slate-950 font-medium m-3" to="/products">Product</Link>
          <Link className="hover:font-semibold hover:text-slate-950 font-medium m-3" to="/tutorial">Order Tutorial</Link>
          <Link className="hover:font-semibold hover:text-slate-950 font-medium m-3" to="/aboutus">Contact</Link>
          <Link className="font-medium m-3 text-amber-50 px-7 py-1 rounded-sm bg-amber-900" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
