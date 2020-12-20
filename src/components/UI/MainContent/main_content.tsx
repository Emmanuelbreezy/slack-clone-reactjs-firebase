import React from "react";
import { MainChatBox } from "./Layer/main_chatbox";
import { MainHeader } from "./Layer/main_header";
import { MainMessages } from "./Layer/main_messages";

type MainContentProps = {}

export const MainContent = (prop:MainContentProps) => {
    return (
        <div className="bg-white text-black w-full flex">
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
                <MainHeader />
                <MainMessages />
                <MainChatBox />
            </div>
            <div className="meta-panel flex-shrink w-2/6 ring-1 ring-gray-300 h-screen overflow-hidden">
                <div className="border-b border-gray-200 p-3 h-auto">
                    <h2>Detail</h2>
                    <span>#social-media</span>
                </div>
            </div>
        </div>
    )
}