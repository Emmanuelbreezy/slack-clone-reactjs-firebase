import React from "react";
import { MainContent } from "./MainContent/main_content";
import { SideBar } from './SideBar/sidebar';


export const ContentAll = ({loading}:any) => {
    return (
            <div className="w-full flex font- flex-row flex-1 h-screen overflow-hidden">
                <SideBar />
                <MainContent />
            </div>
    )
}