import React, { useState } from "react";
import PopupGood from "./PopupGood";
import PopupBuy from "./PopupBuy";
import { useFirebase } from "../FirebaseContext";
import { PopupBuyDefault, PopupGoodDefault } from ".";
import { Link } from "react-router-dom";
const Goods = ({ Title, Desc, Price, Category, Weight, ImageSource, ProdukID }) => {
  const [popUp, setPopUp] = useState(false)
  const [popUpDef, setPopUpDef] = useState(false)
  const [popBuy, setPopBuy] = useState(false)
  const [popUpBuyDef, setPopUpBuyDef] = useState(false)
  const { user } = useFirebase()
  return (
    <div className="m-auto overflow-hidden shadow-lg cursor-pointer h-90 w-80 md:w-80 rounded-md border-2 border-amber-900 border-opacity-30">
      {popUp ? <PopupGood name={Title} price={Price} setPopUp={setPopUp} weight={Weight} ProdukID={ProdukID} /> : null}
      {popUpDef ? <PopupGoodDefault name={Title} price={Price} setPopUp={setPopUpDef} weight={Weight} ProdukID={ProdukID} ImageSource={ImageSource} /> : null}
      {popBuy ? <PopupBuy name={Title} price={Price} setPopBuy={setPopBuy} weight={Weight} ProdukID={ProdukID} /> : null}
      {popUpBuyDef ? <PopupBuyDefault name={Title} price={Price} setPopBuy={setPopUpBuyDef} weight={Weight} ProdukID={ProdukID} ImageSource={ImageSource} /> : null}
      <a href="#" className="block w-full h-full">
        <img
          alt="blog photo"
          src={ImageSource}
          className="object-cover w-full max-h-60"
        />
        <div className="w-full p-4 bg-white">
          <p className="font-medium text-amber-700 text-md">Rp {Price},00</p>
          <p className="mb-2 text-xl font-medium text-gray-800">
            {Title}
          </p>
          <p className="font-light text-gray-800 text-md">
            {Desc}
          </p>
          {/* <div className="flex flex-wrap items-center mt-4 justify-starts">
            <div className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
              {Category}
            </div>
          </div> */}
          <div className="flex justify-end text-sm my-5 items-center">
            {user ?
              <button onClick={Category == 1 ? () => setPopUp(!popUp) : () => setPopUpDef(!popUpDef)} className="text-amber-900">Masukkan Keranjang</button>
              :
              <Link to="/login" className="text-amber-900">Masukkan Keranjang</Link>
            }
            {user ?
              <button onClick={Category == 1 ? () => setPopBuy(!popBuy) : () => setPopUpBuyDef(!popUpBuyDef)} className="px-8 py-1 text-amber-50 font-semibold bg-amber-900 hover:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] ml-6">Beli</button> :
              <Link to="/login" className="px-8 py-1 text-amber-50 font-semibold bg-amber-900 hover:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] ml-6">Beli</Link>}

          </div>
        </div>
      </a>
    </div>
  );
};

export default Goods;
 