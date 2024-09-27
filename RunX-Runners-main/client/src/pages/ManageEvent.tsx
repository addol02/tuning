import { useParams,useNavigate } from "react-router-dom";

import * as React from 'react';

import { edenTreaty } from '@elysiajs/eden'
import type { App } from '../../../src/server.ts'
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Skeleton } from '@/components/ui/skeleton.tsx'
import { api } from "@/Elysia.ts";


export interface Races {
    id: number
    title: string
}

export interface Event {
    title: string
    races: Races[]
}

export interface Files {
    lastModified: string
    lastModifiedDate: Date
    name: string
    size: number
    type:string
    webkitRelativePath?: string
}

function ManageEvent () {

    const { id } = useParams();
    const navigate = useNavigate();

    const [raceSelect, setRaceSelect] = React.useState<string>()
    const [event, setEvent] = React.useState<Event>();
    const [file, setFile] = React.useState<Files>();



    const handleFileChange = (e: React.BaseSyntheticEvent) => {
        setFile(e.target.files[0]);
      };

    const getRacesInEvent = async (id: string) => {
        const {data: value, error: errorInfo} = await api.events[id].get();
        if(value && !errorInfo) {
                setEvent(value.data);
        }  
    }

    const submitUpload = async (id: string) => {
        if(id) {
            if(!raceSelect) {
                alert("Please select races.")
                return false;
            }
            if(!file) {
                alert("Please select xlsx file.");
                return false;
            }



            if(!["csv","spreadsheet"].some(typeFile => file.type.includes(typeFile))) {
                alert("Incorrect file format.")
                return false;
            }


            const {data: value, error: errorInfo} = await api.races[raceSelect].upload.post({
                excelFile: file,
                raceid: raceSelect,
                eventid: id
            })

            if(value.data && !errorInfo) {
                alert(value.success_msg + " : " + value.data.count);
                navigate(0 as any, { relative: "path" });
            }
        }
    }

     
    useEffect(() => {
       if(id) {
            getRacesInEvent(id)
       }
    },[id]);


    
    return (
        <>
            <div className="mt-10 px-2 flex flex-wrap justify-center">
                <div className="xs:w-full md:w-[85%] flex flex-wrap flex-col">
                    {event ? (
                        <> 
                           
                            <div><h1 className="text-xl font-semibold">Event: {event.title}</h1></div>
                            <div className="text-center mt-2 mb-2 italic">Please use this example file for template
                                <a href="/csv_template.csv" className="text-blue-700"> Example</a>
                                </div>
                            <div className="w-full flex justify-center mb-2 mt-2">
                                <Select onValueChange={setRaceSelect} defaultValue="-">
                                    <SelectTrigger className="xs:w-full md:w-[50%] h-fit  px-2 border-2">
                                        <SelectValue placeholder="โปรดเลือกสนาม" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="-" disabled>โปรดเลือกสนาม</SelectItem>
                                        {event.races.map((item,i) => 
                                            <SelectItem value={`${item.id}`} key={i}>{item.title}</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full flex justify-center mb-2">
                                <Input onChange={handleFileChange} id="picture" type="file" className="xs:w-full md:w-[50%]"/>
                            </div>
                            <div className="w-full flex justify-center">
                                <Button type="submit" className="xs:w-full md:w-[50%]" onClick={() => submitUpload(id)}>Submit</Button>
                            </div>
                            
                        </>
                    ) : (
                        <div className="xs:w-full md:w-[50%] m-auto">
                            <div className="flex flex-wrap flex-row justify-center">
                            
                                <Skeleton className="h-20 w-[100%] mb-4" />
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-wrap flex-col justify-around">
                                    <Skeleton className="xs:h-[5vh] md:h-[3vh] xs:w-[100%]" />
                                    <Skeleton className="xs:h-[5vh] mt-2 md:h-[3vh] xs:w-[100%]" />
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}


export default ManageEvent;