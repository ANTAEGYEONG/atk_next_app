"use client"

import {useEffect, useState} from "react";
import useSWR from "swr";
import GridList from "@/components/contents/GridList";
import ContentList from "@/components/contents/ContentList";

export default function SearchPage(){
    let [sort, setSort] = useState("grid")                                          // 리스트 출력방식 (그리드, 리스트)
    let [sortOpen , setSortOpen] = useState(false)                                  // (모바일) 정렬팝업 오픈
    let [listSort, setListSort] = useState(1)                                       // 정렬방식 선택 (1. 최근등록순, 2. 판매많은순, 3. 낮은가격순, 4. 높은가격순, 5. 평점높은순, 6. 후기많은순 )
    let [listurl, setListurl] = useState(process.env.NEXT_PUBLIC_BASE_URL + "/productlist?_sort=id&_order=desc")     // 리스트 호출하는 url

    const sortChange = () => {

        if(sort == "grid"){
            setSort("list")
        }else{
            setSort("grid")
        }

    }

    useEffect(()=>{
        if(listSort == 1){
            setListurl(process.env.NEXT_PUBLIC_BASE_URL + "/productlist?_sort=id&_order=desc")
        }else if(listSort == 2){
            setListurl(process.env.NEXT_PUBLIC_BASE_URL + "/productlist?_sort=id&_order=desc")
        }else if(listSort == 3){
            setListurl(process.env.NEXT_PUBLIC_BASE_URL + "/productlist?_sort=price&_order=asc")
        }else if(listSort == 4){
            setListurl(process.env.NEXT_PUBLIC_BASE_URL + "/productlist?_sort=price&_order=desc")
        }else if(listSort == 5){
            setListurl(process.env.NEXT_PUBLIC_BASE_URL + "/productlist?_sort=id&_order=desc")
        }else if(listSort == 6){
            setListurl(process.env.NEXT_PUBLIC_BASE_URL + "/productlist?_sort=id&_order=desc")
        }
    },[listSort])

    const sortClick = (code) => {
        setListSort(code)
        setSortOpen(!sortOpen)
    }


    let fetcher = async (url : String) => await fetch(url).then(res => res.json()).then(result => result)
    const {data, error} = useSWR(listurl, fetcher)

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between px-4 tablet:px-12 lg:px-24">
                <div className={"flex relative w-full justify-between"}>
                    <div className={"relative mt-[30px]"}>
                        <div className={"w-full hidden tablet:block"}>
                            <span
                                className={`py-[10px] px-[20px] text-gray-600 text-center cursor-pointer inline-block text-[13px] ${listSort == 1 ? "border-black font-bold border-b-2 border-solid" : ""}`}
                                onClick={()=>setListSort(1)}>
                                최근등록순
                            </span>
                            <span
                                className={`py-[10px] px-[20px] text-gray-600 text-center cursor-pointer inline-block text-[13px] ${listSort == 2 ? "border-black font-bold border-b-2 border-solid" : ""}`}
                                onClick={()=>setListSort(2)}>
                                판매많은순
                            </span>
                            <span
                                className={`py-[10px] px-[20px] text-gray-600 text-center cursor-pointer inline-block text-[13px] ${listSort == 3 ? "border-black font-bold border-b-2 border-solid" : ""}`}
                                onClick={()=>setListSort(3)}>
                                낮은가격순
                            </span>
                            <span
                                className={`py-[10px] px-[20px] text-gray-600 text-center cursor-pointer inline-block text-[13px] ${listSort == 4 ? "border-black font-bold border-b-2 border-solid" : ""}`}
                                onClick={()=>setListSort(4)}>
                                높은가격순
                            </span>
                            <span
                                className={`py-[10px] px-[20px] text-gray-600 text-center cursor-pointer inline-block text-[13px] ${listSort == 5 ? "border-black font-bold border-b-2 border-solid" : ""}`}
                                onClick={()=>setListSort(5)}>
                                평점등록순
                            </span>
                            <span
                                className={`py-[10px] px-[20px] text-gray-600 text-center cursor-pointer inline-block text-[13px] ${listSort == 6 ? "border-black font-bold border-b-2 border-solid" : ""}`}
                                onClick={()=>setListSort(6)}>
                                후기많은순
                            </span>
                        </div>
                    </div>
                    <div className={"relative mt-[30px] border-t-3"}>

                        <div className=" bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex hidden tablet:block">
                            <button
                                className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 ${sort == "grid" ? "active" : ""}`}
                                id="grid"
                                onClick={() => {sortChange()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="fill-current w-4 h-4 mr-2">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                <span>Grid</span>
                            </button>
                            <button
                                className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-4 py-2 ${sort == "list" ? "active" : ""}`}
                                id="list"
                                onClick={() => {sortChange()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="fill-current w-4 h-4 mr-2">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                                <span>List</span>
                            </button>
                        </div>
                        <div className=" bg-white-400 text-sm text-black leading-none  inline-flex block tablet:hidden">
                            <button
                                className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-r-full px-2 py-2`}
                                onClick={() => setSortOpen(!sortOpen)}>
                                <svg className="h-6 w-6 text-black" width="24" height="24" viewBox="0 0 24 24"
                                     strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <rect x="4" y="6" width="4" height="5" rx="1"/>
                                    <line x1="6" y1="4" x2="6" y2="6"/>
                                    <line x1="6" y1="11" x2="6" y2="20"/>
                                    <rect x="10" y="14" width="4" height="5" rx="1"/>
                                    <line x1="12" y1="4" x2="12" y2="14"/>
                                    <line x1="12" y1="19" x2="12" y2="20"/>
                                    <rect x="16" y="5" width="4" height="6" rx="1"/>
                                    <line x1="18" y1="4" x2="18" y2="5"/>
                                    <line x1="18" y1="11" x2="18" y2="20"/>
                                </svg>
                            </button>
                            <Collapse open={sortOpen} className={"absolute top-[32px] right-[45px] w-[120px] bg-white text-black p-0 z-10 border-3 border-black text-center"}>
                                <ul>
                                    <li className={`px-[20px] py-[10px] border-[1px] border-solid border-black ${ listSort == 1 ? "bg-blue-200" : "" }`} onClick={() => sortClick(1)}>
                                        최근등록순
                                    </li>
                                    <li className={`px-[20px] py-[10px] border-[1px] border-solid border-black ${ listSort == 2 ? "bg-blue-200" : "" }`} onClick={() => sortClick(2)}>
                                        판매많은순
                                    </li>
                                    <li className={`px-[20px] py-[10px] border-[1px] border-solid border-black ${ listSort == 3 ? "bg-blue-200" : "" }`} onClick={() => sortClick(3)}>
                                        낮은가격순
                                    </li>
                                    <li className={`px-[20px] py-[10px] border-[1px] border-solid border-black ${ listSort == 4 ? "bg-blue-200" : "" }`} onClick={() => sortClick(4)}>
                                        높은가격순
                                    </li>
                                    <li className={`px-[20px] py-[10px] border-[1px] border-solid border-black ${ listSort == 5 ? "bg-blue-200" : "" }`} onClick={() => sortClick(5)}>
                                        평점높은순
                                    </li>
                                    <li className={`px-[20px] py-[10px] border-[1px] border-solid border-black ${ listSort == 6 ? "bg-blue-200" : "" }`} onClick={() => sortClick(6)}>
                                        후기많은순
                                    </li>
                                </ul>
                            </Collapse>

                            <button className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-r-full px-2 py-2`}
                                    onClick={() => {sortChange()}}>
                                {
                                    sort == "list" ? (
                                        <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6 text-gray-600" width="24" height="24"
                                             viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <line x1="9" y1="6" x2="20" y2="6"/>
                                            <line x1="9" y1="12" x2="20" y2="12"/>
                                            <line x1="9" y1="18" x2="20" y2="18"/>
                                            <line x1="5" y1="6" x2="5" y2="6.01"/>
                                            <line x1="5" y1="12" x2="5" y2="12.01"/>
                                            <line x1="5" y1="18" x2="5" y2="18.01"/>
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {
                    sort == "grid" ? <GridList data={data}/> : <ContentList data={data}/>
                }
            </main>
        </>

    )
}
