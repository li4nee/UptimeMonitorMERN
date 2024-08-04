import { createContext, useState, useContext } from "react";

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");

  const [token, setToken] = useState(initialToken);

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

const useToken = () => useContext(TokenContext);

export { TokenProvider };
export default useToken;
