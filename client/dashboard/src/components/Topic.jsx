import { useState } from 'react';
import '../css/topic.css'
import { LuTarget,LuUsers,LuPlus,LuChevronDown,LuCircleCheck,LuChevronRight,LuSquarePen,LuEye }
from "react-icons/lu";

import { MdDeleteForever } from "react-icons/md";
import { useGlobalData } from './DataProvider';
import { Modal } from './modal';
import axios from 'axios';


function Topic(props){
    const {ToggleEdit,setToggleEdit,Globaldata,ToggleCreate,setisUpdated,isUpdated}=useGlobalData()
    // const [EditData,setEditData]=useState()
    

   async function handleDelete(id){
        try{
            const response=await axios.delete(`http://localhost:4000/api/deleteData/${id}`)
            
            console.log("response",response)
            setisUpdated(!isUpdated)
            // setToggleEdit(false)
              }
              catch(error){
                console.log(error)
              }
    }


    const data=props.data;
    const [ToggleExpand,setToggleExpand]=useState(false)
    return (<>
    
    
     
    
    <div className="topic" key={data._id}>
    
            <div className="item-container">
                <div style={{}}>
                <button className='arrow-button' onClick={()=>{
                    setToggleExpand(!ToggleExpand)
                }}>{!ToggleExpand?<LuChevronRight />:<LuChevronDown />} </button>
                </div>
                <div className="topic-info">
                <div className='main-info'>

                <h1 style={{"fontSize":"1.125rem"}}>{data.topic_data.topic_name}</h1>

                <div className='topic_code'>{data.topic_data.topic_code || "code"}</div>



                {data.topic_data.esg_pillar=="E" &&
                <div className='esg_pillar' style={{
                    "backgroundColor": "rgb(220 252 231 / var(--tw-bg-opacity, 1))",
          "color":"rgb(22 163 74 / var(--tw-text-opacity, 1))"
                }}>{data.topic_data.esg_pillar} </div>}

{data.topic_data.esg_pillar=="S" &&
                <div className='esg_pillar' style={{
                   "backgroundColor": "rgb(37 99 235 / var(--tw-text-opacity, .1))",
          "color":"rgb(37 99 235 / var(--tw-text-opacity, 1))"
                }}>{data.topic_data.esg_pillar} </div>}

{data.topic_data.esg_pillar=="G" &&
                <div className='esg_pillar' style={{
                   "backgroundColor": "rgb(147 51 234 / var(--tw-text-opacity, .1))",
          "color":"rgb(147 51 234 / var(--tw-text-opacity, 1))"
                }}>{data.topic_data.esg_pillar} </div>}




                {props.isConfigured &&
                <div className='isConfigured' style={{
                     "backgroundColor": "rgb(220 252 231 / var(--tw-bg-opacity, 1))",
          "color":"rgb(22 163 74 / var(--tw-text-opacity, 1))"
                 }}><LuCircleCheck /> Configured</div>



}
                </div>
            
                
                <div style={{"marginTop":0,"marginBottom":0,"fontSize":".875rem","color":"rgb(75 85 99 / var(--tw-text-opacity, 1))"}}>
                <p>{data.topic_data.desc}</p>
                </div>
                
                </div>
                <div className="options">
                <button onClick={()=>{
                    // const _id=e.target.value
                    // setEditData(_id)
                    setToggleEdit(true)
                }} value={data._id} className='option-button'><LuSquarePen /></button>
                <button className='option-button'><LuEye /></button>
                <button className='option-button' onClick={()=>handleDelete(data._id)}><MdDeleteForever /></button>
                </div>

            </div>
            {ToggleExpand &&<div className='topic_expansion'>
                {data.framework_ref.length>0&&
                data.framework_ref.some((item)=>
                    item.framework && item.ref_code
            ) &&(
                <div className='topic_expansion_top'>
                    <div><h4>Framework References</h4>
                    </div>
                    <div className='framework_badge_div'>
                    {
                data.framework_ref.length>0&&
                data.framework_ref.filter((item)=>
                    item.framework && item.ref_code
            ).map((framework)=>{
                    // console.log(framework)
                    
                
                return(
                    <div className='inner_framework_badge_div'>
                    <div className='framework_badge'>
                        <div className='framework_badge_1'>
                            {framework.framework}
                        </div>
                        <div className='framework_badge_2'>
                        <span>{framework.ref_code}</span>
                        -
                        <span style={{"color":"#4b5563"}}>{framework.desc}</span>
                    </div>
                    </div>
                    
                    </div>)
                })}
                    </div>
                </div>)}


                <div className='subtopics_display'>
                    <div className='subtopics_display_head'>
                        <div className='subtopics_count'>
                        <h4>Subtopics ({
                        data.subtopics.filter((item)=>item.subtopic_name && item.subtopic_code 
                    ).length})</h4>
                        </div>
                        <div className='add_subtopic-button'>
                        <button>                       <LuPlus /> Add Subtopic
                        </button>
                      </div>
                    </div>
                    <div className='subtopics_content_container'> 
                    {data.subtopics.length>0&&
                data.subtopics.filter((item)=>item.subtopic_name && item.subtopic_code 
                )
                .map((subtopic)=>{

               
                return (
                    <div className='content'>
                   <div className='inner_content_div'>
                        <div className='inner_content_div_left'>
                            <div className='inner_content_div_left_head'>
                            <h4>{subtopic.subtopic_name}</h4>
                            <div className='inner_div_subtopic_code'>
                            {subtopic.subtopic_code}
                            </div>
                            </div>
                            <div className='subtopic_industries'>
                                        <span>Industries:</span>
                                        <div className='industry_badge'>
                                            Air Freight & Logistics
                                        </div>

                            </div>
                        </div>
                        <div className='inner_content_div_right'>
                            <button><LuUsers />Assign</button>
                            <button><LuTarget />IROs</button>
                            <button><LuSquarePen/></button>
                        </div>

                    </div>
                    </div> )})}
                    </div>
                </div>
   

            </div>
}
        

    </div>
   
     {ToggleEdit && <Modal type="edit" data={data._id}/>}
    </>)



}

export default Topic