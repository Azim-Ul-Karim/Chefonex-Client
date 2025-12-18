import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FiEdit } from 'react-icons/fi';
import { FaRegIdBadge, FaRegTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router';
import { IoPricetagsOutline, IoStar } from 'react-icons/io5';
import { TbCurrencyTaka } from 'react-icons/tb';
import { PiChefHatDuotone } from 'react-icons/pi';
import { RiEBike2Line } from 'react-icons/ri';
import { GiHotMeal } from 'react-icons/gi';

const MealCard = ({ meal }) => {

    const axiosSecure = useAxiosSecure();

    const { mealImage, mealName, chefName, chefId, mealPrice, mealRating, mealIngredients, estimateDeliveryTime } = meal;

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f7552",
            confirmButtonText: "Delete",
            cancelButtonColor: "#d33"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/meals/${meal._id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Meal deleted successfully",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        });
                }
            });
    };

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <div className='bg-[#ece9c7] rounded-lg shadow-lg hover:bg-[#e4dba9] overflow-hidden'>
            <div className='relative'>
                <img src={mealImage} className='w-full h-48 object-cover' />

                <div className='absolute top-2 right-2 bg-white/80 text-sm font-semibold px-2 py-1 rounded-md shadow-md flex items-center gap-1'>
                    <span className='text-yellow-600'>
                        <IoStar size={18} />
                    </span>
                    {mealRating}
                </div>
            </div>

            <div className="p-3.5 space-y-2">
                <h2 className="card-title ">{mealName}</h2>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <PiChefHatDuotone size={18} />
                        <p className='font-semibold text-gray-500'>{chefName}</p>
                    </div>
                    <div className='flex items-center gap-2 text-[#800707]'>
                        <FaRegIdBadge />
                        <p>{chefId}</p>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <IoPricetagsOutline size={18} />
                    <div className='flex items-center gap-1 text-[#03772d]'>
                        <p className='font-semibold'>{mealPrice}</p>
                        <TbCurrencyTaka size={18} />
                    </div>
                </div>

                <div className="flex gap-2 mt-3.5">
                    <GiHotMeal size={22} className='text-[#9f5a06]' />

                    <div className="flex flex-wrap gap-1">
                        {
                            mealIngredients.map((item, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-white text-xs font-medium bg-[#8b7561] rounded-md"
                                >
                                    {capitalize(item)}
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className='flex items-center gap-2'>
                        <RiEBike2Line size={18} />
                        <p>{estimateDeliveryTime}</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <button onClick={handleDelete} className="text-[#9a5656] cursor-pointer">
                            <FaRegTrashCan size={18} />
                        </button>

                        <Link to={`/dashboard/update-meal/${meal._id}`} className="text-[#576706]">
                            <FiEdit size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCard;