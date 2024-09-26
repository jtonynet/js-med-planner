import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const sigin = async ({ username, password }) => {
    const userData = { email: username, password };

    const response = await axios.post("http://localhost:3000/auth/login", userData);
    setToken(response.data);
    console.log(token)
  }


  return (
    <AuthContext.Provider
      value={{ token, sigin }}
    >
      {children}
    </AuthContext.Provider>
  );
};