import React,{useState, useEffect} from 'react'
import { useFirebase } from "../FirebaseContext";
import {AiOutlineFieldTime} from "react-icons/ai"
import {FaTruck} from "react-icons/fa"
import {MdDone} from "react-icons/md"
import TransactionCard from '../components/TransactionCard'
import { onValue, ref, set } from 'firebase/database'
import { FIREBASE_DB } from '../config/firebaseinit'

const Transaksi = () => {
  const { user } = useFirebase();
  const [dataTransaction, setDataTransaction] = useState([])
  const [keyTransaction, setKeyTransaction] = useState([])

  const [dataBelum,setDataBelum] = useState([])
  const [keyBelum, setKeyBelum] = useState([])
  const [dataSelesai,setDataSelesai] = useState([])
  const [keySelesai, setKeySelesai] = useState([])
  const [dataProses,setDataProses] = useState([])
  const [keyProses, setKeyProses] = useState([])
  const [dataSalah,setDataSalah] = useState([])
  const [keySalah, setKeySalah] = useState([])

  useEffect(() => {
    onValue(ref(FIREBASE_DB, "user/" + user.uid +"/transaction"), (snapshot) => {
      const data = snapshot.val();
      const key = Object.keys(data)
      setDataTransaction(data)
      if(data){
        data.map((list,i)=>{
          
          onValue(ref(FIREBASE_DB, "transactions/" + list), (ss) => { 
            
            if(ss.val().buyStatus == 0){
              setKeyBelum((keyBelum)=>[...keyBelum, list])
              setDataBelum((dataBelum)=>[...dataBelum, ss.val()])
            }
            else if(ss.val().buyStatus == 1){
              setKeyProses((keyProses)=>[...keyProses, list])
              setDataProses((dataProses)=>[...dataProses, ss.val()])
            }
            else if(ss.val().buyStatus == 2){
              setKeySelesai((keySelesai)=>[...keySelesai, list])
              setDataSelesai((dataSelesai)=>[...dataSelesai, ss.val()])
            }
            else{
              setKeySelesai((keySelesai)=>[...keySelesai, list])
              setDataSalah((dataSalah)=>[...dataSalah, ss.val()])
            }
          }, [])
        })
      }
    });
  }, [])

  return (
    <div className='flex flex-col w-full'>
      {/* Menunggu Pembayaran */}
      <div>
        <h2 className='text-md items-center text-amber-50 mt-8 px-5 py-1 border-b-2 border-white border-opacity-30 flex'><AiOutlineFieldTime /><span className='ml-2'>Menunggu Pembayaran</span></h2>
        {dataBelum ?
        dataBelum.map((list,i)=>{
          return(
            <TransactionCard list={list} id={keyBelum[i]} />
          )
        })
        :
        null}
        
      </div>

      {/* Diproses */}
      <div>
      <h2 className='text-md items-center flex text-amber-50 mt-8 px-5 py-1 border-b-2 border-white border-opacity-30'><FaTruck /><span className='ml-2'>Sedang Diproses</span></h2>
      {dataProses ?
        dataProses.map((list,i)=>{
          return(
            <TransactionCard list={list} id={keyProses[i]} />
          )
        })
        :
        null}
      </div>

      {/* Selesai */}
      <div>
      <h2 className='text-md items-center flex text-amber-50 mt-8 px-5 py-1 border-b-2 border-white border-opacity-30'><MdDone /><span className='ml-2'>Selesai Diproses</span></h2>
      {dataSelesai ?
        dataSelesai.map((list,i)=>{
          return(
            <TransactionCard list={list} id={keySelesai[i]} />
          )
        })
        :
        null}
      </div>

      {/* Salah */}
      <div>
      <h2 className='text-md items-center flex text-amber-50 mt-8 px-5 py-1 border-b-2 border-white border-opacity-30'><MdDone /><span className='ml-2'>Terjadi Kendala</span></h2>
      {dataSalah ?
        dataSalah.map((list,i)=>{
          return(
            <TransactionCard list={list} id={keySalah[i]} />
          )
        })
        :
        null}
      </div>
    </div>
  )
}

export default Transaksi