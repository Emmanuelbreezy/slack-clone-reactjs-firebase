import React, { useEffect, useState } from "react";
import firebaseAuth from "../../../../firebase/firebase";
import DirectMessagesWidget  from "../../../Widget/direct_messages_widget";
import { SkeletonLoader } from "../../../Widget/loader_widget";
import { ModalWidget } from "../../../Widget/modal_widget";
import { PublicChannelsWidget } from "../../../Widget/public_channels_widget";

type SideBarChannelProps = {
    currentUser:any;
    isLoading: boolean;
    setCurrentChannel: Function;
    setPrivateChannel: Function;
}
type ChannelType = {
    user:any;
    channelName: string;
    channelDetail:string;
    channelRef: any;
}



export const SideBarChannelContent = (props:SideBarChannelProps) => {
    const [_firstChannelLoad, _setFirstChannelLoad] = useState<boolean>(true);
    const [_channelsLoader, _setChannelLoader] = useState<boolean>(true);
    const [activeChannel, setActiveChannel] = useState('');
    const [activePrivateChannel, setActivePrivateChannel] = useState('');
    const [_channels, _setChannels]  = useState<any[]>([]);
    const [modal, setModal]  = useState(false);
    const [_modalLoader, _setModalLoader] = useState<boolean>(true);
    const [_channel, _setChannel]  = useState<ChannelType>({
                                            user: props.currentUser,
                                            channelName: '',
                                            channelDetail: '',
                                            channelRef: firebaseAuth.database().ref('channels')
                                        });

    
        
    useEffect(() => {
        _addListener();
        if(_channelsLoader === false) {
            _setFirstChannelHandler();
        }

        return () => {
            removeListeners();
        };
    },[_channelsLoader]);



    const _addListener = () => {
        let loadedChannels = Array();
        _channel.channelRef.on('child_added',(snap:any) => {
            if(snap){
                loadedChannels.push(snap.val());
                    setTimeout(() => {
                        _setChannels(loadedChannels);
                        _setChannelLoader(false);                        
                    },5000);
            }
        })
    }

    const removeListeners = () => {
        _channel.channelRef.off();   
    }

    const _setFirstChannelHandler = () => {
        const _firstchannel = _channels[0];
        if(_firstChannelLoad && _channels.length > 0){
            props.setCurrentChannel(_firstchannel);
            _setActiveChanelHandler(_firstchannel)
        _setFirstChannelLoad(false);
        }
    }


    const _isFormValid = ({channelName,channelDetail}:ChannelType) => channelName && channelDetail;
    const openModalHandler = () => {
        setModal(true);
        setTimeout(() => {
            _setModalLoader(false);
        },5000);
    }
    const closeModalHandler = () => {
        setModal(false);
        _setModalLoader(true);
    }

    const _addChannel = () => {
        const { channelRef, channelName,channelDetail,user } = _channel;
        const key = channelRef.push().key;
        const newChannel = {
                id: key,
                name: channelName,
                details: channelDetail,
                createdBy:{
                    name: user.displayName,
                    avatar: user.photoURL
                }
            }; 
            channelRef
                    .child(key)
                    .update(newChannel)
                    .then(()=>{
                        closeModalHandler();
                        _setModalLoader(true);
                        _setChannel({
                            ..._channel,
                            channelName:'',
                            channelDetail:''
                        });
                        _setChannelLoader(true);
                         const _lastaddedchannel = _channels[_channels.length -1 ];
                        if(_channels.length > 0){
                            props.setCurrentChannel(_lastaddedchannel);
                            _setActiveChanelHandler(_lastaddedchannel)
                        }
                        
                    }).catch((err:any) => {
                        console.log(err);
                    })
            
    }       
    
    const _setActiveChanelHandler = (channel:any) => {
        setActivePrivateChannel('');
        setActiveChannel(channel.id);

    }

    const  handleChannelSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
        if(_isFormValid(_channel)){
            _addChannel();
        }
    }
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        _setChannel({
            ..._channel,
            [e.currentTarget.name]: e.currentTarget.value 
        });
    }

    const _changeChannelGlobal = (channel:any) => {
    // sidebar setting the selected channel to global state
        _setActiveChanelHandler(channel);
       props.setCurrentChannel(channel);
       props.setPrivateChannel(false);

        
    }
    
    const _displayChannels = (channels:any[]) => {
        return _channelsLoader ?  <SkeletonLoader /> : channels.length > 0 && channels.map((channel:any) => {
            const active = channel.id === activeChannel;
            const classType = active === true ?  ("py-1 px-9 w-full text-gray-300 focus:outline-none cursor-pointer block transform hover:transition-opacity hover:ease-in-out bg-blue-500 bg-opacity-60 text-md") : ("py-1 px-9 w-full text-md text-gray-400  hover:text-gray-300 cursor-pointer block transform hover:transition-opacity hover:ease-in-out focus:outline-none  hover:bg-blue-500 hover:bg-opacity-10");
            return (
                    <button  key={channel.id} className={classType}
                    onClick={() => _changeChannelGlobal(channel)}>
                        <span className=" text-left  block w-full " > # {channel.name}</span>
                    </button>
                );
        });
            
    }
                                                
    return (
        <>
            <div className="flex-1">
                <div className="flex flex-col"> 
                    <div className="py-2" style={{ borderBottom: "1px solid #4c3c4c"}}>
                       <PublicChannelsWidget channels={_channels} openModalHandler={openModalHandler}
                       channelList={() => _displayChannels(_channels)} />
                    </div>
                    <div className="h-auto">
                        <DirectMessagesWidget 
                                currentUser={props.currentUser} 
                                activePrivateChannel={activePrivateChannel}
                                setActivePrivateChannel={setActivePrivateChannel}
                                setActiveChannel={setActiveChannel}

                          />
                    </div>
                </div>
            </div>
            {modal === true && <ModalWidget loader={_modalLoader}  onClose={closeModalHandler} handleChange={handleInputChange} onSubmit={handleChannelSubmit} />}
    </>
    )
}