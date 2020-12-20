import React, { useState } from "react";
import firebaseAuth from "../../../../firebase/firebase";
import { DropdownWidget } from "../../../Widget/dropdown_widget";

type SideBarChannelHeaderProps = {
    userData: any;
}

export const SideBarChannelHeader = (props:SideBarChannelHeaderProps) => {
    const [visible, setVisible] = useState(false);
    const toggleDropDownHandler = () => setVisible((prevState) => !prevState);
    // document.body.addEventListener('click',() => {
    //     if(visible){
    //         setVisible(false);
    //     }
    // });
    const handleSignout =  () => {
        firebaseAuth
            .auth()
            .signOut()
            .then(() => null)
        setVisible(false);
    }

    const dropdownOption = [
        {
            key: 'user',
            icon: null,
            text: <span>Signed in as <span>{props.userData.displayName}</span> </span>,
            disabled: true,
            action: null
        },
        {
            key: 'photo',
            icon: null,
            text: <span>Change Photo</span>,
            disabled: false,
            action: null
        },
        {
            key: 'signout',
            icon:null,
            text: <span>Sign Out</span>,
            disabled: false,
            action: () => handleSignout()
        },
    ];
  
    return (
        <div className=" p-3 flex items-center flex-shrink-0" style={{ borderBottom: "1px solid #4c3c4c"}}>
            <div className="flex-1 ">
                <div className="flex items-center relative">
                    <button className="focus:outline-none flex items-center" 
                    onClick={toggleDropDownHandler}>
                        <span>
                            <img className="w-10 h-10 rounded-full mr-2" src={props.userData.photoURL} alt="" />
                        </span>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <h3 className="font-bold text-lg">
                                { props.userData.displayName}
                                </h3>
                                <svg className="w-4 h-4 fill-current font-bold text-sm mt-1 ml-1" xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24">
                                    <polygon fillRule="evenodd" points="19.293 7.293 20.707 8.707 12 17.414 3.293 8.707 4.707 7.293 12 14.586"/>
                                </svg>
                            </div>
                            <div className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                <span className="text-sm font-normal text-gray-300">
                                online
                                </span>
                            </div>

                        </div>
                    </button>
                    <DropdownWidget show={visible} optionList={dropdownOption} />
                </div>
                
            </div>
            <div className="flex flex-shrink-0 items-center justify-end ">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full  bg-white text-black">
                        E
                    </span>
                </div>
        </div>
    )
}