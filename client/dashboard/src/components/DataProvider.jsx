import { createContext, useContext, useState } from "react";

const globalDataContext=createContext()

function GlobalDataProvider({children}){
    const [SearchChars,setSearchChars]=useState("")
    const [isUpdated,setisUpdated]=useState()
    const [ToggleCreate,setToggleCreate]=useState(false)
    const [ToggleEdit,setToggleEdit]=useState(false)
    const [Globaldata,setGlobaldata]=useState([])

    return (<globalDataContext.Provider value={{Globaldata,setGlobaldata,ToggleCreate,setToggleCreate,ToggleEdit,setToggleEdit,isUpdated,setisUpdated,SearchChars,setSearchChars}}>
        {children}
        </globalDataContext.Provider>)

}

function useGlobalData(){
    return useContext(globalDataContext)
}

// eslint-disable-next-line react-refresh/only-export-components
export {useGlobalData,GlobalDataProvider}