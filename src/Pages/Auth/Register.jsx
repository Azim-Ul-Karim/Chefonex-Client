import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';

const Register = () => {

    const { registerUser } = useAuth();
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const password = useWatch({
        control,
        name: "password",
    });

    const handleRegister = (data) => {
        console.log(data);

        registerUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <section className='min-h-screen flex items-center justify-center'>
            <div className='w-full md:w-2/3 lg:w-1/2 mx-auto p-5 md:p-12 rounded-lg my-10 bg-[#f6ebca] shadow-xl'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center'>Create Your Account</h2>

                <form onSubmit={handleSubmit(handleRegister)}>
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

                        {/* Name */}
                        <label className="label font-semibold">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            className="input focus:outline-none w-full"
                            placeholder="Write your name"
                        />
                        {errors.name && (
                            <p className="text-red-500">{errors.name.message}</p>
                        )}

                        {/* Photo Upload */}
                        <label className="label font-semibold">Photo Upload</label>
                        <input type="file" className="file-input" />

                        {/* Address */}
                        <label className="label font-semibold">Address</label>
                        <input
                            {...register("address", { required: "Address is required" })}
                            type="text"
                            className="input focus:outline-none w-full"
                            placeholder="Write your address"
                        />
                        {errors.address && (
                            <p className="text-red-500">{errors.address.message}</p>
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

                        {/* Confirm Password */}
                        <label className="label font-semibold">Confirm Password</label>
                        <input
                            {...register("confirmPassword", {
                                required: "Confirming password is required",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            type="password"
                            className="input focus:outline-none w-full"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500">{errors.confirmPassword.message}</p>
                        )}

                        <p>
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#750942] font-semibold">
                                Login
                            </Link>
                        </p>

                        <button type="submit" className="btn bg-primary text-white font-semibold mt-2">
                            Register
                        </button>
                    </fieldset>
                </form>
            </div>
        </section>
    );
};

export default Register;