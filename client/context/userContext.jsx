import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export const UserContext = createContext({})


export function UserContextProvider({ children }) {
const navigate = useNavigate();
const [user, setUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);

const token = localStorage.getItem('token');

// Get user data on mount
useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/me', {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data);
          setIsLoggedIn(true);
        } else {
          console.error('Error fetching user data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    // Fetch user data only if user is not available
    if (!user) {
      fetchUserData();
    }
  }, [token, user, setUser]);

// Logs out user
const logout = async() => {
    try {
      const response = await axios.post('/user/logout', null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(null);
        toast.success('Successfully logged out. See you soon!')
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch(error) {
      console.error('Error during logout:', error)
    }
  }


 return (
    <UserContext.Provider value={{isLoggedIn, user, setUser, logout}}>
        {children}
    </UserContext.Provider>
 )
}