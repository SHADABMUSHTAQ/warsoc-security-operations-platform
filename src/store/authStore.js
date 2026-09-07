import { create } from 'zustand';
import apiClient from '../api/apiClient';
import { configureSessionBridge } from '../api/sessionBridge';

const clearSession = (set, redirect = true) => {
    set({
        user: null,
        plan_type: null,
        role: null,
        isAuthenticated: false,
        csrfToken: null,
        isLoading: false,
    });
    if (redirect && window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
};

export const useAuthStore = create((set) => ({
    user: null,
    plan_type: null,
    role: null,
    isAuthenticated: false,
    csrfToken: null,
    isLoading: true,
    clearSession: () => clearSession(set),

    checkAuth: async () => {
        set({ isLoading: true });

        // === TEMP LOCAL BYPASS START ===
        const localAuthBypass = import.meta.env.VITE_LOCAL_AUTH_BYPASS === "true"
            && import.meta.env.MODE !== "production"
            && window.location.hostname === "localhost";
        if (localAuthBypass) {
            set({
                user: { full_name: "Local Test Admin", email: "local@test.invalid" },
                plan_type: "Local Test",
                role: "admin",
                isAuthenticated: true,
                csrfToken: null,
                isLoading: false,
            });
            return true;
        }
        // === TEMP LOCAL BYPASS END ===

        try {
            const response = await apiClient.get('/auth/me');
            set({
                user: response.data.user,
                plan_type: response.data.plan_type,
                role: response.data.role,
                isAuthenticated: true,
                csrfToken: response.data.csrf_token || null,
                isLoading: false,
            });
            return true;
        } catch {
            clearSession(set, false);
            return false;
        }
    },

    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error("Logout request failed, wiping local state anyway", error);
        } finally {
            clearSession(set);
        }
    }
}));

configureSessionBridge({
    getCsrfToken: () => useAuthStore.getState().csrfToken,
    onUnauthorized: () => useAuthStore.getState().clearSession(),
});
