import React from "react";


export type screenContextType = {
    activeScreen: string,
    updateActiveScreen: (active: string) => void;
}
export const ScreenContext = React.createContext<screenContextType | null> ( null) ;

const ScreenProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [activeScreen, setActiveScreen] = React.useState<string>("nav");

    const updateActiveScreen =(active: string) => {
        setActiveScreen(active)
    }

    return (
        <ScreenContext.Provider value={{activeScreen, updateActiveScreen}}>
            {children}
        </ScreenContext.Provider>
    )
}

export default ScreenProvider;