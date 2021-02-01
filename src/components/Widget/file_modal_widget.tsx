import React, { useState } from "react";
import mime from 'mime-types';

export const FileModalWidget = (props:any) => {

    const [_file, _setFile] = useState<any>(null);
    const _isauthorized = ["image/jpeg","image/png"];


    const _addFileChangeHandler = (event:any) => {
        const file = event.currentTarget.files[0];
        if(file){
            _setFile(file);
            console.log(file);
        }
    } 

    const sendFileHandler = () => {
        if(_file !== null){
            //if(isAuthorized(_file.name)){
            const metadata = {contentType: mime.lookup(_file.name)}
            props.uploadFileFunc(_file,metadata);
            props.closeModal();
            clearFile();
            //}
        }
    }

    const clearFile = () => _setFile(null);

    // const isAuthorized = (filename:any) => {
    //     const mlookup = mime.lookup(filename);
    //     return _isauthorized.includes('image');
    // }

    return (
        <>
        {props.modal ? (<div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={props.closeModal}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
                shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline"> 
                    <div>
                        <div className="bg-background-scaffold px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:block">
                            <div className="mt-0">
                                <h3 className="text-md border-b py-2 text-center mb-4 leading-6 font-medium text-color-primaryBody" id="modal-headline">
                                Select image
                                </h3>
                                <button className="relative focus:outline-none w-full h-32 text-color-primaryBody  block py-5">
                                    <label className="w-full h-full flex flex-col items-center px-4  rounded-lg tracking-wide  
                                    cursor-pointer">
                                        <svg className="w-8 h-8 mt-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className="mt-2 text-base leading-normal">Browse an image</span>
                                        <input name="file" type='file'  value="" className="appearance-none hidden w-full h-full absolute  "
                                        onChange={_addFileChangeHandler} />
                                  </label>
                               </button>
                            </div>
                        </div>
                        </div>
                        <div className="bg-background-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center 
                        rounded-md border border-transparent shadow-sm px-4 py-2
                        bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto
                         sm:text-sm" onClick={sendFileHandler}>
                            Upload
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md
                        border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
                        text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={props.closeModal}>
                            Cancel
                        </button>
                        </div>
                    </div>
                    

                </div>
            </div>
            </div>)
            : null}
    </>
    )
}