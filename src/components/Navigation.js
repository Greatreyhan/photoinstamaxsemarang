import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { useLocation } from "react-router-dom";
import { useFirebase } from "../FirebaseContext";
import {AiOutlineCaretDown} from "react-icons/ai"
import {BsPersonFill, BsFillCartFill} from "react-icons/bs"
import Cart from "./Cart";
const Navigation = () => {
  const { user } = useFirebase();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [cart, setCart] = useState(false)
  return (
    <nav className="w-full fixed bg-white bg-opacity-70 z-50">
      {cart ? <Cart isOpen={setCart} /> : null}
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
          <div onClick={()=>setOpenMenu(!openMenu)}>
            <p className="font-medium m-3 py-1.5 text-amber-50 px-7 rounded-sm bg-amber-900 capitalize flex items-center cursor-pointer"><span>{user.email.match(/([^@]*)@/)[1]}</span><AiOutlineCaretDown className="ml-2 w-3" /></p>
            {openMenu ? 
            <div className="absolute bg-white w-48 shadow-lg">
              <Link className="flex justify-between items-center text-amber-950 hover:bg-amber-50 px-4 py-2" to="/profile"><span>Profile</span><BsPersonFill /></Link>
              <hr />
              <a onClick={()=>setCart(!cart)} className="flex cursor-pointer justify-between items-center text-amber-950 hover:bg-amber-50 px-4 py-2" ><span>Keranjang</span><BsFillCartFill /></a>
              <hr />
            </div>
            : null
            }
          </div>
          // <Link className={`font-medium m-3 py-1.5 text-amber-50 px-7 rounded-sm bg-amber-900 capitalize`} to="/">{user.email.match(/([^@]*)@/)[1]}</Link>
          :
          <Link className={`font-medium m-3 py-1.5 text-amber-50 px-7 rounded-sm bg-amber-900`} to="/login">Login</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
