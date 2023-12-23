import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Logo } from "../assets";
import { useLocation } from "react-router-dom";
import { useFirebase } from "../FirebaseContext";
import { AiOutlineCaretDown } from "react-icons/ai"
import { BsPersonFill, BsFillCartFill } from "react-icons/bs"
import { MdOutlineLogout } from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi";
import Cart from "./Cart";
const Navigation = () => {
  const { user, signOut } = useFirebase();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [cart, setCart] = useState(false)
  const [show, setShow] = useState(false)

  const handleLogout = async (e) => {
    e.preventDefault();
    <Navigate to="/login" />
    await signOut();
  };
  if (location.pathname == "/login" || location.pathname == "/signUp" || location.pathname == "/admin") {
    return (null)
  }
  else {
    return (
      <nav className="w-full fixed bg-white bg-opacity-70 z-50">
        {cart ? <Cart isOpen={setCart} /> : null}
        <div className="flex w-10/12 justify-between items-center mx-auto">
          <div className="w-14">
            <img className="w-full" src={Logo} />
          </div>
          <div className="hidden md:flex flex-1 justify-end items-center text-slate-700">
            <Link className={location.pathname == "/" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold` : `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/">Home</Link>
            <Link className={location.pathname == "/products" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold` : `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/products">Products</Link>
            <Link className={location.pathname == "/tutorial" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold` : `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/tutorial">Order Tutorial</Link>
            <a href="#contact" className={`hover:font-semibold hover:text-slate-950 font-medium m-3`}>Contact</a>
            {user ?
              <div onClick={() => setOpenMenu(!openMenu)}>
                <p className="font-medium m-3 py-1.5 text-amber-50 px-7 rounded-sm bg-amber-900 capitalize flex items-center cursor-pointer"><span>{user.email.match(/([^@]*)@/)[1]}</span><AiOutlineCaretDown className="ml-2 w-3" /></p>
                {openMenu ?
                  <div className="absolute bg-white w-48 shadow-lg">
                    <Link className="flex justify-between items-center text-amber-950 hover:bg-amber-50 px-4 py-2" to="/profile"><span>Profile</span><BsPersonFill /></Link>
                    <hr />
                    <a onClick={() => setCart(!cart)} className="flex cursor-pointer justify-between items-center text-amber-950 hover:bg-amber-50 px-4 py-2" ><span>Keranjang</span><BsFillCartFill /></a>
                    <hr />
                    <a onClick={handleLogout} className="flex cursor-pointer justify-between items-center text-amber-950 hover:bg-amber-50 px-4 py-2" ><span>Log Out</span><MdOutlineLogout /></a>
                    <hr />
                  </div>
                  : null
                }
              </div>
              :
              <Link className={`font-medium m-3 py-1.5 text-amber-50 px-7 rounded-sm bg-amber-900`} to="/login">Login</Link>
            }
          </div>
          <div className="w-8 h-8 flex justify-center items-center md:hidden">
            <GiHamburgerMenu className="w-full h-full text-slate-800 cursor-pointer" onClick={() => setShow(!show)} />
          </div>
        </div>
        {show ?
          <div className="fixed flex flex-col w-full text-center justify-center items-center h-screen bg-white bg-opacity-90 backdrop-blur-md top-14">
            <Link onClick={() => setShow(!show)} className={location.pathname == "/" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold` : `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/">Home</Link>
            <Link onClick={() => setShow(!show)} className={location.pathname == "/products" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold` : `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/products">Products</Link>
            <Link onClick={() => setShow(!show)} className={location.pathname == "/tutorial" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold` : `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/tutorial">Order Tutorial</Link>
            <Link onClick={() => setShow(!show)} className={location.pathname == "/profile" ? `text-amber-950 m-3 border-b-4 border-amber-900 font-bold` : `hover:font-semibold hover:text-slate-950 font-medium m-3`} to="/tutorial">Transaksi</Link>
            <a href="#contact" className={`hover:font-semibold hover:text-slate-950 font-medium m-3`}>Contact</a>
            {user ?
              <>
                <Link onClick={() => setShow(!show)} className="hover:font-semibold hover:text-slate-950 font-medium m-3 capitalize" to="/profile"><span>{user.email.match(/([^@]*)@/)[1]}</span></Link>
                <hr />
                <a onClick={() =>{setCart(!cart); setShow(!show)}} className="hover:font-semibold hover:text-slate-950 font-medium m-3" ><span>Keranjang</span></a>
                <hr />
                <a onClick={() =>{handleLogout(); setShow(!show)}} className="hover:font-semibold hover:text-slate-950 font-medium m-3" ><span>Log Out</span></a>
                <hr />
              </>
              :
              <Link onClick={() => setShow(!show)} className={`font-medium m-3 py-1.5 text-amber-50 px-7 rounded-sm bg-amber-900`} to="/login">Login</Link>
            }
          </div>
          : null}
      </nav>
    );
  }
};

export default Navigation;
