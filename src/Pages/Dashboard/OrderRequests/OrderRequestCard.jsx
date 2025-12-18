import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { IoPricetagsOutline } from 'react-icons/io5';
import { TbCurrencyTaka, TbLocationPin, TbZoomCancel } from 'react-icons/tb';
import { PiTimerDuotone } from 'react-icons/pi';
import { MdOutlineCancelPresentation, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { GoCodescanCheckmark } from 'react-icons/go';
import { BsSendCheck } from 'react-icons/bs';

const OrderRequestCard = ({ order, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const { _id, mealName, price, quantity, orderStatus, userEmail, orderTime, userAddress, paymentStatus } = order;

    const updateStatus = (status) => {
        axiosSecure.patch(`/orders/${_id}`, { status })
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `Order ${status}`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    refetch();
                }
            });
    };

    const capitalize = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <div className="bg-[#ece9c7] rounded-lg shadow-lg hover:bg-[#e4dba9] p-3.5 flex gap-2">
            <div className='space-y-2'>
                <h2 className="card-title ">{mealName}</h2>

                <div className='flex items-center gap-2 my-2'>
                    <IoPricetagsOutline size={18} />
                    <div className='flex items-center gap-0.5 text-[#03772d]'>
                        <p className='font-semibold'>{price}</p>
                        <TbCurrencyTaka size={18} />
                        ×
                        <p>{quantity}</p>
                    </div>
                </div>

                <p>Status: <span className={`font-semibold ${orderStatus === 'accepted' ? 'text-[#528246]' : orderStatus === 'cancelled' ? 'text-[#a54141]' : 'text-[#6e6203]'}`}>{capitalize(orderStatus)}</span></p>

                <p>Payment: <span className={`font-semibold ${paymentStatus === 'paid' ? 'text-[#528246]' : 'text-[#6e6203]'}`}>{capitalize(paymentStatus)}</span></p>

                <div className='flex items-center gap-2'>
                    <MdOutlineMarkEmailUnread />
                    <p>{userEmail}</p>
                </div>

                <div className='flex items-center gap-2'>
                    <TbLocationPin />
                    <p>{userAddress}</p>
                </div>

                <div className='flex items-center gap-2'>
                    <PiTimerDuotone />
                    <p>{new Date(orderTime).toLocaleString()}</p>
                </div>
            </div>

            <div className="flex flex-col gap-5 ml-auto justify-center">

                {/* Cancel */}
                <button
                    disabled={orderStatus !== 'pending'}
                    onClick={() => updateStatus('cancelled')}
                    className="disabled:opacity-50 text-[#b40303] cursor-pointer"
                    title='Cancel Order'
                >
                    <MdOutlineCancelPresentation size={18} />
                </button>

                {/* Accept */}
                <button
                    disabled={orderStatus !== 'pending'}
                    onClick={() => updateStatus('accepted')}
                    className="disabled:opacity-50 text-[#9c5e00] cursor-pointer"
                    title='Accept Order'
                >
                    <GoCodescanCheckmark size={18} />
                </button>

                {/* Deliver */}
                <button
                    disabled={orderStatus !== 'accepted'}
                    onClick={() => updateStatus('delivered')}
                    className="disabled:opacity-50 text-[#036f1d] cursor-pointer"
                    title='Deliver Order'
                >
                    <BsSendCheck size={18} />
                </button>
            </div>
        </div>
    );
};

export default OrderRequestCard;