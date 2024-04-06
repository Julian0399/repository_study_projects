import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState:{errors},} = useForm();
  const { signup, isAuthenticated, errors: registerErrors} = useAuth();
  // se usa useNavigate para redirigir a otra pagina
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {
        registerErrors.map((error,i) => (
          <div className="bg-red-500 p-2 text-white text-center rounded-md my-2" key={i}>
            {error}
          </div>
        ))
      }
      <h1 className="text-white font-bold text-2xl">Registrate </h1>
      <form onSubmit={onSubmit} className="flex flex-col w-full ">
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Usernanme"
        />
        {
          errors.username && <p className="text-red-500">Username field is required</p>
        }
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {
          errors.email && <p className="text-red-500">Email field is required</p>
        }
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {
          errors.password && <p className="text-red-500">Password field is required</p>
        }
        <button type="submit" className="bg-slate-600 rounded-md py-1">
          Register
        </button>
      </form>
      <p  className='text-xs mt-2 flex justify-between'>
        Ya tienes una cuenta? <Link className='text-indigo-400' to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
}

export default RegisterPage;
