// import bgHeader from '@/assets/bg_home.png'
// import coverEvent from '@/assets/cover_events.png'

import {
    ArrowUpDown,
} from "lucide-react"
  
// import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  
import { format } from "date-fns"

import "../App.css";
import React from 'react';
import { enUS } from 'date-fns/locale';
// import FilterSVG from '@/assets/filter.svg';

// import Level1Badge from "@/assets/Level1.svg"
// import Level2Badge from "@/assets/Level2.svg"
import Level3Badge from "@/assets/Level3.svg"
// import Level4Badge from "@/assets/Level4.svg"

import Avatar7 from "@/assets/avatar-7.png"

import _ from "lodash"

import { edenTreaty } from '@elysiajs/eden'
import type { App } from '../../../src/server.ts'

import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { Button } from '@/components/ui/button.tsx'

import DataPage from '@/components/TableRunners.tsx';
import { ColumnDef } from '@tanstack/react-table'
import { api } from '@/Elysia.ts'

export type RunnerType = {
    id: number
    firstname: string
    lastname: string
    entrytime: string
    score: number
    age: number
    gender : "M" | "F"
    nation: string
    raceid: number
    irunId: number
}

const classNameCustomize: Object = {
    rank_race: {
        head: {
            variant: "",
            classes: "text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"
        },
        cell: {
            classes: "text-center"
        },
    },
    fullnamerunner: {
        head: {
            variant: "emptyClass",
            classes: "text-center w-[30%] text-[#000000] font-semibold xs:text-xs sm:text-sm"
        },
        cell: {
            variant: "emptyClass",
            classes: "p-1"
        },
    },
    pointgained: {
        head: {
            variant: "emptyClass",
            classes: "text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"
        },
        cell: {
            variant: "emptyClass",
            classes: "text-center"
        }
    },
    entrytime: {
        head: {
            variant: "emptyClass",
            classes: "text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"
        },
        cell: {
            variant: "emptyClass",
            classes: "text-center"
        }
    },
    gender: {
        head: {
            variant: "emptyClass",
            classes: "text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"
        },
        cell: {
            variant: "emptyClass",
            classes: "text-center"
        }
    },
    age: {
        head: {
            variant: "emptyClass",
            classes: "text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"
        },
        cell: {
            variant: "emptyClass",
            classes: "text-center"
        }
    },
    nation: {
        head: {
            variant: "default",
            classes: "text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"
        },
        cell: {
            classes: "text-center"
        }
    }
}
  

export const columnsRunner: ColumnDef<RunnerType>[] = [
    {
        accessorKey: "rank_race",
        header: ({ column }) => {
                return (
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} style={{margin:'0', padding:'0'}}
                    >
                        Ranking
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
                },
        cell: ({ row }) => (
            row.getValue("rank_race")
        ),
    },
    {
        accessorFn: (row) => row.firstname + row.lastname,
        id: "fullnamerunner",
        header: () => "Runner",
        cell: ({ row }) => (
            <Link to={`/profile/${row.original.firstname}_${row.original.lastname}`} className="flex items-center content-start">
                <Avatar className="w-7 h-7">
                    <AvatarImage src={Avatar7}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-left ml-2 xs:text-xs sm:text-sm">{row.original.firstname} {row.original.lastname}</span>
            </Link>
        ),
    },
    // {
    //     accessorKey: "pointgained",
    //     header: () => (
    //         <div>Point gained</div>
    //     ),
    //     cell: () => (
    //         <img className="m-auto" src={Level3Badge}/>
    //     )
    // },
    {
        accessorKey: "entrytime",
        header: () => "Time",
        cell: ({row}) => (
            row.getValue("entrytime")
        )
    },
    {
        accessorKey: "gender",
        header: () => "Gender",
        cell: ({row}) => (
            row.getValue("gender")
        )
    },
    {
        accessorKey: "age",
        header: () => "Age",
        cell: ({row}) => (
            row.getValue("age")
        )
    },
    {
        accessorKey: "nation",
        header: () => "Nation",
        cell: ({row}) => (
            row.getValue("nation")
        )
    }
]

export interface EventType {
    cover_img: string,
    title: string,
    location: string
    races: RaceType[]
}

export interface RaceQueryType {
    sortField?: string,
    sortType?: string
}

export interface RaceType {
    id?: number,
    starttime: string,
    title: string,
    distance: number,
    racerunners: Object[]
}

export 

function Events() {

    const { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const raceIdParams = searchParams.get("r_id");

    const [raceSelect, setRaceSelect] = React.useState<number>();
    const [event,setEvent] = React.useState<EventType>();
    const [raceInEvent, setRaceInEvent] = React.useState<RaceType>();
    const [loading, setLoading] = React.useState<boolean>(false);
    // const runnerTextSearch = React.useRef<HTMLInputElement | null>(null)

    const [runnerOnRace, setRunnerOnRace] = React.useState<RunnerType[]>([]);
    
    const [selectGenderType, setGenderType] = React.useState<Object>();
    const [distanceActiveButton, setDistanceActiveButton] = React.useState<number>();
    const setRaceFunction = (d: number) => {
        setDistanceActiveButton(d);
        setRaceSelect(d);
    }

    const filterWithGender = (valueFilter:string) => {
        if(valueFilter === "ALL") {
            setGenderType({})
        } else {
            setGenderType({
                whereField: "gender",
                whereValue: valueFilter
            })
        }
    }

    const getEventData = async (id: string) => {
        setLoading(false)

        const {data: value, error: errorInfo} = await api.api.events[id].get();
        if(value && !errorInfo) {
            setEvent(value.data)
            setLoading(true)
            if(value.data.races) {
                setRaceSelect(value.data.races[0].id);
            }
        }   
    }


    const getRaceData = async (obj: RaceQueryType) => {
        setLoading(false)
        // setRaceInEvent(false);

        obj.sortField = "entrytime";
        obj.sortType = "asc";
        
        if(raceSelect) {
            const {data: value, error: errorInfo} = await api.api.races[raceSelect].get({ $query: obj });
            if(value && !errorInfo) {
                setRaceInEvent(value.data)
                setRunnerOnRace(value.data.racerunners)

                setLoading(true)

            }  
        }
    }

    React.useEffect(() => {
        getRaceData(selectGenderType ? selectGenderType : {})
    },[raceSelect, selectGenderType]);

    React.useEffect(() => {
        if(id) {
            getEventData(id)
        }
    },[id]);

    React.useEffect(() => {
        if(event && raceIdParams) {
            setRaceFunction(parseInt(raceIdParams));
            setSearchParams()
        } 
    },[event, raceIdParams])

    return (
        <>
            <div className="relative flex flex-col flex-wrap items-center">
                <div className="w-full overlayimg-black-100 h-[30vh]" style={{overflow: 'hidden', backgroundColor: '#00A8DE' }}>
                    {/* <img className="w-full h-full" style={{objectFit:'cover'}} src={event && (event.cover_img ? event.cover_img : coverEvent)}/> */}
                </div>
                <div className="absolute top-[28%] w-3/4 text-left text-white">
                    <p className="lg:text-[75px] leading-tight font-bold">{raceInEvent && raceInEvent.title}</p>
                    {/* <span className="font-semibold text-[25px]">
                        {event && event.location}
                    <span className="ml-1 mr-1">•</span>
                        {raceInEvent && format(new Date(raceInEvent.starttime), "dd LLLL yyyy", { locale: enUS })}
                    </span>
                    <p className="opacity-[0.6] mt-1 text-[25px]">
                        {event && event.title}
                    </p> */}
                </div>
                <div className="absolute top-[28%] w-1/4 text-left text-white">
                    <span className="font-semibold text-[30px]">
                        {event && event.location}
                    <span className="ml-1 mr-1">•</span>
                        {raceInEvent && format(new Date(raceInEvent.starttime), "dd LLLL yyyy", { locale: enUS })}
                    </span>
                    <p className="opacity-[0.6] mt-1 text-[30px]">
                        {event && event.title}
                    </p>
                </div>
                
                {/* <div className="absolute bottom-[0] w-3/4 text-left text-white">
                    <div className="flex flex-row flex-wrap text-[15px]">
                        {event && 
                            event.races.map((race,z) => 
                                <div key={z}>
                                <button className="font-semibold p-2 mr-2 label-distance-in-event" onClick={() => setRaceFunction(race.id as number)}>
                                    {race.distance}K
                                </button>
                                </div>
                            )     
                        }
                    </div>
                </div> */}
              
            </div>
            <div className="relative flex flex-row flex-wrap items-center content-start justify-center xs:mt-5 lg:mt-5 xs:p-2 mb-2 min-h-screen">
                <div className="flex flex-wrap flex-row xs:w-full md:w-3/4">
                    <div className="mb-4 xs:w-full flex flex-row items-start">
                    {event && 
                            event.races.map((race,z) => 
                                <div key={z}>
                                <button className={`font-semibold p-5 pb-3 pt-3 mr-2 label-distance-in-bp ${(!distanceActiveButton) && z == 0 && 'active'} ${distanceActiveButton == race.id ? 'active' : ''}`} onClick={() => setRaceFunction(race.id as number)}>
                                    {race.distance} K
                                </button>
                                </div>
                            )     
                        }

                    </div>
                    <div className="xs:w-full md:w-[24%] flex flex-col items-start">
                        <div className="text-left w-full font-semibold mb-5">
                            <p className="text-[20px]">Race details</p>
                        </div>
                        <div className="text-left w-full mb-4">
                            <p className="text-sm text-gray-500 font-semibold">Race date</p>
                            <p className="text-sm font-semibold">{raceInEvent && format(new Date(raceInEvent.starttime), "dd LLLL yyyy", { locale: enUS })}</p>
                        </div>
                        <div className="text-left w-full mb-4">
                            <p className="text-sm text-gray-500 font-semibold">Distance</p>
                            <p className="text-sm font-semibold">{raceInEvent && raceInEvent.distance}KM</p>
                        </div>
                        <div className="text-left w-full mb-4">
                            <p className="text-sm text-gray-500 font-semibold">Start time</p>
                            <p className="text-sm font-semibold">{raceInEvent && format(new Date(raceInEvent.starttime), "kk:mm:ss OOOO", { locale: enUS })}</p>
                        </div>
                        <div className="text-left w-full mb-4">
                            <p className="text-sm text-gray-500 font-semibold">No. of participants</p>
                            <p className="text-sm font-semibold">{raceInEvent && raceInEvent.racerunners.length}</p>
                        </div>
                        <div className="text-left w-full mb-4">
                            <p className="text-sm text-gray-500 font-semibold">Maximum point gained</p>
                            <div className="inline-flex">
                                <p className="text-sm font-semibold">+3 points</p>
                                <img src={Level3Badge} className="m-auto ml-2"/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="xs:w-full md:w-[76%] flex flex-col items-start">
                    <div className="flex flex-wrap flex-row w-full">
                                <div className="xs:w-[40%] lg:w-[30%] flex items-center">
                                    <h1 className="xs:text-xl lg:text-3xl font-semibold leading-none">Race results</h1>
                                </div>
                                <div className="xs:w-[60%] lg:w-[70%] flex flex-wrap flex-row justify-end">
                                    {/* <div className="p-1 relative w-[30%]">
                                        <div className="bg-boxFilterEvent rounded-md">
                                            A
                                        </div>
                                    </div> */}
                                    <div className="p-1 relative xs:w-[60%] lg:w-[30%]">
                                        <div className="bg-boxFilterEvent rounded-md">
                                            <div className="flex flex-col flex-wrap items-start p-1 pl-3 pr-3">
                                                <p className="text-[#777777] text-[13px] font-light">Gender</p>
                                                <Select onValueChange={(e) => filterWithGender(e)}>
                                                    <SelectTrigger className="w-[100%] h-fit p-0 bg-boxFilterEvent xs:text-xs sm:text-sm">
                                                        <SelectValue placeholder="All genders" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ALL">All genders</SelectItem>
                                                        <SelectItem value="M">Male</SelectItem>
                                                        <SelectItem value="F">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    {runnerOnRace ?
                        <>
                            
                            
                            <div className="mt-0 w-full">
                                {runnerOnRace &&
                                    <DataPage data={runnerOnRace} columns={columnsRunner} classCustomize={classNameCustomize}/>
                                }
                            </div>
                        </>
                    : loading === false ? (
                        <div className="w-full">
                            <div className="flex flex-wrap flex-row justify-around">
                                <Skeleton className="h-20 w-[49%] mb-4" />
                                <Skeleton className="h-20 w-[49%] mb-4" />
                                <Skeleton className="h-10 w-[100%] mb-4" />
                            </div>
                                <div className="space-y-3">
                                {_.times(4, (i) => (
                                    <div  key={i} className="flex flex-wrap flex-row justify-around">
                                        <Skeleton className="xs:h-[5vh] md:h-[3vh] xs:w-[10%]" />
                                        <Skeleton className="xs:h-[5vh] md:h-[3vh] xs:w-[20%]" />
                                        <Skeleton className="xs:h-[5vh] md:h-[3vh] xs:w-[10%]" />
                                        <Skeleton className="xs:h-[5vh] md:h-[3vh] xs:w-[10%]" />
                                        <Skeleton className="xs:h-[5vh] md:h-[3vh] xs:w-[10%]" />
                                        <Skeleton className="xs:h-[5vh] md:h-[3vh] xs:w-[10%]" />
                                        <Skeleton className="xs:h-[5vh] md:h-[3vh] xs:w-[10%]" />
                                    </div>
                                ))}
                                </div>
                        </div>
                    ) : (
                        <div>
                            ยังไม่พบข้อมูลในขณะนี้..
                        </div>
                    )}
                    </div>
                       
                </div>
            </div>
        </>
    )
}

export default Events;