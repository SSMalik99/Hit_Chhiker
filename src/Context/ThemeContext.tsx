import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { AppliedTheme, theme } from "./Theme"

type ThemeContextProviderPops = {
    children : ReactNode,
    value : string
}

export const ThemeContext = createContext<AppliedTheme | null>(null)

export const ThemeContextProvider = ({children , value } : ThemeContextProviderPops) => {
    const [currentTheme, setCurrentTheme] = useState<any | null>(null)
   
    useEffect(() => {
        setCurrentTheme(value == "dark" ? theme.dark : theme.primary)
    }, [])
    
    return <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>

}

export const useTheme = () =>{
    return useContext(ThemeContext)
  }