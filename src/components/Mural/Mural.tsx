import { useState } from "react";
import Muro from "../../assets/extramuros_icon.svg";
import PlusIcon from "../../assets/plusIcon.svg";
import TopBar from "../TopBar/TopBar";

function Mural() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <TopBar icon={Muro} title="Extramuros" />
      {/* Filtros y Agregar*/}
      <div className="w-full border-b border-main-gray-300 px-8 h-[90px] py-3">
        <p className="font-medium text-main-gray-900 ">Filtros</p>
        <div className="flex gap-x-4 items-center w-full justify-between">
          <div>
            <button>Btn</button>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-x-2 mr-8 bg-[#3AAE2A] text-white font-medium text-sm px-4 py-2 rounded-lg "
          >
            <img src={PlusIcon} alt="plus-icon" />
            Nueva exposición
          </button>
        </div>
      </div>

      <div
        style={{ height: "calc(100vh - 170px)" }}
        className="bg-[#F6F8FA] overflow-y-scroll w-full  p-4"
      ></div>
    </div>
  );
}

export default Mural;
