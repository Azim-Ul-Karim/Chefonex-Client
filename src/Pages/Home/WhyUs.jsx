import React from 'react';
import { MdLocalPizza } from 'react-icons/md';
import { SiFastlane } from 'react-icons/si';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

const WhyUs = () => {
    return (
        <section className="my-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Why Choose <span className="kelly-slab-regular">Chefonex</span> ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 shadow-lg rounded-xl flex flex-col items-center space-y-4 bg-[#eeede7] hover:shadow-xl transition">
                    <MdLocalPizza size={42} className="text-secondary" />
                    <h3 className="font-semibold text-xl text-[#4c2d02]">
                        Authentic Home-Cooked Quality
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Meals are prepared in real home kitchens with care, hygiene,
                        and personal attention — not mass production.
                    </p>
                </div>

                <div className="p-6 shadow-lg rounded-xl flex flex-col items-center space-y-4 bg-[#eaf2cb] hover:shadow-xl transition">
                    <VscWorkspaceTrusted size={42} className="text-secondary" />
                    <h3 className="font-semibold text-xl text-[#4c2d02]">
                        Empowering Independent Home Chefs
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Chefonex enables talented home chefs to earn sustainably
                        without owning physical restaurants or commercial kitchens.
                    </p>
                </div>

                <div className="p-6 shadow-lg rounded-xl flex flex-col items-center space-y-4 bg-[#f2eacb] hover:shadow-xl transition">
                    <SiFastlane size={42} className="text-secondary" />
                    <h3 className="font-semibold text-xl text-[#4c2d02]">
                        Trust & Everyday Convenience
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Verified chefs, real reviews, secure payments, and smooth
                        delivery make every order simple and reliable.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default WhyUs;