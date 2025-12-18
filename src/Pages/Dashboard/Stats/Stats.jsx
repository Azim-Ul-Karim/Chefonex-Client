import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Loader';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Stats = () => {

    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ['platform-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/statistics');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    const {
        totalUsers = 0,
        ordersDelivered = 0,
        ordersPending = 0,
        totalPaymentAmount = 0
    } = data;

    const orderData = [
        { name: 'Delivered', value: ordersDelivered },
        { name: 'Pending', value: ordersPending }
    ];

    const paymentData = [
        { name: 'Total Payments', value: totalPaymentAmount }
    ];

    const ORDER_COLORS = ['#6f5c42', '#afa38f'];

    return (
        <div className='p-10'>

            <title>Platform Statistics | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                Platform Statistics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-[#efecc7] shadow-lg rounded-lg p-6 text-center">
                    <p className="text-gray-600">Total Users</p>
                    <h3 className="text-3xl font-bold">{totalUsers}</h3>
                </div>

                <div className="bg-[#e0efc7] shadow-lg rounded-lg p-6 text-center">
                    <p className="text-gray-600">Orders Delivered</p>
                    <h3 className="text-3xl font-bold">{ordersDelivered}</h3>
                </div>

                <div className="bg-[#f5e1db] shadow-lg rounded-lg p-6 text-center">
                    <p className="text-gray-600">Orders Pending</p>
                    <h3 className="text-3xl font-bold">{ordersPending}</h3>
                </div>

                <div className="bg-[#e7e5cf] shadow-lg rounded-lg p-6 text-center">
                    <p className="text-gray-600">Total Payment Amount</p>
                    <h3 className="text-3xl font-bold">৳ {totalPaymentAmount}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#ebe4c8] shadow-xl rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Orders Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={orderData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value">
                                {
                                    orderData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={ORDER_COLORS[index]}
                                        />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-[#f6ebca] shadow-xl rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Payment Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={paymentData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                <Cell fill="#697048" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Stats;