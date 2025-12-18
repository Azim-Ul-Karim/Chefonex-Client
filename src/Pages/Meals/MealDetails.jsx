import React from 'react';
import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader';
import { PiChefHatDuotone } from 'react-icons/pi';
import { FaRegIdBadge } from 'react-icons/fa';
import { IoPricetagsOutline, IoStar } from 'react-icons/io5';
import { TbCurrencyTaka } from 'react-icons/tb';
import { GrUserExpert } from 'react-icons/gr';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Review from './Review';

const MealDetails = () => {

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    }
  });

  {
    isLoading && <Loader></Loader>
  }

  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const { mealName, mealPrice, mealImage, mealRating, mealDescription, mealIngredients, estimateDeliveryTime, deliveryArea, chefName, chefId, chefExperience } = meal;

  return (
    <div className='my-12 p-4 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3'>
      <img src={mealImage} className="w-11/12 mx-auto h-70 md:h-85 lg:h-110 object-cover rounded-md" />

      <div>
        <h1 className='text-[#4c2d02] text-xl md:text-2xl lg:text-3xl font-bold mb-1.5'>{mealName}</h1>
        <div className='flex items-center gap-2 mb-4 font-semibold'>
          <span className='text-yellow-600'>
            <IoStar size={18} />
          </span>
          {mealRating}
        </div>

        <p className="text-gray-600 mb-4">{mealDescription}</p>

        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Ingredients</h2>
          <ul className="list-disc ml-8 mt-2 text-gray-600">
            {mealIngredients?.map((ing, i) => (
              <li key={i}>{capitalize(ing)}</li>
            ))}
          </ul>
        </div>

        <div className='mb-4 space-y-1'>
          <div className='flex items-center gap-2 text-[#800707]'>
            <FaRegIdBadge />
            <p>{chefId}</p>
          </div>

          <div className='flex items-center gap-2'>
            <PiChefHatDuotone />
            <p className='font-semibold text-gray-500'>{chefName}</p>
          </div>

          <div className='flex items-center gap-2'>
            <GrUserExpert />
            <p className='text-gray-600'>{chefExperience} experience</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <IoPricetagsOutline size={18} />
          <div className='flex items-center gap-1 text-[#038232] text-lg'>
            <p className='font-semibold'>{mealPrice}</p>
            <TbCurrencyTaka size={18} />
          </div>
        </div>

        <div className='text-gray-600 mt-4 mb-6 space-y-1'>
          <p><strong>Delivery Area:</strong> {deliveryArea}</p>
          <p><strong>Delivery Time:</strong> {estimateDeliveryTime}</p>
        </div>

        <Link to={`/order/${id}`} className="btn bg-primary text-white font-semibold">
          Order Now
        </Link>

        <Review mealId={id} mealName={mealName}></Review>
      </div>
    </div>
  );
};

export default MealDetails;