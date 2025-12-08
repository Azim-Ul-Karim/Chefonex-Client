import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/meals',
                Component: Meals
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            }
        ]
    }
])