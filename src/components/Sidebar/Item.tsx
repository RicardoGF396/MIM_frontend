import React from "react";
import { Link } from "react-router-dom";

function Item({
  icon,
  name,
  link,
  menuState
}: {
  icon: string;
  name: string;
  link: string;
  menuState: boolean;
}) {
  return (
    <div>
      <Link to={link}>
        <div className='flex items-center gap-2'>
          <img src={icon} alt={icon} />
          <p className={`text-main-gray-400 text-normal font-medium w-[160px] ${!menuState && "scale-0"}`} > {name} </p>
        </div>
      </Link>
    </div>
  );
}

export default Item;
