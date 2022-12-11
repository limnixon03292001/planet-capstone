import React from 'react'
import planetLogo from '../assets/PLANeTlogo.png';

const Navbar = () => {
  return (
    <nav className='w-full py-3 px-3 border border-red-500 flex items-center justify-between'>
        <div>
            <img src={planetLogo} className="w-[33px] h-[38px] mr-0 lg:mr-2"/>
        </div>
        <div>Navbar</div>
    </nav>
  )
}

export default Navbar