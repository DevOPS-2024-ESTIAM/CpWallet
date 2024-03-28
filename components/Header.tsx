import React from "react";
import Image from "next/image";
import logo from "../public/4651328-middle.png";
import { IoNotificationsCircle } from "react-icons/io5";

const Header: React.FC = () => {
  return (
    <header className="flex flex-row items-center justify-between bg-inherit bg-primary-300 m-4 rounded">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="eSmartLock Logo"
          className="dark:invert"
          width={50}
          height={50}
          priority
          style={{ borderRadius: "50%" }}
        />
      </div>
      <ul className="flex flex-row item-center justify-evenly space-x-5">
        <li className="flex flex-col">
          <IoNotificationsCircle size={35} />
          <span className="absolute inline-flex h-3 w-3 place-self-end">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-50 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-100"></span>
          </span>
        </li>
      </ul>
    </header>
  );
};

export default Header;
