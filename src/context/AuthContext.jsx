import { createContext, useContext, useEffect, useState } from "react";
import { AddAuth, userObserver } from "../helpers/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useLoginContext = () => {
  return useContext(AuthContext);
};
