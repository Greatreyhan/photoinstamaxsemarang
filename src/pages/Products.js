import React,{useState, useEffect} from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref } from 'firebase/database'
import { Goods } from '../components'
import { BoxWrap, FilmWrap, FrameWrap, MapWrap, StandWrap } from '../assets'

const Products = () => {
  const [dataItems, setDataItems] = useState([])
  useEffect(()=>{
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      const key = Object.keys(data)
      setDataItems(data)
    });
  },[])
  const goodList = [
    ["Polaroid Photo", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, StandWrap, "Polaroid"],
    ["Box Frame", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, BoxWrap, "Polaroid"],
    ["Frame Wrap", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, FrameWrap, "Polaroid"],
    ["Map Wrap", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, MapWrap, "Polaroid"],
    ["Film Wrap", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, FilmWrap, "Polaroid"],
  ]
  return (
    <div className='w-10/12 mx-auto py-32 flex flex-wrap gap-y-10'>
      {dataItems.map((list,id)=>{
        return(<Goods key={id} Title={list.title} Desc={list.desc} Price={list.price} ImageSource={list.img} Category={list.type} ProdukID={id} />)
      })}
    </div>
  )
}

export default Products