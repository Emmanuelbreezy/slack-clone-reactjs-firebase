import React from 'react';
import firebaseAuth from '../../firebase/firebase';
import {connect} from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import {setCurrentChannel,setPrivateChannel} from '../../store/actions';
import { SkeletonLoader } from './loader_widget';

type DirectMessagesWidgetProps = {
    currentUser: any;
    activePrivateChannel:string;
    setCurrentChannel: Function;
    setPrivateChannel: Function;
    setActivePrivateChannel:Function;
    setActiveChannel:any;
}

class DirectMessagesWidget extends React.Component<DirectMessagesWidgetProps>{
    state:{
        user:any;
        users: any[];
        usersRef: any;
        connectedRef:any;
        presenceRef:any;
        loader: boolean;
        activeChannel: string;
    } = {
        user: this.props.currentUser,
        users: [],
        usersRef: firebaseAuth.database().ref('users'),
        connectedRef: firebaseAuth.database().ref('.info/connected'),
        presenceRef:firebaseAuth.database().ref('presence'),
        loader: true,
        activeChannel: ''
    }

    componentDidMount() {
        if(this.state.user){
            this.addListeners(this.state.user.uid);
        }
    }

    addListeners = (userId:any) => {
        let loadedUsers:any = [];

        this.state.usersRef.on('child_added', (snapshot:any) => {
            if(userId !== snapshot.key){
                let user = snapshot.val();
                user['uid'] = snapshot.key;
                user['status'] = 'offline';
                loadedUsers.push(user);
                this.setState({
                    users: loadedUsers,
                    loader: false
                });
            }
        });

        this.state.connectedRef.on('value',(snap:any) => {
            if(snap.val() === true){
                const ref = this.state.presenceRef.child(userId);
                ref.set(true);
                ref.onDisconnect().remove((err:any)=> {
                    if(err != null){
                        console.error(err);
                    }
                })
                                     
            }
        });

        this.state.presenceRef.on('child_added',(snap:any)=>{
            if(userId !== snap.key){
                this.addStatusToUser(snap.key);
            }
        });

        this.state.presenceRef.on('child_removed',(snap:any)=>{
            if(userId !== snap.key){
                this.addStatusToUser(snap.key,false);
            }
        })

    }

    changeChannel = (user:any) => {
        const channelId = this.getChannelId(user.uid);
        const channelData = {
            id: channelId,
            name: user.name
        };
        // form mapdispatchtoprop global store
        this.props.setCurrentChannel(channelData);
        this.props.setPrivateChannel(true);
        this.props.setActiveChannel('');
        this.props.setActivePrivateChannel(user.uid);

    }

    getChannelId = (userId:any) => {
        const currentUserId = this.state.user.uid;
        return userId < currentUserId ? `${userId}/${currentUserId}`: `${currentUserId}/${userId}`; 
    }

    setActiveChannel = (userId:any) => {
        this.setState({ activeChannel: userId});
    }

    addStatusToUser = (userId:any, connected= true) => {
        const updatedUsers = this.state.users.reduce((arr:any[],user:any) => {
            if(user.uid === userId){
                user['status'] = `${connected ? 'online' : 'offline'}`;
            }
            return arr.concat(user);
        },[]);
        this.setState({users:updatedUsers});
    }

    isUserOnline = (user:any) => user.status === 'online';

    _displayUser = (users:any[]) => {
        return this.state.loader ?  <SkeletonLoader /> : users.length > 0 && users.map((user:any) => {
            const statusStyle = this.isUserOnline(user) ? 'w-2 h-2 bg-green-500 rounded-full' : 'w-2 h-2 bg-gray-500 rounded-full';
            const active = user.uid === this.props.activePrivateChannel;
            const classType = active === true ?  ("py-1 px-9 w-full text-gray-300 focus:outline-none cursor-pointer block transform hover:transition-opacity hover:ease-in-out bg-blue-500 bg-opacity-60 text-md") : ("py-1 px-9 w-full text-md text-gray-400  hover:text-gray-300 cursor-pointer block transform hover:transition-opacity hover:ease-in-out focus:outline-none  hover:bg-blue-500 hover:bg-opacity-10");
            return (
                    <button  key={user.uid} className={classType} 
                        onClick={() => this.changeChannel(user)}>
                      <span className=" text-left  block w-full ">@ {user.name}</span>
                      <span className={statusStyle}></span>
                    </button>
                );
        });
            
    }
 
    render(){
        const {users} = this.state;
        return (
    
            <div className="py-4">
                <div className="channel-header px-4 flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current mr-2" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M19.8521478,10 L21.2077346,10.7531038 C22.2640885,11.339967 22.2640885,12.660033 21.2077346,13.2468962 L19.8521478,14 L21.2077346,14.7531038 C22.2640885,15.339967 22.2640885,16.660033 21.2077346,17.2468962 L13.1565731,21.7197637 C12.484006,22.0934121 11.515994,22.0934121 10.8434269,21.7197637 L2.79226543,17.2468962 C1.73591152,16.660033 1.73591152,15.339967 2.79226543,14.7531038 L4.1478522,14 L2.79226543,13.2468962 C1.73591152,12.660033 1.73591152,11.339967 2.79226543,10.7531038 L4.1478522,10 L2.79226543,9.24689624 C1.73591152,8.66003296 1.73591152,7.33996704 2.79226543,6.75310376 L10.8434269,2.28023626 C11.515994,1.90658791 12.484006,1.90658791 13.1565731,2.28023626 L21.2077346,6.75310376 C22.2640885,7.33996704 22.2640885,8.66003296 21.2077346,9.24689624 L19.8521478,10 Z M17.7930218,11.1439589 L13.1565731,13.7197637 C12.484006,14.0934121 11.515994,14.0934121 10.8434269,13.7197637 L6.20697823,11.1439589 L4.66610426,12 L11.8147128,15.9714492 C11.8832347,16.0095169 12.1167653,16.0095169 12.1852872,15.9714492 L19.3338957,12 L17.7930218,11.1439589 Z M17.7930218,15.1439589 L13.1565731,17.7197637 C12.484006,18.0934121 11.515994,18.0934121 10.8434269,17.7197637 L6.20697823,15.1439589 L4.66610426,16 L11.8147128,19.9714492 C11.8832347,20.0095169 12.1167653,20.0095169 12.1852872,19.9714492 L19.3338957,16 L17.7930218,15.1439589 Z M12.1852872,4.02855081 C12.1167653,3.99048306 11.8832347,3.99048306 11.8147128,4.02855081 L4.66610426,8 L11.8147128,11.9714492 C11.8832347,12.0095169 12.1167653,12.0095169 12.1852872,11.9714492 L19.3338957,8 L12.1852872,4.02855081 Z"/>
                        </svg>
                        <span className="text-sm font-semibold text-gray-200">DIRECT MESSAGES</span>
                        <span className="w-5 h-5 flex items-center justify-center ml-1 rounded-full bg-gray-700 text-white text-xs">
                            {users.length}
                        </span>
                    </div>
                </div>
                <div>
                   {this._displayUser(users)}
                </div>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch:any) => {
//     return {
//       setCurrentChannel: (currentChannel) => dispatch(setCurrentChannel(currentChannel)),
//       setPrivateChannel: (isPrivteChannel) => dispatch(setPrivateChannel(isPrivteChannel)),
//     }
//   }

export default connect(null,{setCurrentChannel,setPrivateChannel})(DirectMessagesWidget);