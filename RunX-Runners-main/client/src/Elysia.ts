import { edenFetch, edenTreaty, treaty } from "@elysiajs/eden";
import type { App } from '@/../../src/server.ts'
import { getJwtSession } from "./lib/utils";

export const apiWithToken = () => {

    const token = getJwtSession();
    return treaty<App>(import.meta.env.VITE_API_URL, {
        headers: {
            authorization: `Bearer ${token}`
        },
    }) as any;
}

export const api = edenTreaty<App>(import.meta.env.VITE_API_URL) as any;

export const fetcher = (url: string) => edenFetch<App>(url) as any;