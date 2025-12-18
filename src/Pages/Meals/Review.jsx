import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { HiCalendarDateRange } from 'react-icons/hi2';

const Review = ({ mealId, mealName }) => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', mealId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${mealId}`);
            return res.data;
        }
    });

    const alreadyReviewed = reviews.find(
        review => review.reviewerEmail === user?.email
    );

    const handleReview = async (data) => {

        if (alreadyReviewed) {
            Swal.fire({
                icon: 'info',
                title: 'Update your previous feedback...',
                timer: 2000,
                showConfirmButton: false
            });
        }

        const reviewData = {
            mealId,
            mealName,
            reviewerName: user.displayName,
            reviewerImage: user.photoURL,
            rating: Number(data.rating),
            comment: data.comment
        };

        const res = await axiosSecure.post('/reviews', reviewData);

        if (res.data.insertedId) {
            Swal.fire({
                icon: 'success',
                title: 'Thank you for your feedback',
                timer: 2000,
                showConfirmButton: false
            });
            reset();
            refetch();
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-lg md:text-xl font-semibold mb-3">Share Your Feedback</h2>

            <form onSubmit={handleSubmit(handleReview)} className="space-y-2 mb-6 text-sm">
                <select
                    {...register('rating', { required: true })}
                    className="select w-full !outline-none !ring-0 !shadow-none"
                >
                    <option value="">Rate this meal</option>
                    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                    <option value="4">⭐⭐⭐⭐ (4)</option>
                    <option value="3">⭐⭐⭐ (3)</option>
                    <option value="2">⭐⭐ (2)</option>
                    <option value="1">⭐ (1)</option>
                </select>

                <textarea
                    {...register('comment', { required: true })}
                    className="textarea textarea-bordered w-full focus:outline-none"
                    placeholder="Write your review..."
                    rows={4}
                />

                <button className="btn bg-primary text-white w-full mt-2">
                    Submit Review
                </button>
            </form>

            <h2 className="text-lg md:text-xl font-semibold mb-3">Reviews</h2>

            {
                reviews.length === 0 && (
                    <p className="text-gray-500">No reviews yet.</p>
                )
            }

            {
                reviews.map(review => (
                    <div key={review._id} className="bg-[#eeedd0] rounded-lg shadow-md overflow-hidden p-3 mb-3 hover:bg-[#e7e0bd]">
                        <div className='flex items-center justify-between'>
                            <div className="flex items-center gap-2 mb-2">
                                <img src={review.reviewerImage} className="w-6 h-6 rounded-full" />
                                <p className="font-semibold">{review.reviewerName}</p>
                            </div>
                            <p>⭐ {review.rating}</p>
                        </div>

                        <p className="text-gray-700 text-sm ml-8 mb-4">{review.comment}</p>

                        <div className='flex items-center gap-1 text-gray-500 text-xs ml-8'>
                            <HiCalendarDateRange size={15} />
                            <p className="">{new Date(review.reviewedAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Review;