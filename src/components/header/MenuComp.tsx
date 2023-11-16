"use client"

import React, {useState, useEffect, useContext} from "react";
import Link from "next/Link"
import {Typography} from "@material-tailwind/react"
import "@/app/globals.css"


export default function MenuComp({menu}) {
    let [active, setActive] = useState(false)

    const handleMouseOver = () => {
        setActive(true);
    };

    const handleMouseOut = () => {
        setActive(false);
    };



    return (
        <>
            <Typography
                as="li"
                variant="small"
                color="black"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={`p-3 bg-white font-medium relative liborder ${active ? "open" : ""}`}
            >
                <Link
                    href={menu.url}
                    className="flex items-center hover:text-blue-500 transition-colors"
                >
                    {menu.name}
                </Link>
                {
                    menu.lowerlist.length == 0 ? <></> :
                        (
                            <ul className={"hidden-box bg-white"}>
                                {
                                    menu.lowerlist.map((item)=>{
                                        return(
                                            <li key={item.id} className={"lisubborder px-4 py-2"}>
                                                <Link
                                                    href="@/components/header/MenuComp#"
                                                    className={"flex items-center hover:text-blue-500 transition-colors"}
                                                >
                                                    {item.subname}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
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
                                                href="@/components/header/MenuComp#"
                                                className={"flex p-3 items-center text-black hover:text-blue-500 transition-colors"}
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
        </>
    )
}
