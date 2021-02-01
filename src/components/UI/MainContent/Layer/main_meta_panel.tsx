import React, { useEffect, useState } from "react";


type MainMetaPanelProps = {
    currentChannel: any;
}

export const MainMetaPanel = ({currentChannel}:MainMetaPanelProps) => {
    const [_loading, _setLoading] = useState<boolean>(true);
    
    useEffect(() => {
            if(currentChannel){
                setTimeout(()=>{
                    _setLoading(false);
                },3000)
            }
    },[currentChannel]);

    const MetaLoaderSkeleton = () => (
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded  w-24 space-y-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 space-y-1"></div>
            </div>
        </div>
    )

    return (
        <div className="meta-panel w-2/6 border-l  border-primary  h-screen overflow-hidden">
            <div className="border-b border-primary p-3 h-auto">
            {_loading === false && currentChannel.name ? (<div><h2 className="text-color-primaryBody">Detail</h2>
                <span className="text-color-secondaryBody">#{currentChannel.name}</span></div>) 
                : MetaLoaderSkeleton()   
            }
            </div>
        </div>
    )
}