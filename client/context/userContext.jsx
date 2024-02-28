import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export const UserContext = createContext({})


export function UserContextProvider({ children }) {
const navigate = useNavigate();
const [user, setUser] = useState(null);

// Get user data on mount
useEffect(() => {
  const token = localStorage.getItem('token');
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    if(!user) {
        axios.get('/user/me', {
        withCredentials: true,
        headers: headers,
      }).then(({data}) => {
            setUser(data)
        })
    }
},[])
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
    <UserContext.Provider value={{user, setUser, logout}}>
        {children}
    </UserContext.Provider>
 )
}