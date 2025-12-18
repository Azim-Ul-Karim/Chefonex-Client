import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { IoStar } from 'react-icons/io5';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Loader';
import MealCard from '../Meals/MealCard';

const Trending = () => {

    const axiosSecure = useAxiosSecure();

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['daily-meals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/meals?limit=6');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <section className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Trending Meals
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    meals.map(meal => <MealCard key={meal._id} meal={meal}></MealCard>)
                }
            </div>
        </section>
    );
};

export default Trending;