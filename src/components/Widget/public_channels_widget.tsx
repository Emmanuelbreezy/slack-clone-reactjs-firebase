import { AnyAaaaRecord } from 'dns';
import React from 'react';

type PublicChannelsWidgetProps ={
    channels:any;
    openModalHandler:any;
    channelList:any;
}

export const PublicChannelsWidget = ({channels,openModalHandler,channelList}:PublicChannelsWidgetProps) =>{
    return (
        <div className="flex flex-col py-2 h-64 overflow-hidden">
            <div className="channel-header px-4 flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current mr-2" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M19.8521478,10 L21.2077346,10.7531038 C22.2640885,11.339967 22.2640885,12.660033 21.2077346,13.2468962 L19.8521478,14 L21.2077346,14.7531038 C22.2640885,15.339967 22.2640885,16.660033 21.2077346,17.2468962 L13.1565731,21.7197637 C12.484006,22.0934121 11.515994,22.0934121 10.8434269,21.7197637 L2.79226543,17.2468962 C1.73591152,16.660033 1.73591152,15.339967 2.79226543,14.7531038 L4.1478522,14 L2.79226543,13.2468962 C1.73591152,12.660033 1.73591152,11.339967 2.79226543,10.7531038 L4.1478522,10 L2.79226543,9.24689624 C1.73591152,8.66003296 1.73591152,7.33996704 2.79226543,6.75310376 L10.8434269,2.28023626 C11.515994,1.90658791 12.484006,1.90658791 13.1565731,2.28023626 L21.2077346,6.75310376 C22.2640885,7.33996704 22.2640885,8.66003296 21.2077346,9.24689624 L19.8521478,10 Z M17.7930218,11.1439589 L13.1565731,13.7197637 C12.484006,14.0934121 11.515994,14.0934121 10.8434269,13.7197637 L6.20697823,11.1439589 L4.66610426,12 L11.8147128,15.9714492 C11.8832347,16.0095169 12.1167653,16.0095169 12.1852872,15.9714492 L19.3338957,12 L17.7930218,11.1439589 Z M17.7930218,15.1439589 L13.1565731,17.7197637 C12.484006,18.0934121 11.515994,18.0934121 10.8434269,17.7197637 L6.20697823,15.1439589 L4.66610426,16 L11.8147128,19.9714492 C11.8832347,20.0095169 12.1167653,20.0095169 12.1852872,19.9714492 L19.3338957,16 L17.7930218,15.1439589 Z M12.1852872,4.02855081 C12.1167653,3.99048306 11.8832347,3.99048306 11.8147128,4.02855081 L4.66610426,8 L11.8147128,11.9714492 C11.8832347,12.0095169 12.1167653,12.0095169 12.1852872,11.9714492 L19.3338957,8 L12.1852872,4.02855081 Z"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-200">CHANNELS</span>
                    <span className="w-5 h-5 flex items-center justify-center ml-1 rounded-full bg-gray-700 text-white text-xs">
                        {channels.length}
                    </span>
                </div>
                <div className="flex flex-shrink-0 overflow-y-auto">
                    <button className="focus:outline-none" onClick={openModalHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <polygon fillRule="evenodd" points="13 11 22 11 22 13 13 13 13 22 11 22 11 13 2 13 2 11 11 11 11 2 13 2"/>
                    </svg>
                    </button>
                </div>
            </div>
            <div className="py-1 flex-1 overflow-y-auto">
                {channelList()}
            </div>
        </div>
    )
}