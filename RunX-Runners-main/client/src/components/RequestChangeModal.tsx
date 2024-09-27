
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogForm,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import EditIcoSvg from "@/assets/uil-edit-alt.svg"
import InfoSvg from "@/assets/uil-info-circle.svg"
import FileSvg from "@/assets/file_ico.svg"
import { CheckCheck, X } from "lucide-react";


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { useRef, useState } from "react";


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { useNavigate } from "react-router-dom";
import { api } from "@/Elysia";
import _ from "lodash";


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    firstname: z.string().min(4).refine((val) => { return /^[a-zA-Z]*$/.test(val) }),
    surname: z.string().min(4).refine((val) => { return /^[a-zA-Z]*$/.test(val) }),
    file_upload: z.any()
    .refine((files => { return files?.length == 1 }), "Image is required.")
    .refine((files => { 
        return files?.[0]?.size <= MAX_FILE_SIZE }), `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
})


export default function RequestChangeModal({resultrunnerid}: {resultrunnerid: number}) {
    
    const navigate = useNavigate();

    const [isSubmitRequest, setSubmitRequest] = useState<boolean>(false);
    const [responseSubmitRequest, setResponseSubmitRequest] = useState<string>('');
    const [loadingSubmitRequest, setLoadingSubmitRequest] = useState<boolean>(false);

    const fileUploadRef = useRef<HTMLInputElement | null>(null);

    const [filePreview,setFilePreview] = useState<any>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })


    const openUploadFile = () => {
        if(fileUploadRef.current) {
            fileUploadRef.current.click();
        }
    }

        // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setLoadingSubmitRequest(true)

        const getTypeFromFiles = _.get(values,'file_upload.[0].type');
        const {data: value, error: errorInfo} = await api.api.services.getUrlUpload.post({
                type: getTypeFromFiles
        });

        if(value.data && !errorInfo) {

            const uploadToUrlSigned = await fetch(_.get(value,'data.uploadUrl'), {
                method: 'PUT',
                headers: {
                    'Content-Type': getTypeFromFiles
                },
                body: _.get(values,'file_upload.[0]')
            })


            const {data: value_request, error: errorInfo_request} = await api.api.runners.requestChangeInfo.post({
                firstname: values.firstname,
                surname: values.surname,
                file_upload: _.get(value,'data.filePath'),
                resultrunnerid: resultrunnerid.toString()
            })

            if(value_request.data && !errorInfo_request) {

                if(value_request.success) {
                    setResponseSubmitRequest('success');
                } else {
                    setResponseSubmitRequest('fail');
                }

            setSubmitRequest(true);
            setLoadingSubmitRequest(false);

            }

        }



        return false;
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={() => { 
                setFilePreview('') 
                form.reset() 
            }}><img src={EditIcoSvg}/></AlertDialogTrigger>
            <AlertDialogContent className="lg:max-w-xl 2xl:max-w-2xl">
                {!isSubmitRequest ? (
                    <>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold text-md lg:text-2xl">Requests Edit Profile?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Need to change profile detail?, you can but we need identity evidence.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    
                    <AlertDialogForm>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="">
                                            <FormField
                                            control={form.control}
                                            name="firstname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input onChange={(e) => { field.onChange(e) }} placeholder="Name"/>
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}/>
                                        </div>
                                        <div className="">
                                            <FormField
                                            control={form.control}
                                            name="surname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Surname <span className="text-red-500">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input onChange={(e) => { field.onChange(e) }} placeholder="Surname"/>
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}/>
                                        </div>
                                        <div className="col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="file_upload"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        <div className="flex flex-wrap flex-row items-center">
                                                            Identity File <span className="text-red-500 ml-1 mr-1">*</span>
                                                            <Popover>
                                                                <PopoverTrigger><img src={InfoSvg}/></PopoverTrigger>
                                                                <PopoverContent className="bg-[#000000] p-2 rounded-none border-0 text-white font-light">File for identity owner this result</PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl className="hidden">
                                                        <Input accept="image/jpeg, image/jpg , image/png, image/webp" ref={fileUploadRef} id="file" className="" type="file" onChange={(e) => { 
                                                            if(e.target.files) {
                                                                // setFilePreview(URL.createObjectURL(e.target.files[0]))
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    if(reader.result) {
                                                                        setFilePreview(reader.result);
                                                                    }
                                                                // setFilePreview(URL.createObjectURL(file));
                                                                };
                                                                reader.readAsDataURL(e.target.files[0]);
                                                            }
                                                            return field.onChange(e.target.files)
                                                            
                                                            }}/>
                                                    </FormControl>
                                                        <div className="p-3 flex flex-wrap flex-col justify-center text-center rounded-xl bg-[#F3F8FE] border-2 border-dashed border-[#479EFB] w-full space-y-2"  onClick={() => { filePreview == '' && openUploadFile() }}>
                                                            {filePreview != '' ? 
                                                            (
                                                                <div className="w-full flex flex-col flex-wrap items-center">
                                                                        <iframe src={filePreview} style={{width:'fit-content'}} height="200px"></iframe>
                                                                        <Button className="w-full" size={"sm"} variant={"default"} onClick={() => openUploadFile()}>Change File?</Button>

                                                                    {/* <img src={filePreview}/> */}
                                                                </div>
                                                            ) : (
                                                                <>
                                                                <img src={FileSvg}/>
                                                                <span className="text-xs text-slate-400 font-normal">Upload a file or drag and drop </span>
                                                                <span className="text-xs text-slate-400 font-normal">Supported file formate : PDF, JPG, PNG </span>
                                                                </>
                                                            )}
                                                        </div>

                                                    <FormMessage />
                                                </FormItem>
                                            )}/>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                    </AlertDialogForm>
                    <AlertDialogFooter className="justify-center mt-4">
                        <AlertDialogCancel className="w-[100%] lg:w-[50%]">Cancel</AlertDialogCancel>
                        <AlertDialogAction {...loadingSubmitRequest && {disabled:true}} onClick={form.handleSubmit(onSubmit)} className="w-[100%] lg:w-[50%] bg-[#00A8DE] hover:bg-[#0083CA]">
                        {loadingSubmitRequest && 
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        }
                            Save
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    </>
                ) : (
                    responseSubmitRequest == 'success' ? 
                    (
                        <>
                            <div className="flex flex-wrap flex-col items-center space-y-4">
                                <div className="flex flex-wrap flex-row w-full justify-center items-center space-x-2">
                                    <div className="p-2 rounded-full bg-green-500 w-fit">
                                        <CheckCheck size="1.5rem" className="text-white font-semibold"/>
                                    </div>
                                    <div className="w-fit text-md lg:text-xl"><span className="font-bold">Thank you!</span></div>
                                </div>
                                    <span className="block">We have received your information and will review it as soon as possible.</span>
                                    <AlertDialogCancel onClick={()=> navigate(0 as any, { relative: "path" })} className="w-[100%] lg:w-[50%] mt-3">Close</AlertDialogCancel>                                                                
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-wrap flex-col items-center space-y-4">
                                <div className="flex flex-wrap flex-row w-full justify-center items-center space-x-2">
                                    <div className="p-2 rounded-full bg-red-500 w-fit">
                                        <X size="1.5rem" className="text-white font-semibold" />
                                    </div>
                                    <div className="w-fit text-md lg:text-xl"><span className="font-bold">Oops!</span></div>
                                </div>
                                <span className="block">some mistake please contact support.</span>
                                <AlertDialogCancel onClick={()=> navigate(0 as any, { relative: "path" })} className="w-[100%] lg:w-[50%] mt-3">Close</AlertDialogCancel>
                            </div>
                        </>
                    )
                )}
            </AlertDialogContent>
        </AlertDialog>
    )
}