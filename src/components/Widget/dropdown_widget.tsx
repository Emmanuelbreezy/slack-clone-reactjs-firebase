import { AnyNaptrRecord } from "dns";
import React from "react";

type DropdownWidgetProps = {
    show: boolean;
    optionList: any;
}
// ({ key: string; 
//     text: Element; 
//     disabled: boolean;
//     action: null; 
//  }|{ key: string; 
//      text: Element; 
//      disabled: boolean; 
//      action: void; })[];

export const DropdownWidget = (props:DropdownWidgetProps) => {
    return (
        <>
           {props.show ? <div className="dropdown-menu origin-top-left top-5 absolute left-1/4 mt-2 w-48 rounded-md 
            shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40 transition ease-out duration-100 " 
            role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                   {props.optionList.map((option:any) =>{
                       
                       const classDisplay = !option.disabled ? "block w-full text-left px-4 py-2 text-sm focus:outline-none text-gray-700 hover:bg-gray-100 hover:text-gray-900":
                       "block w-full px-4 py-2 text-sm focus:outline-none text-left text-gray-400 "
                       return(
                            <div className="text-left w-full py-1" key={option.key}>
                                <button className={classDisplay} 
                                role="menuitem" disabled={option.disabled} onClick={option.action}>
                                    {option.text}
                                </button>
                            </div>
            )
                    })
}
                    
            </div>: null}
        </>
    )
}