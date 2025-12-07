import React from 'react';

const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <div>
                <img src="https://i.postimg.cc/L64rdB9v/Chef.png" className="w-12" />
            </div>
            <h3 className='text-2xl font-extrabold kelly-slab-regular text-[#631d01] flex items-center gap-0.5'>
                <span>Chef</span>
                <img src="https://i.postimg.cc/4ysP6Cb2/Chefo.png" className="w-5 h-5" />
                <span className='text-[#05517a]'>nex</span>
            </h3>
        </div>
    );
};

export default Logo;