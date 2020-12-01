import React from "react";

type MainHeaderProps = {}

export const MainHeader = (prop:MainHeaderProps) => {
    return (
        <div className="border-b border-gray-200 p-3 h-auto flex items-center justify-between">
            <div>
                <button>#grow</button>
            </div>
            <div>
                <button>Search</button>
            </div>
        </div>
    )
}