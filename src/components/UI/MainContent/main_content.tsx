import React, { useState } from "react";
import {useSelector } from 'react-redux';
import firebaseAuth from "../../../firebase/firebase";
import  MainMessages from "./Layer/main_messages";
import { MainMetaPanel } from "./Layer/main_meta_panel";

type MainContentProps = {}

export const MainContent = (props:MainContentProps) => {
    const [_messagesRef, _setMessagesRef] = useState({
        Ref: firebaseAuth.database().ref('messages')
    })
    const [_privateMessagesRef, _setPrivateMessagesRef] = useState({
        Ref: firebaseAuth.database().ref('privatemessages')
    })
    const  currentUserData = useSelector((state:any) => state.user.currentUser);
    const  currentChannelData = useSelector((state:any) => state.channel.currentChannel);
    const  isPrivateChannel:boolean    = useSelector((state:any) => state.channel.isPrivateChannel);
    return (
        <div className="bg-background-scaffold  w-full flex">
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
             <MainMessages key={currentChannelData && currentChannelData.id} 
               messagesRef={_messagesRef.Ref} privateMessagesRef={_privateMessagesRef.Ref}  
               currentChannel={currentChannelData} 
               currentUser={currentUserData} isPrivateChannel={isPrivateChannel}/>
            </div>
            <MainMetaPanel currentChannel={currentChannelData} />
        </div>
    )
}