import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineDoneAll } from 'react-icons/md';
import { IoBan } from 'react-icons/io5';
import Loader from '../../../Components/Loader';
import Swal from 'sweetalert2';

const ManageRequests = () => {

    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['roleRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/role-requests');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>;
    }

    const handleApprove = async (id) => {
        const result = await Swal.fire({
            title: "Approve this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f7552",
            confirmButtonText: "Yes, Approve",
            cancelButtonColor: "#d33",
            cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            await axiosSecure.patch(`/role-requests/approve/${id}`);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Request Approved",
                showConfirmButton: false,
                timer: 2000
            });

            refetch();
        }
    };

    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: "Reject this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f7552",
            confirmButtonText: "Yes, Reject",
            cancelButtonColor: "#d33",
            cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            await axiosSecure.patch(`/role-requests/reject/${id}`);

            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Request Rejected",
                showConfirmButton: false,
                timer: 2000
            });

            refetch();
        }
    };

    return (
        <div className='p-10'>

            <title>Manage Requests | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                Manage Requests
            </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='text-center font-semibold bg-[#ededc8] text-[#52057b]'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Request Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((req, index) => (
                            <tr key={req._id} className="text-center hover:bg-[#f4f6d4]">
                                <td>{index + 1}</td>
                                <td>{req.userName}</td>
                                <td>{req.userEmail}</td>
                                <td className="capitalize">{req.requestType}</td>
                                <td className="capitalize">{req.requestStatus}</td>
                                <td>{new Date(req.requestTime).toLocaleString()}</td>
                                <td className='flex justify-center gap-3'>
                                    <button
                                        disabled={req.requestStatus !== 'pending'}
                                        onClick={() => handleApprove(req._id)}
                                        className="bg-[#859f7f] rounded-full p-1.5 text-white cursor-pointer disabled:opacity-40"
                                        title="Accept"
                                    >
                                        <MdOutlineDoneAll size={15} />
                                    </button>

                                    <button
                                        disabled={req.requestStatus !== 'pending'}
                                        onClick={() => handleReject(req._id)}
                                        className="bg-[#9f827f] rounded-full p-1.5 text-white cursor-pointer disabled:opacity-40"
                                        title="Reject"
                                    >
                                        <IoBan size={15} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageRequests;