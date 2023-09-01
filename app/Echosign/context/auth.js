import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log('user provider');
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        console.log('got user',userData);
        setUser(userData);
      } catch (error) {
        console.log('Error getting user: ', error);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
