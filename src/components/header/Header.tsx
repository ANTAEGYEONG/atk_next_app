"use client"

import React, {useState, useEffect, createContext, useRef, useLayoutEffect} from "react";
import Link from "next/Link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
    Navbar,
    Collapse,
    Typography,
    IconButton
} from "@material-tailwind/react"
import "@/app/globals.css"

import MenuComp from "@/components/header/MenuComp";
import MenuMobileComp from "@/components/header/MenuMobileComp";
import useSWR from "swr";

export const HeaderContext = createContext();

function NavHeader() {

    const [mounted, setMounted] = useState(false)

    let fetcher = async (url : String) => await fetch(url).then(res => res.json()).then(result => result)
    let {data, error} = useSWR(mounted ? "http://localhost:9999/menulist" : null, fetcher)

    useEffect(()=>{
        console.log("mounted!")
        setMounted(true)
    },[])

    //console.log(data)

    return(
        <ul className="tablet:my-2 flex flex-col navbar-nav justify-center space-x-0 tablet:mb-0 tablet:space-x-20 tablet:mt-0 tablet:flex-row tablet:gap-4">
            {
                data == undefined || data == null ? <></> :
                    data.map((item)=>{
                    return(
                        <MenuComp key={item.id} menu={item}></MenuComp>
                    )
                })
            }
        </ul>
    );
}

function NavMobileHeader() {

    const [mounted, setMounted] = useState(false)

    let fetcher = async (url : String) => await fetch(url).then(res => res.json()).then(result => result)
    let {data, error} = useSWR(mounted ? "http://localhost:9999/menulist" : null, fetcher)

    useEffect(()=>{
        console.log("mounted!")
        setMounted(true)
    },[])

    //console.log(data)

    return(
        <ul className="tablet:my-2 flex flex-col navbar-nav justify-center space-x-0 tablet:mb-0 tablet:space-x-20 tablet:mt-0 tablet:flex-row tablet:gap-4">
            {
                data == undefined || data == null ? <></> :
                    data.map((item)=>{
                        return(
                            <MenuMobileComp key={item.id} menu={item}></MenuMobileComp>
                        )
                    })
            }
        </ul>
    );
}

