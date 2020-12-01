import React from "react";

type SideBarChannelProps = {}

export const SideBarChannelContent = (prop:SideBarChannelProps) => {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col"> 
                <div className="p-6 border-b mb-3 border-gray-800">
                    read
                </div>
                <div className="p-6">
                    channels
                </div>
            </div>
    </div>
    )
}