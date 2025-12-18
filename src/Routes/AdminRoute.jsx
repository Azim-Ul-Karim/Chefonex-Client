import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loader from '../Components/Loader';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {

    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loader></Loader>
    }

    if (role !== 'admin') {
        return <h2 className='text-center text-3xl h-screen flex items-center justify-center'>Access Denied</h2>
    }

    return children;
};

export default AdminRoute;