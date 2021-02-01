import React  from "react";
import firebase from "firebase";
import { v4 as uuidv4 } from 'uuid';
import { FileModalWidget } from "../../../Widget/file_modal_widget";
import {ProgressBarWidget} from '../../../Widget/progressbar_widget';
import firebaseAuth from "../../../../firebase/firebase";

type MainChatBoxProps = {
    messagesRef: any;
    currentChannel: any;
    currentUser: any;
    messagesLoaded:any;
    isprivateChannel:boolean;
    getMessagesRef:Function;
}

class MainChatBox  extends React.Component<MainChatBoxProps>{
    state:{
        isprivateChannel:boolean;
        messagesRef: any;
        _modal: boolean;
        storageRef: firebase.storage.Reference;
        uploadTask: any;
        percentageUploaded: number;
        progressbar:boolean;
        uploadState: string;
        messageInput: string;
        channelcurrent: any;
        user: any;
        loading: boolean;
        errors: never[];
    } = {
        isprivateChannel:this.props.isprivateChannel,
        messagesRef: this.props.messagesRef,
        _modal: false,
        storageRef:firebaseAuth.storage().ref(),
        uploadTask: null,  
        percentageUploaded: 0,
        progressbar: false,
        uploadState: '',
        messageInput: "",
        channelcurrent: this.props.currentChannel,
        user: this.props.currentUser, 
        loading: false,
        errors: [],
    }

    openModalHandler = () => this.setState({ _modal: true});

    closeModalHandler = () =>  this.setState({_modal: false});
    

