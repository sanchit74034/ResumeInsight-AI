import {createContext, useState, useEffect} from 'react';
import {getCurrentUser} from "./services/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      console.log("Fetched user:", response.user);
      setUser(response.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    );  
}