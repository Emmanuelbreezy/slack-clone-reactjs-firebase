import React from "react";
import {  useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../store/actions'
import { SideBarChannelContent } from "./Layer/sidebar_channel_content";
import { SideBarChannelHeader } from "./Layer/sidebar_channel_header";
import { SideBarColorChannel } from "./Layer/sidebar_colorlist_chanels";

type SidebarProps = {}

export const SideBar = (prop:SidebarProps) => {
    const  userData = useSelector((state:any) => state.user.currentUser);
    const  isLoading = useSelector((state:any) => state.user.isLoading);

    // dispatching Current Channel to Global State
    const dispatch = useDispatch();
    const _setCurrentChannel = (channel:any) => dispatch(actionTypes.setCurrentChannel(channel));
    const _setPrivateChannel = (isPrivateChannel:boolean) => dispatch(actionTypes.setPrivateChannel(isPrivateChannel));
    

    //style={{backgroundColor:"#400f3d"}} style={{backgroundColor:"#3c1041"}} #4c3c4c
    //border-gray-800 bg-gray-700
    //bg-gray-800
    return (
        <div className="hidden lg:w-1/3 lg:flex bg-background-primary  h-screen overflow-hidden">
            
            <div className="w-full lg:w-1/5 flex-shrink-0  flex flex-col items-center 
             overflow-y-auto bg-background-primary border-secondary border-r">
                <SideBarColorChannel />
            </div>
            <div className="hidden text-white lg:flex lg:flex-col lg:flex-1 bg-background-primary"> 
                <SideBarChannelHeader  userData={userData} />
                <SideBarChannelContent  currentUser={userData} isLoading={isLoading} 
                        setCurrentChannel={(channel:any) =>_setCurrentChannel(channel)}
                        setPrivateChannel={_setPrivateChannel}/>
            </div>
        </div>
    )
}