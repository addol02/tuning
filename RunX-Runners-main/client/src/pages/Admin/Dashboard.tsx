import { apiWithToken } from "@/Elysia"
import { ColumnDef } from "@tanstack/react-table"
import DataPage from '@/components/admin_components/TableDashboard';
import { useEffect, useRef, useState } from "react";

import { format } from "date-fns"
import { th } from "date-fns/locale";

import FileBSvg from "@/assets/uil-file-alt.svg"


import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogForm,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import _ from "lodash";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

type RequestInfoList = {
    id: number
    firstname: string
    lastname: string
    file_url: string
    old_firstname: string
    old_lastname: string
    status: number
    racerunnerid: number
    created_at: string
}


const formSchema = z.object({
    firstname: z.string().min(4).refine((val) => { return /^[a-zA-Z]*$/.test(val) }),
    lastname: z.string().min(4).refine((val) => { return /^[a-zA-Z]*$/.test(val) }),
})

export default function Dashboard() {
    
    const navigate = useNavigate();
    const location = useLocation();

    

    const [requestInfoList, setRequestInfoList] = useState<RequestInfoList[]>();
    const triggerRefAlert = useRef<HTMLButtonElement | null>(null);
    const [dataOnModal, setDataOnModal] = useState<RequestInfoList>();
    const callbackModal = (id: number) => {
        if(triggerRefAlert.current && requestInfoList) {

            const result:any = _.find(requestInfoList, function (n) {
                if (n.id == id) {
                    return n
                }
            });
            
            setDataOnModal(result)

            triggerRefAlert.current.click()
            return id;
        }
        
    }

    const classNameCustomize: Object = {
        // fullname: {
        //     head: {
        //         variant: "",
        //         classes: "text-center text-[#000000] font-semibold xs:text-xs sm:text-sm"
        //     },
        //     cell: {
        //         classes: "text-center"
        //     },
        // },
        fullnamerunner: {
            head: {
                variant: "emptyClass",
                classes: "text-left w-[30%] text-[#000000] font-normal xs:text-xs sm:text-sm p-3 rounded-tl-xl"
            },
            cell: {
                variant: "emptyClass",
                classes: "text-left p-1"
            },
        },
        created_at: {
            head: {
                variant: "emptyClass",
                classes: "text-left text-[#000000] font-normal xs:text-xs sm:text-sm p-3"
            },
            cell: {
                variant: "emptyClass",
                classes: "text-left p-3 text-[#00A8DE] xs:text-xs sm:text-sm "
            }
        },
        status: {
            head: {
                variant: "emptyClass",
                classes: "text-left text-[#000000] font-normal xs:text-xs sm:text-sm p-3"
            },
            cell: {
                variant: "emptyClass",
                classes: "text-left p-5 pl-3  xs:text-xs sm:text-sm"
            }
        },
        actiond: {
            head: {
                variant: "emptyClass",
                classes: "text-left text-[#000000] font-normal xs:text-xs sm:text-sm p-3 rounded-tr-xl"
            },
            cell: {
                variant: "emptyClass",
                classes: "text-left p-3"
            }
        }
    }

    const columnsRunner: ColumnDef<RequestInfoList>[] = [
        // {
        //     accessorKey: "rank_race",
        //     header: ({ column }) => {
        //             return (
        //                 <Button
        //                 variant="ghost"
        //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} style={{margin:'0', padding:'0'}}
        //                 >
        //                     Ranking
        //                 <ArrowUpDown className="ml-2 h-4 w-4" />
        //                 </Button>
        //             )
        //             },
        //     cell: ({ row }) => (
        //         row.getValue("rank_race")
        //     ),
        // },
        {
            accessorFn: (row) => row.firstname + row.lastname,
            id: "fullnamerunner",
            header: () => "Full Name",
            cell: ({ row }) => (
                <span className="text-left ml-2 xs:text-xs sm:text-sm">{row.original.firstname} {row.original.lastname}</span>
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
            accessorKey: "created_at",
            header: () => "Request Date",
            cell: ({row}) => (
                format(new Date(row.getValue("created_at")), "dd LLL yyyy, kk:mm:ss ", { locale: th })
            )
        },
        {
            accessorKey: "status",
            header: () => "Status",
            cell: ({row}) => {

                const statusN = row.getValue("status");
                let classAssign:string;
                let txtAssign:string;

                if(statusN == 0) {
                    classAssign = "text-[#777777] bg-[#DFDFDF]";
                    txtAssign = "รอตรวจสอบ";
                } else if(statusN == 1) {
                    classAssign = "text-[#28C61A] bg-[rgba(40,198,26,0.1)]";
                    txtAssign = "อนุมัติ";
                } else {
                    classAssign = "text-[#F94005] bg-[rgba(249,64,5,0.1)] ";
                    txtAssign = "ไม่อนุมัติ";

                }

                return <span className={`p-2 rounded-xl ${classAssign}`}>{txtAssign}</span>
            }
        },
        {
            accessorKey: "actiond",
            header: () => "Action",
            cell: ({row}) => {
                return (
                    <div className="cursor-pointer" onClick={() => callbackModal(row.original.id)}>
                        <img src={FileBSvg}/>
                    </div>
                )
            }
        }
    ]


    const fetchDataRequestList = async () => {
        const {data: value, error: errorInfo} = await apiWithToken().api.admin.requestInfoList.get();

        if(value && !errorInfo) {
            console.log(value);
            setRequestInfoList(value.data);
        } else {
            console.log(errorInfo)
            navigate('/administrator')
        }
    }

    useEffect(() => {
        fetchDataRequestList()
    },[])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
        const status:number = parseInt(_.get(e,'nativeEvent.submitter.value'));
        const id = _.get(dataOnModal,'id');

        const { data:value, error:errorInfo } = await apiWithToken().api.admin.requestInfoUpdate.post({
            ...values,
            status:status,
            racerunnerid: _.get(dataOnModal, 'racerunnerid'),
            id
        })

        if(value && !errorInfo && triggerRefAlert.current) {

            toast({
                variant: "success",
                title: value.success_msg,
                description: "@runx.run"
              })
            await fetchDataRequestList();
            triggerRefAlert.current.click()
            

        }
    }

    return (
        <div className="p-5 h-[90%] flex flex-wrap flex-col">
            <div className="text-left mt-2 shrink">
                <h3 className="font-semibold text-md lg:text-3xl">จัดการคำขอเปลี่ยนข้อมูล</h3>
                <p className="text-[#777777]">Request List for update profile info</p>
            </div>
            <div className="p-1 lg:p-6 boxShadow0Offset rounded-2xl mt-4 basis-4/5">
                {requestInfoList &&
                    <DataPage data={requestInfoList} columns={columnsRunner} classCustomize={classNameCustomize}/>
                }
            </div>

            <AlertDialog>
            <AlertDialogTrigger ref={triggerRefAlert} asChild>
                <Button className="hidden" variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Request Info</AlertDialogTitle>
                <AlertDialogDescription className="text-left">
                    Information of request change info
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogForm className="overflow-auto h-[40vh] lg:overflow-auto lg:h-[50vh]">
                    {dataOnModal ?
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="col-span-2 text-[#777777] font-semibold text-md">
                                ข้อมูลเดิม
                            </div>
                            <div className="">
                                <FormItem>
                                    <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                                    <Input defaultValue={_.get(dataOnModal,'old_firstname')} placeholder="Name" disabled/>
                                </FormItem>
                            </div>
                            <div className="">
                                <FormItem>
                                    <FormLabel>Surname <span className="text-red-500">*</span></FormLabel>
                                    <Input defaultValue={_.get(dataOnModal,'old_lastname')} placeholder="Surname" disabled/>
                                </FormItem>
                               
                            </div>
                            <div className="col-span-2 text-[#00A8DE] font-semibold text-md">
                                ข้อมูลใหม่
                            </div>
                            <div className="">
                                 
                                <FormField
                                control={form.control}
                                defaultValue={_.get(dataOnModal,'firstname')}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input defaultValue={_.get(dataOnModal,'firstname')} onChange={(e) => { field.onChange(e) }} placeholder="Name"/>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                            <div className="">
                                 
                                <FormField
                                control={form.control}
                                defaultValue={_.get(dataOnModal,'lastname')} 
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Surname <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input defaultValue={_.get(dataOnModal,'lastname')} onChange={(e) => { field.onChange(e) }} placeholder="Surname"/>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                            <div className="col-span-2 text-md">
                                แนบหลักฐาน
                            </div>
                            <div className="col-span-2">
                                <div className="w-full flex flex-wrap justify-center">
                                    <img src={_.get(dataOnModal,'file_url')}/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="w-full">
                                    <Button className="bg-[#F94005] w-full" type="submit" value={2}>ไม่อนุมัติ</Button>
                                </div>
                                <div className="w-full">
                                    <Button className="bg-[#28C61A] w-full" type="submit" value={1}>อนุมัติ</Button>
                                </div>
                        </div>
                        </form>
                    </Form>
                    : (
                        <></>
                    )}
                </AlertDialogForm>
                {/* <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction data-q="1" onClick={form.handleSubmit(onSubmit)}>Continue</AlertDialogAction>
                </AlertDialogFooter> */}
            </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}