import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: true,

            login: (userData) => {
                localStorage.setItem('token', userData.token);
                set({ user: userData.user, isAuthenticated: true });
            },

            logout: async () => {
                try {
                    await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/logout`, {
                        method: 'POST',
                        credentials: 'include'
                    });
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    localStorage.removeItem('token');
                    set({ user: null, isAuthenticated: false });
                }
            },

            checkAuth: async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        set({ isLoading: false });
                        return;
                    }

                    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                        credentials: 'include'
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        set({ user: userData.user, isAuthenticated: true, isLoading: false });
                    } else {
                        localStorage.removeItem('token');
                        set({ user: null, isAuthenticated: false, isLoading: false });
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    localStorage.removeItem('token');
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            },

            setLoading: (isLoading) => set({ isLoading })
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage), // or localStorage
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);

export default useAuthStore;
