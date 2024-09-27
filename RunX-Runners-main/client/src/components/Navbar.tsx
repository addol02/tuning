import { Button } from "@/components/ui/button"
import imgLogo from '@/assets/RUNX-logo_2.png'
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

import { useEffect, useRef } from "react"


function Navbar () {

    const navigate = useNavigate();


    const isHomePageActive = (useLocation()).pathname === "/" ? "hidden" : "";

    console.log(isHomePageActive)
    const isHomePage = "bg-white navShadowBottom";

    const searchBarRev = useRef<HTMLInputElement>(null);

    const enterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            navigate(`search/${e.currentTarget.value}`);
        }
    }

    
    return (
        //bg-white 
        <nav className={`w-full z-[1000] ${!!isHomePageActive && 'absolute top-0'} ${isHomePageActive} ${isHomePage}`}>
            <div className="mx-auto px-5">
                <div className="relative flex h-16 items-center space-x-2 w-full">
                {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                        Icon when menu is closed.

                        Menu open: "hidden", Menu closed: "block"
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                        Icon when menu is open.

                        Menu open: "block", Menu closed: "hidden"
                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div> */}
                <div className="flex items-center justify-center sm:items-stretch xs:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                        <Link to="/">
                            <img className="h-5 w-16" src={imgLogo} alt="Your Company"/>
                        </Link>
                    </div>
                    {/* <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
                        </div>
                    </div> */}
                </div>

                <div className="flex flex-wrap flex-row w-full py-2 items-center">
                    <div className={`ml-2 xs:w-full md:w-[35%] lg:w-[20%] py-2 ${isHomePageActive} xs:hidden lg:block`}>
                        <div className="flex flex-row bg-[#F5F5F5] rounded-lg">
                            <div className="flex flex-wrap content-center pl-2">
                                <Search className="opacity-[0.6]" />
                            </div>
                            <div className="w-[80%]">
                                <Input ref={searchBarRev} onKeyUp={(e) => enterSearch(e)} type="text" placeholder="Search for runners" className="border-0 placeholder:text-sm bg-[#F5F5F5]" />
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-row items-center px-3 xs:w-full md:w-[40%] lg:w-[40%] xl:w-[47%] text-left space-x-4 font-semibold">
                            <NavLink to="/" className={(
                                { isActive }) => ( 'text-center transition-all duration-700 ' +
                                (isActive ? 'bg-black text-white rounded-md p-1 px-4' : 'opacity-40' ))
                                }>Home</NavLink>
                            <NavLink to="/runners" className={(
                                { isActive }) => ( 'text-center transition-all duration-700 ' +
                                (isActive ? 'bg-black text-white rounded-md p-1 px-4' : 'opacity-40' ))
                                }>Runners</NavLink>
                            <NavLink to="/races" className={(
                                { isActive }) => ( 'text-center transition-all duration-700 ' +
                                (isActive ? 'bg-black text-white rounded-md p-1 px-4' : 'opacity-40' ))
                            }>Races</NavLink>
                    </div>
                    <div className="absolute right-0 flex flex-row flex-wrap items-center sm:pr-0 xs:invisible lg:visible">
                        {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">View notifications</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                        </button> */}
                        <div className="grid grid-cols-2 gap-1">
                            <div>
                                <Button className="" size={"sm"} variant={"signup"}>Sign up</Button>
                            </div>
                            <div>
                                <Link to="profile/1">
                                    <Button className="" size={"sm"} variant={"signin"}>Sign in</Button>
                                </Link>
                            </div>
                        </div>
                        {/* <div className="relative ml-3">
                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                        </div> 
                        </div>*/}
                    </div>
                    </div>
                </div>
            </div>

            {/* <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                </div>
            </div> */}
    </nav>
  )
}

export default Navbar;