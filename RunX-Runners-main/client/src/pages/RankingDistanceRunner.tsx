import HomeHeader from "@/components/HomeHeader";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"

  
import { edenTreaty } from '@elysiajs/eden'
import type { App } from '../../../src/server.ts'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import _ from "lodash"

import FilterSVG from '@/assets/filter.svg';
import TableRunnerRanking, { TypeRunnersListData } from "@/components/TableRunnersRanking";
import { api } from "@/Elysia.ts";

interface FetchRankingType {
    distance?: string;
    limit?: string;
    gender?: string;
}


function RankingDistanceRunner() {
    
    const { distance } = useParams()

    const [genderRunnerFilter, setGenderRunnerFilter] =  React.useState<Object>();
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [rankingData, setRankingData] = React.useState<TypeRunnersListData[]>();


    const filterWithGender = (valueFilter:string) => {
        if(valueFilter === "ALL") {
            setGenderRunnerFilter({})
        } else {
            setGenderRunnerFilter({
                gender: valueFilter
            })
        }
    }

    const fetchRankingData = async (obj: FetchRankingType) => {

        obj.distance = distance!;
        obj.limit = "50";

        const {data: value, error: errorInfo} = await api.api.runners.rankingByDistance.get({ $query: obj });
        if(value && !errorInfo) {
            setRankingData(value.data[distance!])
            setLoading(true);
        }   
    }

    useEffect(() => {
        fetchRankingData({});
    },[])

    useEffect(() => {
        if(genderRunnerFilter) {
            const objData: Object = {
                ...genderRunnerFilter && genderRunnerFilter
            };
            fetchRankingData(objData);
        }
    },[genderRunnerFilter])

    return (
        <>
        <HomeHeader headTitle={`Top 20 of ${distance}k`}/>
        <div className="relative flex flex-row flex-wrap items-center justify-center xs:mt-[1rem] lg:mt-10 xs:p-2 sm:p-0">
                <div className="flex flex-row flex-wrap xs:w-11/12 lg:w-3/4">
                    <div className="xs:w-full md:w-[25%] flex flex-col items-start">
                        <div className="flex flex-wrap flex-row w-full font-semibold">
                            <img src={FilterSVG} />
                            <p className="pl-2 xs:text-xl lg:text-[24px]">Filter</p>
                        </div>
                        <div className="flex flex-wrap flex-col w-full">
                                {/* <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className="xs:text-sm lg:text-[18px] mr-2">Nationality</p>
                                </div>
                                <div className="xs:w-full sm:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Nationality</p>
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
                                </div> */}
{/* 
                                <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className="xs:text-sm lg:text-[18px] mr-2">Age Group</p>
                                </div>
                                <div className="xs:w-full sm:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Age Group</p>
                                        <Select onValueChange={setCountryEventFilter} defaultValue="All">
                                            <SelectTrigger className="w-[100%] h-fit py-0 px-2 bg-[#F5F5F5]">
                                                <SelectValue placeholder="All" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="35-39">35-39</SelectItem>
                                                <SelectItem value="39-43">39-43</SelectItem>
                                            </SelectContent>
                                        </Select>
                                </div> */}

                                <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className="xs:text-sm lg:text-[18px] mr-2">Gender</p>
                                </div>
                                <div className="xs:w-full sm:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Gender</p>
                                        <Select onValueChange={filterWithGender} defaultValue="ALL">
                                            <SelectTrigger className="w-[100%] h-fit py-0 px-2 bg-[#F5F5F5]">
                                                <SelectValue placeholder="All" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ALL">All</SelectItem>
                                                <SelectItem value="M">Male</SelectItem>
                                                <SelectItem value="F">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                </div>
                              
                                
                        </div>
                    </div>
                    <div className="xs:w-full md:w-[75%] xs:mt-6 md:mt-0 lg:mt-0">

                        {/* <div className="flex flex-row bg-[#F5F5F5] rounded-lg mb-3">
                            <div className="flex flex-wrap content-center pl-2">
                                <Search className="opacity-[0.6]" />
                            </div>
                            <div className="w-[80%]">
                                <Input onChange={(e) => {
                                    setTitleFnSearch(e)
                                }} type="text" placeholder="Search for runners..." className="border-0 placeholder:text-sm bg-[#F5F5F5]" />
                            </div>
                            
                        </div> */}
                        <div className="flex flex-wrap flex-col">
                            {isLoading ? 
                            (
                                <>
                                {rankingData ? 
                                    (
                                        <>
                                        <TableRunnerRanking data={rankingData}/>
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

export default RankingDistanceRunner;