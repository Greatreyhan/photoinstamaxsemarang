import React,{useEffect,useState} from 'react'
import { FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MapWrap, Polaroid1 } from '../assets';
import TileProduct from './TileProduct';
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref } from 'firebase/database'


const Dashboard = () => {
const [dataItems, setDataItems] = useState([])
  useEffect(()=>{
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      if(data){
        const key = Object.keys(data)
        setDataItems(data)
      }
    });
  },[])
  return (
    <div className='px-8 flex justify-around flex-wrap gap-6'>
        <div className='bg-indigo-100 py-6 rounded-md shadow-md text-indigo-950 w-80 flex justify-around items-center'>
            <div>
                <p className='text-4xl font-semibold'>876</p>
                <p className='text-sm font-normal'>Total Pengguna</p>
            </div>
            <FaUsers className='text-4xl' />
        </div>
        <div className='bg-green-100 py-6 rounded-md shadow-md text-green-950 w-80 flex justify-around items-center'>
            <div>
                <p className='text-4xl font-semibold'>200</p>
                <p className='text-sm font-normal'>Total Pesanan</p>
            </div>
            <GrTransaction  className='text-4xl' />
        </div>
        <div className='bg-amber-100 py-6 rounded-md shadow-md text-amber-950 w-80 flex justify-around items-center'>
            <div>
                <p className='text-4xl font-semibold'>Rp 12K</p>
                <p className='text-sm font-normal'>Transaksi Berlangsung</p>
            </div>
            <MdOutlineAttachMoney  className='text-4xl font-bold' />
        </div>
        {dataItems ? 
        dataItems.map((list,i)=>{
            if(i < 5) return <TileProduct ImageSource={list.img} title={list.title} qty={list.qty} />
        })
        :
        null}
    </div>
  )
}

export default Dashboard