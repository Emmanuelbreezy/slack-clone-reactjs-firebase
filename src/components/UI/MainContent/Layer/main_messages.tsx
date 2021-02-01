import React from "react";
//import useDeepCompareEffect from 'use-deep-compare-effect';
import { MessageTimeline } from "../../../Widget/message_timeline_widget";
import  MainChatBox from "./main_chatbox";
import { MainHeader } from "./main_header";

type MainMessagesProps = {
    messagesRef: any;
    privateMessagesRef: any;
    currentChannel: any;
    currentUser: any;
    isPrivateChannel: any;
}

class MainMessages extends React.Component<MainMessagesProps>{
    state:{
        messagesRef: any;
        privateMessagesRef:any;
        isPrivateChannel: boolean;
        channel: any;
        user: any;
        _messagesList: any[];
        loading: boolean;
        numUniqueUsers: string;
        searchTearm:string;
        searchLoading:boolean;
        searchResults: any[];

      } = {
          messagesRef: this.props.messagesRef,
          privateMessagesRef: this.props.privateMessagesRef,
          isPrivateChannel: this.props.isPrivateChannel,
          channel: this.props.currentChannel,
          user: this.props.currentUser,
          _messagesList: [],
          loading: true,
          numUniqueUsers: '',
          searchTearm: '',
          searchLoading: false,
          searchResults: [],

    }

    componentDidMount(){
        const {user,channel} = this.state;
        if(channel && user){
            this.checkMessagesExist(channel.id);
            this._addListener(channel.id);
            
        }
    }


    componentWillUnmount(){
        this.state.messagesRef.off();
    }

    checkMessagesExist = (channelId:any) => {
        const ref = this.getMessagesRef();
        ref.child(channelId).once('value',(snap:any) => {
            console.log(snap.val(),'key');
            if(snap.val() === null)  {
                this.setState({
                    loading:false
                })
            }
        });
    }


    _addListener = (channelId:any) =>{
        this._addMessageListener(channelId);
    }
    _addMessageListener = (channelId:any) => {
        const self = this;
        let loadedMessages:any = [];
        const ref = this.getMessagesRef();
        
        ref.child(channelId).on('child_added', (snapshot:any) => {
                    console.log(snapshot.hasChild('user'),'shot');
                   if(snapshot.hasChild('user')){
                        loadedMessages.push(snapshot.val());
                            setTimeout(()=>{
                                self.setState({
                                    _messagesList:loadedMessages,
                                    loading:false
                                });
                            },1500);
                            this.countUniqueUsers(loadedMessages);
                   }
            })
       
    
    }

    getMessagesRef = () => {
        const {messagesRef,privateMessagesRef,isPrivateChannel} =  this.state;
        return isPrivateChannel ? privateMessagesRef : messagesRef;
    }

    handleSearchChange = (event:any) =>{
        this.setState({
            searchTearm: event.target.value,
            searchLoading: true
        }, () => this.handleSearchMessages());
    }

    handleSearchMessages = () => {
        const channelMessages = [...this.state._messagesList]
        const regex = new RegExp(this.state.searchTearm,'gi');
        const searResults = channelMessages.reduce((acc:any,message:any) => {
            if(message.content && message.content.match(regex) || message.user.name.match(regex)){
                acc.push(message);
            }
            return acc;
        },[])

        this.setState({ searchResults: searResults});
        setTimeout(() => {
            this.setState({searchLoading:false})
        },1000)
    }


