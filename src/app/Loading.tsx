import {FadeLoader} from "react-spinners";
import "@/app/globals.css"

export default function Loading(){
    return(
        <div>
            <div className={"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                <FadeLoader height={15} width={5} radius={2} margin={2}></FadeLoader>
            </div>
        </div>
    )
}
