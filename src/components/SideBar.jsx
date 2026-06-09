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
                className="fixed top-4 left-4 z-50 flex items-center justify-center w-11 h-11 bg-blue-600 text-white rounded-xl shadow-sm border border-blue-500 hover:bg-blue-700 transition-colors cursor-pointer"
            >
                {isOpen ? <HiOutlineX size={24} /> : <HiMenu size={24} />}
            </button>

            <div
                className={`fixed top-0 left-0 h-screen w-72 bg-white text-gray-800 z-40 transform transition-transform duration-300 ease-in-out shadow-xl border-r border-gray-100 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="pt-24 px-6">

                    <h2 className="text-2xl font-extrabold text-blue-700 mb-2">
                        Prefeitura Mais
                    </h2>

                    <p className="text-sm text-gray-500 mb-8">
                        Menu de navegação
                    </p>

                    <div className="space-y-3">
                        {pathsSidebar.map((path) => (
                            <ul className="space-y-3">
                                <li key={path.id}>
                                    <button
                                        onClick={path.onClick}
                                        className={path.className || `w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-100 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer`}
                                    >
                                        {path.nome}
                                    </button>
                                </li>
                            </ul>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}