"use client"

import React, {useState, useEffect, useContext} from "react";
import Link from "next/Link"
import {useRouter} from "next/navigation"
import {Typography} from "@material-tailwind/react"
import "@/app/globals.css"
import { HeaderContext } from "@/components/header/Header"

export default function MenuComp({menu}) {
    let [active, setActive] = useState(false)

    let {openNav, setOpenNav} = useContext(HeaderContext)

    let router = useRouter();

    const clickcontent = (menu) => {
        if(menu.lowerlist.length == 0) {
            router.push(menu.url)
            setOpenNav(!openNav)
        }else{
            if(active){
                router.push(menu.url)
                setOpenNav(!openNav)
            }else{
                setActive(true)
            }
        }
    }

    useEffect(()=>{
        if(!openNav){
            setActive(false)
        }
    }, [openNav])


    return (
        <li>
            <Typography
                as="div"
                variant="small"
                color="black"
                className={`p-3 bg-white font-medium relative liborder float-none ${active ? "open" : ""}`}
            >
                <Link
                    className="flex items-center hover:text-blue-500 transition-colors"
                    href={menu.url}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {menu.name}
                </Link>

                {
                    menu.lowerlist.length == 0 ? <></> :
                        (
                            <div
                                className={"border-l-3 border-gray absolute top-[1px] right-0 w-[45px] h-[45px] leading-[40px] m-0 p-0 flex justify-center items-center border-0 z-10"}
                                onClick={() => setActive(!active)}
                            >
                                {
                                    active ? (
                                        <svg className="h-[30px] w-[30px] text-black text-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M19 9l-7 7-7-7"/>
                                        </svg>
                                    ) : (
                                        <svg className="h-[30px] w-[30px] text-black text-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                        </svg>
                                    )
                                }
                            </div>
                        )
                }

            </Typography>
            {
                menu.lowerlist.length == 0 ? <></> :
                (
                    <ul className={`hidden-box bg-white ${active ? "open" : ""}`}>
                        {
                            menu.lowerlist.map((item)=>{
                                return(
                                    <li key={item.id} className={"lisubborder bg-white"}>
                                        <Link
                                            href={item.url}
                                            className={"flex p-3 items-center text-black hover:text-blue-500 transition-colors"}
                                            onClick={() => setOpenNav(!openNav)}
                                        >
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.subname}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </li>
    )
}
