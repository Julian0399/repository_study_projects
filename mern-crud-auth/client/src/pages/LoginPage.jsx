import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function LoginPage() {
  const { register, handleSubmit, formState:{errors},} = useForm();
  const {signin,errors : signinErrors, isAuthenticated} = useAuth()
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data ) =>{
    signin(data)

  })
  // se valida si el usuario esta autenticado
  useEffect(() => {
    if(isAuthenticated) navigate("/tasks")
  },[isAuthenticated])

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {
        signinErrors.map((error,i) => (
          <div className="bg-red-500 p-2 text-white text-center rounded-md my-2" key={i}>
            {error}
          </div>
        ))
      }
        <h1 className="text-white font-bold text-2xl">Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col ">
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500">Email field is required</p>
        )}
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">Password field is required</p>
        )}
        <button type="submit" className="bg-slate-600 rounded-md py-1">
          Login
        </button>
      </form>
      <p  className='text-xs mt-2 flex justify-between'>
        No tienes una cuenta? <Link className='text-indigo-400' to="/register">Registrate</Link>
      </p>
      </div>
    </div>
  );
}

export default LoginPage;