    handleChangeFunc = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({[e.target.name]: e.target.value  })
    }

    createMessage =(fileURL= null) => {
        const {user,messageInput} = this.state;
        const userMessageInfo:any = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user:{
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL
            },
            //content: _message.messageInput
        };
        if(fileURL !== null){
            userMessageInfo['image'] = fileURL;
        }else{
            userMessageInfo['content'] =  messageInput;
        }

        return userMessageInfo;
    }

    sendMessageHandler = () => {
        const {getMessagesRef} = this.props;
        const{messageInput,channelcurrent } = this.state;
        if(messageInput){
            this.setState({
                ...this.state,
                loading:true
            });
            getMessagesRef()
                .child(channelcurrent.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({
                        ...this.state,
                        loading : false,
                        messageInput: ""
                    });
                })
                .catch((err:any) => {
                    this.setState({
                        ...this.state,
                        loading: false,
                        errors: this.state.errors.concat(err)
                    });
                })
        }else{
            const _errl:any = {message:"Add a Message"};
            this.setState({
                ...this.state,
                errors: this.state.errors.concat(_errl)
            });
            
            alert("Add a message");
        }
        
    }

    getPathFunc = () => {
        if(this.state.isprivateChannel){
            return `chat/private-${this.state.channelcurrent.id}`;
        }else{
            return `chat/public`;
        }
    }

    uploadFileFunc = (file:any,metadata:any) => {
        const pathToUpload = this.state.channelcurrent.id;
        const ref = this.props.getMessagesRef();
        //const {uploadTask}:any = this.state;
    
        const filePath = `${this.getPathFunc()}/${uuidv4()}.jpg`;
    
        this.setState({
            uploadState:'uploading',
            uploadTask: this.state.storageRef.child(filePath).put(file,metadata),
        },
        () => {
            this.state.uploadTask.on('state_changed', (snap:any) => {
                const percentageUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                this.isProgressbarVisible(percentageUploaded);
                this.setState({percentageUploaded:percentageUploaded})
            },(err:any) => {
                this.setState({
                    errors: this.state.errors.concat(err),
                    uploadState: 'error',
                    uploadTask: null
                })
            },() => {
                this.state.uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl:any) => {
                    this._sendFileMessage(downloadUrl,ref,pathToUpload);
                }).catch((err:any) =>{
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err),
                        uploadState:'error',
                        uploadTask: null
                    })
                })
            })
        });
        // comment  useEffect should triggeer uploadState === 'uploading' && uploadTask !== null here
    }

    _sendFileMessage = (fileURL:any,ref:any,pathToUpload:any) => {
        ref.child(pathToUpload)
           .push()
           .set(this.createMessage(fileURL))
           .then(() => {
            this.setState({
                ...this.state,
                   uploadState: 'done'
               });
            })
            .catch((err:any) => {
                console.error(err);
                this.setState({
                    ...this.state,
                    errors: this.state.errors.concat(err)
                });
            })
           
    }

    isProgressbarVisible = (percent:number) => {
        if(percent > 0){
            this.setState({
                progressbar: true
            });
        }
    }

    render(){
        const { messageInput,_modal,uploadState,percentageUploaded } = this.state;
        const {messagesLoaded} = this.props;
        return(
            <>
            <ProgressBarWidget uploadState={uploadState}   percentageUploaded={percentageUploaded} />
         
          <div className="w-full  flex flex-shrink-0 pl-3 pr-3 pb-5  items-center justify-center">
                <div className="w-full relative flex flex-row border border-primary bg-background-scaffold  
                items-center rounded-md">
                    <div className="flex items-center  h-full">
                        <button className="focus:outline-none w-5 h-5 mr-2 ml-2 text-color-primaryBody">
                            <svg className="w-4 h-4 fill-current font-bold text-sm" xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.2746538,14.2978292 L16.9105622,15.4483958 C15.7945475,17.0351773 13.9775544,18 12,18 C10.0224456,18 8.20545254,17.0351773 7.08943782,15.4483958 L8.72534624,14.2978292 C9.4707028,15.3575983 10.6804996,16 12,16 C13.3195004,16 14.5292972,15.3575983 15.2746538,14.2978292 Z M14,11 L14,9 L16,9 L16,11 L14,11 Z M8,11 L8,9 L10,9 L10,11 L8,11 Z"/>
                            </svg>
                        </button>
                        <button className="focus:outline-none w-6 h-6 mr-2 flex text-color-primaryBody  
                        items-center justify-center" onClick={this.openModalHandler} disabled={uploadState === "uploading"}>
                           <svg className="w-4 h-4 fill-current text-sm" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M13.3431459,6.54359691 L14.7681505,7.94693643 L8.44995122,14.362673 C8.13291462,14.6862631 8.13291462,15.2070402 8.44995122,15.5306303 C8.75079611,15.8376941 9.25336598,15.8362945 9.55100179,15.5289435 L16.5023994,8.46733202 C17.5172108,7.43170369 17.5172108,5.76848743 16.5023994,4.7328591 C15.5341634,3.74476165 13.820975,3.76674125 12.8720473,4.73474171 L5.2847529,12.4369015 C3.57174903,14.1843246 3.57174903,16.9902835 5.2847529,18.7377066 C6.94816131,20.4345378 9.80565005,20.4069016 11.4430826,18.7361401 L20.2920826,9.74890528 L21.7172138,11.1521162 L12.8698434,20.1376921 C10.4559333,22.6007416 6.31029227,22.6408362 3.85654347,20.1377844 C1.38115218,17.6126553 1.38115218,13.5619528 3.85824902,11.0350881 L11.4455397,3.33293215 C13.1689626,1.57486193 16.170293,1.53635593 17.930897,3.33307535 C19.7077116,5.14633788 19.7077116,8.05385323 17.9292946,9.86874731 L10.9820731,16.9260714 C9.90740151,18.0359992 8.10955314,18.041006 7.02134515,16.9303034 C5.94244998,15.8291061 5.94244998,14.0641972 7.02314587,12.9611667 L13.3431459,6.54359691 Z"/>
                            </svg>
                        </button>
                        <button className="focus:outline-none w-6 h-6 flex text-color-primaryBody  items-center justify-center">
                            <svg className="w-4 h-4 fill-current hover:text-opacity-10 font-bold text-sm " xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24">
                               <polygon fillRule="evenodd" points="13 11 22 11 22 13 13 13 13 22 11 22 11 13 2 13 2 11 11 11 11 2 13 2"/>
                            </svg>
                        </button>
                         
                    </div>
                    <div className="flex-1 relative">
                        <input name="messageInput" type="text" className="w-full pr-12   bg-background-scaffold 
                        text-color-primaryBody rounded-tr-md rounded-br-md  focus:outline-none pl-3 p-4" 
                        placeholder="Type a message..."  value={messageInput} onChange={this.handleChangeFunc}/>
                        <button className="absolute top-4 right-0 text-color-primaryBody focus:outline-none" 
                            onClick={this.sendMessageHandler}>
                            <svg  className="w-6 h-6 mr-2 fill-current font-bold text-sm" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M4.10514201,11.8070619 L2.74013818,2.2520351 L22.236068,12 L2.74013818,21.7479649 L4.10514201,12.1929381 L4.87689437,12 L4.10514201,11.8070619 Z M5.25986182,5.7479649 L5.89485799,10.1929381 L13.1231056,12 L5.89485799,13.8070619 L5.25986182,18.2520351 L17.763932,12 L5.25986182,5.7479649 Z"/>
                        </svg></button>

                    </div>
                    
                {messagesLoaded && (<div className="absolute w-full h-full inset-0 bg-gray-600 opacity-75"></div>) }
                </div>
            </div>
            <FileModalWidget 
                modal={_modal}
                closeModal={this.closeModalHandler}
                uploadFileFunc={this.uploadFileFunc}
            />
            
        </>
        )
    
    }


}

