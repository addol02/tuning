import bgHeader from '@/assets/bg_home_01.png'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { api } from "@/Elysia"

import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setJwtSession } from '@/lib/utils'


const formSchema = z.object({
    email: z.string().min(4).refine((val) => {
        return !/[\$!^&*%#)()?]/.test(val); 
    }),
    password: z.string().min(4)
})

export default function AdminLogin() {

    useEffect(() =>{
        console.log(window.outerWidth)
        

        console.log(window.outerHeight)
    },[])
    // const clientFetch = edenFetch<App>(import.meta.env.VITE_API_URL) as any;

    const { toast } = useToast()
    const navigate = useNavigate();

    // async function checkLoginExist() {
    //     // const data = await clientFetch('/api/admin/currentUser', {
    //     //     method:'POST',
    //     //     headers:{
    //     //         Authorization: 'Bearer edenFetch'
    //     //     }
    //     // })

    //     const {data: value, error: errorInfo} = await apiWithToken.api.admin.currentUser.post()

    //     // console.log(data)
    //     // const headers = new Headers();
    //     // headers.append("Set-Cookie", "foo=bar");
    //     // // header
    //     // const {data: value, error: errorInfo} = await client.api.admin.currentUser.post()
    //     //     if(value && !errorInfo) {
    //     //         console.log(value)
    //     //     } 
    // }

    // useEffect(() => {
    //     checkLoginExist()
    // },[])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        if(values) {
            
            const {data: value, error: errorInfo} = await api.api.admin.login.post(values)

            if(value && !errorInfo) {
                setJwtSession(value.data.token);
                toast({
                    variant: "success",
                    title: value.success_msg,
                    description: "redirect in 5 second to dashboard."
                  })
                  setTimeout(() => {
                    
                    navigate('/administrator/dashboard')
                  }, 2000)
            } else {
                toast({
                    variant: "destructive",
                    title: errorInfo.value.error_msg,
                    description: "please try again later."
                  })
            }
        }
    }

    return (
        <div style={{
            backgroundImage: `url(${bgHeader})`, 
            height:'100vh',
            width:'100vw',
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat'
        }} className="overlayimg-black-equal flex flex-wrap justify-center"
        >
            <div className="m-auto w-full lg:w-[80%] lg:h-[90%] z-50 sticky h-full flex flex-wrap flex-col p-4 lg:p-10">
                <div className="w-full text-left flex flex-wrap flex-col justify-end lg:justify-normal p-2 grow">
                    <h1 className="text-white font-bold text-5xl">RunX</h1>
                </div>
                <div className="w-full xl:flex xl:flex-wrap xl:flex-col xl:justify-center 2xl:justify-normal grow">
                <Card className="relative w-full lg:h-fit lg:w-[50%] 2xl:w-[45%] 3xl:w-[40%] lg:p-4">
                    <CardHeader className="items-start">
                        <CardTitle className="lg:text-4xl">Login</CardTitle>
                        <CardDescription className="mt-4">System for manage runners in runx.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="text-left">
                                        <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="email" className="border-0 placeholder:text-sm bg-[#F5F5F5]" onChange={(e) => { field.onChange(e) }} placeholder="E-mail"/>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                    </div>
                                    <div className="text-left">
                                        <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="password" className="border-0 placeholder:text-sm bg-[#F5F5F5]" onChange={(e) => { field.onChange(e) }} placeholder="Password"/>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                    </div>
                                    <div className="text-left">
                                        <Button className="w-full bg-[#00A8DE] hover:bg-[#0083CA]" type="submit">Login</Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                </div>
                <div className="w-full text-right flex flex-wrap flex-col justify-normal lg:justify-end text-white font-light grow">
                    <b className="font-bold">Thaidotrun co. ltd</b>
                    <span>809 Stadium One Chulalongkorn Soi 2,</span>
                    <span>Wangmai, Pathumwan 10330 Bangkok.</span>
                </div>
            </div>
        </div>
    )
}