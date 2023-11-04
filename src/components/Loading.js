import React from 'react'

const Loading = () => {
  return (
    <div className='fixed z-50 w-full h-screen flex justify-center items-center bg-black bg-opacity-80'>
        {/* Loading Animation */}
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 text-amber-300 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    </div>
  )
}

export default Loading