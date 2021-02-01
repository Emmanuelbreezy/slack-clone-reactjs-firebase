import React from "react";
import { ThemeContextValue, ThemeProvider } from "../../../../context/theme_context";

export const SideBarColorChannel = (props:SideBarColorChannelProps) => {
    const {toggleTheme} = ThemeContextValue()
    return (
        <ThemeProvider>
        <div className="mt-4 text-white">
            <div className="flex flex-col items-center justify-center">
                <button className="focus:outline-none rounded w-7 h-7 hover:bg-opacity-80 ring-blue-600
                 ring-2 ring-offset-transparent flex items-center justify-center  bg-blue-500
                "  onClick={toggleTheme}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <polygon fillRule="evenodd" points="13 11 22 11 22 13 13 13 13 22 11 22 11 13 2 13 2 11 11 11 11 2 13 2"/>
                    </svg>
                </button>
                
            </div>
        </div>
        </ThemeProvider>
    )
}