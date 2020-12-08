import React from "react";
import { MainChatBox } from "./Layer/main_chatbox";
import { MainHeader } from "./Layer/main_header";

type MainContentProps = {}

export const MainContent = (prop:MainContentProps) => {
    return (
        <div className="bg-white flex-1 flex flex-col h-screen overflow-hidden">
            <MainHeader />
            <div className="flex-1 p-2  overflow-y-auto">
                <div className="m-3">
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                    <p>MainContent</p>
                </div>
                
            </div>
            <MainChatBox />
        </div>
    )
}