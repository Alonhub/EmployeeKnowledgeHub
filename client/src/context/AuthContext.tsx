import { createContext, useContext, useState, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (userData: {
    username: string;
    password: string;
    email: string;
    fullName?: string;
    company?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const isAuthenticated = !!user;
  
  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      const data = await response.json();
      
      setUser(data.user);
      
      // Invalidate any queries that might depend on authentication status
      await queryClient.invalidateQueries();
      
    } catch (error: any) {
      console.error("Login failed:", error);
      throw new Error(error.message || "Login failed");
    }
  };
  
  const register = async (userData: {
    username: string;
    password: string;
    email: string;
    fullName?: string;
    company?: string;
  }) => {
    try {
      const response = await apiRequest("POST", "/api/auth/register", userData);
      const data = await response.json();
      
      setUser(data.user);
      
      // Invalidate any queries that might depend on authentication status
      await queryClient.invalidateQueries();
      
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw new Error(error.message || "Registration failed");
    }
  };
  
  const logout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      
      setUser(null);
      
      // Invalidate any queries that might depend on authentication status
      await queryClient.invalidateQueries();
      
    } catch (error: any) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
