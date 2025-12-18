import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoStar } from 'react-icons/io5';
import { motion } from "motion/react";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Loader';

const Reviews = () => {

    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    const items = reviews.slice(0, 6);
    const track = items.length > 1 ? [...items, ...items] : items;

    return (
        <section className="mt-10 overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Feedbacks About Meals
            </h2>

            {
                items.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">
                        No reviews yet.
                    </p>
                ) : (
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-5"
                            animate={{
                                x: items.length > 1 ? ["0%", "-50%"] : ["0%", "-10%"],
                            }}
                            transition={{
                                duration: items.length > 1 ? 12 : 6,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {
                                track.map((review, index) => (
                                    <div
                                        key={`${review._id}-${index}`}
                                        className="min-w-[320px] bg-[#ece9c7] rounded-lg shadow-lg hover:bg-[#e6dfbd] p-5"
                                    >
                                        <h4 className="font-semibold mb-2">
                                            {review.reviewerName}
                                        </h4>

                                        <div className="flex items-center gap-1 mb-2">
                                            <IoStar size={15} className='text-yellow-500' />
                                            <span>{review.rating}</span>
                                        </div>

                                        <p className="text-gray-600 text-sm line-clamp-1">
                                            “{review.comment}”
                                        </p>
                                    </div>
                                ))
                            }
                        </motion.div>
                    </div>
                )
            }
        </section>
    );
};

export default Reviews;