export default function Header() {
    const [openNav, setOpenNav] = useState(false)
    const [openMobSearch, setOpenMobSearch] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)

    const router = useRouter()

    const handleWindowResize = () =>{
        console.log(window.innerWidth)
        window.innerWidth >= 912 && setOpenNav(false)
    }



    useEffect(()=>{
        window.addEventListener("resize", handleWindowResize)

        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    }, [])

    const focusingInput = () =>{
        setOpenSearch(true)
    }

    const basket = () => {
        router.push("/basket")
    }

    return (
        <>
            <HeaderContext.Provider value={{openNav, setOpenNav}}>
                <Navbar className="mx-auto my-auto tablet:pt-3 bg-white sticky top-0 z-[600]">
                    <div className="flex items-center justify-between text-blue-gray-900 pb-3 pt-3 tablet:pt-0">
                        <Typography
                            as="div"
                            variant="h6"
                            className="mr-4 ml-4 tablet:ml-0 tablet:px-6 tablet:pb-3 text-black cursor-pointer py-2.5"
                        >
                            <Link href="/" onClick={() => setOpenNav(false)}>
                                Next Tailwind
                            </Link>

                        </Typography>

                        <div className={"w-[148px] h-[38px] tablet:w-[198px] tablet:h-[50px] relative float-left"}>
                            <div className={"w-full h-full relative object-cover"}>
                                <Image src={"/images/mall.png"} alt={""} fill></Image>
                            </div>
                        </div>



                        <div className={"flex flex-row tablet:px-6 tablet:py-3"}>
                            <div className={`flex-row absolute float-left right-16 top-4 transition-all duration-300 ${openSearch ? "opacity-100" : "opacity-0"} hidden tablet:flex`}>
                                {
                                    openSearch ? (
                                        <IconButton
                                            variant="text"
                                            className="h-6 w-6 mt-2 mr-3 pr-[10px] text-black hover:bg-white focus:bg-white active:bg-white"
                                            ripple={false}
                                            onClick={()=>setOpenSearch(!openSearch)}
                                        >
                                            <svg className="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24"
                                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"/>
                                                <line x1="18" y1="6" x2="6" y2="18"/>
                                                <line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            variant="text"
                                            className="h-6 w-6 mt-2 mr-3 pr-[10px] text-black hover:bg-white focus:bg-white active:bg-white"
                                            ripple={false}
                                        >
                                            <svg className="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24"
                                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"/>
                                                <line x1="18" y1="6" x2="6" y2="18"/>
                                                <line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </IconButton>
                                    )
                                }
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-3/5">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="h-4 w-4 text-black" width="24" height="24" viewBox="0 0 24 24"
                                             strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <circle cx="9" cy="19" r="2"/>
                                            <circle cx="17" cy="19" r="2"/>
                                            <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2"/>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="상품 검색어 입력"
                                    />
                                </div>
                                <button type="submit"
                                        className="p-2.5 ml-2 text-sm font-medium text-white z-1 bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                         fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>

                            {
                                !openSearch ? (
                                    <IconButton
                                        variant="text"
                                        className={`ml-auto h-6 w-6 mr-[3px] text-black hover:bg-white focus:bg-white active:bg-white transition-all duration-300 ${!openSearch ? "opacity-100" : "opacity-0"} hidden tablet:block`}
                                        ripple={false}
                                        onClick={()=>setOpenSearch(!openSearch)}
                                    >
                                        <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                             width="30"
                                             height="30" viewBox="0 0 30 30">
                                            <path
                                                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                            </path>
                                        </svg>
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        variant="text"
                                        className={`ml-auto h-6 w-6 mr-[3px] text-black pointer-events-none hover:bg-white focus:bg-white active:bg-white transition-all duration-300 opacity-0 z-0 hidden tablet:block`}
                                        ripple={false}
                                    >
                                        <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                             width="30"
                                             height="30" viewBox="0 0 30 30">
                                            <path
                                                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                            </path>
                                        </svg>
                                    </IconButton>
                                )
                            }



                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 mr-[3px] text-black hover:bg-white focus:bg-white active:bg-white hidden tablet:block"
                                ripple={false}
                                onClick={()=>basket()}
                            >
                                <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </IconButton>
                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 mr-[3px] text-black hover:bg-white focus:bg-white active:bg-white hidden tablet:block"
                                ripple={false}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </IconButton>
                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 mr-[3px] text-black hover:bg-white focus:bg-white active:bg-white hidden tablet:block"
                                ripple={false}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </IconButton>
                        </div>



                        <div className={"flex flex-row item-center tablet:hidden relative"}>
                            <div className={"relative tablet:px-6 tablet:pb-3 block tablet:hidden"}>
                                <IconButton
                                    variant="text"
                                    className="ml-auto h-6 w-6 text-black hover:bg-white focus:bg-white active:bg-white"
                                    ripple={false}
                                    onClick={() => setOpenMobSearch(!openMobSearch)}
                                >
                                    <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                         width="30"
                                         height="30" viewBox="0 0 30 30">
                                        <path
                                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                        </path>
                                    </svg>
                                </IconButton>
                            </div>
                            <IconButton
                                variant="text"
                                className="ml-1 mr-4 mt-1 relative tablet:mr-0 h-6 w-6 text-black hover:bg-white focus:bg-white active:bg-white tablet:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                )}
                            </IconButton>
                        </div>


                    </div>
                    <div className="hidden tablet:block">
                        <NavHeader />
                    </div>
                    <Collapse open={openNav} className={"absolute"}>
                        <NavMobileHeader />
                    </Collapse>
                </Navbar>
                <Collapse open={openMobSearch} className={"absolute z-[100]"}>
                    <div className={"w-screen h-screen bg-white relative"}>
                        <div className={"w-4/5 h-4/5 mx-auto mt-8 relative"}>
                            <label className="relative block">
                                <input
                                    className="w-full bg-white placeholder:font-italitc border border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-10 focus:outline-none"
                                    placeholder="상품 검색어 입력" type="text"/>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                    <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                                         height="30" viewBox="0 0 30 30">
                                        <path
                                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                        </path>
                                    </svg>
                                </span>
                            </label>
                        </div>
                    </div>
                </Collapse>

            </HeaderContext.Provider>
            <div className={`dim-layer ${ openNav ? "show" : "hide"}`} onClick={() => setOpenNav(false)}></div>
        </>
    )
}
