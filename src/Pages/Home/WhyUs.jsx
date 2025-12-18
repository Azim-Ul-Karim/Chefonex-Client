import React from 'react';
import { GrBike } from 'react-icons/gr';
import { MdLocalPizza } from 'react-icons/md';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

const WhyUs = () => {
    return (
        <section className="my-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Why Choose <span className='kelly-slab-regular'>Chefonex</span> ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
                <div className="p-6 shadow-xl rounded-lg flex flex-col items-center space-y-4 bg-[#eeede7]">
                    <MdLocalPizza size={40} className='text-secondary' />
                    <h3 className="font-bold text-xl mb-2 text-[#4c2d02]">
                        Home-Cooked Quality
                    </h3>
                    <p className="text-gray-600">
                        Authentic meals prepared with love and hygiene.
                    </p>
                </div>

                <div className="p-6 shadow-xl rounded-lg flex flex-col items-center space-y-4 bg-[#eaf2cb]">
                    <VscWorkspaceTrusted size={40} className='text-secondary' />
                    <h3 className="font-bold text-xl mb-2 text-[#4c2d02]">
                        Trusted Local Chefs
                    </h3>
                    <p className="text-gray-600">
                        Verified chefs serving fresh food daily.
                    </p>
                </div>

                <div className="p-6 shadow-xl rounded-lg flex flex-col items-center space-y-4 bg-[#f2eacb]">
                    <GrBike size={40} className='text-secondary' />
                    <h3 className="font-bold text-xl mb-2 text-[#4c2d02]">
                        Fast Delivery
                    </h3>
                    <p className="text-gray-600">
                        Hot meals delivered right to your doorstep.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
