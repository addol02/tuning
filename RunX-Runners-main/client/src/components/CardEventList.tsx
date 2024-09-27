import { Link } from "react-router-dom"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import coverTest from '@/assets/covertest.png'

import { format } from "date-fns"
import { enUS } from "date-fns/locale";

export interface RaceObjectData {
    distance: number,
    eventid: number,
    starttime: string,
    endTime: string
}


export interface TypeEventListData {
    id: number,
    title: string,
    startperiod: string,
    endperiod: string,
    location: string,
    cover_img: string,
    logo_img: string,
    races: RaceObjectData[],
}

export interface TypeEventList {
data: TypeEventListData[];
}


function CardEventList ({
    data
  }: TypeEventList) {
    return (
        data &&
        data.map((item,i) => 
            <Card className="w-full mb-3" key={i}>
                <Link to={`/events/${item.id}`}>
                    <div className="flex flex-wrap flex-row">
                        <div className="xs:w-[30%] md:w-[20%] lg:w-[20%] xl:w-[14%] xs:h-[120px] md:h-[10vh] lg:h-[10vh] xl:h-[10vh]">
                            <img src={item.logo_img ? item.logo_img : coverTest} className="w-full h-full rounded-tl-lg rounded-bl-lg" style={{objectFit:'cover'}} ></img>
                        </div>
                        <div className="xs:w-[70%] md:w-[80%] lg:w-[80%] xl:w-[86%] p-4 pt-3 pb-3 text-left flex flex-wrap flex-col justify-between">
                            <div className="title-event-thumb h-fit w-full">
                                <p className="p-0 m-0 font-semibold xs:text-sm lg:text-xl">
                                    {item.title}
                                </p>
                            </div>
                            <div className="flex flex-row flex-wrap h-fit w-full">
                                <span className="p-0 m-0 xs:text-xs lg:text-sm text-gray-400">
                                    {item.location}
                                </span>
                                <span className="ml-1 mr-1 text-gray-400 xs:text-xs lg:text-sm">•</span>
                                <span className="p-0 m-0 xs:text-xs lg:text-sm text-gray-400">
                                    {format(new Date(item.startperiod), "dd LLLL yyyy", { locale: enUS })}
                                </span>
                            </div>
                            <div className="flex flex-row flex-wrap h-fit w-full">
                                {item.races.map((race,z) => 
                                    <Badge key={z} className="bg-distanceBadgeBg text-black hover:bg-distanceBadgeBg mr-2 xs:mt-2 lg:mt-1">{race.distance}K 
                                        <span className="text-gray-500 font-normal text-xs pl-1 xs:hidden lg:block">Max. +1pt</span>
                                    </Badge>
                        
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        )
    )
    
}

export default CardEventList