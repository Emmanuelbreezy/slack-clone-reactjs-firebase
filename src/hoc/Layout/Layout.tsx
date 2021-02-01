import React, { useEffect } from "react";
import { ThemeContextValue } from "../../context/theme_context";


type LayoutProps = {}

export const Layout = (props:any) => {
    const {themeMode} = ThemeContextValue();
    useEffect(()=>{
        localStorage.setItem('themeMode',themeMode);
    },[themeMode])


    const switchTheme = themeMode === "darkTheme" ? "sl-theme-dark":"sl-theme-light";
    
    return (
        <div className={"w-full h-screen overflow-hidden" + " " + switchTheme }>
            {props.children}
        </div>
    )
}