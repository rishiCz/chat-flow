import React from 'react'

const NavBar = ({checkEdges}) => {
  return (
    <div className=' bg-gray-200 w-full h-16 flex items-center justify-end px-16'>
        <button
        onClick={checkEdges}
         className=' hover:shadow hover:shadow-blue-500 text-blue-600 border-blue-600 border-2 p-2 bg-white font-bold rounded-lg'>Save Changes</button>
    </div>
  )
}

export default NavBar