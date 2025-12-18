import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loader from '../../../Components/Loader';
import MealCard from './MealCard';

const MyMeals = () => {

    const axiosSecure = useAxiosSecure();

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['myMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/meals/profile');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loader></Loader>;
    }

    return (
        <div className='p-10'>

            <title>My Meals | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                My Meals
            </h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {
                    meals.map(meal => <MealCard key={meal._id} meal={meal}></MealCard>)
                }
            </div>
        </div>
    );
};

export default MyMeals;