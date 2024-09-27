import bgHeader from '@/assets/bg_home_01.png'
import logo from '@/assets/RUNX-logo_2.png'
import "../App.css";
import { Input } from '@/components/ui/input';
import { LogIn, Search } from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate();

    const searchBarRev = useRef<HTMLInputElement>(null);

    const enterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            navigate(`search/${e.currentTarget.value}`);
        }
    }

    return (
        <>
        <div style={{
            backgroundImage: `url(${bgHeader})`, 
            height:'97vh',
            width:'auto',
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat'
        }} className="overlayimg-black"
        >
            {/* <div className="w-full xs:overlayimg-black lg:overlayimg-black xs:h-[auto] md:h-full" style={{overflow: 'hidden'}}>
                    <img className="w-full" src={bgHeader}/>
                </div> */}
            <div className="absolute top-[30%] w-full mx-auto z-10 flex flex-wrap flex-col items-center xl:mt-24">
                <div className="xs:w-[60%] xl:w-[20%] flex justify-center"><img src={logo} alt=''/></div> 
                <div className="xs:w-[80%] xl:w-[60%] mt-7">
                    {/* <p className="xs:text-[300%] xl:text-[500%] 2xl:text-[1000%] text-white leading-tight font-bold">runX</p> */}
                    <span className="opacity-[0.6] xs:text-[100%] xl:text-[100%] 2xl:text=[150%] text-white">Your running story, perfectly archived. Chart your progress, celebrate your triumphs.</span>
                </div>
                <div className="xs:w-[80%] xl:w-[50%] 2xl:w-[60%] mt-7">
                    <div className="flex flex-row bg-[#F5F5F5] rounded-[3rem]">
                        <div className="flex flex-wrap content-center xs:pl-2 xl:pl-8">
                            <Search className="opacity-[0.6]" />
                        </div>
                        <div className="w-[100%]">
                            <Input ref={searchBarRev} onKeyUp={(e) => enterSearch(e)} type="text" placeholder="Search for runners" className="border-0 xl:placeholder:text-lg 2xl:placeholder:text-xl bg-[#F5F5F5] xs:p-2 xl:p-8 2xl:p-10 rounded-[3rem] 2xl:text-xl" />
                        </div>
                        <div onClick={() => searchBarRev.current?.value ? navigate(`search/${searchBarRev.current?.value}`) : null } className="flex flex-wrap content-center lg:mr-4 cursor-pointer">
                            <button className="rounded-[3rem] h-full lg:h-fit bg-blue-500 p-2 lg:p-4 text-white">Search</button>
                        </div>
                                
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;