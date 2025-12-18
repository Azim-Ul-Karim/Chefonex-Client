import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Loader';

const CreateMeals = () => {

    const axiosSecure = useAxiosSecure();

    const { data: user = {}, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/profile');
            return res.data;
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleCreate = (data) => {

        const imageFile = data.mealImage[0];

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        const formData = new FormData();
        formData.append('image', imageFile);

        axios.post(image_API_URL, formData)
            .then(res => {
                const imageURL = res.data.data.url;

                const mealInfo = {
                    mealName: data.mealName,
                    mealImage: imageURL,
                    mealIngredients: data.ingredients.split(',').map(i => i.trim()),
                    mealDescription: data.description,
                    mealPrice: parseFloat(data.price),
                    mealRating: 0,
                    deliveryArea: 'Rajshahi City',
                    estimateDeliveryTime: data.deliveryTime,
                    chefName: user?.displayName,
                    chefId: user?.chefId,
                    userEmail: user?.email,
                    chefExperience: data.chefExperience,
                    postedAt: new Date()
                };

                axiosSecure.post('/meals', mealInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Meal Created Successfully",
                                showConfirmButton: false,
                                timer: 2000
                            });
                            reset();
                        }
                    });
            });
    };

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <section className='flex items-center justify-center min-h-screen'>

            <title>Create Meal | Chefonex</title>
            
            <div className="w-full md:w-2/3 lg:w-1/2 mx-auto p-10">
                <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                    Create Meal
                </h2>

                <form onSubmit={handleSubmit(handleCreate)}>
                    <fieldset className="fieldset flex flex-col gap-3 text-sm">

                        {/* Meal Name */}
                        <div>
                            <label className="label font-semibold mb-1.5">Meal Name</label>
                            <input
                                {...register("mealName", { required: "Meal name is required" })}
                                className="input w-full focus:outline-none"
                                placeholder="Meal Name"
                            />
                            {errors.mealName && <p className="text-red-500">{errors.mealName.message}</p>}
                        </div>

                        {/* Image */}
                        <div>
                            <label className="label font-semibold mb-1.5">Meal Image</label>
                            <input
                                {...register("mealImage", { required: "Image is required" })}
                                type="file"
                                className="file-input w-full focus:outline-none"
                            />
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label className="label font-semibold mb-1.5">Ingredients</label>
                            <textarea
                                {...register("ingredients", { required: true })}
                                className="textarea w-full focus:outline-none"
                                placeholder="Chicken, Lettuce, Tomato"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="label font-semibold mb-1.5">Description</label>
                            <textarea
                                {...register("description", { required: true })}
                                className="textarea w-full focus:outline-none"
                                placeholder="Write a brief description about the meal..."
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="label font-semibold mb-1.5">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: "Price is required" })}
                                className="input w-full focus:outline-none"
                                placeholder="Price"
                            />
                        </div>

                        {/* Delivery Time */}
                        <div>
                            <label className="label font-semibold mb-1.5">Estimate Delivery Time</label>
                            <input
                                {...register("deliveryTime", { required: true })}
                                className="input w-full focus:outline-none"
                                placeholder="30 minutes"
                            />
                        </div>

                        {/* Chef Experience */}
                        <div>
                            <label className="label font-semibold mb-1.5">Chef Experience</label>
                            <input
                                {...register("chefExperience", { required: true })}
                                className="input w-full focus:outline-none"
                                placeholder="5 years"
                            />
                        </div>

                        <button className="btn bg-primary text-white mt-4">
                            Post
                        </button>
                    </fieldset>
                </form>
            </div>
        </section>
    );
};

export default CreateMeals;