import React,{useState,useEffect} from "react";


type MainHeaderProps = {
    currentChannel: any;
    numUniqueUsers:string;
    handleSearchChange: any;
    searchTearm: string;
    loading: boolean;
    messagesLoading: boolean;
    isprivateChannel:boolean;
}

export const MainHeader = ({currentChannel,numUniqueUsers,handleSearchChange,searchTearm,loading,messagesLoading,isprivateChannel}:MainHeaderProps) => {
    const [_loading, _setLoading] = useState<boolean>(true);
    
    useEffect(() => {
            if(currentChannel){
                setTimeout(()=>{
                    _setLoading(false);
                },1000)
            }
    },[currentChannel]);

    const displayChannelName = (channel:any) => {
        return channel ? `${isprivateChannel ? '@':'#'} ${channel.name}` : null;
    }

   
    return (
        <div className="border-b border-primary  p-3 h-auto">
            <div className="flex items-center justify-between ml-3 mr-3">
                <div>
                    {_loading === false && currentChannel.name ?(
                    <div className="flex items-center relative">
                        {isprivateChannel}
                    <h2 className="font-bold text-color-primaryBody text-base">
                        {displayChannelName(currentChannel)}
                    </h2>
                    {isprivateChannel ? (<span className="text-xs ml-1 text-white  pb-0.5 pt-0.5 px-2 
                     bg-background-accent rounded-md">private</span>) : null }
                    </div>) : ( <div className="animate-pulse flex space-x-4 mt-2">
                                <div className="h-4 bg-gray-200 rounded w-32 space-y-1"></div>
                               </div>) }

                    {messagesLoading === false ?
                            (<span className="text-color-secondaryBody">
                                {numUniqueUsers !== '' ? numUniqueUsers : '0 user' }</span>)
                        :(  <div className="animate-pulse flex space-x-4 mt-2">
                                <div className="h-4 bg-gray-200 rounded  w-20 space-y-1"></div>
                            </div>
                        )    
                    }
                </div>
                {messagesLoading === false ?
                        ( <div className="relative">
                            <input name="messageInput" type="text" className="w-64 border border-primary bg-background-scaffold
                                text-color-primaryBody rounded-lg p-2 text-sm focus:outline-none " 
                                placeholder="Search Messages..."  value={searchTearm} autoComplete="off" 
                                onChange={handleSearchChange}/>
                            {loading ? (<svg className="animate-spin absolute  right-1 top-2.5 mr-2 h-5 w-5 
                                text-color-primaryBody" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>)
                                : (<svg className="absolute right-1 top-2.5 mr-2 h-5 w-5 
                                text-color-primaryBody" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M16.3198574,14.9056439 L21.7071068,20.2928932 L20.2928932,21.7071068 L14.9056439,16.3198574 C13.5509601,17.3729184 11.8487115,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,11.8487115 17.3729184,13.5509601 16.3198574,14.9056439 Z M10,16 C13.3137085,16 16,13.3137085 16,10 C16,6.6862915 13.3137085,4 10,4 C6.6862915,4 4,6.6862915 4,10 C4,13.3137085 6.6862915,16 10,16 Z"/>
                                </svg>)}
                </div>) : ( <div className="animate-pulse flex space-x-4 mt-2">
                                <div className="h-6 bg-gray-200 rounded w-64 space-y-1"></div>
                               </div>) }
            </div>
        </div>
    )
}