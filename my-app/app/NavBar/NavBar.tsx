'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-base-300 shadow-lg p-6 my-2 rounded-full relative z-20 max-w-8xl mt-4 mx-auto w-2/3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <button className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12">
                            <img className="w-full h-full" src="/favicon.ico" alt="Icon" />
                        </button>
                    </Link>
                    <div className="hidden md:flex gap-4">
                        <Link href="/metadata">
                            <span className="btn bg-black text-lg md:text-xl hover:btn-neutral">See Metadata</span>
                        </Link>
                    </div>
                    <div className="relative md:hidden">
                        <button onClick={toggleMenu} className="btn bg-secondary text-sm md:text-lg lg:text-xl hover:btn-neutral border-black border-2 dropdown-toggle">Menu</button>
                        {isOpen && (
                            <ul className="menu dropdown-content z-[1] p-2 shadow bg-primary rounded-box w-52 mt-4 absolute">
                                <li>
                                    <Link href="/Metadata">
                                        <span>Read Metadata</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-6 px-4">
                </div>
            </div>
        </nav>
    );
};

export default NavBar;