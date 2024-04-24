import React from 'react'

const SideBar = ({children}) => {
  return (
    <div className=' border-2 border-gray-300 w-[550px] h-full'>
        {children}
    </div>
  )
}

export default SideBar