import React from 'react'
import { Goods } from '../components'
import { BoxWrap, FilmWrap, FrameWrap, MapWrap, StandWrap } from '../assets'

const Products = () => {
  const goodList = [
    ["Polaroid Photo", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, StandWrap, "Polaroid"],
    ["Box Frame", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, BoxWrap, "Polaroid"],
    ["Frame Wrap", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, FrameWrap, "Polaroid"],
    ["Map Wrap", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, MapWrap, "Polaroid"],
    ["Film Wrap", "Cetak Polaroid ukuran 54 x 88 mm dengan kualitas terbaik IP500 menggunakan fuji photo instax",5000, FilmWrap, "Polaroid"],
  ]
  return (
    <div className='w-10/12 mx-auto py-32 flex flex-wrap gap-y-10'>
      {goodList.map((list,id)=>{
        return(<Goods key={id} Title={list[0]} Desc={list[1]} Price={list[2]} ImageSource={list[3]} Category={list[4]} />)
      })}
    </div>
  )
}

export default Products