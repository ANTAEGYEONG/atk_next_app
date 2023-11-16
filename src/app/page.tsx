"use client"

import GridList from "@/components/contents/GridList"
import useSWR from "swr";
import "@/app/globals.css"

export default function Home() {

    let fetcher = async (url : String) => await fetch(url).then(res => res.json()).then(result => result)
    const {data, error} = useSWR(process.env.NEXT_PUBLIC_BASE_URL + "/productlist?_sort=id&_order=desc", fetcher)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-4 tablet:px-12 lg:px-24">
            <GridList data={data}/>
        </main>
    )
}
