import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Loader';
import OrderCard from '../../Order/OrderCard';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyOrders = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['myOrders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        }
    });

    {
        isLoading && <Loader></Loader>
    }

    return (
        <div className='p-10'>

            <title>My Orders | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                My Orders
            </h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start'>
                {
                    orders.map(order => <OrderCard key={order._id} order={order}></OrderCard>)
                }
            </div>
        </div>
    );
};

export default MyOrders;