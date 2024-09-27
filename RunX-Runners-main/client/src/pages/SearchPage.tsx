import { Skeleton } from "@/components/ui/skeleton";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RunnerType } from "./Profile";


import "../App.css";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Avatar7 from "@/assets/avatar-profile.png"
import RequestChangeModal from "@/components/RequestChangeModal.tsx";
import { api } from "@/Elysia.ts";

function SearchPage() {

    const { txt } = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [profileData,setProfileData] = useState<RunnerType[]>();


    const getSearchRunners = async () => {
        console.log(txt)
        setLoading(false)
        const {data: value, error: errorInfo} = await api.api.runners.searchRunners.get({ $query: { searchTxt: txt } });
        if(value && !errorInfo) {
            setProfileData(value.data);
            setLoading(true)
        }
    }

    useEffect(() =>{
        getSearchRunners()
    },[txt])

    return (
        <div className="relative flex flex-row flex-wrap items-center content-start md:justify-center xs:mt-3 sm:mt-20 xs:p-4 sm:p-0 min-h-screen mb-10">
            <div className="flex flex-wrap flex-col items-start md:w-[85%] xs:w-full">
                <h1 className="font-semibold xs:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Search Results</h1>
                <p className="opacity-[0.6] text-[14px] mt-2 text-left">A list of results matching your query, displaying relevant and useful information.</p>
                <div className="mt-8 w-full xs:overflow-y-scroll md:overflow-y-auto">
                    {!loading ? (
                        <>
                            {_.times(7, (i) => 
                                
                                (
                                <div className="flex items-center space-x-4 mb-8" key={i}>
                                    <Skeleton className="h-20 w-20" />
                                    <div className="space-y-4">
                                        <Skeleton className="h-[2vh] xs:w-[70vw] md:w-[40vw] lg:w-[60vw]" />
                                        <Skeleton className="h-[2vh] xs:w-[70vw] md:w-[40vw] lg:w-[60vw]" />
                                    </div>
                                </div>
                                )
                            )}
                        </>
                    )
                    : (
                        <div className="flex flex-wrap xs:w-[700px] md:w-full">
                            {/* <div className="xs:p-2 lg:p-4 w-full">
                                <div className="w-full flex flex-wrap flex-row">
                                    <div className="w-[30%] text-left">Profile</div>
                                    <div className="w-[17%] text-left">Race Name</div>
                                    <div className="w-[15%] text-left">Distance</div>
                                    <div className="w-[15%] text-left">Time</div>
                                    <div className="w-[6%] text-left"></div>
                                </div>
                            </div> */}
                            <div className="lg:grid lg:grid-cols-2 lg:grid-flow-row lg:gap-2">
                                {profileData && profileData.map((item,i) => (
                                    <div key={i} className="xs:p-2 lg:p-4 w-full shadow-md rounded-xl border border-[#DFDFDF] xs:mb-2">
                                        <div className="w-full flex flex-wrap flex-row h-full">
                                            <div className="w-[45%] text-left h-full">
                                                <div className="flex flex-row h-full">
                                                    <div className="w-[25%] flex items-center">
                                                        <div className="xs:w-full">
                                                            <Avatar className="w-full h-full">
                                                                <AvatarImage src={Avatar7}/>
                                                                <AvatarFallback>CN</AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                    </div>
                                                    <Link to={`/profile/${item.firstname}_${item.lastname}`} className="xs:w-[85%] xl:w-[70%] pl-2 flex justify-center flex-wrap flex-col hover:text-[#00a8de]">
                                                        <div className="xs:text-md w-full font-semibold">{item.firstname} {item.lastname}</div>
                                                        <div className="xs:text-xs md:text-[80%] lg:text-[90%] xs:mt-0 pr-3 md:mt-1 w-full text-gray-500 font-medium flex flex-wrap flex-row">
                                                            <div>{item.nation}</div>
                                                            <div className="ml-2">{item.gender}</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        <div className="w-[25%] flex items-center">  
                                            <Link to={`/events/${item.event_id}?r_id=${item.race_id}`} className="xs:w-[85%] xl:w-[70%] text-left pl-2 md:pl-0 justify-center">
                                                <div className="xs:text-xs md:text-[95%] font-semibold h-full w-full xs:leading-6 flex flex-col">
                                                    <div className="text-gray-700 hover:text-[#00a8de]">{item.event_title}</div>
                                                    <div className="text-gray-500 font-medium">{item.distance} K</div>
                                                </div>
                                            </Link>
                                            </div>
                                            <div className="w-[15%] text-left pl-4 ">
                                                <div className="xs:text-xs md:text-[95%] h-full w-full flex text-gray-700 items-center pr-2"> {item.entrytime}</div>
                                            </div>
                                            <div className="w-[12%] flex flex-wrap justify-center text-left pl-2">
                                                <RequestChangeModal resultrunnerid={item.resultrunnerid!}/>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default SearchPage;