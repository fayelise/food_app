import { createContext, useState, useEffect, useContext } from 'react';
import { API_URL } from "../api";
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(!!token);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(()=>{
        if(!token){
            setUser(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        axios.get(`${API_URL}/auth/me`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>{
            setUser(res.data);
            setLoading(false);
        }).catch(err=>{
            setUser(null);
            setLoading(false);
        })
    },[token]);
    const logout = () => {
        setUser(null);
        setToken(null);
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ user, token, setToken, logout, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };