import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Meals from "../Pages/Meals/Meals";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import Order from "../Pages/Order/Order";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import Favorites from "../Pages/Dashboard/User/Favorites";
import MealDetails from "../Pages/Meals/MealDetails";
import PaySuccess from "../Pages/Dashboard/Payment/PaySuccess";
import PayCancel from "../Pages/Dashboard/Payment/PayCancel";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageRequests from "../Pages/Dashboard/ManageRequests/ManageRequests";
import Stats from "../Pages/Dashboard/Stats/Stats";
import CreateMeals from "../Pages/Dashboard/CreateMeals/CreateMeals";
import AdminRoute from "./AdminRoute";
import MyMeals from "../Pages/Dashboard/MyMeals/MyMeals";
import OrderRequests from "../Pages/Dashboard/OrderRequests/OrderRequests";
import ChefRoute from "./ChefRoute";
import UpdateMeal from "../Pages/Dashboard/CreateMeals/UpdateMeal";
import Home from "../Pages/Home/Home";
import PathError from "./PathError";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <PathError></PathError>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'meals',
                Component: Meals
            },
            {
                path: 'meals/:id',
                element: (
                    <PrivateRoute>
                        <MealDetails></MealDetails>
                    </PrivateRoute>
                )
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'order/:id',
                element: (
                    <PrivateRoute>
                        <Order></Order>
                    </PrivateRoute>
                )
            }
        ]
    },
    {
        path: 'dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            {
                path: 'my-orders',
                Component: MyOrders
            },
            {
                path: 'payment-success',
                Component: PaySuccess
            },
            {
                path: 'payment-cancelled',
                Component: PayCancel
            },
            {
                path: 'my-reviews',
                Component: MyReviews
            },
            {
                path: 'my-profile',
                Component: MyProfile
            },
            {
                path: 'my-favorites',
                Component: Favorites
            },
            {
                path: 'manage-users',
                element: (
                    <AdminRoute>
                        <ManageUsers></ManageUsers>
                    </AdminRoute>
                )
            },
            {
                path: 'manage-requests',
                element: (
                    <AdminRoute>
                        <ManageRequests></ManageRequests>
                    </AdminRoute>
                )
            },
            {
                path: 'statistics',
                element: (
                    <AdminRoute>
                        <Stats></Stats>
                    </AdminRoute>
                )
            },
            {
                path: 'create-meal',
                element: (
                    <ChefRoute>
                        <CreateMeals></CreateMeals>
                    </ChefRoute>
                )
            },
            {
                path: 'my-meals',
                element: (
                    <ChefRoute>
                        <MyMeals></MyMeals>
                    </ChefRoute>
                )
            },
            {
                path: 'update-meal/:id',
                element: (
                    <ChefRoute>
                        <UpdateMeal></UpdateMeal>
                    </ChefRoute>
                )
            },
            {
                path: 'order-requests',
                element: (
                    <ChefRoute>
                        <OrderRequests></OrderRequests>
                    </ChefRoute>
                )
            }
        ]
    }
])