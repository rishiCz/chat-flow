import React from 'react'

const SaveError = ({showError}) => {
  return (
    <div className='fixed top-0 w-full duration-300' style={{transform:showError?`translatey(10px)`:`translatey(-100px)`}}>
            <div className='m-auto w-fit p-2 rounded-lg bg-red-400 text-black font-bold '>Cannot Save Flow</div>

    </div>
  )
}

export default SaveError