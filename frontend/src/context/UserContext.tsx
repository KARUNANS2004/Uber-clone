import React, { createContext, ReactNode, useState, useContext } from 'react';

// Way to declare the type of children in ts+react
interface UserContextProps {
    children: ReactNode;
}

interface User {
    _id: string,
    email: string;
    fullName: {
        firstName: string;
        lastName: string;
    };
}

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Initial state type
const initialUserState: User = {
    _id: '',
    email: '',
    fullName: {
        firstName: '',
        lastName: '',
    },
};

// Now lets make the context
export const UserContextData = createContext<UserContextType | null>(null);

const UserContext: React.FC<UserContextProps> = ({ children }) => {
    const [user, setUser] = useState<User>(initialUserState);

    return (
        <UserContextData.Provider value={{ user, setUser }}>
            {children}
        </UserContextData.Provider>
    );
};

// Custom hook for cleaner usage
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContextData);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContext provider');
    }
    return context;
};

export default UserContext;