import React from 'react';
import { FaUsersCog } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { HiOutlineStatusOnline } from 'react-icons/hi';

const Highlights = () => {
    return (
        <section className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Platform Highlights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
                <div className="p-6 shadow-xl rounded-lg bg-[#f2f0da]">
                    <FaUsersCog size={40} className="mx-auto text-secondary mb-4" />
                    <h3 className="font-semibold text-xl text-[#4c2d02]">
                        Role-Based Architecture
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Separate dashboards and permissions for Customers, Chefs, and Admins
                        ensure structured and secure operations.
                    </p>
                </div>

                <div className="p-6 rounded-xl shadow-lg bg-[#ecebd4]">
                    <MdOutlineAdminPanelSettings size={40} className="mx-auto text-secondary mb-4" />
                    <h3 className="font-semibold text-xl text-[#4c2d02]">
                        Centralized Platform Control
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Admins manage users, approve chefs, handle fraud flags, and monitor
                        platform activity from a unified control panel.
                    </p>
                </div>

                <div className="p-6 rounded-xl shadow-lg bg-[#f1efd8]">
                    <HiOutlineStatusOnline size={40} className="mx-auto text-secondary mb-4" />
                    <h3 className="font-semibold text-xl text-[#4c2d02]">
                        Structured Order Lifecycle
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Orders move through controlled states with real-time updates,
                        preventing invalid actions and ensuring consistency.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Highlights;