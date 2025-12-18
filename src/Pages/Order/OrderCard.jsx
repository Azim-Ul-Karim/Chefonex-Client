import React from 'react';
import { FaRegIdBadge } from 'react-icons/fa';
import { IoPricetagsOutline } from 'react-icons/io5';
import { PiChefHatDuotone } from 'react-icons/pi';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const OrderCard = ({ order }) => {

    const { mealName, orderStatus, paymentStatus, price, quantity, estimateDeliveryTime, chefName, chefId } = order;

    const axiosSecure = useAxiosSecure();

    const capitalize = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const displayStatus = (status) => {
        if (status === 'accepted') return 'Preparing';
        return capitalize(status);
    };

    const handlePayment = async (order) => {
        const paymentInfo = {
            totalPrice: order.totalPrice,
            orderId: order._id,
            mealName: order.mealName,
            userEmail: order.userEmail
        }
        const res = await axiosSecure.post('/payment-checkout', paymentInfo);
        window.location.href = res.data.url;
    }

    return (
        <div className='bg-[#ece9c7] rounded-lg shadow-lg hover:bg-[#e4dba9] p-4'>
            <h3 className="text-lg font-semibold mb-3 text-[#526004]">{mealName}</h3>

            <div className='flex items-center gap-2 text-[#800707]'>
                <FaRegIdBadge />
                <p>{chefId}</p>
            </div>

            <div className='flex items-center gap-2'>
                <PiChefHatDuotone size={18} />
                <p className='font-semibold text-gray-700'>{chefName}</p>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <IoPricetagsOutline size={18} />
                <div className='flex items-center gap-0.5 text-[#03772d]'>
                    <p className='font-semibold'>{price}</p>
                    <TbCurrencyTaka size={18} />
                    ×
                    <p>{quantity}</p>
                </div>
            </div>

            <div className='text-gray-500'>
                <p>
                    <span className="font-semibold">Order Status:</span> {displayStatus(orderStatus)}
                </p>


                <p><span className="font-semibold">Payment Status:</span> {capitalize(paymentStatus)}</p>

                {
                    orderStatus === 'delivered' ? (
                        estimateDeliveryTime ? (
                            <p className="mt-1 font-semibold">
                                Delivery within {estimateDeliveryTime}
                            </p>
                        ) : (
                            <p className="mt-1">
                                Delivery time not updated
                            </p>
                        )
                    ) : (
                        <p className="mt-1">
                            Delivery time not updated
                        </p>
                    )
                }
            </div>

            {
                orderStatus === 'accepted' && paymentStatus === 'pending' && (
                    <button onClick={() => handlePayment(order)} className="btn bg-primary text-white font-semibold w-full mt-4">
                        Pay Now
                    </button>
                )
            }
        </div>
    );
};

export default OrderCard;