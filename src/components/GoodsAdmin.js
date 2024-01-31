import React, { useState, useEffect } from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { remove, ref, update } from 'firebase/database'
import PopUpGoodsAdmin from "./PopUpGoodsAdmin";
const GoodsAdmin = ({data, length, i}) => {
    const [popUp, setPopUp] = useState(false)
    const handleDelete = () =>{
      const newData={
        ...data,
        show : 'hidden'
      }
      update(ref(FIREBASE_DB, "goods/" + (i)), newData)
      .then(() => {
      })
      .catch((error) => {
          console.log(error)
      });
    }
  return (
    <div className="m-auto overflow-hidden shadow-lg h-90 w-60 md:w-80 rounded-md border-2 border-amber-900 border-opacity-30">
      {popUp ? <PopUpGoodsAdmin data={data} length={length} setPopUp={setPopUp} i={i} /> : null}
      <div href="#" className="block w-full h-full">
        <img
          alt="blog photo"
          src={data.img}
          className="object-cover w-full max-h-60"
        />
        <div className="w-full p-4 bg-white">
          <p className="font-medium text-amber-700 text-md">Rp {data.price},00</p>
          <p className="mb-2 text-xl font-medium text-gray-800">
            {data.title}
          </p>
          <p className="font-light text-gray-800 text-md">
            {data.desc}
          </p>

          <div className="flex justify-end text-sm my-5 items-center">
            <a onClick={handleDelete} className="text-amber-900 cursor-pointer">Delete</a>
            <a onClick={()=>setPopUp(!popUp)}  className="cursor-pointer px-8 py-1 text-amber-50 font-semibold bg-amber-900 hover:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] ml-6">Edit</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsAdmin;
