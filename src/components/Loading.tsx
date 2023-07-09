import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="flex justify-center mt-[6rem] mb-[20rem] color-indigo-100">
            <TailSpin height={100} width={100} color="#b1aee4"/>
        </div>
            
    )
}