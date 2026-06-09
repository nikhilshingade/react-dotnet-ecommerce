import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => ({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    email: localStorage.getItem("email"),
  }));

  const login = (data) => {
    localStorage.setItem("token", data.accessToken);

    localStorage.setItem("role", data.role);

    localStorage.setItem("email",data.email);

    setUser({
      token: data.accessToken,
      role: data.role,
      email: data.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    setUser({
      token: null,
      role: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider value={{user,login,logout,}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);