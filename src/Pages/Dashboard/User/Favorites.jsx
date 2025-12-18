import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Favorites = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get('/favorites')
                .then(res => {
                    setFavorites(res.data)
                });
        }
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Remove from favorites?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f7552",
            confirmButtonText: "Sure",
            cancelButtonColor: "#d33"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/favorites/${id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                setFavorites(prev => prev.filter(item => item._id !== id));
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Removed from favorites",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        });
                }
            });
    };

    return (
        <div className='p-10'>

            <title>My Favorites | Chefonex</title>
            
            <h2 className="text-[#4c2d02] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
                Favorite Meals
            </h2>

            {
                favorites.length === 0 ? (
                    <p className="text-gray-500 text-lg md:text-xl lg:text-2xl h-screen flex justify-center items-center">
                        No favorite meals added yet.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="text-center font-semibold bg-[#ededc8] text-[#52057b]">
                                <tr>
                                    <th>#</th>
                                    <th>Meal Name</th>
                                    <th>Chef Name</th>
                                    <th>Price</th>
                                    <th>Date Added</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    favorites.map((fav, index) => (
                                        <tr key={fav._id} className="hover:bg-[#f4f6d4] text-center">
                                            <td>{index + 1}</td>
                                            <td>{fav.mealName}</td>
                                            <td>{fav.chefName}</td>
                                            <td>{fav.price}</td>
                                            <td>{new Date(fav.addedTime).toLocaleDateString()}</td>
                                            <td>
                                                <button onClick={() => handleDelete(fav._id)} className="btn btn-sm bg-[#985959] text-white">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
};

export default Favorites;