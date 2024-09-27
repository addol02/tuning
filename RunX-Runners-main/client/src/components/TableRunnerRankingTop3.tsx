import { Link } from "react-router-dom";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Avatar7 from "@/assets/avatar-7.png"

export interface TypeRunnersListData {
    firstname: string,
    lastname: string,
    nation: string,
    age: number,
    gender: "M" | "F";
    score?: number;
    entrytime: string;
    eventid: number;
}

export interface TypeRankingList {
    data: TypeRunnersListData[];
}

function TableRunnerRankingTop3({
    data
  }: TypeRankingList) {
    return (
        data && (
            <div className="flex flex-wrap items-start flex-row justify-between mb-5">
                {data.map((item,i) => 
                    <div className="flex flex-col flex-wrap pre_xs:w-[100%] pre_md:w-[31.5%]" key={i}>
                        <div className="relative shadow-md rounded-xl border border-[#DFDFDF] md:min-h-[27vh] xs:pb-0 3xl:pb-1 pre_xs:mb-[3vh] xs:mb-[3vh] md:mb-[0]">
                            <div className="z-0 top-0 rounded-tl-xl rounded-tr-xl w-full min-h-[15%] lg:h-[22%] absolute text-right pr-5" style={{background:'linear-gradient(90deg, #D0E9F1 0%, #52C9EF 50.59%, #2990B1 100.14%)'}}>
                                <p className="xs:text-[200%] sm:text-[250%] xl:text-[350%] opacity-60 font-bold text-white">{i+1}{(i + 1 == 1) ? 'st' : 'nd'}</p>
                                <div className="z-10 flex flex-col mt-1 absolute xs:bottom-[-40%] sm:bottom-[-50%] md:bottom-[-40%] lg:bottom-[-50%] xl:bottom-[-50%] w-full">
                                    <Avatar className="pre_xs:w-[10vw] xs:w-[12vw] pre_md:w-[9vw] md:w-[30%] lg:w-[30%] xl:w-[27%] 2xl:w-[20%] xs:ml-2 lg:ml-3 xl:ml-5 h-[auto] border-[3px] border-white border-solid">
                                        <AvatarImage src={Avatar7}/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                                <div className="relative xs:mt-[11vh] pre_md:mt-[9vh] sm:mt-[42%] md:mt-[35%] lg:mt-[44%] xl:mt-[30%] 2xl:mt-[27%] 3xl:mt-[5vw] flex flex-col flex-wrap xs:p-2 md:p-4 lg:p-3 xl:p-4 xl:mb-2 3xl:pb-0">
                                    <div className="font-semibold xs:text-[100%] lg:text-[105%] xl:text-[130%] text-left break-all md:mt-[5px] xl:mt-[12px]">{item.firstname}<br></br>{item.lastname}</div>
                                    <div className="flex flex-row flex-wrap justify-between">
                                    <div className="text-left w-[48%] mt-2 flex flex-wrap xs:text-xs md:text-sm lg:text-[0.85rem] 2xl:text-base">
                                            <p className="text-gray-500 font-medium">Nationality</p>
                                            <p className="font-semibold !leading-none w-full">{item.nation} </p>
                                        </div>
                                        <div className="text-left w-[48%] mt-2 flex flex-wrap xs:text-xs md:text-sm lg:text-[0.85rem] 2xl:text-base">
                                            <p className="text-gray-500 font-medium">Age</p>
                                            <p className="font-semibold !leading-none w-full">{item.age} </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row flex-wrap justify-between">
                                        <div className="text-left w-[48%] mt-2 flex flex-wrap xs:text-xs md:text-sm lg:text-[0.85rem] 2xl:text-base">
                                            <p className="text-gray-500 font-medium">Gender</p>
                                            <p className="font-semibold !leading-none w-full">{item.gender} </p>
                                        </div>
                                        <div className="text-left w-[48%] mt-2 flex flex-wrap xs:text-xs md:text-sm lg:text-[0.85rem] 2xl:text-base break-all">
                                            <p className="text-gray-500 font-medium">Finish Time</p>
                                            <p className="font-semibold !leading-none w-full">{item.entrytime} </p>
                                        </div>
                                    </div>
                                    <div className="bg-[#F5F5F5] pre_xs:mb-[0.5rem] mt-3 md:mb-1 3xl:mb-2 w-full text-gray-500 font-medium xs:text-xs md:text-sm lg:text-sm pt-1 pb-1 2xl:text-base rounded-md">
                                            <Link to={`/profile/${item.firstname}_${item.lastname}`} >View Profile</Link>
                                    </div>
                                </div>
                            
                            
                        </div>
                    </div>
                )}
            </div>
        )
    )
  }

  export default TableRunnerRankingTop3