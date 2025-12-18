import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Loader';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
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

    const handleMarkFraud = async (id) => {
        const result = await Swal.fire({
            title: "Mark as fraud?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f7552",
            confirmButtonText: "Confirm",
            cancelButtonColor: "#d33"
        });

        if (result.isConfirmed) {
            await axiosSecure.patch(`/users/fraud/${id}`);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "User marked as fraud",
                showConfirmButton: false,
                timer: 2000
            });

            refetch();
        }
    };

    return (
        <div className='p-10'>

            <title>Manage Users | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                Manage Users
            </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='text-center font-semibold bg-[#ededc8] text-[#52057b]'>
                        <tr>
                            <th>#</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id} className="hover:bg-[#f4f6d4] text-center">
                                <td>
                                    <p>{index + 1}</p>
                                </td>
                                <td>
                                    <img src={user.photoURL} className='w-6 h-6 rounded-full mx-auto' />
                                </td>
                                <td>
                                    <div>{user.displayName}</div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {capitalize(user.role)}
                                </td>
                                <td>
                                    {capitalize(user.status)}
                                </td>
                                <td>
                                    {
                                        user.role !== 'admin' && user.status !== 'fraud' && (
                                            <button onClick={() => handleMarkFraud(user._id)} className="btn btn-sm">Mark Fraud</button>
                                        )
                                    }
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;