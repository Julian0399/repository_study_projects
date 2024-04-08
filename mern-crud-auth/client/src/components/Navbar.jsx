import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-2 flex justify-between py-5 px-10 rounded-lg">
      <Link to={
        isAuthenticated ? "/tasks" : "/"
      }>
        <h1 className="text-2xl font-bold">Task Manger</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Bienvenido <span className="font-semibold text-gray-400">{user.username}</span></li>
            <li>
              <Link to="/add-tasks"  className="bg-green-400 px-3 py-1 rounded-md text-white">Anadir tareas</Link>
            </li>
            <li>
              <Link
                to="/"
                className="bg-indigo-500 px-3 py-1 rounded-md text-white"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login"  className="bg-indigo-500 px-3 py-1 rounded-md text-white" >Login</Link>
            </li>
            <li>
              <Link to="/register"  className="bg-indigo-500 px-3 py-1 rounded-md text-white">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
