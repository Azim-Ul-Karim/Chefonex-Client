import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Components/Logo';

const Navbar = () => {
    
    return (
        <nav className='bg-[#f0e4ba]'>
            <div className='w-11/12 mx-auto flex items-center justify-between p-2.5 md:px-0'>
                <Logo></Logo>

                <div className='flex items-center gap-7'>
                    <NavLink className='hover:bg-[#e2d6be] px-2 py-1 rounded-md' to='/'>Home</NavLink>
                    <NavLink className='hover:bg-[#e2d6be] px-2 py-1 rounded-md' to='/meals'>Meals</NavLink>
                </div>

                <div className='flex items-center gap-5'>
                    <Link className='bg-[#ffff] px-3 py-1.5 rounded-md shadow-md font-semibold' to='/login'>Login</Link>
                    <Link className='bg-[#6f5c42] text-white px-3 py-1.5 rounded-md shadow-md font-semibold' to='/register'>Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;