import React, { useState, useEffect } from "react";
import { FilmWrap } from '../assets'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue, update } from "firebase/database"

const CartItem = ({ list }) => {
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(5000)
  const [dataItem, setDataItem] = useState([])
  const [dataGoods, setDataGoods] = useState([])
  useEffect(() => {
    onValue(ref(FIREBASE_DB, "carts/" + list), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDataItem(data)
      }
    });
    onValue(ref(FIREBASE_DB, "goods/"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data)
        setDataGoods(data)
      }
    });
  }, []);
  const handleAdd = () =>{
    set(ref(FIREBASE_DB, "carts/" + list + "/qty"), dataItem.qty+1)
      .then(() => {
      })
      .catch((error) => {
        console.log(error)
      });
  }
  const handleMin = () =>{
    set(ref(FIREBASE_DB, "carts/" + list + "/qty"), dataItem.qty-1)
      .then(() => {
      })
      .catch((error) => {
        console.log(error)
      });
  }
  if (dataItem != [] && dataGoods != []) {
    return (
      <div className="md:mx-5 mx-2 flex flex-col my-2 bg-amber-800 px-3 py-2 rounded-lg border-2 border-white border-opacity-20">
        <div className="flex items-center">
          <img
            className="w-20 h-20 object-cover object-center rounded-lg"
            src={dataItem.img}
          />
          <div className="w-4/12 mx-5 text-amber-50">
            <p className="font-semibold text-md">{dataGoods[dataItem.produkID] ? dataGoods[dataItem.produkID].title : "..."}</p>
            <p className="text-white text-xs opacity-60 capitalize">Packaging {dataItem.packaging}</p>
            <div className="text-sm flex items-center gap-2 mt-2">
              <p className="bg-white bg-opacity-0 text-center text-md" >{dataItem.qty}</p>
              <p>Produk</p>
            </div>
          </div>
          <div className="w-4/12 text-amber-50 pl-2 border-l-2 border-white border-opacity-20">
            <p className="text-sm">Harga Produk</p>
            <p className="md:text-lg text-md font-bold">{new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(dataItem.price)}</p>
          </div>
        </div>
        <div className="flex justify-end ">
        </div>
      </div>
    )
  }
};

export default CartItem;
