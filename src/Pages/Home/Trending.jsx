import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Loader';
import MealCard from '../Meals/MealCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Trending = () => {

    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ['daily-meals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/meals?limit=6');
            return res.data;
        }
    });

    const meals = data.meals || [];

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Trending Meals
            </h2>

            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={20}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                loop={meals.length > 4}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
            >
                {
                    meals.map(meal => (
                        <SwiperSlide key={meal._id}>
                            <MealCard meal={meal} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    );
};

export default Trending;