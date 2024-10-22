'use client'
import React from 'react'
import Link from 'next/link'

const NavBar = () => {

    return (
        <nav className="bg-base-300 shadow-lg p-6 my-2 rounded-full relative z-20 max-w-8xl mx-auto w-2/3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <button className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 mt-1">
                            <img className="w-full h-full" src="/favicon.ico" alt="Icon" />
                        </button>
                    </Link>
                    <div className="hidden md:flex gap-4">
                        <Link href="/metadata">
                            <span className="btn bg-black text-lg md:text-xl hover:btn-neutral">See Metadata</span>
                        </Link>
                        <Link href="/convert">
                            <span className="btn bg-black text-lg md:text-xl hover:btn-neutral">Convert to mp3</span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-6 px-4">
                </div>
            </div>
        </nav>
    );
};

export default NavBar;