import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader';
import MealCard from './MealCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ReturnTop from '../../Components/ReturnTop';

const ITEMS_PER_PAGE = 10;

const Meals = () => {

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [page, setPage] = useState(1);

    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["meals", search, sortOrder, page],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/meals?search=${search}&sort=${sortOrder}&page=${page}&limit=${ITEMS_PER_PAGE}`
            );
            return res.data;
        },
        keepPreviousData: true
    });

    const meals = data?.meals || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value.trim());
        setPage(1);
    };

    const handleSort = (e) => {
        setSortOrder(e.target.value);
        setPage(1);
    };

    return (
        <div className="p-4 my-10">

            <title>Meals | Chefonex</title>

            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">
                Explore Meals
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-3">

                {/* Search */}
                <form onSubmit={handleSearch} className="join flex justify-center">
                    <div>
                        <input type='text' name='search' className="input focus:outline-none join-item w-60 md:w-80 lg:w-xl" placeholder="Search meals..." />
                    </div>
                    <div>
                        <button className="btn bg-primary text-white join-item">Search</button>
                    </div>
                </form>

                {/* Sort */}
                <fieldset className="fieldset">
                    <select value={sortOrder} onChange={handleSort} className="select w-78 md:w-32 !outline-none !ring-0 !shadow-none">
                        <option disabled value="">Sort By: Price</option>
                        <option value="asc">Low → High</option>
                        <option value="desc">High → Low</option>
                    </select>
                </fieldset>
            </div>

            {
                isLoading && <Loader></Loader>
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10 p-4">
                {
                    meals.map(meal => (
                        <MealCard key={meal._id} meal={meal}></MealCard>
                    ))
                }
            </div>

            {
                totalPages > 1 && (
                    <div className="flex justify-center mt-10 gap-2 flex-wrap">
                        {[...Array(totalPages).keys()].map(num => (
                            <button
                                key={num}
                                onClick={() => setPage(num + 1)}
                                disabled={page === num + 1}
                                className={`btn btn-sm ${page === num + 1
                                    ? 'bg-primary text-white'
                                    : 'btn-outline'
                                    }`}
                            >
                                {num + 1}
                            </button>
                        ))}
                    </div>
                )
            }

            <ReturnTop></ReturnTop>
        </div>
    );
};

export default Meals;