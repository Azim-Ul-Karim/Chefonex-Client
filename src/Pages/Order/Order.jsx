import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PiChefHatDuotone } from 'react-icons/pi';
import Loader from '../../Components/Loader';
import { FaRegIdBadge } from 'react-icons/fa';
import { IoPricetagsOutline } from 'react-icons/io5';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Order = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

    const { data: meal = {}, isLoading } = useQuery({
        queryKey: ["orderMeal", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    if (isLoading) {
        return <Loader></Loader>
    }

    const { _id, mealName, mealPrice, chefName, chefId, estimateDeliveryTime } = meal;

    const totalPrice = mealPrice * quantity;

    const handleOrder = (formData) => {

        const orderData = {
            foodId: _id,
            mealName,
            price: mealPrice,
            quantity,
            chefId,
            chefName,
            estimateDeliveryTime,
            userName: formData.username,
            userEmail: formData.email,
            userAddress: formData.address,
            instruction: formData.instruction || "",
            totalPrice
        };

        Swal.fire({
            title: "Confirm the order?",
            text: `Your total price is ${totalPrice} ৳`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f7552",
            confirmButtonText: "Yes",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post("/orders", orderData)
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.insertedId) {
                            navigate('/dashboard/my-orders');
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Order placed successfully. Continuing...",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="p-4 my-10">

            <title>Order | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
                Place Your Order
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-start">

                <div className="p-5 bg-[#ece9c7] rounded-lg shadow-lg">
                    <form id="orderForm" onSubmit={handleSubmit(handleOrder)}>
                        <fieldset className="fieldset text-sm space-y-1.5">

                            {/* Name */}
                            <label className="label font-semibold">Name</label>
                            <input
                                {...register("username", { required: "Name is required" })}
                                type="text"
                                defaultValue={user?.displayName}
                                className="input focus:outline-none w-full"
                                placeholder="Write your name"
                            />
                            {errors.username && (
                                <p className="text-red-500">{errors.username.message}</p>
                            )}

                            {/* Email */}
                            <label className="label font-semibold">Email</label>
                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                defaultValue={user?.email}
                                className="input focus:outline-none w-full"
                                placeholder="Write your email address"
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email.message}</p>
                            )}

                            {/* Address */}
                            <label className="label font-semibold">Address</label>
                            <input
                                {...register("address", { required: "Address is required" })}
                                type="text"
                                className="input focus:outline-none w-full"
                                placeholder="Write your receiving address"
                            />
                            {errors.address && (
                                <p className="text-red-500">{errors.address.message}</p>
                            )}

                            {/* Quantity */}
                            <label className="label font-semibold">Quantity</label>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    className="btn btn-sm bg-[#e0cccc] text-black rounded-full font-bold"
                                    onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                                >
                                    -
                                </button>

                                <span className="font-semibold w-10 text-center">{quantity}</span>

                                <button
                                    type="button"
                                    className="btn btn-sm bg-[#e0cccc] text-black rounded-full font-bold"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    +
                                </button>
                            </div>

                            {/* Instructions */}
                            <label className="label font-semibold">Special Instruction</label>
                            <textarea
                                {...register("instruction")}
                                rows={4}
                                className="textarea w-full focus:outline-none"
                                placeholder="Any special requests?"
                            />

                        </fieldset>
                    </form>
                </div>

                <div className="p-5 bg-[#f6ebca] rounded-lg shadow-lg text-gray-500">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <h4 className="text-lg font-semibold mb-3 text-[#000000]">{mealName}</h4>

                    <div className='flex items-center gap-2 mb-1 text-[#800707]'>
                        <FaRegIdBadge />
                        <p>{chefId}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <PiChefHatDuotone size={18} />
                        <p className='font-semibold text-gray-500'>{chefName}</p>
                    </div>

                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Price per item:</span>
                            <span>{mealPrice} ৳</span>
                        </p>

                        <p className="flex justify-between">
                            <span>Quantity:</span>
                            <span>{quantity}</span>
                        </p>

                        <p className="flex justify-between font-bold border-t mt-4 pt-4 text-gray-600">
                            <span className='flex gap-2 items-center'>
                                <IoPricetagsOutline size={18} />
                                <span>Total :</span>
                            </span>
                            <span>{totalPrice} ৳</span>
                        </p>
                    </div>

                    <button
                        form="orderForm"
                        className="btn btn-primary text-white w-full mt-6 cursor-pointer"
                    >
                        Proceed To Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;