import Arrow from "../../assets/arrow-input.svg";
import Analysis from "../../assets/analysis.svg";

import { useState, useEffect, useRef } from "react";

function InputRadio({
  handleOrderFunction,
  apiFunction,
}: {
  handleOrderFunction: (item: string) => any;
  apiFunction: Function,
}) {
  const list = [
    {
      title: "Más recientes",
      value: "DESC",
    },
    {
      title: "Más antiguos",
      value: "ASC",
    },
  ];

  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [stateOrder, setStateOrder] = useState("Más recientes")

  useEffect(() => {
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

  useEffect(() => {
    if (!stateOrder && list.length > 0) {
      setStateOrder(list[0].title);
    }
  }, [stateOrder]);

  const handleClick = async (title: string, value: string)  => {
    setOpen(false);
    handleOrderFunction(value)
    await apiFunction();
    setStateOrder(title);
  };

  return (
    <div className="relative " ref={inputRef}>
      <div
        onClick={() => setOpen(!open)}
        className="px-4 py-1 border border-main-gray-300 bg-white flex gap-x-1 justify-around items-center rounded-lg cursor-pointer"
      >
        <img src={Analysis} alt="icon" />
        <p className="text-sm text-main-gray-400 font-medium"> {stateOrder} </p>
        <img src={Arrow} alt="icon" />
      </div>
      <div
        className={`absolute z-10 top-10 select-none bg-white px-3 py-2 shadow-md rounded-lg ${
          !open && "hidden"
        }`}
      >
        {list.map((item, index) => (
          <div key={index} className="flex gap-x-2 mb-2">
            <label
              htmlFor={`radio-${index}`}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <input
                onChange={() => handleClick(item.title, item.value)}
                name="orderBy"
                type="radio"
                id={`radio-${index}`}
                className="custom-checkbox"
                checked={stateOrder === item.title}
              />
              <p className="text-main-gray-500 select-none text-sm">
                {item.title}
              </p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputRadio;
