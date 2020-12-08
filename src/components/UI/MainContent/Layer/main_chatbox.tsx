import React from "react";

type MainChatBoxProps = {}

export const MainChatBox = (prop:MainChatBoxProps) => {
    return (
        <div className="w-full flex flex-shrink-0 p-3 items-center justify-center">
            <div className=" w-full ml-3  mr-3 ring-2 ring-gray-400  rounded-md bg-white">
                <div className="w-full bg-white p-1 rounded-t-md ">
                    <textarea className="focus:outline-none w-full"></textarea>
                </div>
                <div className="h-10  bg-gray-100 border-t-2 rounded-b-md border-gray-200">
                    <ul className="flex p-2 space-x-3">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}