export default MainChatBox;

// export const MainChatBox = (props:MainChatBoxProps) => {
//     const [_modal,_setModal] = useState(false);
//     const [_message, _setMessage] = useState<any>({
//             storageRef:firebaseAuth.storage().ref(),
//             uploadTask: null,  
//             percentageUploaded: 0,
//             uploadState: '',
//             messageInput: "",
//             channelcurrent: props.currentChannel,
//             user: props.currentUser, 
//             loading: false,
//             errors: [],
//     });

//     const {uploadState,uploadTask,channelcurrent,errors} = _message;
//     const { messagesRef } = props;


//     useEffect(() => {
           
//            if(uploadState === 'uploading' && uploadTask !== null){
//                uploadTask.on('state_changed', (snap:any) => {
//                 const percentageUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
//                 _setMessage({
//                     ..._message,
//                     percentageUploaded:percentageUploaded
//                 })
//                },(err:any) => {
//                     _setMessage({
//                         ..._message,
//                         errors: _message.errors.concat(err),
//                         uploadState: 'error',
//                         uploadTask: null
//                     });
//                 },() => {
//                     uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl:any) => {
//                         _sendFileMessage(downloadUrl,messagesRef,channelcurrent.id);
//                     }).catch((err:any) =>{
//                         console.error(err);
//                         _setMessage({
//                             ..._message,
//                             errors: errors.concat(err),
//                             uploadState:'error',
//                             uploadTask: null
//                         })
//                     })
//                 }
//                 );
//             }

//         },[uploadState,uploadTask]);

    
//     const openModalHandler = () => _setModal(true);
//     const closeModalHandler = () => _setModal(false);

//     const handleChangeFunc = (e:React.ChangeEvent<HTMLInputElement>) => {
//         _setMessage({
//             ..._message,
//             [e.target.name]: e.target.value })
//     }

//     const createMessage =(fileURL= null) => {
//         const userMessageInfo:any = {
//             timestamp: firebase.database.ServerValue.TIMESTAMP,
//             user:{
//                 id: _message.user.uid,
//                 name: _message.user.displayName,
//                 avatar: _message.user.photoURL
//             },
//             //content: _message.messageInput
//         };
//         if(fileURL !== null){
//             userMessageInfo['image'] = fileURL;
//         }else{
//             userMessageInfo['content'] =  _message.messageInput;
//         }

//         return userMessageInfo;
//     }
    
//     const sendMessageHandler = () => {
//         const{ messagesRef } = props;
//         const{ messageInput,channelcurrent } = _message;

//         if(messageInput){
//             _setMessage({
//                 ..._message,
//                 loading:true
//             });
//             messagesRef
//                 .child(channelcurrent.id)
//                 .push()
//                 .set(createMessage())
//                 .then(() => {
//                     _setMessage({
//                         ..._message,
//                         loading : false,
//                         messageInput: ""
//                     });
//                 })
//                 .catch((err:any) => {
//                     _setMessage({
//                         ..._message,
//                         loading: false,
//                         errors: _message.errors.concat(err)
//                     });
//                 })
//         }else{
//             const _errl:any = {message:"Add a Message"};
//             _setMessage({
//                 ..._message,
//                 errors: _message.errors.concat(_errl)
//             });
            
//             alert("Add a message");
//         }
        
//     }

//     const uploadFileFunc = (file:any,metadata:any) => {
//         const filePath = `chat/public/${uuidv4()}.jpg`;
//         console.log(filePath);
        

//         _setMessage({
//             ..._message,
//             uploadState:'uploading',
//             uploadTask: _message.storageRef.child(filePath).put(file,metadata),
//         });
//         // comment  useEffect should triggeer uploadState === 'uploading' && uploadTask !== null here
//         console.log(_message);
//     }

//     const _sendFileMessage = (fileURL:any,ref:any,pathToUpload:any) => {
//         ref.child(pathToUpload)
//            .push()
//            .set(createMessage(fileURL))
//            .then(() => {
//                _setMessage({
//                    ..._message,
//                    uploadState: 'done'
//                });
//             })
//             .catch((err:any) => {
//                 console.error(err);
//                 _setMessage({
//                     ..._message,
//                     errors: _message.errors.concat(err)
//                 });
//             })
           
//     }

//     const { messageInput } = _message;
//     const { messagesLoaded } = props;

    
    
