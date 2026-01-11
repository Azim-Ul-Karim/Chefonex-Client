import React from "react";
import { FaUser, FaUserShield } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";
import { SiCodechef } from "react-icons/si";

const UserRoles = () => {
    return (
        <section className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#4c2d02]">
                Role-Based Experience
            </h2>

            {/* User */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-7 bg-[#f3f1dc] rounded-2xl shadow-lg hover:shadow-xl transition">
                    <FaUser size={32} className="text-secondary mb-5" />
                    <h3 className="font-bold text-xl mb-3 text-[#4c2d02]">
                        Customer
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Discover, order, and enjoy fresh home-cooked meals with a smooth and secure experience.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Browse daily meals & view details</li>
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Place orders with secure Stripe payments</li>
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Manage reviews, favorites & order history</li>
                    </ul>
                </div>

                {/* Chef */}
                <div className="p-7 bg-[#ecebd4] rounded-2xl shadow-lg hover:shadow-xl transition">
                    <SiCodechef size={38} className="text-secondary mb-5" />
                    <h3 className="font-bold text-xl mb-3 text-[#4c2d02]">
                        Chef
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Turn your home kitchen into a business without owning a restaurant.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Create, update & manage meals</li>
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Accept, prepare & deliver orders</li>
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Track performance through dashboard insights</li>
                    </ul>
                </div>

                {/* Admin */}
                <div className="p-7 bg-[#f2efd8] rounded-2xl shadow-lg hover:shadow-xl transition">
                    <FaUserShield size={38} className="text-secondary mb-5" />
                    <h3 className="font-bold text-xl mb-3 text-[#4c2d02]">
                        Admin
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Maintain platform integrity, security, and growth through full system control.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Manage users, chefs & role requests</li>
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Detect and restrict fraudulent activity</li>
                        <li className="flex items-center gap-2"><LuBadgeCheck size={14} /> Monitor platform statistics & insights</li>
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default UserRoles;