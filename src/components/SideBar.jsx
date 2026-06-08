import React, { useState } from 'react';
import { HiMenu, HiOutlineX } from "react-icons/hi";
import {
    Link
} from "react-router";

export default function SideBar({ pathsSidebar }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSideBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleSideBar}
                className="fixed top-4 left-4 z-50 bg-blue-600 text-sm font-semibold text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
                {isOpen ? <HiOutlineX /> : <HiMenu />}
            </button>
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-blue-600 text-white z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="pt-24 px-6">
                    {pathsSidebar.map((path) => (
                        <ul className="space-y-4">
                            <li key={path.id}
                            >
                                <button
                                    onClick={path.onClick}
                                    className={path.className || `px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700`}
                                >
                                    {path.nome}
                                </button>
                            </li>
                        </ul>

                    ))}

                </div>
            </div>
        </>
    )

}