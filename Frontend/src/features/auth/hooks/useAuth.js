import {useContext, useEffect} from "react";
import {AuthContext} from "../auth.context.jsx";
import {loginUser, registerUser, logoutUser, getCurrentUser} from "../services/auth.api.jsx";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async ({email, password}) => {
        setLoading(true);
        try {
            const userData = await loginUser({email, password});
            setUser(userData.user);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({username, email, password}) => {
        setLoading(true);
        try {
            const registeredUser = await registerUser({username, email, password});
            setUser(registeredUser.user);
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUser = async () => {
        setLoading(true);
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser.user);
        } catch (error) {
            console.error("Failed to fetch current user:", error);
        } finally {
            setLoading(false);
        }
    };

    

    return {user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout, fetchCurrentUser};
};