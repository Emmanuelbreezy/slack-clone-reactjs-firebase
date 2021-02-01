import React from 'react';

export const SkeletonLoader = () =>{
    return (
        <div className="px-4 mt-2 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-500 rounded w-1/3 space-y-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-2/3 space-y-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-3/4 space-y-2"></div>
                </div>
            </div>
        </div>
    )
}