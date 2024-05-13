// MyContext.js
import React, { createContext, useState ,useContext} from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [useerid, setid] = useState('');
    const [SelectedLanguage1, setSelectedLanguage1] = useState();
   

    return (
        <MyContext.Provider value={{ useerid, setid,setSelectedLanguage1 ,SelectedLanguage1}}>
            {children}
        </MyContext.Provider>
    );
}; 

export const globalvariavle = () => useContext(MyContext);