//     return (
//         <>
//           <div className="w-full  flex flex-shrink-0 pl-3 pr-3 pb-5  items-center justify-center">
//                 <div className="w-full relative flex flex-row border border-primary bg-background-scaffold  
//                 items-center rounded-md">
//                     <div className="flex items-center  h-full">
//                         <button className="focus:outline-none w-5 h-5 mr-2 ml-2 text-color-primaryBody">
//                             <svg className="w-4 h-4 fill-current font-bold text-sm" xmlns="http://www.w3.org/2000/svg" 
//                                     viewBox="0 0 24 24">
//                                 <path fillRule="evenodd" d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15.2746538,14.2978292 L16.9105622,15.4483958 C15.7945475,17.0351773 13.9775544,18 12,18 C10.0224456,18 8.20545254,17.0351773 7.08943782,15.4483958 L8.72534624,14.2978292 C9.4707028,15.3575983 10.6804996,16 12,16 C13.3195004,16 14.5292972,15.3575983 15.2746538,14.2978292 Z M14,11 L14,9 L16,9 L16,11 L14,11 Z M8,11 L8,9 L10,9 L10,11 L8,11 Z"/>
//                             </svg>
//                         </button>
//                         <button className="focus:outline-none w-6 h-6 mr-2 flex text-color-primaryBody  
//                         items-center justify-center" onClick={openModalHandler}>
//                            <svg className="w-4 h-4 fill-current text-sm" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
//                             <path fillRule="evenodd" d="M13.3431459,6.54359691 L14.7681505,7.94693643 L8.44995122,14.362673 C8.13291462,14.6862631 8.13291462,15.2070402 8.44995122,15.5306303 C8.75079611,15.8376941 9.25336598,15.8362945 9.55100179,15.5289435 L16.5023994,8.46733202 C17.5172108,7.43170369 17.5172108,5.76848743 16.5023994,4.7328591 C15.5341634,3.74476165 13.820975,3.76674125 12.8720473,4.73474171 L5.2847529,12.4369015 C3.57174903,14.1843246 3.57174903,16.9902835 5.2847529,18.7377066 C6.94816131,20.4345378 9.80565005,20.4069016 11.4430826,18.7361401 L20.2920826,9.74890528 L21.7172138,11.1521162 L12.8698434,20.1376921 C10.4559333,22.6007416 6.31029227,22.6408362 3.85654347,20.1377844 C1.38115218,17.6126553 1.38115218,13.5619528 3.85824902,11.0350881 L11.4455397,3.33293215 C13.1689626,1.57486193 16.170293,1.53635593 17.930897,3.33307535 C19.7077116,5.14633788 19.7077116,8.05385323 17.9292946,9.86874731 L10.9820731,16.9260714 C9.90740151,18.0359992 8.10955314,18.041006 7.02134515,16.9303034 C5.94244998,15.8291061 5.94244998,14.0641972 7.02314587,12.9611667 L13.3431459,6.54359691 Z"/>
//                             </svg>
//                         </button>
//                         <button className="focus:outline-none w-6 h-6 flex text-color-primaryBody  items-center justify-center">
//                             <svg className="w-4 h-4 fill-current hover:text-opacity-10 font-bold text-sm " xmlns="http://www.w3.org/2000/svg" 
//                                     viewBox="0 0 24 24">
//                                <polygon fillRule="evenodd" points="13 11 22 11 22 13 13 13 13 22 11 22 11 13 2 13 2 11 11 11 11 2 13 2"/>
//                             </svg>
//                         </button>
                         
//                     </div>
//                     <div className="flex-1 relative">
//                         <input name="messageInput" type="text" className="w-full pr-12   bg-background-scaffold 
//                         text-color-primaryBody rounded-tr-md rounded-br-md  focus:outline-none pl-3 p-4" 
//                         placeholder="Type a message..."  value={messageInput} onChange={handleChangeFunc}/>
//                         <button className="absolute top-4 right-0 text-color-primaryBody focus:outline-none" onClick={sendMessageHandler}>
//                             <svg  className="w-6 h-6 mr-2 fill-current font-bold text-sm" viewBox="0 0 24 24">
//                               <path fillRule="evenodd" d="M4.10514201,11.8070619 L2.74013818,2.2520351 L22.236068,12 L2.74013818,21.7479649 L4.10514201,12.1929381 L4.87689437,12 L4.10514201,11.8070619 Z M5.25986182,5.7479649 L5.89485799,10.1929381 L13.1231056,12 L5.89485799,13.8070619 L5.25986182,18.2520351 L17.763932,12 L5.25986182,5.7479649 Z"/>
//                         </svg></button>

//                     </div>
                    
//                 {messagesLoaded ? <div className="absolute w-full h-full inset-0 bg-gray-600 opacity-75"></div> : null }
//                 </div>
//             </div>
//             <FileModalWidget 
//                 modal={_modal}
//                 closeModal={closeModalHandler}
//                 uploadFileFunc={uploadFileFunc}
//             />
            
//         </>
//     )
// }