import React,{useState,createContext,useContext} from 'react';

export const ThemeContext = createContext({
    themeMode:'light',
    toggleTheme: () => {}
});

export const ThemeProvider = (props:any) => {
    const [themeMode,setThemeMode] = useState<string>(
        localStorage.getItem('themeMode') || 'lightTheme'
    );

    const toggleFunc = () => setThemeMode((prevState:string) =>{
        if(prevState === 'lightTheme'){
            return 'darkTheme'
        }else{
            return 'lightTheme'
        }
      });

      return (
        <ThemeContext.Provider value={{themeMode:themeMode,toggleTheme:toggleFunc}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const ThemeContextValue = () => useContext(ThemeContext);
