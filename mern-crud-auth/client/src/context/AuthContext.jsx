import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // se crea un estado para guardar el usuario
  const [isAuthenticated, setIsAutenticated] = useState(false); // se crea un estado para saber si el usuario esta autenticado
  const [errors, setError] = useState([]); // se crea un estado para guardar los errores
  const [loading, setLoading] = useState(true); // se crea un estado para saber si se esta cargando algo
  // se crea una funcion para hacer signup
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      // se usa setUser para guardar el usuario en el estado
      setUser(res.data);
      setIsAutenticated(true);
    } catch (error) {
      setError(error.response.data);
    }
  };
  // se crea una funcion para hacer login
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAutenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) setError(error.response.data);
      else setError([error.response.data.message]);
    }
  };
// se crea una funcion para hacer logout
  const logout = () => {
    Cookies.remove("token");
    setIsAutenticated(false);
    setUser(null);
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        // se crea un timer para limpiar el error despues de 5 segundos
        setError([]);
      }, 5000);
      return () => clearTimeout(timer); // se limpia el timer cuando se desmonta el componente
    }
  }, [errors]);
  // se usa useEffect para verificar si hay un token en las cookies
  useEffect(() => {
    async function chekLogin() {
      const cookies = Cookies.get(); // se obtienen las cookies
      if (!cookies.token) {
        setIsAutenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token); // se hace una peticion al servidor para verificar el token
        if (!res.data) {
          setIsAutenticated(false);
          setLoading(false);// si no hay un usuario se cambia el estado de isAuthenticated a false
          setLoading(false);
          return
        }

        setIsAutenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAutenticated(false);
        setLoading(false);
        setUser(null);
      }
    }
    chekLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
