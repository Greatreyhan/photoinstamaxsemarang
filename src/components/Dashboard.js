import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MapWrap, Polaroid1 } from '../assets';
import TileProduct from './TileProduct';
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref } from 'firebase/database'


const Dashboard = () => {
  const [dataProduk, setDataProduk] = useState([])
  const [keyProduk, setKeyProduk] = useState([])
  const [dataUser, setDataUser] = useState([])
  const [dataTransaction, setDataTransaction] = useState([])
  const [totalUser, setTotalUser] = useState(0)
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [totalMoney, setTotalMoney] = useState(0)
  useEffect(() => {
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      if(data){
        const key = Object.keys(data)
        setKeyProduk(key)
        setDataProduk(data)
      }
    })
    onValue(ref(FIREBASE_DB, "user"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        setDataUser(data)
        setTotalUser(key.length)
      }
    })
    onValue(ref(FIREBASE_DB, "transactions"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        let recapMoney = 0;
        if(key){
          key.map((k)=>{
            recapMoney += data[k].price
          })
        }
        setDataTransaction(data)
        setTotalTransaction(key.length)
        setTotalMoney(recapMoney/1000)
      }
    })

  }, [])
  return (
    <div className='px-8 flex justify-around flex-wrap gap-6'>
      <div className='bg-indigo-100 py-6 rounded-md shadow-md text-indigo-950 w-80 flex justify-around items-center'>
        <div>
          <p className='text-4xl font-semibold'>{totalUser}</p>
          <p className='text-sm font-normal'>Total Pengguna</p>
        </div>
        <FaUsers className='text-4xl' />
      </div>
      <div className='bg-green-100 py-6 rounded-md shadow-md text-green-950 w-80 flex justify-around items-center'>
        <div>
          <p className='text-4xl font-semibold'>{totalTransaction}</p>
          <p className='text-sm font-normal'>Total Pesanan</p>
        </div>
        <GrTransaction className='text-4xl' />
      </div>
      <div className='bg-amber-100 py-6 rounded-md shadow-md text-amber-950 w-80 flex justify-around items-center'>
        <div>
          <p className='text-4xl font-semibold'>Rp {totalMoney}K</p>
          <p className='text-sm font-normal'>Transaksi Berlangsung</p>
        </div>
        <MdOutlineAttachMoney className='text-4xl font-bold' />
      </div>
      {Array.isArray(keyProduk) && dataProduk != {} ? keyProduk.map((key, i) => {
          if(dataProduk[key].show){
            if(dataProduk[key].show != 'hidden'){
            return <TileProduct ImageSource={dataProduk[key].img} title={dataProduk[key].title} qty={dataProduk[key].qty} />
            }
          }
          else{
            return <TileProduct ImageSource={dataProduk[key].img} title={dataProduk[key].title} qty={dataProduk[key].qty} />
          }
        })
        :
        <p>Loading...</p>}
    </div>
  )
}

export default Dashboard