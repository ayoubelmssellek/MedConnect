import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('medconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from your backend
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: email.includes('provider') ? 'provider' : 'client',
        isBusinessAccount: email.includes('provider'),
        specialty: email.includes('provider') ? 'General Medicine' : undefined,
        phone: '+1 (555) 123-4567',
        location: 'New York, NY'
      };
      
      setUser(mockUser);
      localStorage.setItem('medconnect_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'client',
        phone: userData.phone
      };
      
      setUser(newUser);
      localStorage.setItem('medconnect_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeToProvider = async (providerData) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Simulate API call for payment processing and account upgrade
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const upgradedUser = {
        ...user,
        role: 'provider',
        isBusinessAccount: true,
        specialty: providerData.specialty,
        location: providerData.location
      };
      
      setUser(upgradedUser);
      localStorage.setItem('medconnect_user', JSON.stringify(upgradedUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medconnect_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      upgradeToProvider,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};