import imgLogo from '@/assets/runxicon_white.svg'
import { FileText } from 'lucide-react'
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import SquareChevronSvg from '@/assets/square-chevron-down.svg'

export default function Sidebar() {

    const menuRef = useRef<HTMLDivElement>(null);

    const showMenuBarOnMobile = () => {
        if(menuRef.current) {
            menuRef.current.setAttribute('data-state', menuRef.current.getAttribute('data-state') == 'active' ? 'close' : 'active');
        }
    }
    return (
        <div className="w-full sticky top-0 lg:w-[10%] h-fit lg:h-full p-2 lg:p-4 lg:pt-6 bg-black flex flex-wrap flex-col justify-start items-center">
            <div className="w-full flex flex-wrap justify-between lg:justify-center items-center">
                <img src={imgLogo} className="lg:w-[70%]"/>
                
                <img className="animate-bounce block lg:hidden" src={SquareChevronSvg} onClick={showMenuBarOnMobile}  />
            </div>
            <div data-state="close" ref={menuRef} className="grow hidden data-[state=active]:block lg:block transition-all duration-800 ease-in-out">
                <Link to={"/administrator/dashboard"} className="flex flex-wrap flex-col space-y-2 mt-6 items-center">
                    <FileText fill='white'/>
                    <span className="text-white">จัดการคำขอ<br/>เปลี่ยนข้อมูล</span>
                </Link>
            </div>
        </div>
    )
}