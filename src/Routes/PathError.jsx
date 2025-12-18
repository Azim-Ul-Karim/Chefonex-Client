import React from 'react';
import { MdOutlineNoFood } from 'react-icons/md';
import { Link } from 'react-router';

const PathError = () => {

    return (
        <section>

            <title>Error - 404</title>

            <div className='flex flex-col items-center justify-center min-h-screen bg-[#f9f8e6]'>
                <MdOutlineNoFood size={80} className='text-secondary' />
                <h1 className='mt-20 font-semibold text-3xl md:text-4xl lg:text-5xl text-[#6a0505]'>
                    Oops ! Page Not Found !!!
                </h1>
                <Link className='mt-20 font-semibold text-white bg-secondary px-8 py-2 rounded-lg shadow-2xl' to='/'>
                    Back to Home
                </Link>
            </div>
        </section>
    );
};

export default PathError;