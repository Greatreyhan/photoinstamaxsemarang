import React from 'react'

const PopupGood = ({Name,setPopUp}) => {
    return (
        <div onClick={()=>setPopUp(false)} className='bg-black bg-opacity-30 w-full h-screen fixed flex items-center justify-center top-0 left-0'>

            <div className="w-64 p-4 m-auto bg-white shadow-lg rounded-2xl ">
                <div className="w-full h-full text-center">
                    <div className="flex flex-col justify-between h-full">
                        <svg className="w-12 h-12 m-auto mt-4 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                        <p className="px-6 py-2 text-gray-600 text-md">
                            {Name} Berhasil dimasukkan kedalam Keranjang
                        </p>
                        <div className="flex items-center justify-between w-full gap-4 mt-8">
                            <button type="button" className="py-2 px-4  bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 focus:ring-offset-amber-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PopupGood