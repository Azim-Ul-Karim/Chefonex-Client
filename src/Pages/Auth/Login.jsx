import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { logInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        console.log(data);

        logInUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                navigate(location?.state || '/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <section className='min-h-screen flex items-center justify-center'>
            <div className='w-full md:w-2/3 lg:w-1/2 mx-auto p-5 md:p-12 rounded-lg my-15 bg-[#f6ebca] shadow-xl'>
                <h2 className='text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center'>Welcome Again</h2>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset flex flex-col gap-2 text-sm">

                        {/* Email */}
                        <label className="label font-semibold">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            className="input focus:outline-none w-full"
                            placeholder="Write your email address"
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email.message}</p>
                        )}


                        {/* Password */}
                        <label className="label font-semibold">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                                    message:
                                        "Password must contain uppercase, lowercase, number, and special character",
                                },
                            })}
                            type="password"
                            className="input focus:outline-none w-full"
                            placeholder="Write your password"
                        />
                        {errors.password && (
                            <p className="text-red-500">{errors.password.message}</p>
                        )}

                        <div className='flex items-center justify-between'>
                            <p>
                                New to <span className='kelly-slab-regular'>Chefonex</span>?{" "}
                                <Link state={location.state} to="/login" className="text-[#750942] font-semibold">
                                    Register
                                </Link>
                            </p>

                            <Link className='text-[#9e0202]'>
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="btn bg-primary text-white font-semibold mt-2">
                            Login
                        </button>
                    </fieldset>
                </form>
            </div>
        </section>
    );
};

export default Login;