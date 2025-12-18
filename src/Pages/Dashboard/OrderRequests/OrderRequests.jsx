import React from 'react';
import Loader from '../../../Components/Loader';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import OrderRequestCard from './OrderRequestCard';

const OrderRequests = () => {

    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orderRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders/chef');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='p-10'>

            <title>Order Requests | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                Order Requests
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {orders.map(order => (
                    <OrderRequestCard key={order._id} order={order} refetch={refetch} />
                ))}
            </div>
        </div>
    );
};

export default OrderRequests;