import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ registerF }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const handleActivate = (e) => {
    e.preventDefault();
    registerF();
  };
  const onSubmit = handleSubmit((value) => {
    signin(value);
  });
  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);
  return (
    <div className=" relative w-[28rem] h-[30rem] text-white bg-gray-500 flex flex-col  gap-5 justify-center items-center ">
      {
        error.map((err,index)=>(<div className="absolute top-0 bg-blue-800 w-full flex justify-center items-center h-8" key={index}>{err}</div>))
      }
      <h1 className="absolute top-9 text-center">
        <strong className="text-xl">Iniciar Seción</strong>
        <hr className="w-[15rem]" />
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <label htmlFor="userName">Usuario</label>
          <input
            className="styleInputs text-black"
            type="text"
            id="userName"
            {...register("username", { required: true })}
          />
          {errors.userName && (
            <p className="absolute top-[1rem] text-blue-950">
              UserName is Required
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="passw">Contraseña</label>
          <input
            className="styleInputs text-red-950"
            type="password"
            id="passw"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="absolute top-[16rem] text-blue-950">
              Password is Required
            </p>
          )}
        </div>
        <button
          className="bg-red-900 h-12 rounded-3xl hover:bg-red-950"
          type="submit"
        >
          Ingresar
        </button>
      </form>
      <p>
        ¿No tienes cuenta?{" "}
        <button onClick={handleActivate}>
          <strong>Registrate</strong>
        </button>{" "}
      </p>
    </div>
  );
}

export default Login;
