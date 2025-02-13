import React, {createContext, useState} from 'react';

interface UserContextType {
    user: string;
    setUser: (user: string) => void;
}


export const UserContext = createContext<UserContextType>({
    user: '',
    setUser: () => {}
});

export const UserProvider: React.FC< {children: React.ReactNode} > = ({children}) => {
    const [user, setUser] = useState<string>('');
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}