import React from 'react';

type ProgressBarWidgetProps = {
    uploadState:string;
    percentageUploaded:number;
}

export const ProgressBarWidget = ({uploadState,percentageUploaded}:ProgressBarWidgetProps) =>{
    const percent = percentageUploaded.toString() + "%";
    const progstyles = {
        width: percent
    }
    return (
        <>
        {uploadState == "uploading" && <div className="shadow w-full bg-gray-100 mb-1 mt-1">
          <div className="bg-red-300 text-xs leading-none text-center text-white" 
                style={progstyles}> {percentageUploaded}% </div>
        </div>}
        </>
    )
}