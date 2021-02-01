import React from 'react';
import moment from 'moment';

type MessageTimelineProps = {
    isImage: Function;
    message: any;
    user:any;
}

export const MessageTimeline = ({message,user,isImage}:MessageTimelineProps) =>{

    const isOwnMessageStyle = (message:any,user:any) => {
        return message.user.id === user.uid ? "flex-1 items-start border-l-4 border-yellow-400 pl-2" : 'flex-1 items-start ';
    }

    const isOwnMessageBlock = (message:any,timeFromNow:Function) => {
        return (
            <div className="flex justify-end mb-3">
                <div className="pr-2">
                    <div className="flex items-center justify-end space-x-1">
                        <span className="text-sm  text-gray-400 tracking-tighter leading-tight">{timeFromNow(message.timestamp)}</span>
                        <h2 className="font-bold text-md">{message.user.name}</h2>
                    </div>
                    <div className="flex justify-end items-center text-right">
                        {isImage(message) ? (<img className="w-64 h-64" src={message.image} />) : 
                        (<p>{message.content}</p>)}
                    </div>
                </div>
                <div className="flex-none">
                    <span className="w-8 h-8 block bg-gray-300 rounded-md ">
                        <img className=" w-full h-full rounded-md  object-cover" 
                        src={message.user.avatar} alt="" /></span>
                </div>
            </div>
        );
    }
    

    const timeFromNow = (timestamp:any) => moment(timestamp).fromNow(); 

    return (
        <>
        <div className="px-4 w-full mb-4">
            <div className="flex justify-start space-x-3">
                <div className="flex-none ">
                    <span className="w-8 h-8 block bg-gray-300 rounded-md ">
                        <img className=" w-full h-full rounded-md  object-cover" src={message.user.avatar} alt="" /></span>
                </div>
                
                <div className={isOwnMessageStyle(message,user)}>
                    <div className="flex items-center space-x-1">
                        <h2 className="font-bold text-md">{message.user.name}</h2>
                        <span className="text-sm  text-gray-400 tracking-tighter leading-tight">{timeFromNow(message.timestamp)}</span>
                    </div>
                    <div className="">
                        {isImage(message) ? (<img className="w-64 h-64" src={message.image} />) : (<p>{message.content}</p>)}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}