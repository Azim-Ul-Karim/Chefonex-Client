import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Loader';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import Swal from 'sweetalert2';

const MyProfile = () => {

    const axiosSecure = useAxiosSecure();

    const { data: user = {}, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/profile');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>;
    }

    const capitalize = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const handleChefRequest = async () => {
        const res = await axiosSecure.post('/role-requests', {
            requestType: 'chef'
        });

        if (res.data?.message === 'Request already pending') {
            Swal.fire({
                icon: 'info',
                title: 'Request Already Pending',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Chef request sent successfully',
            showConfirmButton: false,
            timer: 2000
        });

        return res.data;
    };

    const handleAdminRequest = async () => {
        const res = await axiosSecure.post('/role-requests', {
            requestType: 'admin'
        });

        if (res.data?.message === 'Request already pending') {
            Swal.fire({
                icon: 'info',
                title: 'Request Already Pending',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Admin request sent successfully',
            showConfirmButton: false,
            timer: 2000
        });

        return res.data;
    };

    return (
        <div className="p-10 h-screen flex items-center justify-center flex-col">

            <title>My Profile | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                My Profile
            </h2>

            <section className='bg-[#ece9c7] w-100 md:w-2/3 mx-auto rounded-md p-4 md:p-8 shadow-xl'>
                <div className='flex flex-col items-center justify-center'>
                    <img src={user.photoURL} className="w-24 h-24 rounded-full border border-[#816666]" />

                    <h2 className="text-xl md:text-2xl font-bold mt-5 mb-2">{user.displayName}</h2>
                    <div className='flex items-center gap-2 text-[#673030]'>
                        <MdOutlineMarkEmailRead />
                        <p>{user.email}</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                    <div className="space-y-2">
                        <p><strong>Address:</strong> {capitalize(user.address)}</p>
                        <p><strong>Role:</strong> {capitalize(user.role)}</p>
                        <p><strong>Status:</strong> {capitalize(user.status)}</p>

                        {
                            user.role === 'chef' && (
                                <p><strong>Chef ID:</strong> {user.chefId}</p>
                            )
                        }
                    </div>

                    <div className='flex md:flex-col gap-3 items-center md:items-end justify-center'>
                        {
                            user.role === 'user' && (
                                <>
                                    <button onClick={handleChefRequest} className='bg-[#80775d] text-white px-4 py-1.5 font-semibold rounded-md cursor-pointer'>
                                        Be A Chef
                                    </button>

                                    <button onClick={handleAdminRequest} className='bg-[#675b3b] text-white px-4 py-1.5 font-semibold rounded-md cursor-pointer'>
                                        Be An Admin
                                    </button>
                                </>
                            )
                        }

                        {
                            user.role === 'chef' && (
                                <button onClick={handleAdminRequest} className='bg-[#675b3b] text-white px-4 py-1.5 font-semibold rounded-md cursor-pointer'>
                                    Be An Admin
                                </button>
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyProfile;