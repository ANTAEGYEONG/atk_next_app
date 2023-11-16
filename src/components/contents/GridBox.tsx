import Image from "next/image"
import "@/app/globals.css"

const GridBox = ({content}) => {
    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    return(
        <div className={"bg-white mb-[20px] w-auto h-auto hover:shadow content-center pl-4 pr-4 sm:pl-6 sm:pr-6"}>
            <div className={"absolute top-1/10 left-1/10 z-10"}>
                <div className={"h-[14px] w-[60px] leading-[14px] text-white text-[10px] text-center font-normal relative uppercase mb-[1px] bg-orange-300"}>
                    추천
                </div>
            </div>
            <div className={"relative overflow-hidden bg-white text-center box-border"}>
                <div className={"relative overflow-hidden box-border mx-auto my-auto"}>
                    <div className={"relative overflow-hidden w-full h-full mx-auto my-auto"}>
                        <img src={content.image} className={"mx-auto my-auto max-w-full h-auto object-cover"} alt={""}></img>
                    </div>
                </div>
            </div>
            <div className={"relative text-center overflow-hidden"}>
                <div className={"w-full h-auto overflow-hidden relative mx-auto mb-5 mt-2"}>
                    <span>{content.title}</span>
                </div>
                <div className={"w-full h-auto overflow-hidden relative mx-auto"}>
                    <span>{addComma(content.price)} 원</span>
                </div>
                <div className={"overflow-hidden relative mx-auto mt-[8px] text-[11px]"}>
                    <p>설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.</p>
                </div>
            </div>
        </div>
    )
}

export default GridBox
