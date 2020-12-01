import React from "react";
import { SideBarChannelContent } from "./Layer/sidebar_channel_content";
import { SideBarChannelHeader } from "./Layer/sidebar_channel_header";

type SidebarProps = {}

export const SideBar = (prop:SidebarProps) => {
    return (
        <div className="hidden lg:w-1/4 lg:flex  h-screen overflow-hidden">
            <div className="w-full lg:w-1/5 flex-shrink-0  flex flex-col items-center 
            text-white overflow-y-auto border-r border-gray-800" style={{backgroundColor:"#400f3d"}}>
                <p>SD</p>
                <p>SD</p>
            </div>
            <div className="hidden text-white lg:flex lg:flex-col lg:flex-1" style={{backgroundColor:"#3c1041"}}>
                <SideBarChannelHeader />
                <SideBarChannelContent />
            </div>
        </div>
    )
}