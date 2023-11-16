import React from 'react'

const TileProduct = ({ImageSource, title, qty}) => {
  return (
    <div className='w-56 bg-white rounded-lg shadow-lg px-6 py-4 mt-12'>
    <img src={ImageSource} className='w-28 h-28 shadow-lg rounded-lg -mt-10 object-cover mx-auto' />
    <p className='text-3xl mt-3 font-semibold text-center'>{qty}</p>
    <p className='text-xs text-center'>{title}</p>
    <span className={`h-1.5 block bottom-0 text-center rounded-full mt-3 mx-2 ${qty < 10 ? "bg-blue-100" : qty < 20 ? "bg-blue-200" : qty < 30 ? "bg-blue-300" : qty < 40 ? "bg-blue-400" : qty < 50 ? "bg-blue-500" : "bg-blue-600"}`}></span>
</div>
  )
}

export default TileProduct