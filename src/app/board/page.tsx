"use client"

import "@/app/board/table.css"
import useSWR from "swr";
import Pagination from "@/components/pagination/Pagination";
import {useCallback, useEffect, useRef, useState} from "react";


export default function board(){

    let [pager, setPager] = useState({
                                pageNo: 1,
                                rowSize: 10,
                                blockSize: 5,
                                endSize:0,
                                list: [],
                            })

    let fetcher = async (url : String) => await fetch(url).then(res => res.json()).then(result => result)
    let {data, error} = useSWR(`http://localhost:9999/noticelist?_page=${pager.pageNo}&_limit=${pager.rowSize}` , fetcher)

    let [totalSize, setTotalSize] = useState(26)
    // let [totalSize, setTotalSize] = useState(data.total)

    useEffect(()=>{
        forceUpdate()
        console.log("강제 리렌더링 실행")
    },[])

    const createPager = (pager) => {

        let _list = [];
        let _prePager : number = totalSize
        let _nxtPager : number = pager.rowSize
        let _endPager : number = (_prePager % _nxtPager) == 0 ? (_prePager / _nxtPager) : ( (_prePager - (_prePager % _nxtPager)) / _nxtPager ) + 1

        //let _endPager : number = parseInt((_prePager / _nxtPager).toFixed())

        //  let _endPagerNo=parseInt((pager.totalSize-1)/pager.rowSize)+1;
        let _endPagerNo : number = (_endPager == 0) ? 1 : _endPager;


        let _startBlock = (pager.pageNo - (pager.pageNo % pager.blockSize)) + 1


        ///let _startBlock = parseInt((( (pager.pageNo) / pager.blockSize ) * (pager.blockSize)).toFixed());
        let index : number = 0;
        let _endBlock = 0;
        let _nextBlock = 0;

        for(let i = _startBlock ; i <= _endPagerNo ; i++){

            if(index < pager.blockSize) {

                _list.push(i);
                _endBlock = i;

                if(i < _endPagerNo){
                    _nextBlock = i;
                }

                index++;

            } else {

                break;

            }
        }//end for

        pager.list = _list;
        pager.startBlock = _startBlock;
        pager.nextBlock = _nextBlock;
        pager.endSize = _endPagerNo;

        return pager;
    }

    const onClickPagerNo = (n) => {
        setPager(prevState => ({
            ...prevState,
            pageNo: n==0 ? 1:n
        }))

        console.log(totalSize)
    }

    useEffect(()=>{
        setTotalSize(26)
        // setTotalSize(data.total)
        console.log("useeffect 1번 실행 : " + totalSize)

        setPager(createPager(pager))

        console.log("useeffect 2번 실행 : " + pager.list)
    },[data])


    const [, updateState] = useState();
    const forceUpdate = useCallback(()=>updateState({}), [])


    return (
        <div className={"py-[30px]"}>
            <div className={"px-[15px] mx-auto w-full"}>
                <div className={"-mx-[15px]"}>
                    <div className={"relative min-h-[1px] px-[15px] pb-[15px] w-full float-left"}>
                        <div className={"!rounded-none"}>
                            <div className={"mb-[20px]"}>
                                <div className={"text-left mt-[5px] text-gray-500"}>
                                    <u>전체 {totalSize}건 - {pager.pageNo} 페이지</u>
                                </div>
                            </div>
                            <div className={"block relative clear-both"}>

                            </div>
                            <div className={"text-[13px] mb-[20px]"}>
                                <div className={"!rounded-none"}>
                                    <table className={"w-full max-w-full mb-[20px]"}>
                                        <thead>
                                            <tr>
                                                <th className={"w-32"}>
                                                    번호
                                                </th>
                                                <th>
                                                    제목
                                                </th>
                                                <th className={"w-48"}>
                                                    글쓴이
                                                </th>
                                                <th className={"w-32"}>
                                                    날짜
                                                </th>
                                                <th className={"w-32"}>
                                                    뷰
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data == null || data == undefined || data.length == 0 ? <></> :
                                                    (
                                                        data.map((item)=>{
                                                            return(
                                                                <tr key={item.id}>
                                                                    <td>
                                                                        {item.id}
                                                                    </td>
                                                                    <td>
                                                                        {item.title}
                                                                    </td>
                                                                    <td>
                                                                        {item.name}
                                                                    </td>
                                                                    <td>
                                                                        {item.date}
                                                                    </td>
                                                                    <td>
                                                                        {item.view}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Pagination pass={pager} key={pager.pageNo} onClickPagerNo={onClickPagerNo}></Pagination>
                    </div>
                </div>
            </div>
        </div>

    )
}
