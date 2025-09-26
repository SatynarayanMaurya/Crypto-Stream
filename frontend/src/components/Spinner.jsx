import React from 'react'

function Spinner() {
  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center'>
        <div className='w-16 h-16 border-t-blue-500 border-6 border-b-blue-500 border-gray-300 rounded-full animate-spin'></div>
    </div>
  )
}

export default Spinner
