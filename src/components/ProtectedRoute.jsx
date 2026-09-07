import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import SessionLoading from './SessionLoading';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuthStore();

    // === TEMP LOCAL BYPASS START ===
    const localAuthBypass = import.meta.env.VITE_LOCAL_AUTH_BYPASS === "true"
        && import.meta.env.MODE !== "production"
        && window.location.hostname === "localhost";
    if (localAuthBypass) {
        return <Outlet />;
    }
    // === TEMP LOCAL BYPASS END ===

    if (isLoading) {
        return <SessionLoading />;
    }

    // 🚫 The Kick: No valid cookie? Bounce to login.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // ✅ Clear: Let the protected routes render
    return <Outlet />;
};

export default ProtectedRoute;
