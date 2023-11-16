import ContentBox from "@/components/contents/ContentBox";

export default function ContentList({data}){

    return (
        <div role={"list"} className={"w-full flex item-start grid grid-cols-1 tablet:grid-cols-2 px-5 tablet:px-15 lg:px-30 gap-5 mt-16 mb-32"}>

            {
                data == undefined || data == null ? <></> :
                    (
                        data.map((content : Object) => {
                            return(
                                <ContentBox key={content.id} content={content}></ContentBox>
                            )
                        })
                    )
            }
        </div>
    )
}
