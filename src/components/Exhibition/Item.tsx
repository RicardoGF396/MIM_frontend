import IconType from "../../assets/exposiciones_icon.svg";
import CalendarioIcon from "../../assets/calendario.svg";
import SalasIcon from "../../assets/salas.svg";
import PersonasIcon from "../../assets/personas.svg";
import EliminarIcon from "../../assets/eliminar.svg";
import EditarIcon from "../../assets/editar.svg";
import { useEffect, useState } from "react";
import { Exhibition } from "../../models/Exhibition";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Modal } from "antd";

interface ItemProps {
  exhibition: Exhibition; 
  deleteFn: (id: number) => Promise<void>;
  getFn: (id: number) => Promise<void>;
}

function Item({ exhibition, deleteFn, getFn }: ItemProps) {
  const { id, name, description, start_date, end_date, participants, room } =
    exhibition;

  const [textBase, setTextBase] = useState(description);
  const [formatStartDate, setFormatStartDate] = useState("");
  const [formatEndDate, setFormatEndDate] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (description.length > 170) {
      const wrappedText = description.slice(0, 170) + "...";
      setTextBase(wrappedText);
    }
    setFormatStartDate(
      format(new Date(start_date), "dd MMMM yyyy", { locale: es })
    );
    setFormatEndDate(
      format(new Date(end_date), "dd MMMM yyyy", { locale: es })
    );

    const currentDate = new Date(); // Fecha actual
    const exhibitionEndDate = new Date(end_date); // Fecha de finalización de la exposición

    if (exhibitionEndDate > currentDate) {
      setIsShowing(true);
    }
  }, [exhibition]);

  const deleteExhibition = async () => {
    await deleteFn(id!)
    setIsOpenDeleteModal(false);
  }

  const getExhibition = async () => {
    await getFn(id!);
  }

  return (
    <div className="border border-main-gray-300 px-8 py-6 bg-white mb-4 rounded-xl flex justify-between">
      <Modal
        onCancel={() => setIsOpenDeleteModal(false)}
        maskClosable={true}
        footer={null}
        centered
        open={isOpenDeleteModal}
      >
        <div className="p-2">
          <h3 className="font-semibold text-main-gray-900 text-xl ">
            Eliminar registro
          </h3>
          <p>No podrá volver a recuperar el registro eliminado</p>
          <div className="flex items-center gap-x-5 w-full mt-4">
            <button
              onClick={() => setIsOpenDeleteModal(false)}
              className="border flex-1 border-main-gray-300 text-main-gray-900 font-medium px-6 py-2 rounded-lg hover:bg-main-gray-300"
            >
              Cancelar
            </button>
            <button onClick={deleteExhibition} className="text-white flex-1 text-sm bg-[#D6006B] font-medium px-6 py-2 rounded-lg ">
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
      <div>
        <div className="flex gap-x-2 items-center">
          <img className="filter-icon" src={IconType} alt="icon" />
          <p className="font-medium text-main-gray-900">{name}</p>
        </div>
        <p className="w-[600px] text-main-gray-500 mt-2 text-sm ">{textBase}</p>
        <div className="flex gap-x-8 items-center">
          {/* Fecha */}
          <div className="flex items-center gap-x-2 mt-4">
            <img src={CalendarioIcon} alt="calendario" />
            <p className="text-xs text-main-gray-500">
              Desde: {formatStartDate} | Hasta {formatEndDate}
            </p>
          </div>

          {/* Salas */}
          <div className="flex items-center gap-x-2 mt-4">
            <img src={SalasIcon} alt="calendario" />
            <p className="text-xs text-main-gray-500">Sala: {room} </p>
          </div>

          {/* Personas */}
          <div className="flex items-center gap-x-2 mt-4">
            <img src={PersonasIcon} alt="calendario" />
            <p className="text-xs text-main-gray-500">{participants} </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-right">
          {isShowing ? (
            <p className="font-medium bg-[#D6006B]  text-white text-xs py-2 px-4 rounded-lg inline">
              En exposición
            </p>
          ) : (
            <p className="font-medium bg-main-gray-300  text-main-gray-500 text-xs py-2 px-4 rounded-lg inline">
              Exposición anterior
            </p>
          )}
        </div>
        <div className="flex gap-x-4">
          <button
            onClick={() => setIsOpenDeleteModal(true)}
            className="flex items-center gap-1 text-sm text-main-gray-500 px-4 py-1 border border-main-gray-300 rounded-lg hover:bg-main-gray-300"
          >
            <img src={EliminarIcon} /> Eliminar
          </button>

          <button onClick={getExhibition} className="flex items-center gap-1 text-sm text-main-gray-500 px-4 py-1 border border-main-gray-300 rounded-lg hover:bg-main-gray-300">
            <img src={EditarIcon} /> Editar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
