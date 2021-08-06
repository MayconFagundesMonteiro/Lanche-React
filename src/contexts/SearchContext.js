import React,{useState} from 'react';

export const SearchContext = React.createContext();

export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState("");

    function searchInput(input){
        setSearch(input);
    }

    return (
        <SearchContext.Provider value={{search, searchInput}}>{children}</SearchContext.Provider>
    );
}