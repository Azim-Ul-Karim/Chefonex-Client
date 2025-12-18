import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaySuccess = () => {

    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});

    const axiosSecure = useAxiosSecure();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);

                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className='h-screen flex flex-col items-center justify-center'>

            <title>Payment Success | Chefonex</title>
            
            <p className='text-xl mb-5 text-[#7c7004]'>Ding Dong Dang</p>
            <h2 className='text-2xl md:text-3xl font-bold text-[#01a224]'>
                Payment Successful.
            </h2>

            <div className='pt-8 space-y-1 text-center text-[#4a5c6c]'>
                <p><strong>TrackingID:</strong> {paymentInfo.trackingId}</p>
                <p><strong>TransactionID:</strong> {paymentInfo.transactionId}</p>
            </div>

            <Link to='/meals' className='bg-primary text-white font-semibold px-4 py-2 mt-8 rounded-md'>Order Another...</Link>
        </div>
    );
};

export default PaySuccess;