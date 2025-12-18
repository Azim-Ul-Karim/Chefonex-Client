import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import Logo from '../Components/Logo';
import { IoFastFoodOutline, IoStatsChartOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdFormatListBulletedAdd, MdOutlineManageAccounts, MdOutlineRateReview } from 'react-icons/md';
import { GrFavorite } from 'react-icons/gr';
import { VscGitPullRequestGoToChanges, VscHome } from 'react-icons/vsc';
import { PiCookingPotDuotone } from 'react-icons/pi';
import { GiCometSpark } from 'react-icons/gi';
import useRole from '../Hooks/useRole';

const DashboardLayout = () => {

    const { role } = useRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                {/* Navbar */}
                <nav className="navbar w-full bg-[#f0e4ba] sticky top-0 z-50">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <Logo></Logo>
                </nav>

                {/* Page content here */}
                <div className='bg-[#f9f8e6] min-h-screen'>
                    <Outlet></Outlet>
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-[#e5dcbd] is-drawer-close:w-14 is-drawer-open:w-42 pt-14 lg:pt-0">

                    {/* Sidebar content here */}
                    <ul className="menu w-full grow space-y-2">
                        <li>
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost hidden lg:inline-flex">
                                {/* Sidebar toggle icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="translate-y-1 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                        </li>
                        <li>
                            <Link to='/' className="lg:mt-2 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home">
                                <VscHome size={20} />
                                <span className="is-drawer-close:hidden">Home</span>
                            </Link>
                        </li>

                        {
                            role === 'admin' && <>
                                <li>
                                    <NavLink to='/dashboard/manage-users' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
                                        <MdOutlineManageAccounts size={18} />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/manage-requests' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Requests">
                                        <VscGitPullRequestGoToChanges size={18} />
                                        <span className="is-drawer-close:hidden">Manage Requests</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/statistics' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Platform Statistics">
                                        <IoStatsChartOutline size={18} />
                                        <span className="is-drawer-close:hidden">Platform Statistics</span>
                                    </NavLink>
                                </li>
                            </>
                        }

                        {
                            role === 'chef' && <>
                                <li>
                                    <NavLink to='/dashboard/create-meal' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Create Meal">
                                        <GiCometSpark size={18} />
                                        <span className="is-drawer-close:hidden">Create Meal</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/my-meals' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Meals">
                                        <PiCookingPotDuotone size={18} />
                                        <span className="is-drawer-close:hidden">My Meals</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/order-requests' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Order Requests">
                                        <MdFormatListBulletedAdd size={18} />
                                        <span className="is-drawer-close:hidden">Order Requests</span>
                                    </NavLink>
                                </li>
                            </>
                        }

                        <li>
                            <NavLink to='/dashboard/my-orders' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Orders">
                                <IoFastFoodOutline size={18} />
                                <span className="is-drawer-close:hidden">Orders</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/dashboard/my-reviews' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Reviews">
                                <MdOutlineRateReview size={18} />
                                <span className="is-drawer-close:hidden">Reviews</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/dashboard/my-favorites' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Favorites">
                                <GrFavorite size={18} />
                                <span className="is-drawer-close:hidden">Favorites</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/dashboard/my-profile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                                <CgProfile size={18} />
                                <span className="is-drawer-close:hidden">Profile</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;