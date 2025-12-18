import React from 'react';
import Hero from './Hero';
import Trending from './Trending';
import Reviews from './Reviews';
import WhyUs from './WhyUs';

const Home = () => {
    return (
        <div className='p-3 md:p-7'>

            <title>Home | Chefonex</title>
            
            <Hero></Hero>
            <Trending></Trending>
            <Reviews></Reviews>
            <WhyUs></WhyUs>
        </div>
    );
};

export default Home;