    countUniqueUsers = (messages:any) => {
        const uniqueUsers = messages.reduce((acc:any[],message:any) => {
            if(!acc.includes(message.user.name)){
                acc.push(message.user.name)
            }
            return acc;
        },[])

        const plural = uniqueUsers.length > 1  || uniqueUsers.length === 0;
        const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ""}`;
        this.setState({
            numUniqueUsers: numUniqueUsers
        })

    }

    isImage = (message:any) => {
        return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
     }

     displayMessages = (listofmessages:any[]) => {
        return(
              this.state.loading ? 'loading' : listofmessages.length > 0 ? listofmessages.map((message:any) => 
              <MessageTimeline key={message.timestamp} message={message} isImage={this.isImage} 
              user={this.props.currentUser} />) : (<div className="p-5 text-center bg-gray-50 m-5 ">
                  Start a Conversation</div>)
         );
     }

     render(){
         const {isPrivateChannel,channel,numUniqueUsers,searchTearm,_messagesList,loading,user,searchResults,searchLoading} = this.state;
        return (
            <>
             <MainHeader isprivateChannel={isPrivateChannel} messagesLoading={loading} loading={searchLoading} searchTearm={searchTearm} numUniqueUsers={numUniqueUsers} 
             currentChannel={channel}  handleSearchChange={this.handleSearchChange} />
            <div className="flex-1 p-2  overflow-y-auto">
                <div className="m-3 text-color-primaryBody">
                   {searchTearm ? this.displayMessages(searchResults) :  this.displayMessages(_messagesList) }
                </div> 
            </div>
            <MainChatBox isprivateChannel={this.props.isPrivateChannel} 
             messagesRef={this.state.messagesRef} getMessagesRef={this.getMessagesRef}
             messagesLoaded={loading}
            currentChannel={channel} currentUser={user}  />
        </>
      )
    }
}

export default MainMessages;

// export const MainMessages = ({currentChannel,currentUser,messagesRef}:MainMessagesProps) => {
//     const [_messagesLoading,_setMessagesLoading] = useState(true);
//     const [_messagesList, _setMessagesList] = useState<any[]>([]);

//     useDeepCompareEffect(() => {
//         if(currentUser && currentChannel){
//             _addMessageListener(currentChannel.id);
//         }
//     },[currentChannel,currentUser]);
    
        
//     const _addMessageListener = useCallback((channelId:string) => {
//             let loadedMessages:any[] = [];

//            try {
//                 messagesRef
//                     .child(channelId)
//                     .on('child_added', (snapshot:any) => {
//                         console.log(snapshot,"snapshot");

//                         if(snapshot.hasChild("key")){
//                             loadedMessages.push(snapshot.val());
//                             setTimeout(() =>{
//                                 _setMessagesLoading(false);
//                                 _setMessagesList(loadedMessages);
//                             },1500)
//                             //console.log(loadedMessages,"messageLOADED ARRAY");
//                         }else{
//                             console.log('does not exits');
//                             _setMessagesLoading(false);
//                         }
//                     })
//            }catch(err){
//              console.log('error occurred',err);
//             }
    
//   },[messagesRef]);

//   const isImage = (message:any) => {
//      return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
//   }

//   const displayMessages = (listofmessages:any[]) => {
//     console.log(listofmessages,"messageList ARRAY");
//         if(_messagesLoading === true){
//             return 'loading'
//         }else if(_messagesLoading === false && listofmessages.length <= 0){
//             return (<div>No Message</div>)
//         }else{
//             return listofmessages.map((message:any) => 
//                <MessageTimeline key={message.timestamp} message={message} isImage={isImage} user={currentUser} />)
//         }
//    // return(
//         //   _messagesLoading ? 'loading' : _messagesList.length <= 0 ? (<div>No Message</div>) : 
//         //   _messagesList.map((message:any) => 
//         //   <MessageTimeline key={message.timestamp} message={message} isImage={isImage} user={currentUser} />)
//      // )
//     }

//     return (
//         <>
//         <div className="flex-1 p-2  overflow-y-auto">
//             <div className="m-3 text-color-primaryBody">
//                {displayMessages(_messagesList)}
//             </div>
             
//         </div>
//         <MainChatBox  messagesRef={messagesRef} messagesLoaded={_messagesLoading}
//         currentChannel={currentChannel} currentUser={currentUser}  />
//     </>
//     )
// }