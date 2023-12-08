import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spinner } from "reactstrap";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const unSubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setUser({ displayName, email, photoURL, uid });
        setIsLoading(false);
        navigate("/");
      } else {
        navigate("/login");
      }
    });
    setUser({});
    setIsLoading(false);
    //clean func
    return () => {
      unSubscribed();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spinner color="info" /> : children}
    </AuthContext.Provider>
  );
}
