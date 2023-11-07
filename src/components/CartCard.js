import React,{useState, useEffect} from "react";
import { FilmWrap } from '../assets'
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai"
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { set, ref, onValue, remove } from "firebase/database"
import {BsTrash3Fill} from "react-icons/bs"
import {AiOutlineCheck} from "react-icons/ai"

const CartCard = ({list, checked, setChecked, id}) => {
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(5000)
  const [dataItem, setDataItem] = useState([])
  const [dataGoods, setDataGoods] = useState([])
  const [isCheck, setIsCheck] = useState(false)
  const { user } = useFirebase();
  useEffect(() => {
    onValue(ref(FIREBASE_DB, "carts/" + list), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data)
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
    console.log("wait")
    set(ref(FIREBASE_DB, "carts/" + list + "/qty"), dataItem.qty+1)
      .then(() => {
        console.log("added")
      })
      .catch((error) => {
        console.log(error)
      });
  }
  const handleMin = () =>{
    set(ref(FIREBASE_DB, "carts/" + list + "/qty"), dataItem.qty-1)
      .then(() => {
        console.log("substracted")
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const handleCheck = () =>{
    const newArr = checked
    newArr.push(list)
    console.log(newArr)
    setChecked(newArr)
    setIsCheck(true)
  }

  const handleUncheck = () =>{
    const index = checked.indexOf(list)
    checked.splice(index,1)
    setIsCheck(false)
  }

  const handleDelete = () =>{
    console.log(id)
    remove(ref(FIREBASE_DB, "user/"+user.uid+"/cart/" + id))
      .then(() => {
        console.log("deleted")
      })
      .catch((error) => {
        console.log(error)
      });
    remove(ref(FIREBASE_DB, "carts/" + list))
      .then(() => {
        console.log("deleted")
      })
      .catch((error) => {
        console.log(error)
      });
  }
  
  if (dataItem != [] && dataGoods != []) {
    return (
      <div className="mx-5 flex flex-col my-2 bg-amber-800 px-3 py-2 rounded-lg border-2 border-white border-opacity-20">
        <div className="flex items-center">
          <div className="w-1/12 flex justify-center">
            {isCheck ? 
            <a onClick={handleUncheck} className="text-smd text-amber-950 font-bold cursor-pointer bg-amber-50 rounded-sm px-1 py-1"><AiOutlineCheck /></a>
            : 
            <a onClick={handleCheck} className="text-smd text-amber-50 font-bold cursor-pointer bg-amber-50 rounded-sm px-1 py-1"><AiOutlineCheck /></a>
            }
            
          </div>
          <img
            className="w-20 h-20 object-cover object-center rounded-lg"
            src={dataItem.img}
          />
          <div className="w-4/12 mx-5 text-amber-50">
            <p className="font-semibold text-md">{dataGoods[dataItem.produkID] ? dataGoods[dataItem.produkID].title : "..."}</p>
            <p className="text-white text-xs opacity-60 capitalize">Packaging {dataItem.packaging}</p>
            <div className="text-sm flex items-center gap-2 mt-2">
              <AiOutlinePlus onClick={handleAdd} className="rounded-full text-white w-4 h-4 cursor-pointer border"  />
              <p className="bg-white bg-opacity-0 text-center text-md" >{dataItem.qty}</p>
              <AiOutlineMinus onClick={handleMin} className="rounded-full text-white w-4 h-4 cursor-pointer border" />
              <p>Produk</p>
            </div>
          </div>
          <div className="w-4/12 text-amber-50 pl-2 border-l-2 border-white border-opacity-20">
            <p className="text-sm">Harga Produk</p>
            <p className="text-lg font-bold">{new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(dataItem.price)}</p>
          </div>
          <div className="w-1/12 text-amber-50 pl-2 ">
            <a onClick={handleDelete} className="text-sm cursor-pointer"><BsTrash3Fill /></a>
          </div>
        </div>
        <div className="flex justify-end ">
        </div>
      </div>
    )
  }
};

export default CartCard;
