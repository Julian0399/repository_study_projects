import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
// proteccion de rutas
function ProtectedRoute() {
  const {loading,isAuthenticated } = useAuth();
  // si el usuario no esta autenticado se redirige a la pagina de login
  if(loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated){
    return <Navigate to="/login" replace />;
  } 

  return <Outlet />;
}

export default ProtectedRoute;
