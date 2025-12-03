import { createContext, useState, useEffect, useContext } from 'react';
import { API_URL } from '../config';
import { apiFetch } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (accessToken) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, [accessToken]);

    const loadUser = async () => {
        try {
            const res = await apiFetch(`${API_URL}/auth/user`, {
                headers: {
                    'x-auth-token': accessToken
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.userData || data); // Handle potential response structure difference
                setIsAuthenticated(true);
            } else if (res.status === 401) {
                // Token expired, try to refresh
                await refreshAccessToken();
            } else {
                logout();
            }
        } catch (err) {
            console.error("Load user error", err);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const res = await apiFetch(`${API_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('accessToken', data.accessToken);
                setAccessToken(data.accessToken);
                // Retry loading user with new token
                // We can't call loadUser immediately here because state update is async, 
                // but useEffect will trigger if we just setAccessToken. 
                // However, to be safe and avoid loops, let's just let the next render handle it or call a fetch directly.
                // Actually, since loadUser depends on accessToken state, setting it will trigger useEffect -> loadUser.
                // But we need to be careful about infinite loops.
                // Let's manually fetch user here to confirm it works.
                const userRes = await apiFetch(`${API_URL}/auth/user`, {
                    headers: { 'x-auth-token': data.accessToken }
                });
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData.userData || userData);
                    setIsAuthenticated(true);
                }
            } else {
                logout();
            }
        } catch (err) {
            console.error("Refresh token error", err);
            logout();
        }
    };

    const login = async (email, password) => {
        const res = await apiFetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            return data; // Returns message about OTP sent
        } else {
            throw new Error(data.message || data.msg || 'Login failed');
        }
    };

    const verifyOtp = async (email, otp) => {
        const res = await apiFetch(`${API_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUser(data.user);
            setIsAuthenticated(true);
            return true;
        } else {
            throw new Error(data.message || data.msg || 'OTP verification failed');
        }
    };

    const resendOtp = async (email) => {
        const res = await apiFetch(`${API_URL}/auth/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message || data.msg || 'Failed to resend OTP');
        }
    };

    const forgotPassword = async (email) => {
        const res = await apiFetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message || data.msg || 'Failed to send reset email');
        }
    };

    const resetPassword = async (token, password) => {
        const res = await apiFetch(`${API_URL}/auth/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message || data.msg || 'Failed to reset password');
        }
    };

    const signup = async (email, password, name, contact) => {
        const res = await apiFetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, contact })
        });
        const data = await res.json();
        if (res.ok) {
            return data; // Returns message about verification email
        } else {
            throw new Error(data.message || data.msg || 'Signup failed');
        }
    };

    const verifyEmail = async (token) => {
        const res = await apiFetch(`${API_URL}/auth/verify/${token}`);
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message || data.msg || 'Email verification failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, loading, isAuthenticated, login, signup, logout, verifyOtp, resendOtp, verifyEmail, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
