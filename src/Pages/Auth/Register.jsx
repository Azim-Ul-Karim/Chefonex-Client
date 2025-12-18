import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { registerUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const password = useWatch({
        control,
        name: "password",
    });

    const handleRegister = (data) => {
        console.log(data);

        const profileImage = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                const formData = new FormData();
                formData.append('image', profileImage);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL,
                            address: data.address
                        }
                        axiosSecure.post('/users', userInfo)
                            .then((res) => {
                                console.log('User Created.', res);
                            })

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                navigate(location?.state || '/');
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <section className='min-h-screen flex items-center justify-center'>

            <title>Register | Chefonex</title>
            
            <div className='w-full md:w-2/3 lg:w-1/2 mx-auto p-5 md:p-12 rounded-lg my-15 bg-[#f6ebca] shadow-xl'>
                <h2 className='text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center'>Create Your Account</h2>

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
                        <input
                            {...register('photo')}
                            type="file"
                            className="file-input w-full"
                        />

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
                            <Link state={location.state} to="/login" className="text-[#750942] font-semibold">
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