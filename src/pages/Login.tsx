import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Minotaruo from "../assets/Minotauro.png";
import MIM from "../assets/MIM_Isotipo.svg";

function Login() {
  /* Declaramos la variable de entorno que se encuentra en .env */
  const API_URL = import.meta.env.VITE_API_SERVICE_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/login`, user)
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid grid-cols-5 items-center w-full h-screen">
      <div className="col-span-5 lg:col-span-2">
        <div className="flex flex-col items-center">
          <img src={MIM} alt="Logo MIM" />
          <h2 className="mt-4 text-main-gray-900 font-semibold text-3xl ">
            Iniciar sesión
          </h2>
          <p className="text-main-gray-500">Ingresa tu usuario y contraseña</p>
          <form onSubmit={handleSubmit} className="flex flex-col px-4">
            <p className="text-red-500 mt-10"> {error} </p>
            <label className="text-main-gray-900 font-medium mb-1 text-sm mt-2">
              Usuario
            </label>
            <input
              className="border-[1px] pl-4 outline-none border-main-gray-300 max-w-[320px] h-[48px] rounded-xl"
              placeholder="Escrite tu usuario aquí..."
              type="text"
              name="username"
              required
              onChange={handleInput}
            />
            <label className="text-main-gray-900 font-medium mb-1 text-sm mt-6">Contraseña</label>
            <input
              className="border-[1px] pl-4 outline-none border-main-gray-300 w-[320px] h-[48px] rounded-xl"
              type="password"
              placeholder="Escrite tu contraseña aquí..."
              name="password"
              required
              onChange={handleInput}
            />
            <a href="#" className="underline outline-none cursor-pointer font-medium text-end text-xs mt-2">¿Olvidaste tu contraseña?</a>
            <button className="w-[320px] mt-6 bg-[#D6006B] text-white font-medium rounded-xl py-3 cursor-pointer outline-none hover:bg-[#AC0056] ">Iniciar sesión</button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-3">
        <div className="bg-[#F9F9FB] h-screen relative py-24 px-14">
          <h3 className="text-main-gray-900 font-medium text-2xl">Como seres finitos, estamos en tradiciones, independientemente si las conocemos o no, de si somos conscientes de ellas o no.</h3>
          <p className="mt-4">- H. G. Gadamer.</p>
          <img className="w-[600px] absolute bottom-0 right-8" src={Minotaruo} alt="minotauro" />
        </div>
      </div>
    </div>
  );
}

export default Login;
