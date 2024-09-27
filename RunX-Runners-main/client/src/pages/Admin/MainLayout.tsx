import { apiWithToken } from "@/Elysia"
import React from 'react';
import Sidebar from "./Sidebar"
import CountryThSvg from "@/assets/country_th.svg"
import AvatarTmp from "@/assets/avatar_tmp.svg"
type MainLayoutProps = {
    componentIn: React.ReactNode;
  };
  

const MainLayout: React.FC<MainLayoutProps> = ({ componentIn }) => {
    return (
        <div className="flex flex-wrap flex-row h-[100vh] w-full">
        <Sidebar/>
        <div className="grow h-full">
            <nav className="hidden lg:flex lg:flex-wrap flex-row justify-end items-end space-x-4 w-full navShadowBottom sticky top-0 p-4 pr-6 pl-6">
                <div className="">
                    <img src={CountryThSvg}/>
                </div>
                <div className="">
                    <img src={AvatarTmp}/>
                </div>
            </nav>
            {componentIn}
        </div>
        </div>
    )
}

export default MainLayout