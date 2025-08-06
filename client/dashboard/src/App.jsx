// import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Company from './components/Company'
import Card from './components/Card'
import Search from './components/Search'
import Topic from './components/Topic'
import { LuCircleCheck,LuTarget,LuFilter } from "react-icons/lu";
import { PiGear } from "react-icons/pi";
import { useGlobalData } from './components/DataProvider'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {


  const {Globaldata,setGlobaldata,isUpdated,setToggleEdit,SearchChars}=useGlobalData()

  const [SearchData,setSearchData]=useState([])

useEffect(()=>{
  
axios.get('http://localhost:4000/api/getData').then(function (response){
  setGlobaldata(response.data)
  setSearchData(response.data)
  // console.log("SearchData:",response.data)
  console.log(response)
}).catch(function (error){
  console.log(`error fetching data ${error}`)
})
  
},[isUpdated,setToggleEdit,setGlobaldata])


const totalSubtopics=Globaldata.reduce((acc,data)=>{
  return acc + data.subtopics.length
},0)


useEffect(()=>{
  if(SearchChars===""){
    setSearchData(Globaldata)
  }
  else{
    const filtered=Globaldata.filter((data)=>{
      if(data["topic_data"]["topic_name"].toLowerCase().includes(SearchChars.toLowerCase()) || data["topic_data"]["topic_code"].toLowerCase().includes(SearchChars.toLowerCase())){
        return data
      }
    })
    setSearchData(filtered)
  }
  
},[SearchChars,Globaldata])

// console.log("total_S",totalSubtopics)

console.log("searchData",SearchData)
  
  // console.log(crypto.randomUUID())
  return (
    <>
    <div className='app-container'>
        <Header/> 
        <Company/>
        <div className='card-container'>
        <Card name="Total Topics" count={Globaldata.length} icon={<LuCircleCheck />} s={
          {"border": "1px",
          "borderRadius": "7px",
          "padding": "6px",
          "backgroundColor": "rgb(220 252 231 / var(--tw-bg-opacity, 1))",
          "color":"rgb(22 163 74 / var(--tw-text-opacity, 1))"
        }} ></Card>


        <Card name="Configured" count="0" icon={<PiGear />} s={
          {"border": "1px",
          "borderRadius": "7px",
          "padding": "6px",
          "backgroundColor": "rgb(37 99 235 / var(--tw-text-opacity, .1))",
          "color":"rgb(37 99 235 / var(--tw-text-opacity, 1))"
        }}/>
        
        
        <Card name="Total Subtopics" count={totalSubtopics} icon={<LuTarget />} s={
          {"border": "1px",
          "borderRadius": "7px",
          "padding": "6px",
          "backgroundColor": "rgb(147 51 234 / var(--tw-text-opacity, .1))",
          "color":"rgb(147 51 234 / var(--tw-text-opacity, 1))",
          
        }}/>


        <Card name="Active Frameworks" count="0" icon={<LuFilter />} s={
          {"border": "1px",
          "borderRadius": "7px",
          "padding": "6px",
          "backgroundColor": "rgb(234 88 12 / var(--tw-text-opacity, .1))",
          "color":"rgb(234 88 12 / var(--tw-text-opacity, 1))"
        }}/>

        </div>
        <Search/>


        
        <div className='topic-container'>
        {SearchData.map((data)=>{
          return <Topic data={data} key={data._id} />
        
       
      })} </div>
          
       
        
        </div>
    </>
  )
}

export default App
