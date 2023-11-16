import {
    IconButton
} from "@material-tailwind/react"
import "@/app/globals.css"

export default function Button(props){

    console.log(typeof props.click)

    return(
        <IconButton
            variant="text"
            className={props.class}
            ripple={false}
        >
            {props.children}
        </IconButton>
    )
}
