import React from "react";

type LayoutProps = {}

export const Layout = (props:any) => {
    return (
        <div className="w-full h-screen overflow-hidden">
            {props.children}
        </div>
    )
}