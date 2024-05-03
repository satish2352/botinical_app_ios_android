// MyContext.js
import React, { createContext, useState ,useContext} from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [useerid, setid] = useState('');

    return (
        <MyContext.Provider value={{ useerid, setid }}>
            {children}
        </MyContext.Provider>
    );
}; 

export const useMyData = () => useContext(MyContext);