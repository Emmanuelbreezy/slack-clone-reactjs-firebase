import React, { useEffect, useState } from "react";
import { SkeletonLoader } from "./loader_widget";

export const ModalWidget = (props:any) => {

    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={props.onClose}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
           
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
             shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                { props.loader === true ? <SkeletonLoader /> : 
                  (<div>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:block">
                        <div className="mt-1">
                            <h3 className="text-lg mb-4 leading-6 font-medium text-gray-900" id="modal-headline">
                              Add a Channel
                            </h3>
                            <fieldset className="h-auto mb-3">
                              <input name="channelName" placeholder="Channel name" className="focus:ring h-10 focus:ring-purple-300 text-black  focus:outline-none focus:border-transparent border border-gray-400 p-3 w-full
                                    rounded-sm"
                                type="text"  onChange={props.handleChange}/>
                            </fieldset>
                            <fieldset className="h-auto">
                                <input  name="channelDetail" placeholder="Channel description" type="text" 
                                    className="focus:ring focus:ring-purple-300 h-10   text-black  focus:outline-none focus:border-transparent border border-gray-400 p-3 w-full
                                    rounded-sm " onChange={props.handleChange}/>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button type="button" className="w-full inline-flex justify-center 
                      rounded-md border border-transparent shadow-sm px-4 py-2
                      bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none 
                      focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={props.onSubmit}>
                        Add
                      </button>
                      <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md
                      border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
                      text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={props.onClose}>
                        Cancel
                      </button>
                    </div>
                </div>)
                }

            </div>
          </div>
        </div>
    )
}