import React from 'react'
import { MdWarning, MdError, MdInfo } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Message = ({msg, type, setType}) => {
    return (
        <div className={`fixed top-0 z-50 w-full flex items-center px-4 py-3 text-sm font-bold text-white ${type == 0 ? "hidden" :type == 1 ? 'bg-blue-500' : type == 2 ? 'bg-amber-500' : 'bg-rose-500'} `} role="alert">
            {type == 1 ? <MdInfo fill="currentColor" className="w-4 h-4 mr-2" /> : type == 2 ? <MdWarning fill="currentColor" className="w-4 h-4 mr-2" /> : <MdError fill="currentColor" className="w-4 h-4 mr-2" />}
            <p>
               {msg}
            </p>
            <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>setType(0)}>
                <IoMdClose className="w-6 h-6 text-white" />
            </button>
        </div>

    )
}

export default Message