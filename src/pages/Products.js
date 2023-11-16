import React,{useState, useEffect} from 'react'
import { FIREBASE_DB } from '../config/firebaseinit'
import { onValue, ref } from 'firebase/database'
import { Goods } from '../components'
const Products = () => {
  const [dataItems, setDataItems] = useState([])
  useEffect(()=>{
    onValue(ref(FIREBASE_DB, "goods"), (snapshot) => {
      const data = snapshot.val();
      const key = Object.keys(data)
      setDataItems(data)
    });
  },[])
  return (
    <div className='w-10/12 mx-auto py-32 flex flex-wrap gap-y-10'>
      {dataItems.map((list,id)=>{
        return(<Goods key={id} Title={list.title} Desc={list.desc} Price={list.price} ImageSource={list.img} Category={list.type} Weight={list.weight} ProdukID={id} />)
      })}
    </div>
  )
}

export default Products