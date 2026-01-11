import React from 'react';
import { FaCreditCard, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { SiProgress } from 'react-icons/si';

const Working = () => {
    return (
        <section className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Your Meal, Made Simple
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-6 bg-[#f6f4df] rounded-lg shadow-xl">
                    <FaSearch size={35} className="mx-auto text-secondary mb-4" />
                    <h4 className="font-semibold text-xl text-[#4c2d02]">
                        Discover Home-Cooked Meals
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                        Browse daily menus from verified home chefs using a clean and intuitive interface.
                    </p>
                </div>

                <div className="p-6 bg-[#ecebd4] rounded-lg shadow-xl">
                    <FaShoppingCart size={35} className="mx-auto text-secondary mb-4" />
                    <h4 className="font-semibold text-xl text-[#4c2d02]">
                        Place Orders Instantly
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                        Select meals, quantities, and delivery details in just a few clicks.
                    </p>
                </div>

                <div className="p-6 bg-[#f2efd8] rounded-lg shadow-xl">
                    <FaCreditCard size={35} className="mx-auto text-secondary mb-4" />
                    <h4 className="font-semibold text-xl text-[#4c2d02]">
                        Pay Securely Online
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                        Complete payments using Stripe’s secure and reliable payment gateway.
                    </p>
                </div>

                <div className="p-6 bg-[#ece9c7] rounded-lg shadow-xl">
                    <SiProgress size={35} className="mx-auto text-secondary mb-4" />
                    <h4 className="font-semibold text-xl text-[#4c2d02]">
                        Track Orders in Real Time
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                        Follow the entire order journey and receive fresh meals right on time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Working;