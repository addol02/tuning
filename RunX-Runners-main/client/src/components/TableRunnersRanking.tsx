import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Avatar7 from "@/assets/avatar-7.png"

export interface TypeRunnersListData {
    firstname: string;
    lastname: string;
    nation: string;
    age: number;
    gender: "M" | "F";
    score?: number;
    entrytime: string;
    eventid: number;
}

export interface TypeRankingList {
    data: TypeRunnersListData[];
}

function TableRunnerRanking({
    data
  }: TypeRankingList) {

    return (
        data && (
            <Table className={`shadow-md rounded-xl border border-[#DFDFDF] mb-10`}>
                <TableHeader className="">
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Runner</TableHead>
                        <TableHead>Nation</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Finish Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item,i) => 
                        <TableRow key={i} className={`border-0`}>
                            <TableCell className="font-bold">{i + 4}</TableCell>
                            <TableCell>
                                <Link to={`/profile/${item.firstname}_${item.lastname}`} className="flex items-center content-start">
                                    <Avatar className="w-7 h-7">
                                        <AvatarImage src={Avatar7}/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="text-left ml-2 xs:text-xs sm:text-sm font-bold">{item.firstname} {item.lastname}</span>
                                </Link>
                            </TableCell>
                            <TableCell>
                                {item.nation}
                            </TableCell>
                            <TableCell>
                                {item.age}
                            </TableCell>
                            <TableCell>
                                {item.gender}
                            </TableCell>
                            <TableCell>
                                {item.entrytime}
                            </TableCell>
                        </TableRow>
                    )}
                    
                </TableBody>
            </Table>
        )

    )
}

export default TableRunnerRanking