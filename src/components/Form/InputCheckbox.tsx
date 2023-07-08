import Arrow from "../../assets/arrow-input.svg";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function InputCheckbox({
  icon,
  title,
  listItems,
  queryItems,
  order,
  operator,
  handleDispatch,
  allDispatch,
  setItems,
  endPoint,
}: {
  icon: string;
  title: string;
  listItems: Array<string>;
  setItems: React.Dispatch<any>;
  endPoint: string;
  queryItems: Array<string>;
  operator?: string;
  order: string;
  handleDispatch: (item: string) => any;
  allDispatch: (item: Array<string>) => any;
}) {
  const API_URL = import.meta.env.VITE_API_SERVICE_URL;

  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set<number>([0]));
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [allSelected, setAllSelected] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Detecta la primera carga del DOM para no ejecutar la petición
    setFirstRender(!firstRender);
    //Si el usuario de clic fuera del cuadro del filtro este se cierra
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  //Permite hacer las peticiones para el filtrado
  const filterItems = async () => {
    const requestBody = {
      itemList: queryItems,
      order: order,
      operator: operator,
    };
    try {
      const response = await axios.post(`${API_URL}${endPoint} `, requestBody);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleClick = (room: string, index: number) => {
    if (index === 0) {
      // Si se hace clic en el primer índice, deseleccionar todas las demás opciones
      setCheckedItems(new Set<number>([0]));
      setIsFirstRender(true);
      setAllSelected(true);
    } else {
      
      // Si se hace clic en otros índices, alternar la selección de la opción correspondiente
      const updatedSelection = new Set<number>(checkedItems);
      if (updatedSelection.has(0)) {
        updatedSelection.delete(0);
      }
      if (updatedSelection.has(index)) {
        updatedSelection.delete(index);
      } else {
        updatedSelection.add(index);
      }
      setCheckedItems(updatedSelection);
      setIsFirstRender(false);
    }
    //Funciones para el cambio de valores en redux
    if (room.includes("Todas") || room.includes("Todos")) {
      allDispatch(listItems);
    } else {
      handleDispatch(room);
    }
  };
  //Revisamos los cambios de estado para ejecutar la petición
  useEffect(() => {
    if (!isFirstRender) {
      filterItems();
    }
    if (allSelected) {
      filterItems();
      setAllSelected(false);
    }
  }, [queryItems, allSelected]);

  return (
    <div className="relative" ref={inputRef}>
      <div
        onClick={() => setOpen(!open)}
        className=" min-w-[200px] px-4 py-1 border border-main-gray-300 bg-white flex justify-around gap-x-1 items-center rounded-lg cursor-pointer"
      >
        <img src={icon} alt="icon" />
        <p className="text-sm text-main-gray-400 font-medium"> {title} </p>
        <img src={Arrow} alt="icon" />
      </div>
      <div
        className={`absolute top-10 select-none bg-white px-3 py-2 shadow-md rounded-lg ${
          !open && "hidden"
        }`}
      >
        {listItems.map((item, index) => (
          <div key={index} className="flex gap-x-2 mb-2">
            <label
              htmlFor={`checkbox-${index}`}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <input
                onChange={() => handleClick(item, index)}
                name="orderBy"
                type="checkbox"
                id={`checkbox-${index}`}
                className="custom-checkbox"
                //Manejador de checked
                checked={checkedItems.has(index)}
              />

              <p className="text-main-gray-500 select-none text-sm">{item}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputCheckbox;
