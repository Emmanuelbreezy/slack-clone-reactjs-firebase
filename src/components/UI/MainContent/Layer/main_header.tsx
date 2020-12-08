import React from "react";

type MainHeaderProps = {}

export const MainHeader = (prop:MainHeaderProps) => {
    return (
        <div className="border-b border-gray-200 p-3 h-auto">
            <div className="flex items-center justify-between ml-3 mr-3">
                <div>
                    <button>#grow</button>
                </div>
                <div>
                    <button>Search</button>
                </div>
            </div>
        </div>
    )
}