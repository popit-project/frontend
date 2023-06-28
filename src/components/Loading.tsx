import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="flex justify-center mt-[20rem] mb-[20rem]">
            <TailSpin height={200} width={200}/>
        </div>
            
    )
}