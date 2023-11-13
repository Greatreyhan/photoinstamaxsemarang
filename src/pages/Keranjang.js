import React, { useState, useEffect } from 'react'
import { CartCard, PopUpChekcout } from '../components'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { ref, onValue } from "firebase/database"

const Keranjang = () => {
  const [dataCart, setDataCart] = useState([])
  const [dataFullCart, setDataFullCart] = useState([])
  const [keyFullCart, setKeyFullCart] = useState([])
  const [checked, setChecked] = useState([])
  const { user } = useFirebase();
  const [money, setMoney] = useState(0)
  const [weight, setWeight] = useState(0)
  const [popUp, setPopUp] = useState(false)
  useEffect(() => {
    onValue(ref(FIREBASE_DB, "user/" + user.uid + "/cart"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDataCart(data)
      }
    });
    onValue(ref(FIREBASE_DB, "carts/"), (snapshot) => {
      const data = snapshot.val();
      const key = Object.keys(data);
      if (data) {
        setDataFullCart(data)
        setKeyFullCart(key)
      }
    });
  }, []);

  const handleClick = () =>{
    if(checked != []){
      let dataMoney = 0;
      let dataWeight = 0;
      let dataQty = 0;
      checked.map(list=>{
        dataQty += dataFullCart[list].qty
        dataWeight += dataFullCart[list].weight
        dataMoney += dataFullCart[list].price
      })
      setMoney(dataMoney*dataQty)
      setWeight(dataWeight*dataQty)
    }
  }

  return (
    <div className='flex flex-col w-full h-full relative'>
      {popUp ? <PopUpChekcout list={checked} price={money} weightTotal={weight} setPopUp={setPopUp}/>:null}
      {dataCart[0] ? dataCart.map((list,i) => {
        return (<CartCard list={list} checked={checked} setChecked={setChecked} handleClick={handleClick} id={i} />)
      }) : null}
      <div className='absolute bottom-0 w-full flex justify-between items-center bg-amber-700'>
        <div className='px-8 text-white'>
          Total Keseluruhan <span className='font-bold ml-8 border-l-2 py-2 pl-4 border-white border-opacity-50 text-lg'>Rp {money.toLocaleString('id-ID')},-</span>      
        </div>
        <a onClick={()=>setPopUp(true)} className='flex justify-center px-8 py-2 bg-amber-500 text-amber-950 uppercase cursor-pointer'>
          Bayar Sekarang
        </a>
      </div>
    </div>
  )
}

export default Keranjang