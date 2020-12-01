import React from "react";

type MainChatBoxProps = {}

export const MainChatBox = (prop:MainChatBoxProps) => {
    return (
        <div className=" flex flex-shrink-0 items-center justify-between border-t
         bg-white border-gray-200 p-5">
            <div>
                <button>#grow</button>
            </div>
        </div>
    )
}