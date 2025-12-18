import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

const slides = [
    {
        id: 1,
        bg: "bg-[#eeedd0]",
        title: "Fresh Home-Cooked Meals",
        subtitle: "Prepared daily by trusted local home chefs",
    },
    {
        id: 2,
        bg: "bg-[#ebe4c8]",
        title: "Healthy, Homemade & Hygienic",
        subtitle: "Real food made with love and care",
    },
    {
        id: 3,
        bg: "bg-[#efecc7]",
        title: "Support Local Home Kitchens",
        subtitle: "Eat good, support local chefs",
    },
];

const Hero = () => {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4500);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[40vh] mt-6 md:mt-2 md:h-[60vh] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[index].id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`absolute inset-0 flex items-center justify-center ${slides[index].bg}`}
                >
                    <div className="text-center px-4 max-w-2xl">
                        {/* Title */}
                        <motion.h1
                            initial={{ y: 35, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                            }}
                            className="text-2xl md:text-4xl font-bold text-[#4c2d02] mb-7"
                        >
                            {slides[index].title}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ y: 25, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1.1,
                                delay: 0.2,
                                ease: "easeOut",
                            }}
                            className="text-gray-700 mb-7 text-base md:text-lg"
                        >
                            {slides[index].subtitle}
                        </motion.p>

                        {/* Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.9,
                                delay: 0.4,
                                ease: "easeOut",
                            }}
                        >
                            <Link
                                to="/meals"
                                className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow-md hover:scale-105 transition"
                            >
                                Explore Meals
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default Hero;