import bgHeader from '@/assets/bg_home.png'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from '@/components/ui/separator'
import { Skeleton } from "@/components/ui/skeleton"

import {
    Search,
    CalendarDays
} from "lucide-react"
  
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
  
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import React, { useEffect } from 'react';
import { th } from 'date-fns/locale';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
  } from "@/components/ui/form"

import _ from "lodash"

import "../App.css";
import FilterSVG from '@/assets/filter.svg';

import { edenTreaty } from '@elysiajs/eden'
import type { App } from '../../../src/server.ts'


import CardEventList, { TypeEventListData } from "../components/CardEventList.tsx"
import { api } from '@/Elysia.ts'


const FormSchema = z.object({
    title: z.string().default(''),
    location: z.string().default('Anywhere'),
    startperiod: z.date().default(new Date('1991-01-10'))
})

function Races() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const [dateEventFilter, setDateEventFilter] = React.useState<Date>()
    const [countryEventFilter, setCountryEventFilter] = React.useState<string>('Anywhere')
    const [titleEventFilter,setTitleEventFilter] = React.useState<string>('');


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

    async function onSubmit(data: z.infer<typeof FormSchema>) {

       const formData = {
            title: data.title,
            location: data.location,
            startperiod: data.startperiod.toISOString(),
       };

       await filterRacesQuery(formData);
    }
 


    interface filterRangeInterface {
        min: number;
        max: number;
    }

    const [filterRangeValue, setFilterRangeValue] = React.useState<string[]>([]);
    const [filterValueSend, setFilterValueSend] = React.useState<filterRangeInterface>({
        min: 0,
        max: 999
    });
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [events, setEvents] = React.useState<TypeEventListData[]>([]);
    const [eventsTmp, setEventsTmp] = React.useState<TypeEventListData[]>([]);

    const setTitleFnSearch = (e:React.BaseSyntheticEvent) => {

        console.log(e.target.value)
        let titleTime;
        clearTimeout(titleTime)
        titleTime = setTimeout(() => {
            setTitleEventFilter(e.target.value as string);
        }, 2000);
    } 

    const filterSelect = (e:React.BaseSyntheticEvent) => {

        const isSelect = e.target.getAttribute('data-state') === 'off' ? 'on' : 'off';
        const jsonIsRange = (e.target.getAttribute('data-range'))       
        // next day fix on click change //


        if(isSelect === 'on') {
            setFilterRangeValue([...filterRangeValue,jsonIsRange])
        } else {
            const filterRemove = filterRangeValue.filter((item) => {
                return item != jsonIsRange;
            })
            setFilterRangeValue(filterRemove)
        }

    }

    const filterChange = () => {

        const filterEndValue:filterRangeInterface[] = filterRangeValue.map((item) => {
            const nc = item.split("-");

            const next = {
                min: parseInt(nc[0]),
                max: parseInt(nc[1])
            }
            return next;
        })

        if(filterEndValue.length > 0) {
            const minValue = (filterEndValue.reduce((acc, current) => (current.min < acc.min ? current : acc), filterEndValue[0])).min;
            const maxValue = (filterEndValue.reduce((acc, current) => (current.max > acc.max ? current : acc), filterEndValue[0])).max;

            const eventFilterDistance: TypeEventListData[] = _.reduce(
                events,
                (result: TypeEventListData[], item) => {
                  const filteredRaces = item.races.filter((race) => {
                    const distanceFloat = race.distance;
                    return distanceFloat >= minValue && distanceFloat < maxValue;
                  });

                  

                  if (filteredRaces.length > 0) {
                    result.push({
                      ...item,
                      races: filteredRaces,
                    });
                  }

              
                  return result;
                },
                []
              );

            
            setEventsTmp(eventFilterDistance);


            setFilterValueSend({
                min: minValue,
                max: maxValue
            })
        } else {
            setFilterValueSend({
                min: 0,
                max: 999
            })
        }
    }

    const filterRanges:filterRangeInterface[] = [
        {
            min: 1,
            max: 5
        },
        {
            min: 5,
            max: 10
        },
        {
            min: 10,
            max: 21
        },
        {
            min: 21,
            max: 42
        },
        {
            min: 42,
            max: 998
        }
    ];

   

    useEffect(() => {
        filterChange();
    },[filterRangeValue]);

    useEffect(() => {
    },[filterValueSend])

    useEffect(() => {
        filterRacesQuery({})
    },[])

    useEffect(() => {
        if(dateEventFilter || countryEventFilter || titleEventFilter) {
            const formData = {
                ...titleEventFilter && { title: titleEventFilter },
                ...countryEventFilter &&  { location: countryEventFilter },
                ...dateEventFilter && { startperiod: dateEventFilter.toISOString() }
            }
            filterRacesQuery(formData)
        }
    },[dateEventFilter, countryEventFilter, titleEventFilter]);

    return (
        <>
            <div className="relative flex flex-col flex-wrap items-center lg:min-h-fit xs:bg-[#000] lg:bg-none">
                <div className="w-full xs:overlayimg-black lg:overlayimg-black xs:h-[auto] md:h-[25vw]" style={{overflow: 'hidden'}}>
                    <img className="w-full" src={bgHeader}/>
                </div>
                <div className="absolute xs:top-[30%] lg:top-[40%] w-3/4 text-left text-white">
                    <p className="xs:text-[6vw] lg:text-[6vw] leading-tight font-bold">Discover Races</p>
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
                        <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                            <p className=" xs:text-sm lg:text-[18px] mr-2">Distance</p>
                            <Badge className="px-2.5" variant={"tealBadge"}>{filterRangeValue.length}</Badge>
                        </div>
                        <div className="flex flex-wrap flex-row">
                            {filterRanges.map((item,i) => 
                                <Toggle key={i} variant="outline" className="rounded-full text-[#777777] mr-1 mt-2" aria-label="Toggle italic" data-range={`${item.min}-${item.max}`} onClick={filterSelect}>
                                    {item.min} ~ {item.max != 998 && item.max}K
                                </Toggle>
                            )}
                          
                        </div>
                        <div className="flex flex-wrap flex-col w-full">
                                <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className="xs:text-sm lg:text-[18px] mr-2">Country</p>
                                </div>
                                <div className="xs:w-full lg:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Country</p>
                                        <Select onValueChange={setCountryEventFilter} defaultValue="Anywhere">
                                            <SelectTrigger className="w-[100%] h-fit py-0 px-2 bg-[#F5F5F5]">
                                                <SelectValue placeholder="Anywhere" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Anywhere">Anywhere</SelectItem>
                                                <SelectItem value="Thailand">Thailand</SelectItem>
                                                <SelectItem value="Chonburi">Chonburi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                </div>

                                <div className="flex flex-wrap flex-row w-full xs:mt-2 lg:mt-6 font-semibold">
                                    <p className=" xs:text-sm lg:text-[18px] mr-2">Date</p>
                                </div>
                                <div className="xs:w-full lg:w-[90%] p-1 mt-2 bg-[#F5F5F5] rounded-md">
                                    <p className="text-left px-2 mt-1 text-xs text-[#777777]">Date</p>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                    <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[100%] justify-start text-left font-normal h-fit py-0 border-0 px-2 bg-[#F5F5F5]",
                                                        !dateEventFilter
                                                    )}
                                                    >
                                                        {dateEventFilter ? format(dateEventFilter, "P", { locale: th }) : <span className="text-sm">Any time</span>}
                                                        <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                mode="single"
                                                selected={dateEventFilter}
                                                onSelect={setDateEventFilter}
                                                disabled={(date) =>
                                                    date < new Date('01-01-1980')
                                                }
                                                initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                </div>

                                
                        </div>
                    </div>
                    <div className="xs:w-full md:w-[75%] xs:mt-6 md:mt-0 lg:mt-0">

                        <div className="flex flex-row bg-[#F5F5F5] rounded-lg mb-3">
                            <div className="flex flex-wrap content-center pl-2">
                                <Search className="opacity-[0.6]" />
                            </div>
                            <div className="w-[80%]">
                                <Input onChange={(e) => {
                                    setTitleFnSearch(e)
                                }} type="text" placeholder="Search for races..." className="border-0 placeholder:text-sm bg-[#F5F5F5]" />
                            </div>
                            
                        </div>
                        <div className="flex flex-wrap flex-col">
                            {isLoading ? 
                            (
                                <>
                                {events.length > 0 ? 
                                    (
                                        (filterValueSend.max === 999 ?
                                            (
                                                <CardEventList data={events}/>
                                            ) : (
                                                <>
                                                    {eventsTmp.length > 0 ?
                                                        <CardEventList data={eventsTmp}/>
                                                        : (
                                                            <>
                                                                ไม่พบข้อมูลในขณะนี้..
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        )
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

export default Races;
