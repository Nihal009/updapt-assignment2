import { useState } from 'react';
import '../css/search.css'
import { LuFilter,LuSearch } from "react-icons/lu";
import { useGlobalData } from './DataProvider';


function Search(){

const {SearchChars,setSearchChars}=useGlobalData()



// console.log(SearchChars)
    return (<>
    <div className="component_container">
        <div className='inner_container'>
        <div className='search_container'>
     
        <div className='input_container'>
        <LuSearch style={{ position:'absolute',transform: 'translateY(80%) translateX(80%)',color:"gray" }}/>
            <input type="search" name="" id="" className='searchInput' 
            value={SearchChars}
            onChange={(e)=>{setSearchChars(e.target.value)}}
            placeholder="Search topics or codes..."/>
        </div>
        <div className='filter_button'>
        
            <button><LuFilter/> Filter</button></div>
        </div>
        </div>
    </div>
    </>)

    
}

export default Search;