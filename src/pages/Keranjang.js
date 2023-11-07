import React, { useState, useEffect } from 'react'
import { CartCard } from '../components'
import { useFirebase } from "../FirebaseContext";
import { FIREBASE_DB } from '../config/firebaseinit';
import { ref, onValue } from "firebase/database"

const Keranjang = () => {
  const [dataCart, setDataCart] = useState([])
  const [dataFullCart, setDataFullCart] = useState([])
  const [keyFullCart, setKeyFullCart] = useState([])
  const [checked, setChecked] = useState([])
  const { user } = useFirebase();
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

  useEffect(()=>{
    console.log(checked)
  },[checked,setChecked])
  return (
    <div className='flex flex-col w-full h-full relative'>
      {dataCart ? dataCart.map((list,i) => {
        return (<CartCard list={list} checked={checked} setChecked={setChecked} id={i} />)
      }) : null}
      <div className='absolute bottom-0 w-full flex justify-between'>
        <div >
          {/* Total Keseluruhan : {checked.map(list=>{
            console.log(dataFullCart)
          })} */}
       
        </div>
        <a>
          Bayar Sekarang
        </a>
      </div>
    </div>
  )
}

export default Keranjang