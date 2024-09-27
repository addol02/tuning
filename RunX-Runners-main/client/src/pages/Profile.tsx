import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Avatar7 from "@/assets/avatar-profile.png"
import ShoesSvg from "@/assets/shoes.svg"
import StarStandSvg from "@/assets/stars_stand.svg"
import ClockSvg from "@/assets/clocks.svg"
import FlagSvg from "@/assets/flags.svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { format } from "date-fns"

import Level5Badge from "@/assets/Level5.svg"
import Level4Badge from "@/assets/Level4.svg"
import Level3Badge from "@/assets/Level3.svg"
import Level2Badge from "@/assets/Level2.svg"
import Level1Badge from "@/assets/Level1.svg"

import "../App.css";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { enUS } from "date-fns/locale";

import _ from "lodash"
import { Skeleton } from "@/components/ui/skeleton.tsx";

import { api } from "@/Elysia";


export interface ObjectSort {
    [key: string]: string | number | object;
}


export interface RacesType {
    rtitle: string
    resultrunnerid: number;
    age: number;
    count: number;
    firstname: string;
    lastname: string;
    gender: string;
    nation: string;
    location: string;
    title: string; // This refers to the event title
    race_name: string; // Add the race_name here
    starttime: string;
    eventid: string;
    raceid: string;
    distance: number;
    entrytime: string;
    rank_race?: string;
}


export interface EventType {
    id: string;
    title: string
}

export interface RacesType {
    rtitle: string;
    resultrunnerid: number;
    age: number;
    count: number;
    firstname: string;
    lastname: string;
    gender: string;
    nation: string;
    location: string;
    title: string;
    race_name: string;
    starttime: string;
    eventid: string;
    raceid: string;
    distance: number;
    entrytime: string;
    rank_race?: string; // Ensure this property is defined as a number
}


export interface AchievementType {
    bestpace: string
    bestrank: number
    racefin: string
}

export interface AllTimePacesType {
    distance: number
    title: string
    location: string
    province: string
    entrytime: string
    rank_race: number
    count: number
    raceid: string
}

export interface ProfileDataType {
    lastRace: RacesType
    filterOnYear: RacesType[]
    achievement: AchievementType,
    allTimePaces: AllTimePacesType[]
}
export interface ProfileData {
    filterOnYear: {
        [year: string]: RacesType[]
    }
}
export interface Props {
    profileData: ProfileData | undefined;
}



