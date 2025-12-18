import React from 'react';
import { Link } from 'react-router';

const PayCancel = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>

            <title>Payment Cancel | Chefonex</title>
            
            <h2 className='text-2xl md:text-3xl font-bold text-[#a20101]'>
                Cancelled The Payment.
            </h2>
            <Link to='/dashboard/my-orders' className='bg-primary text-white font-semibold px-4 py-2 mt-6 rounded-md'>Try Again!</Link>
        </div>
    );
};

export default PayCancel;