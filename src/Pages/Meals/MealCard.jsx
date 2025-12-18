import React from 'react';
import { FaHeart, FaRegIdBadge } from 'react-icons/fa';
import { IoPricetagsOutline, IoStar } from 'react-icons/io5';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { PiChefHatDuotone } from 'react-icons/pi';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MealCard = ({ meal }) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { _id, mealName, mealPrice, mealRating, mealImage, chefName, chefId, deliveryArea } = meal;

    const handleAddFavorite = () => {
        if (!user) {
            return navigate('/login');
        }

        const favoriteData = {
            userEmail: user.email,
            mealId: _id,
            mealName,
            chefId,
            chefName,
            price: mealPrice,
            addedTime: new Date().toISOString()
        };

        axiosSecure.post('/favorites', favoriteData)
            .then(res => {
                if (res.data.inserted) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Added to Favorites",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "info",
                        title: "Already in Favorites",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
    }

    return (
        <div className='bg-[#ece9c7] rounded-lg shadow-lg overflow-hidden hover:bg-[#e4dba9]'>
            <div className='relative'>
                <img src={mealImage} className='w-full h-48 md:h-42 object-cover' />

                <div className='absolute top-2 left-2 bg-white/80 text-sm font-semibold px-2 py-1 rounded-md shadow-md flex items-center gap-1'>
                    <span className='text-yellow-600'>
                        <IoStar size={18} />
                    </span>
                    {mealRating}
                </div>

                <button
                    onClick={handleAddFavorite}
                    className='absolute top-2 right-2 bg-white/80 text-red-500 p-1.5 rounded-full hover:scale-110 transition cursor-pointer shadow-md'
                    title='Add to Favorites'
                >
                    <FaHeart />
                </button>
            </div>

            <div className='p-3 space-y-2'>
                <h3 className='font-semibold md:text-lg'>{mealName}</h3>

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

                <div className='flex items-center gap-2'>
                    <MdOutlineDeliveryDining size={18} />
                    <p>@ {deliveryArea}</p>
                </div>

                <Link to={`/meals/${_id}`} className='btn bg-primary text-white font-semibold w-full mt-3'>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default MealCard;