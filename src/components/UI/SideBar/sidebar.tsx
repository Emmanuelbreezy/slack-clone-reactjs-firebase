import React from "react";
import { useSelector } from 'react-redux';
import { SideBarChannelContent } from "./Layer/sidebar_channel_content";
import { SideBarChannelHeader } from "./Layer/sidebar_channel_header";
import { SideBarListChannel } from "./Layer/sidebar_list_chanels";

type SidebarProps = {}

export const SideBar = (prop:SidebarProps) => {
    const  userData = useSelector((state:any) => state.user.currentUser);
    //style={{backgroundColor:"#400f3d"}} style={{backgroundColor:"#3c1041"}} #4c3c4c
    //border-gray-800 bg-gray-700
    //bg-gray-800
    return (
        <div className="hidden lg:w-1/3 lg:flex  h-screen overflow-hidden">
            
            <div className="w-full lg:w-1/5 flex-shrink-0  flex flex-col items-center 
             overflow-y-auto" style={{backgroundColor:"#400f3d", borderRight: "1px solid #4c3c4c"}}>
                <SideBarListChannel />
            </div>
            <div className="hidden text-white lg:flex lg:flex-col lg:flex-1 " 
            style={{backgroundColor:"#400f3d"}}> 
                <SideBarChannelHeader userData={userData} />
                <SideBarChannelContent />
            </div>
        </div>
    )
}