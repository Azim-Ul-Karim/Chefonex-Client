import React from "react";
import { TbShoppingBagCheck } from "react-icons/tb";

const FoodSafety = () => {
    return (
        <section className="mt-10 bg-[#f1efd8] p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Our Food Safety Promise
            </h2>

            <ul className="max-w-3xl mx-auto space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><TbShoppingBagCheck size={18} /> Verified home chefs before approval</li>
                <li className="flex items-center gap-2"><TbShoppingBagCheck size={18} /> Clean kitchen & hygiene guidelines</li>
                <li className="flex items-center gap-2"><TbShoppingBagCheck size={18} /> Fresh ingredients used daily</li>
                <li className="flex items-center gap-2"><TbShoppingBagCheck size={18} /> Safe packaging & delivery process</li>
            </ul>
        </section>
    );
};

export default FoodSafety;