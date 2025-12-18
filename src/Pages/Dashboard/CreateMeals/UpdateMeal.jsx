import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../../Components/Loader';

const UpdateMeal = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: meal = {}, isLoading } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        }
    });

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (meal?._id) {
            reset({
                mealName: meal.mealName,
                ingredients: meal.mealIngredients?.join(', '),
                description: meal.mealDescription,
                price: meal.mealPrice,
                deliveryTime: meal.estimateDeliveryTime,
                chefExperience: meal.chefExperience
            });
        }
    }, [meal, reset]);

    const handleUpdate = (data) => {
        const updatedMeal = {
            mealName: data.mealName,
            mealIngredients: data.ingredients.split(',').map(i => i.trim()),
            mealDescription: data.description,
            mealPrice: parseFloat(data.price),
            estimateDeliveryTime: data.deliveryTime,
            chefExperience: data.chefExperience
        };

        axiosSecure.patch(`/meals/${id}`, updatedMeal)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Meal Updated Successfully",
                        timer: 2000,
                        showConfirmButton: false
                    });

                    navigate('/dashboard/my-meals');
                }
            });
    };

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <section className='flex items-center justify-center min-h-screen'>

            <title>Update Meal | Chefonex</title>
            
            <div className="w-full md:w-2/3 lg:w-1/2 mx-auto p-10">
                <h2 className="text-[#4c2d02] text-3xl font-bold text-center mb-10">
                    Update Meal
                </h2>

                <form onSubmit={handleSubmit(handleUpdate)}>
                    <fieldset className="fieldset flex flex-col gap-3 text-sm">

                        {/* Meal Name */}
                        <div>
                            <label className="label font-semibold mb-1.5">Meal Name</label>
                            <input {...register("mealName", { required: true })} className="input w-full focus:outline-none" />
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label className="label font-semibold mb-1.5">Ingredients</label>
                            <textarea {...register("ingredients", { required: true })} className="textarea w-full focus:outline-none" />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="label font-semibold mb-1.5">Description</label>
                            <textarea {...register("description", { required: true })} className="textarea w-full focus:outline-none" />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="label font-semibold mb-1.5">Price</label>
                            <input type="number" {...register("price", { required: true })} className="input w-full focus:outline-none" />
                        </div>

                        {/* Delivery Time */}
                        <div>
                            <label className="label font-semibold mb-1.5">Estimate Delivery Time</label>
                            <input {...register("deliveryTime", { required: true })} className="input w-full focus:outline-none" />
                        </div>

                        {/* Chef Experience */}
                        <div>
                            <label className="label font-semibold mb-1.5">Chef Experience</label>
                            <input {...register("chefExperience", { required: true })} className="input w-full focus:outline-none" />
                        </div>

                        <button className="btn bg-primary text-white mt-4">
                            Update Meal
                        </button>

                    </fieldset>
                </form>
            </div>
        </section>
    );
};

export default UpdateMeal;