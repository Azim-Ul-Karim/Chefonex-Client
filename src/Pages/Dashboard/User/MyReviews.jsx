import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashCan } from 'react-icons/fa6';
import { HiCalendarDateRange } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';

const MyReviews = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedReview, setSelectedReview] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-reviews');
            return res.data;
        }
    });

    const handleDelete = id => {
        Swal.fire({
            title: "Delete this review?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f7552",
            confirmButtonText: "Sure",
            cancelButtonColor: "#d33"
        })
            .then(async result => {
                if (result.isConfirmed) {
                    await axiosSecure.delete(`/reviews/${id}`);
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: "Review deleted",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
    };

    const handleUpdate = async data => {
        await axiosSecure.patch(`/reviews/${selectedReview._id}`, {
            rating: Number(data.rating),
            comment: data.comment
        });

        refetch();
        document.getElementById('update_modal').close();

        Swal.fire({
            icon: 'success',
            title: 'Review updated successfully',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const openModal = review => {
        setSelectedReview(review);
        reset({
            rating: review.rating,
            comment: review.comment
        });
        document.getElementById('update_modal').showModal();
    };

    return (
        <div className="p-10">

            <title>My Reviews | Chefonex</title>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">My Reviews</h2>

            {
                reviews.length === 0 ? (
                    <p className="text-gray-500 text-lg md:text-xl lg:text-2xl h-screen flex justify-center items-center">
                        No reviews given for meals.
                    </p>
                ) : (
                    <section className='grid md:grid-cols-2 gap-5'>
                        {
                            reviews.map(r => (
                                <div key={r._id} className="bg-[#eeedd0] rounded-lg shadow-md p-4 hover:bg-[#e7e0bd] flex gap-3">
                                    <div>
                                        <h3 className="card-title mb-1.5">{r.mealName}</h3>

                                        <p className='text-sm mt-2'>⭐ {r.rating}</p>

                                        <p className='text-sm mt-2 text-gray-700'>{r.comment}</p>

                                        <div className='flex items-center gap-1 text-gray-500 text-xs mt-4'>
                                            <HiCalendarDateRange size={15} />
                                            <p>{new Date(r.reviewedAt).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 ml-auto justify-center">
                                        <button
                                            className="text-[#576706]"
                                            onClick={() => openModal(r)}
                                        >
                                            <FiEdit size={18} />
                                        </button>

                                        <button
                                            className="text-[#9a5656]"
                                            onClick={() => handleDelete(r._id)}
                                        >
                                            <FaRegTrashCan size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                )
            }

            <dialog id="update_modal" className="modal modal-middle">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg mb-3">Update Review</h3>

                    <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
                        <select
                            {...register('rating', { required: true })}
                            className="select w-full !outline-none !ring-0 !shadow-none"
                        >
                            <option value="5">⭐⭐⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="1">⭐</option>
                        </select>

                        <textarea
                            {...register('comment', { required: true })}
                            className="textarea textarea-bordered w-full focus:outline-none"
                            rows={3}
                        />

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary btn-sm">
                                Update
                            </button>
                            <form method="dialog">
                                <button className="btn btn-sm">Cancel</button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyReviews;