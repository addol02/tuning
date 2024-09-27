import bgHeader from '@/assets/bg_home.png'

// import {
//     Card
//   } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Toggle } from "@/components/ui/toggle"
// import { Separator } from '@/components/ui/separator'
import { Skeleton } from "@/components/ui/skeleton"

// import {
//     Search,
//     CalendarDays
// } from "lucide-react"
  
// import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
  
// import { cn } from "@/lib/utils"
// import { format } from "date-fns"

import React, { useEffect } from 'react';

// import { th } from 'date-fns/locale';

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//   } from "@/components/ui/form"

import _ from "lodash"

import "../App.css";
import FilterSVG from '@/assets/filter.svg';


import  { TypeEventListData } from "../components/CardEventList.tsx"

import TableRunnerRanking, { TypeRunnersListData} from "../components/TableRunnersRanking.tsx"
import TableRunnerRankingTop3 from '@/components/TableRunnerRankingTop3.tsx'
import { api } from '@/Elysia.ts';


function Ranking() {

    // const  runnerMockupTop3:TypeRunnersListData[] = [
    //     {
    //         firstname: "Kiptum",
    //         lastname: "Kelvin",
    //         nation: "Kenya",
    //         age: "20-24",
    //         gender:"M",
    //         points: 1651734,
    //         entrytime: '1'
    //     },{
    //         firstname: "Kipruto",
    //         lastname: "Benson",
    //         nation: "Kenya",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1605790,
    //         entrytime: '1'
    //     },{
    //         firstname: "Abdi",
    //         lastname: "Bashir",
    //         nation: "Belgium",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1599343,
    //         entrytime: '1'
    //     }
    // ]

    // const runnerMockup4to20:TypeRunnersListData[] = [
    //     {
    //         firstname: "Korir",
    //         lastname: "John",
    //         nation: "Kenya",
    //         age: "25-29",
    //         gender:"M",
    //         points: 1591462,
    //         entrytime: '1'
    //     },{
    //         firstname: "Tura",
    //         lastname: "Abdiwak",
    //         nation: "Ethiopia",
    //         age: "25-29",
    //         gender:"M",
    //         points: 1587235.42,
    //         entrytime: '1'
    //     },{
    //         firstname: "Mantz",
    //         lastname: "Conner",
    //         nation: "USA",
    //         age: "25-29",
    //         gender:"M",
    //         points: 1558666.43,
    //         entrytime: '1'
    //     },{
    //         firstname: "Young",
    //         lastname: "Clayton",
    //         nation: "USA",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1556028.06,
    //         entrytime: '1'
    //     },{
    //         firstname: "Rupp",
    //         lastname: "Galen",
    //         nation: "USA",
    //         age: "35-39",
    //         gender:"M",
    //         points: 1546363,
    //         entrytime: '1'
    //     },{
    //         firstname: "Chelanga",
    //         lastname: "Sam",
    //         nation: "USA",
    //         age: "35-39",
    //         gender:"M",
    //         points: 1545963,
    //         entrytime: '1'
    //     },{
    //         firstname: "Ichida",
    //         lastname: "Takashi",
    //         nation: "Japan",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1544564,
    //         entrytime: '1'
    //     },{
    //         firstname: "Shrader",
    //         lastname: "Brian",
    //         nation: "USA",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1534844,
    //         entrytime: '1'
    //     },{
    //         firstname: "Kiptoo",
    //         lastname: "Wesley",
    //         nation: "Kenya",
    //         age: "20-24",
    //         gender:"M",
    //         points: 1526609,
    //         entrytime: '1'
    //     },{
    //         firstname: "McDonald",
    //         lastname: "Matt",
    //         nation: "USA",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1525439,
    //         entrytime: '1'
    //     },{
    //         firstname: "Reichow",
    //         lastname: "Joel",
    //         nation: "USA",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1524855,
    //         entrytime: '1'
    //     },{
    //         firstname: "Colley",
    //         lastname: "Andrew",
    //         nation: "USA",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1516150,
    //         entrytime: '1'
    //     },{
    //         firstname: "Salvano",
    //         lastname: "Kevin",
    //         nation: "USA",
    //         age: "25-29",
    //         gender:"M",
    //         points: 1515381,
    //         entrytime: '1'
    //     },{
    //         firstname: "Wolde",
    //         lastname: "Dawit",
    //         nation: "Ethiopia",
    //         age: "30-34",
    //         gender:"M",
    //         points: 1514037,
    //         entrytime: '1'
    //     },{
    //         firstname: "Lara",
    //         lastname: "Frank",
    //         nation: "USA",
    //         age: "25-29",
    //         gender:"M",
    //         points: 1498093,
    //         entrytime: '1'
    //     },{
    //         firstname: "Gusman",
    //         lastname: "Jordan",
    //         nation: "Malta",
    //         age: "25-29",
    //         gender:"M",
    //         points: 1495095,
    //         entrytime: '1'
    //     },{
    //         firstname: "Kiselev",
    //         lastname: "Stepan",
    //         nation: "Russia",
    //         age: "25-29",
    //         gender:"M",
    //         points: 1492667,
    //         entrytime: '1'
    //     }
    // ]

    const [ageGroupFilter, setAgeGroupFilter] = React.useState<string>('All')
    const [genderFilter,setGenderFilter] = React.useState<string>('All');
    const [distanceFilter,setDistanceEventFilter] = React.useState<string>('10');
    const [countryEventFilter, setCountryEventFilter] = React.useState<string>('All')

    const [runnerRankingData, setRunnerRankingData] = React.useState<TypeRunnersListData[]>();

    const filterRacesQuery = async (obj:object) => {
        setLoading(false);
        setTimeout(async () => {
            const {data: value, error: errorInfo} = await api.api.events.get({ $query: obj });
            if(value && !errorInfo) {
                    setEvents(value.data)
                    setLoading(true);
            }       
        },1000)
        
    }

    const filterRunnersQuery = async (obj:object) => {
        setLoading(false);
        setTimeout(async () => {
            const {data: value, error: errorInfo} = await api.api.runners.rankingFilter.get({ $query: obj });
            setRunnerRankingData(value.data)
            setLoading(true)
            // if(value && !errorInfo) {
            //         setEvents(value.data)
            //         setLoading(true);
            // }
        }, 1000)
    }
    
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [events, setEvents] = React.useState<TypeEventListData[]>([]);

    useEffect(() => {
        filterRacesQuery({})
    },[])

    useEffect(() => {
        if(distanceFilter) {
            const formData = {
                ...countryEventFilter != 'All' && { location: countryEventFilter },
                ...distanceFilter && { distance: distanceFilter },
                ...ageGroupFilter != 'All' && { age_range: ageGroupFilter },
                ...genderFilter != 'All' && { gender: genderFilter }
            }
            filterRunnersQuery(formData)
        }
    },[distanceFilter, genderFilter, countryEventFilter, ageGroupFilter]);

    return (
        <>
            <div className="relative flex flex-col flex-wrap items-center lg:min-h-fit xs:bg-[#000] lg:bg-none">
                <div className="w-full xs:overlayimg-black lg:overlayimg-black xs:h-[auto] md:h-[25vw]" style={{overflow: 'hidden'}}>
                    <img className="w-full" src={bgHeader}/>
                </div>
                <div className="absolute xs:top-[30%] lg:top-[40%] w-3/4 text-left text-white">
                    <p className="xs:text-[6vw] lg:text-[6vw] leading-tight font-bold">Top 50 Runners</p>
                    <span className="opacity-[0.6] text-[14px]">Your running story, perfectly archived. Chart your progress, celebrate your triumphs.</span>
                </div>
                {/* <div className="absolute xs:bottom-[-12rem] lg:bottom-[20%] xs:w-[92%] lg:w-3/4">
                <Card>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-wrap flex-row">
                                <div className="flex-intitial xs:w-full lg:w-[40%]">
                                    <div className="flex flex-row">
                                        <div className="flex flex-wrap content-center py-2 pl-5">
                                            <Search className="opacity-[0.6]" />
                                        </div>
                                        <div className="py-2 w-[80%]">
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormControl>
                                                        <Input onChange={(e) => {
                                                            field.onChange(e)
                                                        }} type="text" placeholder="Search for races..." className="border-0 placeholder:text-sm" />
                                                    </FormControl>
                                                )}
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                                <div>
                                    <Separator orientation="vertical" />
                                </div>
                                <div className="flex-intitial xs:w-[49%] lg:w-[20%]">
                                    <div className="flex flex-col flex-wrap">
                                        <div className="text-left px-3 pt-1">
                                        <span className="opacity-[0.6] text-sm">Country</span>
                                        </div>
                                        <div>
                                        <FormField
                                                control={form.control}
                                                name="location"
                                                render={({ field }) => (
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue="Anywhere">
                                                            <SelectTrigger className="w-[100%] h-fit pt-0">
                                                                <SelectValue placeholder="Anywhere" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Anywhere">Anywhere</SelectItem>
                                                                <SelectItem value="Thailand">Thailand</SelectItem>
                                                                <SelectItem value="Chonburi">Chonburi</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                )}
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Separator orientation="vertical" />
                                </div>
                                <div className="flex-intitial xs:w-[49%] lg:w-[20%]">
                                    <div className="flex flex-col flex-wrap">
                                            <div className="text-left px-3 pt-1">
                                                <span className="opacity-[0.6] text-sm">Date</span>
                                            </div>
                                            <div>
                                            <FormField
                                                control={form.control}
                                                name="startPeriod"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[100%] justify-start text-left font-normal h-fit py-0 border-0 px-3",
                                                                        !field.value
                                                                    )}
                                                                    >
                                                                        {field.value ? format(field.value, "P", { locale: th }) : <span className="text-sm">Any time</span>}
                                                                        <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date < new Date('01-01-1980')
                                                                }
                                                                initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormItem>

                                                )}
                                            />
                                            </div>
                                    </div>
                                </div>
                                <div>
                                    <Separator orientation="vertical" />
                                </div>
                                <div className="flex-intitial xs:p-2 lg:p-0 xs:mt-2 xs:mb-1 lg:mt-0 lg:mb-0 xs:w-full lg:w-[19%]">
                                    <div className="flex flex-row flex-wrap items-center h-full">
                                        <div className="w-[50%]">
                                            <Button type="reset" size={"sm"} variant={"clearbtn"}>Clear</Button>
                                        </div>
                                        <div className="w-[50%]">
                                            <Button type="submit" className="w-full h-10 transition duration-800 hover:shadow-md" size={"sm"} variant={"searchbtn"}>Search</Button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </Form>

                </Card>
                </div> */}
            </div>
            <div className="relative flex flex-row flex-wrap items-center justify-center xs:mt-[1rem] lg:mt-10 xs:p-2 sm:p-0">
                <div className="flex flex-row flex-wrap xs:w-11/12 lg:w-3/4">
                    <div className="xs:w-full md:w-[25%] flex flex-col items-start">
                        <div className="flex flex-wrap flex-row w-full font-semibold">
                            <img src={FilterSVG} />
                            <p className="pl-2 xs:text-xl lg:text-[24px]">Filter</p>
                        </div>
                        <div className="flex flex-wrap flex-col w-full">

                                <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className="xs:text-sm lg:text-[18px] mr-2">Distance</p>
                                </div>
                                <div className="xs:w-full sm:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Distance</p>
                                        <Select onValueChange={setDistanceEventFilter} defaultValue="10">
                                            <SelectTrigger className="w-[100%] h-fit py-0 px-2 bg-[#F5F5F5]">
                                                <SelectValue placeholder="5" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">5 K</SelectItem>
                                                <SelectItem value="10">10 K</SelectItem>
                                                <SelectItem value="21">21 K</SelectItem>
                                                <SelectItem value="42">42 K</SelectItem>
                                            </SelectContent>
                                        </Select>
                                </div>
                                    
                                <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className="xs:text-sm lg:text-[18px] mr-2">Country</p>
                                </div>
                                <div className="xs:w-full sm:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Country</p>
                                        <Select onValueChange={setCountryEventFilter} defaultValue="All">
                                            <SelectTrigger className="w-[100%] h-fit py-0 px-2 bg-[#F5F5F5]">
                                                <SelectValue placeholder="All" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="Thailand">Thailand</SelectItem>
                                                <SelectItem value="United States">United States</SelectItem>
                                            </SelectContent>
                                        </Select>
                                </div>

                                <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className="xs:text-sm lg:text-[18px] mr-2">Age Group</p>
                                </div>
                                <div className="xs:w-full sm:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Age Group</p>
                                        <Select onValueChange={setAgeGroupFilter} defaultValue="All">
                                            <SelectTrigger className="w-[100%] h-fit py-0 px-2 bg-[#F5F5F5]">
                                                <SelectValue placeholder="All" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="35-39">35-39</SelectItem>
                                                <SelectItem value="39-43">39-43</SelectItem>
                                            </SelectContent>
                                        </Select>
                                </div>

                                <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className="xs:text-sm lg:text-[18px] mr-2">Gender</p>
                                </div>
                                <div className="xs:w-full sm:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Gender</p>
                                        <Select onValueChange={setGenderFilter} defaultValue="All">
                                            <SelectTrigger className="w-[100%] h-fit py-0 px-2 bg-[#F5F5F5]">
                                                <SelectValue placeholder="All" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="M">Male</SelectItem>
                                                <SelectItem value="F">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                </div>
                              
                                
                        </div>
                    </div>
                    <div className="xs:w-full md:w-[75%] xs:mt-6 md:mt-0 lg:mt-0">

                        <div className="flex flex-row bg-[#F5F5F5] rounded-lg mb-3">
                            {/* <div className="flex flex-wrap content-center pl-2">
                                <Search className="opacity-[0.6]" />
                            </div>
                            <div className="w-[80%]">
                                <Input onChange={(e) => {
                                    setTitleFnSearch(e)
                                }} type="text" placeholder="Search for runners..." className="border-0 placeholder:text-sm bg-[#F5F5F5]" />
                            </div> */}
                            
                        </div>
                        <div className="flex flex-wrap flex-col">
                            {isLoading ? 
                            (
                                <>
                                {runnerRankingData && runnerRankingData.length > 0 ? 
                                    (
                                        <>
                                        <TableRunnerRankingTop3 data={runnerRankingData.slice(0,3)}/>
                                        <TableRunnerRanking data={runnerRankingData.slice(2,49)}/>
                                        </>
                                    )
                                : (
                                    <>
                                    ไม่พบข้อมูลในขณะนี้..
                                    </>
                                )}
                                </>
                            ) : (
                                <>
                                    {_.times(5, (i) => (
                                        <div className="flex items-center space-x-4 mb-8" key={i}>
                                            <Skeleton className="h-20 w-20" />
                                            <div className="space-y-4">
                                                <Skeleton className="h-[2vh] xs:w-[70vw] md:w-[40vw] lg:w-[50vw]" />
                                                <Skeleton className="h-[2vh] xs:w-[70vw] md:w-[40vw] lg:w-[50vw]" />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Ranking;
