import Exposicion from "../../assets/exposiciones_icon.svg";
import PlusIcon from "../../assets/plusIcon.svg";
import TopBar from "../TopBar/TopBar";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../../assets/lottie animations/sphere-line-loader.json";
import AddForm from "./AddForm";
import InputRadio from "../Form/InputRadio";
import { handleOrder } from "../../app/slices/ExhibitionSlice";
import { message } from "antd";
import EditForm from "./EditForm";

function Exhibition() {
  //Con el requestBody voy a ir cambiando
  const { rooms, requestBody } = useSelector(
    (state: RootState) => state.exhibition
  );

  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_SERVICE_URL;

  const [exhibitions, setExhibitions] = useState([]);
  //Si se actualiza el estado de exhibition quiere decir que se va a editar algun registro
  const [exhibition, setExhibition] = useState<any>(null);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const handleOrderFn = (order: string) => {
    dispatch(handleOrder(order));
  };

  const getExhibitons = async () => {
    await axios
      .post(`${API_URL}/exhibitions/filter`, requestBody, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setExhibitions(res.data);
      })
      .catch((err) => console.log(err));
  };

  const createExhibition = async (exhibition: any) => {
    await axios
      .post(`${API_URL}/exhibitions/`, exhibition, {
        headers: {
          "access-token": localStorage.getItem("token"),
          "Content-Type": "multipart/for-data"
        },
      })
      .then(async () => {
        message.success("Exhibición añadida exitosamente")
        await getExhibitons()
        setIsOpenCreate(false)
      })
      .catch((error) => console.log("Error: ", error));
  };

  const deleteExhibition = async (id: number) => {
    await axios
      .delete(`${API_URL}/exhibitions/${id}`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then(async () => {
        message.success("Exhibición eliminada exitosamente")
        await getExhibitons()
      })
      .catch((err) => console.log(err));
  }

  const getExhibition = async (id: number) => {
    await axios
      .get(`${API_URL}/exhibitions/${id}`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        setExhibition(res.data);
        setIsOpenEdit(true)
      })
      .catch((err) => console.log(err));
  }

  const editExhibition = async () => {
    
  }


  useEffect(() => {
    getExhibitons();
  }, [requestBody]);

  return (
    <div className="w-full">
      <AddForm
        handleAdd={createExhibition}
        isOpen={isOpenCreate}
        setIsOpen={setIsOpenCreate}
      />
      <EditForm
      editFn={editExhibition}
      exhibition={exhibition}
      isOpen={isOpenEdit}
      setIsOpen={setIsOpenEdit}
      />
      <TopBar icon={Exposicion} title="Exposiciones" />
      {/* Filtros y Agregar*/}
      <div className="w-full border-b border-main-gray-300 px-8 h-[90px] py-3">
        <p className="font-medium text-main-gray-900 mb-1">Filtros</p>
        <div className="flex gap-x-4 items-center w-full justify-between">
          <div>
            <InputRadio
              handleOrderFunction={handleOrderFn}
              apiFunction={getExhibitons}
            />
          </div>
          <button
            onClick={() => setIsOpenCreate(true)}
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
      >
        {exhibitions ? (
          <div>
            {exhibitions.map((exhibition, index) => (
              <Item 
              getFn={getExhibition}
              deleteFn = {deleteExhibition}
              key={index} 
              exhibition={exhibition} />
            ))}
          </div>
        ) : (
          <div className="pt-11">
            <Player
              src={LoadingAnimation}
              autoplay
              loop
              speed={2}
              className="w-[300px] "
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Exhibition;
