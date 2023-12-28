import React from "react";
import { Logo } from "../assets";
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom"

const Footer = () => {
  const location = useLocation();
  if(location.pathname == "/login" || location.pathname == "/signUp" || location.pathname == "/admin"){
    return(null)
  }
  else{
    return (
      <footer className="bg-amber-950  pt-4 pb-8 xl:pt-8" id="contact">
        <div className="md:w-10/12 w-11/12 px-4 mx-auto text-slate-50 sm:px-6 md:px-8 ">
          <ul className="flex flex-wrap justify-center pb-8 text-lg font-light">
          <li className="w-full md:w-2/5">
              <div className="text-left md:block flex items-center">
                <img className="w-20 h-20 rounded-full" src={Logo} />
                <div className="md:ml-0 ml-4">
                <h2 className="text-slate-50 font-semibold text-md mt-0 md:mt-6">
                  Photo Instax Semarang
                </h2>
                <p>Jl. Kanguru Utara IX No. 7, Gayamsari, Semarang</p>
                </div>
              </div>
            </li>
            <li className="w-4/12 md:mt-0 mt-4 md:text-left text-center md:w-1/5">
              <div className="text-left">
                <h2 className="text-slate-50 font-semibold text-md uppercase mb-4">
                  Products
                </h2>
                <ul>
                  <li className="mb-4 transition-colors duration-200 hover:font-semibold">
                    <a href="#polaroid">Polaroid</a>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:font-semibold">
                    <a href="#product">Gift Wrap</a>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:font-semibold">
                    <Link to="/custom">Custom Order</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="w-4/12 md:mt-0 mt-4 md:text-left text-center md:w-1/5">
              <div className="text-left">
                <h2 className="text-slate-50 font-semibold text-md uppercase mb-4">
                  Contacts
                </h2>
                <ul>
                  <li className="mb-4 transition-colors duration-200 hover:font-semibold">
                    <a href="https://wa.me/62895618388388">Whatsapp</a>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:font-semibold">
                    <a href="mailto:photoinstax.semarang@gmail.com">Email</a>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:font-semibold">
                    <a href="https://www.instagram.com/photoinstax.semarang/">Instagram</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="w-4/12 md:mt-0 mt-4 md:text-left text-center md:w-1/5">
              <div className="text-left">
                <h2 className="text-slate-50 font-semibold text-md uppercase mb-4">
                  Online Shop
                </h2>
                <ul>
                  <li className="mb-4 transition-colors duration-200 hover:font-semibold">
                    <a href="https://www.tokopedia.com/photoinstaxsemarang">Tokopedia</a>
                  </li>
                  <li className="mb-4 transition-colors duration-200 hover:font-semibold">
                    <a href="https://shopee.co.id/photoinstaxsemarang">Shopee</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
};

export default Footer;
