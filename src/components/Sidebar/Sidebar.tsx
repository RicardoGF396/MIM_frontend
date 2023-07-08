import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import MIM_Logo from "../../assets/MIM_Isotipo.svg";
import MIM from "../../assets/mim.svg";
import Exposiciones from "../../assets/exposiciones_icon.svg";
import Extramuros from "../../assets/extramuros_icon.svg";
import Jardines from "../../assets/jardines_icon.svg";
import Esculturas from "../../assets/esculturas_icon.svg";
import Signout from "../../assets/signout_icon.svg";
import ToogleMenu from "../../assets/arrow-toggle.svg";
import Item from "./Item";

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const API_URL = import.meta.env.VITE_API_SERVICE_URL;
  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    localStorage.removeItem("token");
    axios
      .post(`${API_URL}/logout`)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log("Error: " + err));
  };

  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`h-screen duration-300 relative border-r border-main-gray-300 pl-5 pt-12 flex flex-col justify-between pb-10 ${
        open ? "w-56" : "w-16"
      }`}
    >
      <div>
        <div className="flex items-center gap-2">
          <img
            className={`absolute cursor-pointer duration-300 top-2 right-2 w-10 ${
              !open ? "rotate-180" : ""
            }`}
            src={ToogleMenu}
            alt="toggle-menu"
            onClick={handleMenu}
          />
          <img className={`w-[40px] duration-300 ${!open && "w-[30px]" } `} src={MIM_Logo} alt="mim logo svg" />
          <img className={`${!open && "scale-0"}`} src={MIM} alt="mim" />
        </div>
        <ul className="flex flex-col gap-y-6 mt-10">
          <li>
            <Item
              name="Exposiciones"
              icon={Exposiciones}
              link=""
              menuState={open}
            />
          </li>
          <li>
            <Item
              name="Extramuros"
              icon={Extramuros}
              link="extramuros"
              menuState={open}
            />
          </li>
          <li>
            <Item
              name="Jardines"
              icon={Jardines}
              link="jardines"
              menuState={open}
            />
          </li>
          <li>
            <Item
              name="Emplazamientos escultóricos"
              icon={Esculturas}
              link="esculturas"
              menuState={open}
            />
          </li>
        </ul>
      </div>
      <div onClick={handleLogout} className='flex cursor-pointer items-center gap-2'>
          <img src={Signout} alt={Signout} />
          <p className={`text-main-gray-400  text-normal font-medium w-[160px] ${!open && "scale-0"}`} > Cerrar sesión </p>
        </div>
    </div>
  );
}

export default Sidebar;
