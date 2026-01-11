import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosArrowDropup } from "react-icons/io";
import Logo from "../Components/Logo";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader";

const Navbar = () => {

    const { user, logOutUser, loading } = useAuth();
    const [mobile, setMobile] = useState(false);

    if (loading) {
        return <Loader></Loader>
    }

    const fallbackImage = "https://i.postimg.cc/vHRwqWXs/prop.jpg";

    const handleLogOut = () => {
        logOutUser()
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <nav className="bg-[#f0e4ba] shadow-md sticky top-0 z-50">
            <div className="w-11/12 mx-auto flex items-center justify-between p-2.5 md:hidden">

                <div
                    className="cursor-pointer text-2xl"
                    onClick={() => setMobile(!mobile)}
                >
                    {mobile ? <IoIosArrowDropup /> : <AiOutlineMenuUnfold />}
                </div>

                <Link to='/'><Logo></Logo></Link>

                {
                    user && (
                        <img
                            src={user.photoURL || fallbackImage}
                            className="w-8 h-8 rounded-full border-2 border-[#aa9372] object-cover"
                        />
                    )
                }
            </div>

            <div
                className={`md:hidden flex flex-col gap-2 absolute bg-[#f7f0d6] p-3 rounded-md w-48 left-6 shadow-md 
                ${mobile ? "top-14" : "-top-64"}`}
            >
                <NavLink
                    to="/"
                    className="hover:bg-[#e2d6be] px-2 py-1 rounded-md"
                    onClick={() => setMobile(false)}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/meals"
                    className="hover:bg-[#e2d6be] px-2 py-1 rounded-md"
                    onClick={() => setMobile(false)}
                >
                    Meals
                </NavLink>

                <NavLink
                    to="/about"
                    className="hover:bg-[#e2d6be] px-2 py-1 rounded-md"
                    onClick={() => setMobile(false)}
                >
                    About
                </NavLink>

                {
                    user && (
                        <NavLink
                            to="/dashboard/my-orders"
                            className="hover:bg-[#e2d6be] px-2 py-1 rounded-md"
                            onClick={() => setMobile(false)}
                        >
                            Dashboard
                        </NavLink>
                    )
                }

                {
                    user ? (
                        <button
                            className="text-left hover:bg-[#f4dcdc] px-2 py-1 rounded-md"
                            onClick={() => {
                                handleLogOut();
                                setMobile(false);
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="hover:bg-[#e2d6be] px-2 py-1 rounded-md"
                                onClick={() => setMobile(false)}
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="hover:bg-[#e2d6be] px-2 py-1 rounded-md"
                                onClick={() => setMobile(false)}
                            >
                                Register
                            </NavLink>
                        </>
                    )
                }
            </div>

            <div className="hidden md:flex items-center justify-between w-11/12 mx-auto p-2.5">
                <Link to='/'><Logo></Logo></Link>

                <div className="flex items-center gap-6">
                    <NavLink className="hover:bg-[#e2d6be] px-2 py-1 rounded-md" to="/">
                        Home
                    </NavLink>

                    <NavLink className="hover:bg-[#e2d6be] px-2 py-1 rounded-md" to="/meals">
                        Meals
                    </NavLink>

                    <NavLink className="hover:bg-[#e2d6be] px-2 py-1 rounded-md" to="/about">
                        About
                    </NavLink>

                    {
                        user && (
                            <NavLink
                                className="hover:bg-[#e2d6be] px-2 py-1 rounded-md"
                                to="/dashboard/my-profile"
                            >
                                Dashboard
                            </NavLink>
                        )
                    }
                </div>

                {
                    user ? (
                        <div className="flex items-center gap-4">
                            <img
                                src={user.photoURL || fallbackImage}
                                className="w-10 h-10 rounded-full border-2 border-[#6f5c42] cursor-pointer"
                            />

                            <button className="bg-white px-3 py-1.5 rounded-md shadow font-semibold cursor-pointer" onClick={handleLogOut}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                className="bg-white px-3 py-1.5 rounded-md shadow font-semibold"
                                to="/login"
                            >
                                Login
                            </Link>
                            <Link
                                className="bg-primary text-white px-3 py-1.5 rounded-md shadow font-semibold"
                                to="/register"
                            >
                                Register
                            </Link>
                        </div>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;