function Profile() {
    const [expandedEventIds, setExpandedEventIds] = useState<Set<string>>(new Set());

    const toggleExpand = (eventid: string) => {
        setExpandedEventIds((prevState) => {
            const newSet = new Set(prevState);
            if (newSet.has(eventid)) {
                newSet.delete(eventid); // Collapse if it's already expanded
            } else {
                newSet.add(eventid); // Expand if it's not expanded
            }
            return newSet;
        });
    };




    const { id } = useParams();
    const badgeIconMap = {
        1: Level1Badge,
        2: Level2Badge,
        3: Level3Badge,
        4: Level4Badge,
        5: Level5Badge,
    };

    function isRankValid(rank: any): rank is 1 | 2 | 3 | 4 | 5 {
        const checkTypeRank: any = (+rank);
        return !isNaN((+rank)) ? [1, 2, 3, 4, 5].includes(checkTypeRank) : false;
    }

    const [profileData, setProfileData] = useState<ProfileDataType>();
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedEvent, setSelectedEvent] = useState<string>('All');
    const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEvent(e.target.value);
    };

    const [dataWithYear, setDataWithYear] = useState<Object[]>([]);
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };
    const filteredData = selectedYear === 'All'
        ? Object.keys(profileData?.filterOnYear ?? {})
            .sort((a, b) => parseInt(b) - parseInt(a))
        : Object.keys(profileData?.filterOnYear ?? {})
            .filter(year => year === selectedYear)
            .sort((a, b) => parseInt(b) - parseInt(a));

    const [loading, setLoading] = useState<boolean>(false);

    const allRaceResultRef = useRef<HTMLDivElement | null>(null);
    const aboutTabRef = useRef<HTMLDivElement | null>(null);

    const scrollToTab = (tabRef: React.RefObject<HTMLDivElement>) => {
        if (tabRef.current) {
            tabRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const getRacesRunner = async (id: string) => {
        setLoading(false);
        const { data: value, error: errorInfo } = await api.api.runners[id].get();
        if (value && !errorInfo) {
            setProfileData(value.data);
            setLoading(true);
        }
    }


    useEffect(() => {
        if (id) {
            getRacesRunner(id);
        }
    }, []);

    const [activeButton, setActiveButton] = useState<number>();

    const setDistanceBp = (value: string) => {
        const splitOf = value.split('_');

        if (splitOf) {
            setActiveButton(parseInt(splitOf[0]));
        }

    }

    const eventsSet = new Set<string>();

    if (profileData?.filterOnYear) {
        Object.values(profileData.filterOnYear).forEach((races) => {
            if (Array.isArray(races)) {
                races.forEach((race: RacesType) => {
                    eventsSet.add(race.title); // Add unique event title
                });
            }
        });
    }

    // Extract unique events from filterOnYear instead
    const uniqueEvents = Array.from(
        new Set(
            // Ensure we are working with arrays of races
            Object.values(profileData?.filterOnYear || {}).flatMap((races: RacesType[] | any) =>
                Array.isArray(races) ? races.map((race) => race.title) : []
            )
        )
    ).map((eventTitle) => {
        // Find the first race with this title to get the event ID
        const foundRace = Object.values(profileData?.filterOnYear || {})
            .flatMap((races: RacesType[] | any) => Array.isArray(races) ? races : [])
            .find((race) => race.title === eventTitle);

        return foundRace ? { id: foundRace.eventid, title: foundRace.title } : null;
    }).filter(Boolean);
    // Remove nulls
    // Filter out any nulls

    useEffect(() => {
        if (profileData) {
            const sortedData = Object.keys(profileData.filterOnYear)
                .sort((a, b) => parseInt(b) - parseInt(a));
            setDataWithYear(sortedData);
        }

    }
        , [profileData]);
    return (
        <>
            <div className="relative flex flex-row flex-wrap items-center content-start md:justify-center xs:mt-3 sm:mt-20 xs:p-2 sm:p-0 min-h-screen">
                <div className="flex flex-wrap flex-col items-start 2xl:w-[60%] md:w-[75%] xs:w-full mb-[5rem]">
                    {loading ?
                        profileData?.lastRace ? (
                            <>
                                <div className="flex flex-wrap flex-row w-full">
                                    <div className="">
                                        <Avatar className="xs:w-[60px] xs:h-[60px] lg:w-[100px] lg:h-[100px]">
                                            <AvatarImage src={Avatar7} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="xs:ml-4 lg:ml-6 flex flex-wrap flex-col justify-evenly">
                                        <div className="flex flex-wrap flex-row space-x-4">
                                            <h1 className="xs:text-lg md:text-2xl lg:text-4xl font-semibold text-left">{profileData.lastRace.firstname} {profileData.lastRace.lastname}</h1>


                                        </div>
                                        <div className="flex flex-row flex-wrap">
                                            <div className="text-left xs:mr-3 lg:mr-7">
                                                <p className="xs:text-xs md:text-md lg:text-base text-gray-500 font-medium">Total points</p>
                                                <p className="xs:text-xs md:text-md lg:text-base font-semibold">-</p>
                                            </div>
                                            <div className="text-left xs:mr-3 lg:mr-7">
                                                <p className="xs:text-xs md:text-md lg:text-base text-gray-500 font-medium">Nation</p>
                                                <p className="xs:text-xs md:text-md lg:text-base font-semibold">{profileData.lastRace.nation} </p>
                                            </div>
                                            <div className="text-left xs:mr-3 lg:mr-7">
                                                <p className="xs:text-xs md:text-md lg:text-base text-gray-500 font-medium">Age group</p>
                                                <p className="xs:text-xs md:text-md lg:text-base font-semibold">{profileData.lastRace.age}</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="xs:text-xs md:text-md lg:text-base text-gray-500 font-medium">Gender</p>
                                                <p className="xs:text-xs md:text-md lg:text-base font-semibold">{profileData.lastRace.gender} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap flex-row w-full xs:mt-5 lg:mt-12">
                                    <Tabs defaultValue="about_tab" className="flex flex-wrap w-full">
                                        <div className="xs:w-full lg:w-[20%] xs:mb-6 lg:mb-0 flex flex-wrap items-start">
                                            <TabsList className="w-full lg:flex lg:flex-col lg:flex-wrap lg:items-start">
                                                <TabsTrigger onClick={() => scrollToTab(aboutTabRef)} value="about_tab" className="xs:w-[100%] lg:w-full text-lg">About</TabsTrigger>
                                                {/* <TabsTrigger value="statistic_tab" className="xs:w-[100%] lg:w-full">Statistics</TabsTrigger> */}
                                                <TabsTrigger onClick={() => scrollToTab(allRaceResultRef)} value="allrace_tab" className="xs:w-[100%] lg:w-full text-lg">All race results</TabsTrigger>
                                            </TabsList>
                                        </div>
                                        <div className="xs:w-full lg:w-[76%]">
                                            <div className="h-[150vh]">
                                                <div ref={aboutTabRef}>
                                                    <h1 className="text-left xs:text-2xl lg:text-3xl font-semibold leading-none">Latest race results</h1>
                                                    <div className="mt-3 w-full">
                                                        <Table className="w-full border rounded-lg">
                                                            <TableHeader>
                                                                <TableRow className="bg-headTableData">
                                                                    <TableHead className="text-center w-[17%] text-[#000000] font-semibold xs:text-xs sm:text-sm">Date</TableHead>
                                                                    <TableHead className="text-left w-[30%] text-[#000000] font-semibold xs:text-xs sm:text-sm">Event name</TableHead>
                                                                    <TableHead className="text-left text-[#000000] font-semibold xs:text-xs sm:text-sm">Race name</TableHead>
                                                                    <TableHead className="text-center text-[#000000 font-semibold xs:text-xs sm:text-sm">Distance</TableHead>
                                                                    {/* <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm">Point <br/>gained</TableHead> */}
                                                                    <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm">Time</TableHead>
                                                                    <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm">Ranking</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell variant={"emptyClass"} className="xs:text-xs sm:text-sm">{format(new Date(profileData.lastRace.starttime), "dd LLLL yy", { locale: enUS })}</TableCell>
                                                                    <TableCell className="text-left p-2 xs:text-xs sm:text-sm">
                                                                        <Link className="text-[#00A8DE]" to={`/events/${profileData.lastRace.eventid}?r_id=${profileData.lastRace.raceid}`}>{profileData.lastRace.title}     </Link>
                                                                    </TableCell>
                                                                    <TableCell className="text-left p-2 xs:text-xs sm:text-sm">
                                                                        {profileData.lastRace.title}
                                                                    </TableCell>

                                                                    <TableCell className="text-center xs:text-xs sm:text-sm">{profileData.lastRace.distance}K</TableCell>
                                                                    {/* <TableCell className="text-center xs:text-xs sm:text-sm"><img className="m-auto" src={Level2Badge}/></TableCell> */}

                                                                    <TableCell className="text-center xs:text-xs sm:text-sm">{profileData.lastRace.entrytime}</TableCell>
                                                                    <TableCell className="text-center xs:text-xs sm:text-sm">{profileData.lastRace.rank_race}/{profileData.lastRace.count}</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                    <div className="mt-10 w-full text-left">
                                                        <h1 className="xs:text-2xl lg:text-3xl font-semibold leading-none">Ranking overview</h1>
                                                    </div>
                                                    <div className="mt-3 w-full">
                                                        <div className="flex flex-row flex-wrap lg:justify-around">
                                                            <div className="xs:w-[100%] lg:w-[33%] xs:mb-5 lg:mb-0">
                                                                <Table className="border rounded-lg w-full">
                                                                    <TableHeader>
                                                                        <TableRow className="bg-headTableData">
                                                                            <TableHead className="text-center text-[#000000] font-semibold" colSpan={2}>World</TableHead>
                                                                        </TableRow>
                                                                        <TableRow className="bg-headTableData">
                                                                            <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm">Overview</TableHead>
                                                                            <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"><span className="block">Category</span> (F 35-39)</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell className="text-center xs:text-xs sm:text-sm">60</TableCell>
                                                                            <TableCell className="text-center xs:text-xs sm:text-sm">1</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                            <div className="xs:w-[100%] lg:w-[33%] xs:mb-5 lg:mb-0">
                                                                <Table className="border rounded-lg w-full">
                                                                    <TableHeader>
                                                                        <TableRow className="bg-headTableData">
                                                                            <TableHead className="text-center text-[#000000] font-semibold" colSpan={2}>Asia</TableHead>
                                                                        </TableRow>
                                                                        <TableRow className="bg-headTableData">
                                                                            <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm">Overview</TableHead>
                                                                            <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"><span className="block">Category</span> (F 35-39)</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell className="text-center xs:text-xs sm:text-sm">60</TableCell>
                                                                            <TableCell className="text-center xs:text-xs sm:text-sm">1</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                            <div className="xs:w-[100%] lg:w-[33%] xs:mb-5 lg:mb-0">
                                                                <Table className="border rounded-lg w-full">
                                                                    <TableHeader>
                                                                        <TableRow className="bg-headTableData">
                                                                            <TableHead className="text-center text-[#000000] font-semibold" colSpan={2}>Thailand</TableHead>
                                                                        </TableRow>
                                                                        <TableRow className="bg-headTableData">
                                                                            <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm">Overview</TableHead>
                                                                            <TableHead className="text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"><span className="block">Category</span> (F 35-39)</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell className="text-center xs:text-xs sm:text-sm">60</TableCell>
                                                                            <TableCell className="text-center xs:text-xs sm:text-sm">1</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-10 w-full text-left">
                                                        <h1 className="xs:text-2xl lg:text-3xl font-semibold leading-none">Achievement</h1>
                                                    </div>
                                                    <div className="mt-3 w-full">
                                                        <Table className="border rounded-lg table-fixed">
                                                            <TableHeader>
                                                                <TableRow className="bg-headTableData">
                                                                    <TableHead className="text-center w-[50%] text-[#000000] font-semibold xs:text-xs sm:text-sm">Type</TableHead>
                                                                    <TableHead className="text-center w-[50%] text-[#000000]"></TableHead>

                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell className="text-center text-md sm:text-sm">Best finishing rank</TableCell>
                                                                    <TableCell className="text-center xs:text-xs sm:text-sm">{profileData.achievement.bestrank}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className="text-center text-md sm:text-sm">Best pace</TableCell>
                                                                    <TableCell className="text-center xs:text-xs sm:text-sm">{profileData.achievement.bestpace}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className="text-center text-md sm:text-sm">Race finished</TableCell>
                                                                    <TableCell className="text-center xs:text-xs sm:text-sm">{profileData.achievement.racefin}</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>

                                                <div className="mt-10">
                                                    <h1 className="xs:text-2xl lg:text-3xl font-semibold leading-none text-left mb-4">All-time Best Pace</h1>
                                                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                                                        {profileData.allTimePaces.map((item, i) => (
                                                            <div key={i} className="shadow-sm rounded-lg border p-4 flex flex-col space-y-3 justify-around min-h-[200px] transition duration-300 ease-in-out hover:bg-[#EDF38C]">
                                                                <div className="w-full flex flex-wrap flex-row items-center">
                                                                    <div className="flex flex-wrap flex-row items-center space-x-2 basis-1/2">
                                                                        <img src={ShoesSvg} />
                                                                        <span className="font-semibold relative top-[0.1rem]">{item.distance} K</span>
                                                                    </div>
                                                                    <div className="basis-1/2 flex flex-wrap justify-end">
                                                                        {(isRankValid(item.rank_race)) ? (
                                                                            <img src={badgeIconMap[item.rank_race]} className="relative w-[20%] 2xl:w-[25%]" />
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                    </div>

                                                                </div>
                                                                <div className="w-full text-left font-semibold text-[#3C3C3C] break-all">
                                                                    {item.title}
                                                                </div>
                                                                <div className="w-full flex flex-wrap flex-row items-center space-x-2">
                                                                    <img src={FlagSvg} />
                                                                    <span className="text-[95%] font-medium">{item.location}, {item.province}</span>
                                                                </div>
                                                                <div className="flex flex-row flex-wrap font-medium">
                                                                    <div className="relative basis-1/2 flex flex-wrap flex-row items-center space-x-2">
                                                                        <img src={ClockSvg} />
                                                                        <span className="text-[95%]">{item.entrytime}</span>
                                                                    </div>
                                                                    <div className="relative basis-1/2 flex flex-wrap flex-row items-center space-x-2">
                                                                        <img src={StarStandSvg} />
                                                                        <span className="text-[95%]">{item.rank_race}/{item.count}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        )}

                                                    </div>
                                                </div>
                                                <div id="allRaceResults" ref={allRaceResultRef}>
                                                    <h1 className="xs:text-2xl lg:text-3xl font-semibold leading-none text-left mb-6 mt-11">
                                                        Races
                                                    </h1>

                                                    <div className="flex space-x-4 items-start mb-4"> {/* Added mb-8 here to apply bottom margin */}
                                                        {/* Year Button with Label */}
                                                        <div className="flex flex-col items-start">
                                                            <label htmlFor="yearFilter" className="mb-1 text-black font-medium">Year</label>
                                                            <div className="relative inline-block w-[170px]">
                                                                <label className="absolute left-4 top-1 text-gray-400 text-xs pointer-events-none">Year</label>
                                                                <select
                                                                    id="yearFilter"
                                                                    value={selectedYear}
                                                                    onChange={handleYearChange}
                                                                    className="border rounded-md px-3 py-1 pt-4 text-left bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                                    style={{ width: '100%', height: '44px' }}
                                                                >
                                                                    <option value="All">All</option>
                                                                    {dataWithYear.map((year: any) => (
                                                                        <option key={String(year)} value={String(year)}>
                                                                            {String(year)}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        {/* Event Button with Label */}
                                                        <div className="flex flex-col items-start">
                                                            <label htmlFor="eventFilter" className="mb-1 text-black font-medium">Event</label>
                                                            <div className="relative inline-block w-[220px]">
                                                                <label className="absolute left-4 top-1 text-gray-400 text-xs pointer-events-none">Event</label>
                                                                <select
                                                                    id="eventFilter"
                                                                    value={selectedEvent}
                                                                    onChange={handleEventChange}
                                                                    className="border rounded-md px-3 py-1 pt-4 text-left bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                                    style={{ width: '100%', height: '44px' }}
                                                                >
                                                                    <option value="All">All Events</option>
                                                                    {uniqueEvents
                                                                        .filter((event): event is { id: string; title: string } => event !== null) // Ensure event is not null
                                                                        .map((event: { id: string; title: string }, index: number) => (
                                                                            <option key={index} value={event.id}>
                                                                                {event.title}
                                                                            </option>
                                                                        ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Single Table for All Races */}
                                                    <div className="overflow-x-auto mb-10">
                                                        <table className="min-w-full border-collapse table-auto">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="border px-4 py-2 text-left">Date</th>
                                                                    <th className="border px-4 py-2 text-left">Race name</th>
                                                                    <th className="border px-4 py-2 text-left">Distance</th>
                                                                    <th className="border px-4 py-2 text-left">Time</th>
                                                                    <th className="border px-4 py-2 text-left">Ranking</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
    {Object.values(
        filteredData
            .flatMap((year) => _.get(profileData?.filterOnYear, `${year}`, []))
            .filter((item: RacesType) => selectedEvent === 'All' || String(item.eventid) === selectedEvent)
            .reduce((acc: Record<string, RacesType>, current: RacesType) => {
                if (selectedEvent === 'All') {
                    if (acc[current.eventid]) {
                        const existingEventDate = new Date(acc[current.eventid].starttime).getTime();
                        const currentEventDate = new Date(current.starttime).getTime();
                        if (currentEventDate > existingEventDate) {
                            acc[current.eventid] = current;
                        }
                    } else {
                        acc[current.eventid] = current;
                    }
                } else {
                    acc[current.raceid] = current;
                }
                return acc;
            }, {})
    ).map((item: RacesType, z: number) => (
        <>
            <tr key={z} className="border-t">
                {/* Date (Start Time) */}
                <td className="border px-4 py-2 text-left">
                    {format(new Date(item.starttime), "dd MMM yy", { locale: enUS })} {/* Change to use "MMM" for 3-char month */}
                </td>

                {/* Race/Event Name */}
                <td className="border px-4 py-2 text-left">
                    <div className="flex justify-between items-center">
                        {/* Display the race or event name */}
                        <Link to={`/events/${item.eventid}`} className="text-[#00A8DE]">
                            {item.title}
                        </Link>

                        {/* Dropdown button to toggle races */}
                        {selectedEvent === 'All' && (
                            <button
                                onClick={() => toggleExpand(item.eventid)}
                                className="ml-2 px-2 py-1 text-[#00A8DE] text-sm flex items-center"
                            >
                                <span className="mr-1">Race</span>
                                {/* Dropdown icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 4.5h18M6 9l6 6 6-6"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </td>

                {/* Distance */}
                <td className="border px-4 py-2 text">{item.distance}K</td>

                {/* Time */}
                <td className="border px-4 py-2 text">{item.entrytime}</td>

                {/* Ranking */}
                <td className="border px-4 py-2 text">
                    {item.rank_race}/{item.count}
                </td>
            </tr>

            {/* Conditionally render races with the same eventid when expanded */}
            {expandedEventIds.has(item.eventid) && selectedEvent === 'All' &&
                filteredData
                    .flatMap((year) => _.get(profileData?.filterOnYear, `${year}`, []))
                    .filter((race: RacesType) => race.eventid === item.eventid && race.raceid !== item.raceid)
                    .map((race: RacesType, index: number) => (
                        <tr key={index} className="border-t bg-gray-100">
                            {/* Additional races */}
                            <td className="border px-4 py-2 text-left">
                                {format(new Date(race.starttime), "dd MMM yy", { locale: enUS })} {/* Shortened month */}
                            </td>
                            <td className="border px-4 py-2 text-left">
                                <Link to={`/races/${race.raceid}`} className="text-[#00A8DE]">
                                    {race.title}
                                </Link>
                            </td>
                            <td className="border px-4 py-2 text">{race.distance}K</td>
                            <td className="border px-4 py-2 text">{race.entrytime}</td>
                            <td className="border px-4 py-2 text">
                                {race.rank_race}/{race.count}
                            </td>
                        </tr>
                    ))
            }
        </>
    ))}
</tbody>










                                                        </table>
                                                    </div>
                                                </div>

                                            </div>
                                            <TabsContent value="about_tab hidden" className="flex flex-wrap flex-col items-start w-full overflow-auto">

                                            </TabsContent>
                                            <TabsContent value="statistic_tab hidden" className="flex flex-wrap flex-col items-start w-full">

                                                <div className="mt-10 w-full text-left">
                                                    <h1 className="xs:text-xl lg:text-3xl font-semibold leading-none">All-time Best Pace</h1>
                                                    {[5, 10, 21, 42].map((item, i) => {
                                                        if (_.get(profileData.allTimePaces, `d_${item}`)) {
                                                            return (
                                                                <button className={`font-semibold p-5 pb-3 pt-3 mr-2 label-distance-in-bp ${!activeButton && i == 0 && 'active'} ${activeButton == i ? 'active' : ''}`} data-bpdist={`d_${item}`} onClick={() => setDistanceBp(`${i}_${item}`)}>
                                                                    {item} K
                                                                </button>
                                                            )
                                                        }
                                                    }
                                                    )}

                                                </div>

                                            </TabsContent>
                                        </div>
                                    </Tabs>
                                </div>
                            </>
                        ) : (
                            <>
                                ยังไม่พบข้อมูลในขณะนี้
                            </>
                        )
                        : (
                            <div className="flex flex-wrap items-center space-x-4 mb-8 w-full">
                                <Skeleton className="h-20 w-20" />
                                <div className="space-y-4">
                                    <Skeleton className="h-[2vh] xs:w-[70vw] md:w-[40vw] lg:w-[50vw]" />
                                    <Skeleton className="h-[2vh] xs:w-[70vw] md:w-[40vw] lg:w-[50vw]" />
                                </div>
                                <div className="mt-4 w-full">
                                    <Skeleton className="h-[40vh] xs:w-[90%]" />
                                </div>
                            </div>
                        )}

                </div >
            </div >
        </>
    )
}

export default Profile;
