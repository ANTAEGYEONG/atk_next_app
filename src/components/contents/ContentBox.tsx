import "@/app/globals.css"

export default function ContentBox({content}){
    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    return(
        <div className={"relative bg-white w-auto h-auto hover:shadow"}>
            {/*이미지 영역*/}
            <div className={"absolute z-1 overflow-hidden bg-white w-[146px]"}>
                <div className={"relative overflow-hidden w-full"}>
                    <div className={"absolute t-[10px] l-[10px]"}>
                        <div className={"h-[14px] w-[60px] leading-[14px] text-white text-[10px] text-center font-normal relative uppercase mb-[1px] bg-orange-300"}>
                            추천
                        </div>
                        <div className={"h-[14px] w-[60px] leading-[14px] text-white text-[10px] text-center font-normal relative uppercase mb-[1px] bg-red-300"}>
                            신상
                        </div>
                    </div>
                    <img src={content.image} className={"mx-auto my-auto max-w-full h-auto object-cover"} alt={""}></img>

                </div>
            </div>
            <div className={"pl-[155px] min-h-[146px] text-left"}>
                <div className={"relative b-0 overflow-hidden z-1 px-[10px] pb-[10px]"}>
                    <h4 className={"relative overflow-hidden mt-[10px] mb-[5px] h-[40px]"}>{content.title}</h4>
                    <div>
                        <span className={"text-[13px] font-bold"}>
                            {addComma(content.price)}
                        </span> 원
                        <span className={"text-[13px] text-slate-300 line-through ml-[7px] font-normal"}>회원공개</span>
                    </div>
                    <div className={"relative overflow-hidden h-[34px] text-[11px] mt-[8px] text-slate-500"}>
                        <p>설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.</p>
                    </div>
                </div>
            </div>
            <div className={"block relative clear-both"}>

            </div>
            <div className={"relative overflow-hidden py-[7px] px-[10px]"}>
                <span className={"text-[12px]"}>
                    리뷰보기
                </span>
            </div>
        </div>
    )
}
