import React from 'react';
import Logo from '../Components/Logo';
import { Link } from 'react-router';
import { MdCall, MdLocalFireDepartment, MdOutlineMail } from 'react-icons/md';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { CiYoutube } from 'react-icons/ci';

const Footer = () => {
    return (
        <footer className="bg-[#e5dcbd]">
            <div className="w-11/12 mx-auto py-10">
                <div className="flex justify-center mb-8 scale-150">
                    <Logo />
                </div>

                <div className="grid md:grid-cols-3 gap-10 text-center">
                    <div>
                        <h3 className="font-semibold text-xl mb-3">Contact Details</h3>
                        <div className='flex items-center justify-center gap-2'>
                            <MdOutlineMail />
                            <p>chefonex@gmail.com</p>
                        </div>

                        <div className='flex items-center justify-center gap-2'>
                            <MdCall />
                            <p>+8801XXXXXXXXX</p>
                        </div>

                        <div className='flex items-center justify-center gap-2'>
                            <MdLocalFireDepartment />
                            <p>Rajshahi, Bangladesh</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl mb-3">Social Media</h3>
                        <div className="flex gap-5 items-center justify-center pt-3">
                            <Link to='https://www.facebook.com/'><FaFacebookF /></Link>
                            <Link to='https://www.youtube.com/'><CiYoutube /></Link>
                            <Link to='https://www.instagram.com/'><FaInstagram /></Link>
                            <Link to='https://www.instagram.com/'><FaTiktok /></Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl">Working Hours</h3>

                        <p className="mt-3 font-medium">Saturday – Thursday:</p>
                        <p>11:30 AM – 10:30 PM</p>
                        <p className="mt-2 font-medium">Friday:</p>
                        <p>2:00 PM – 10:30 PM</p>
                    </div>
                </div>

                <div className="text-center mt-5 border-t pt-5 border-gray-400">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} <span className='kelly-slab-regular font-extrabold'>Chefonex</span> — All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
