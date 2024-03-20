"use client";
import Image from "next/image";
import React from "react";
import View1 from "./view1";
import logo from "../public/4651328-middle.png";
import { IoNotificationsCircle } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";

export default function Parc(props: { contentId: number }) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const menu = [
    {
      name: "Wallet",
      icon: <IoWallet />,
      index: 1,
    },
  ];
  return (
    <div className="flex bg-primary-50 h-screen">
      <aside className=" flex flex-col w-auto text-primary-50 gap-y-4">
        <div className="flex flex-row items-center h-fit p-4 gap-x-2 bg-primary-100">
          <span>
            <Image
              src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
              alt="user avatar"
              width={60}
              height={60}
              priority
            />
          </span>
          <p className="basis-2/4 text-primary-300 hidden md:flex">
            <code>username</code>
          </p>
        </div>
        <div>
          <menu type="toolbar" className="text-primary-300 ml-6">
            <ol className="flex flex-col">
              {menu.map((item) => (
                <li key={item.index}>
                  <div
                    className={
                      selectedIndex === item.index
                        ? "rounded-ee-full h-2 shadow-t"
                        : "hidden"
                    }
                  />
                  <button
                    className={`flex items-center gap-x-4 rounded-s 
              ${
                selectedIndex === item.index
                  ? "text-secondary-50 bg-primary-300 w-11/12  p-2 mx-4"
                  : "hover:bg-secondary-50 w-full  p-2"
              }`}
                    onClick={() => setSelectedIndex(item.index)}
                  >
                    {item.icon}
                    <p className=" hidden md:flex">{item.name}</p>
                  </button>
                  <div
                    className={
                      selectedIndex === item.index
                        ? "rounded-se-full h-2 shadow-t"
                        : "hidden"
                    }
                  />
                </li>
              ))}
            </ol>
          </menu>
        </div>
      </aside>
      <main className="flex flex-col w-11/12  bg-primary-300 rounded-3xl m-3 ml-0">
        <header className="flex flex-row items-center justify-between bg-inherit bg-primary-400 m-4">
          <span>
            <Image
              src={logo}
              alt="eSmartLock Logo"
              className="dark:invert"
              width={50}
              height={50}
              priority
              style={{ borderRadius: "50%" }}
            />
          </span>
          <ul className="flex flex-row item-center justify-evenly space-x-5">
            <li>search</li>
            <li>langue</li>
            <li className="flex flex-col">
              <IoNotificationsCircle size={35} />
              <span className="absolute inline-flex h-3 w-3 place-self-end">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-50 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-100"></span>
              </span>
            </li>
          </ul>
        </header>
        <nav className="flex flex-col items-center justify-center overflow-auto">
          {selectedIndex === 1 && <View1 />}
         
        </nav>
      </main>
    </div>
  );
}
