import React from 'react';
import Hero from './Hero';
import Trending from './Trending';
import Reviews from './Reviews';
import WhyUs from './WhyUs';
import Working from './Working';
import UserRoles from './UserRoles';
import Highlights from './Highlights';
import FoodSafety from './FoodSafety';
import Comparison from './Comparison';
import FAQ from './FAQ';
import ReturnTop from '../../Components/ReturnTop';

const Home = () => {
    return (
        <div className='p-3 md:p-7'>

            <title>Home | Chefonex</title>

            <Hero></Hero>
            <Highlights></Highlights>
            <Working></Working>
            <WhyUs></WhyUs>
            <Trending></Trending>
            <Reviews></Reviews>
            <FoodSafety></FoodSafety>
            <Comparison></Comparison>
            <UserRoles></UserRoles>
            <FAQ></FAQ>
            <ReturnTop></ReturnTop>
        </div>
    );
};

export default Home;