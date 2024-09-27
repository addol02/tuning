import { Link } from "react-router-dom";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Avatar7 from "@/assets/avatar-7.png"

// import Level1 from "@/assets/Level1.svg"
// import Level2 from "@/assets/Level2.svg"
// import Level3 from "@/assets/Level3.svg"

import { Badge } from '@/components/ui/badge'

export interface TypeRunnersListData {
    firstname: string,
    lastname: string,
    score?: number,
    entrytime: string
}

export interface TypeRankingList {
    data: TypeRunnersListData[];
    headlineTxt: string;
}

function CardRunnersTop({
    data,headlineTxt
  }: TypeRankingList) {

    const rankClassMatch = [
        {
            class:"bg-firstRank text-white"
        },
        {
            class:"bg-secondRank text-white"
        },
        {
            class:"bg-thirdRank text-black"
        }
    ]

    return (
        data && (
                        <div className="flex flex-col flex-wrap xs:w-[100%] md:w-[31.5%] mb-5">
                            <div className="relative shadow-md rounded-xl flex flex-col justify-around border border-[#DFDFDF] min-h-[28vh] xs:pb-0 3xl:pb-3">
                                <div className="z-0 top-0 rounded-tl-xl rounded-tr-xl w-full min-h-[15%] lg:h-[fit-content] flex flex-row justify-end p-2 pr-4">
                                    <p className="xs:text-[150%] sm:text-[100%] xl:text-[150%] opacity-100 font-bold w-fit bg-[#00a8de] p-2 pt-2.5 pb-2.5 rounded-[50%] text-white">{headlineTxt}k</p>
                                    
                                </div>
                                <div className="relative flex flex-col flex-wrap items-center xs:p-2 xs:pt-0 md:p-2 md:pt-0 lg:p-2 xl:p-2 xl:pt-0">
                                    
                                        <div className="flex flex-col items-start w-full space-y-2">
                                            {data.map((item, i) => (
                                                   <div key={i} className="w-full flex flex-row justify-center items-center">
                                                        <div className="xs:w-[10%] md:w-[10%]">
                                                            {i + 1}
                                                        </div>
                                                        <div className="xs:w-[60%] md:w-[60%] text-left">
                                                            {item.firstname} {item.lastname}
                                                        </div>
                                                        <div className="xs:w-[30%] md:w-[30%]">
                                                            <Badge className={`${rankClassMatch[i].class}`} variant="outline">{item.entrytime}</Badge>
                                                        </div>
                                                    </div>  
                                                )   
                                            )}
                                        </div>
                                    
                                    <div className="bg-[#F5F5F5] mt-3 w-[90%] text-center text-gray-500 font-medium xs:text-md md:text-md lg:text-md pt-1 pb-1 2xl:text-base rounded-md">
                                                <Link to={`/rankbydistance/${headlineTxt}`}>View All</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
        )
    )
}

export default CardRunnersTop