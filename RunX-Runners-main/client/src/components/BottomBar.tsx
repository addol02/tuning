import { Mail, Facebook, FacebookIcon } from "lucide-react";

export default function BottomBar() {
    return (
        <nav className={`w-full z-10 bg-black fixed bottom-0`}>
            <div className="w-full text-white py-4">
                <div className="flex flex-wrap justify-center">
                    <div className="w-[78%] text-left">
                    @ 2024 Thaidotrun. All rights reserved.
                    </div>
                    <div className="w-[19%] flex justify-end space-x-2">
                        <Mail/>
                        <FacebookIcon style={{color:'white'}}/>
                    </div>
                </div>
                    
            </div>
        </nav>
    )
}