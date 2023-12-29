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
      if (data) {
        const key = Object.keys(data);
        setDataFullCart(data)
        setKeyFullCart(key)
      }
    });
  }, []);

  const handleClick = () => {
    if (checked != []) {
      let dataMoney = 0;
      let dataWeight = 0;
      let dataQty = 0;
      checked.map(list => {
        dataQty += dataFullCart[list].qty
        dataWeight += dataFullCart[list].weight
        dataMoney += dataFullCart[list].price
      })
      setMoney(dataMoney)
      setWeight(dataWeight * dataQty)
    }
  }

  return (
    <div className='flex flex-col w-full h-full relative'>
      <div className='h-full pb-12 '>
        {popUp ? <PopUpChekcout list={checked} price={money} weightTotal={weight} setPopUp={setPopUp} dataCart={dataCart} /> : null}
        {dataCart[0] ? dataCart.map((list, i) => {
          return (<CartCard list={list} checked={checked} setChecked={setChecked} handleClick={handleClick} id={i} />)
        }) : null}
      </div>

      <div className='absolute bottom-0 w-full flex justify-between items-center bg-amber-700'>
        <div className='px-8 text-white flex flex-col'>
          <span className='text-xs'>Total Keseluruhan </span><span className='font-bold border-white border-opacity-50 text-lg'>Rp {money.toLocaleString('id-ID')},-</span>
        </div>
        {money == 0 ? 
        <a disabled className='flex disabled: justify-center px-8 py-2 h-full bg-slate-500 text-white uppercase cursor-pointer'>
        Bayar Sekarang
      </a>
        : 
        <a onClick={() => setPopUp(true)} className='flex justify-center px-8 py-2 h-full bg-amber-500 text-white uppercase cursor-pointer'>
          Bayar Sekarang
        </a>}
        
      </div>
    </div>
  )
}

export default Keranjang