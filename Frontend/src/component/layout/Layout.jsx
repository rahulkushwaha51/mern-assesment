import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../navbar/Navbar'

import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';

const Layout = () => {

    const dispatch = useDispatch();

    const { isAuthenticated, message, error } = useSelector(state => state.user);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' })
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' })
        }

    }, [dispatch, error, message]);

    return (
        <div>
            <Navbar isAuthenticated={isAuthenticated} />
           
            <Toaster />
            <Outlet />

        </div>
    )
}

export default Layout
