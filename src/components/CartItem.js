import React,{useState} from "react";
import { FilmWrap } from '../assets'
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai"

const CartItem = () => {
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(5000)
  return (
    <div className="mx-5 flex flex-col my-2 bg-amber-800 px-3 py-2 rounded-lg border-2 border-white border-opacity-20">
      <div className="flex items-center">
        <img
          className="w-20 h-20 object-cover object-center rounded-lg"
          src={FilmWrap}
        />
        <div className="w-4/12 mx-5 text-amber-50">
          <p className="font-semibold text-md">Polaroid Photo</p>
          <div className="text-sm flex items-center gap-2 mt-2">
            <AiOutlinePlus className="rounded-full text-white w-4 h-4 cursor-pointer border" onClick={()=>setQty(qty+1)} />
            <p className="bg-white bg-opacity-0 text-center text-md" >{qty}</p>
            <AiOutlineMinus className="rounded-full text-white w-4 h-4 cursor-pointer border" onClick={()=>setQty(qty == 0 ? 0 : qty-1)}  />
            <p>Produk</p>
          </div>
        </div>
        <div className="w-4/12 text-amber-50 pl-2 border-l-2 border-white border-opacity-20">
          <p className="text-sm">Harga Produk</p>
          <p className="text-lg font-bold">Rp {price*qty}</p>
        </div>
      </div>
      <div className="flex justify-end ">
      </div>
    </div>
  );
};

export default CartItem;
