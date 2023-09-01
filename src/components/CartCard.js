import React from "react";
import { FilmWrap } from '../assets'
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai"

const CartCard = () => {
  return (
    <div className="mx-5 flex flex-col bg-amber-800 px-8 py-4 rounded-lg mt-5 border-2 border-white border-opacity-20">
      <div className="flex mt-3 items-center">
        <img
          className="w-32 h-32 object-cover object-center rounded-lg"
          src={FilmWrap}
        />
        <div className="w-4/12 mx-5 text-amber-50">
          <p className="font-semibold text-lg">Polaroid Photo</p>
          <div className="text-sm flex items-center gap-2 mt-2">
            <AiOutlinePlus className="bg-amber-50 rounded-full text-amber-950 w-4 h-4 p-0.5" />
            <input className="w-8 bg-white bg-opacity-0 border-b-2 text-center text-md" type="number" />
            <AiOutlineMinus className="bg-amber-50 rounded-full text-amber-950 w-4 h-4 p-0.5"  />
            <p>Produk</p>
          </div>
        </div>
        <div className="w-4/12 text-amber-50 pl-2 border-l-2 border-white border-opacity-20">
          <p className="text-sm">Harga Produk</p>
          <p className="text-lg font-bold">Rp 200.000</p>
        </div>
      </div>
      <div className="flex justify-end ">
        <button className="mx-8 px-5 text-white font-semibold hover:font-bold">
          Hapus
        </button>
        <button className="px-8 py-1.5 hover:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] bg-amber-100 text-lg font-semibold text-amber-950">
          Beli Barang
        </button>
      </div>
    </div>
  );
};

export default CartCard;
