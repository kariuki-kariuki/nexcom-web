import React from "react";
import { IUser, UserContextType } from "../@types/app";

export const AppContext = React.createContext<UserContextType | null> ( null) ;

const AppProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = React.useState<IUser>({
        name: null,
        email: null,
        avatar: null
    });

    const updateUser =(user: IUser) => {
        setUser(user)
    }

    return (
        <AppContext.Provider value={{user, updateUser}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;