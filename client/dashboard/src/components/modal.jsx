import { useEffect, useState } from "react";
import "../css/create_pop.css";
import { useGlobalData } from "./DataProvider";
import {
  LuSave,LuX,
  LuCircleCheck,
  LuSlidersVertical,
  LuPlus,
  LuSettings,LuSquarePen,LuChevronDown
} from "react-icons/lu";

import axios from 'axios'

export function Modal(props) {

  const {
    Globaldata,setGlobaldata,
    ToggleCreate,
    setToggleCreate,
    ToggleEdit,
    setToggleEdit,
    setisUpdated,
    isUpdated,
  } = useGlobalData();


 

  const [TopicData, setTopicData] = useState({
    topic_name: "",
    topic_code: "",
    desc: "",
    esg_pillar: "",
  });


  const isFormValid=TopicData.topic_name.trim() !=="" && TopicData.topic_code.trim() !=="" && TopicData.desc.trim() !=="" && TopicData.esg_pillar.trim() !=="";
//   const [ReferenceForm, SetReferenceForm] = useState();
  const [References, setReferences] = useState([{
    framework: "",
    ref_code: "",
    desc: "",
  }]);


  console.log("ref_l",References.length)


  const [Subtopics, setSubtopics] = useState([
    {
        subtopic_name: "",
        subtopic_code: "",
        subtopic_desc: "",
      }
  ]);
  
useEffect(()=>{
  if(props.type=="edit"){
    const data=Globaldata.find((topicData)=>{
      if(topicData._id===props.data){
        return topicData}

    })
    console.log("edit_Data",data)
    setTopicData(data.topic_data);
    setReferences(data.framework_ref);
    setSubtopics(data.subtopics)
    

  }
},[props.type,props.data,Globaldata])
  


  // function handleCreate(){
  //   setGlobaldata((prev)=>([
  //     ...prev,{
  //       id:crypto.randomUUID(),
  //       topic_data:TopicData,
  //       framework_ref:References,
  //       subtopics:Subtopics
  //       }
        
  // ]))
  // setToggleCreate(false)
  // console.log(Globaldata)
    
  // }
async function handleCreate(){
  try{
const response=await axios.post('http://localhost:4000/api/addTopic',{
  "topic_data":TopicData,
  "framework_ref":References,
  "subtopics":Subtopics
})

console.log("response",response)
setisUpdated(!isUpdated)
  }
  catch(error){
    console.log(error)
  }

  setToggleCreate(false)

}


async function handleEdit(id) {
console.log("edit_id",id)
  try{
const response=await axios.put(`http://localhost:4000/api/updateData/${id}`,{
  "topic_data":TopicData,
  "framework_ref":References,
  "subtopics":Subtopics
})

console.log("response",response)
setisUpdated(!isUpdated)
setToggleEdit(false)
  }
  catch(error){
    console.log(error)
  }
  
}




  function handleChange(e){
    const value=e.target.value
    const name=e.target.name
    setTopicData((prev)=>({
        ...prev,[name]:value
    }))
  }

function handlerefChange(e,index){
    const value=e.target.value
    const name=e.target.name
    setReferences((prev)=>{
        const updated=[...prev];
        updated[index]={...updated[index],[name]:value}
        return updated
    })}
console.log("changeref",References
)

function handleAddref(){
    setReferences((prev)=>([
        ...prev,{
            framework: "",
            ref_code: "",
            desc: "",
          }
    ]))

}

function handleSubtopicChange(e,index){
  const value=e.target.value
  const name=e.target.name
  setSubtopics((prev)=>{
      const updated=[...prev];
      updated[index]={...updated[index],[name]:value}
      return updated;
  })}
console.log("subtopics",Subtopics)

function handleAddSubtopic(){
    setSubtopics((prev)=>([
        ...prev,{
        subtopic_name: "",
        subtopic_code: "",
        subtopic_desc: "",
          }
    ]))

}


function handleRefDelete(id){
  setReferences((prev)=>{
    const updated=prev.filter((data)=>{
      return data.id!==id
    })
    return updated
  })
// console.log("updated_ref",References)
}

function handleSubtopicDelete(id){
  setSubtopics((prev)=>{
    const updated=prev.filter((data)=>{
      return data.id!==id
    })
    return updated
  })
// console.log("updated_ref",References)
}

// console.log("refer",References)
// console.log(ReferenceForm)
// console.log(TopicData)
  const frameworks = ["ESRS", "GRI", "SASB", "TCFD", "SDG", "CDP"];

  // function handleAddReference(e){
  //     const {id,value}=e.target
  //     console.log(id,value)
  //     console.log("asdd")

  // }

//   function handleAddReferenceForm(e) {
//     const { id, value } = e.target;
//     console.log(id, value);
//   }
  

//   console.log("pd", props.data);
//   const curr_data = Globaldata.find((item) => {
//     return item.id === props.data;
//   });
//   console.log("c", curr_data);

  return (
    <>
      <div
        className="popup-overlay"
        style={{ overflowY: "auto" }}
        onClick={() => {
          setToggleCreate(false);
          setToggleEdit(false);
        }}
      >
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <div className="create-form-container">
            <div className="popup-create-form">
              <div className="form_top">
              {props.type=="create" && 
                <div className="form-heading">
                 
                  <h1>Create Custom Topic</h1>
                  <p>
                    Add a custom topic and subtopics to your assessment library
                  </p>
                </div>}
                {props.type=="edit" && 
                <div className="form-heading">
                 <div className="edit_head">
                 <LuSquarePen style={{"width": "1.25rem","height":"1.25rem","paddingTop":"4px"}}/>
                  <h1>Edit Topic</h1>
                  </div>
                  <p>
                  Modify topic details and framework references
                  </p>
                </div>}

                <div
                  className="form_cancel"
                  onClick={() => {
                    setToggleCreate(false);setToggleEdit(false);
                  }}
                >
                  <LuX />
                </div>
              </div>

              <div className="main_form_div">
                <div className="basic_info">
                  <div className="basic_info_title">
                    <div>
                      <h1
                        style={{
                          fontSize: "1.125rem",
                          lineHeight: "1.75rem",
                          fontWeight: 600,
                          letterSpacing: "-0.025em",
                          margin: "0",
                        }}
                      >
                        Basic Information
                      </h1>
                    </div>
                  </div>
                  <div className="basic_info_fields">
                    <div className="topic_deets_container">
                      <div className="topic_name">
                        <label htmlFor="">Topic Name *</label>
                        <input
                          placeholder="e.g., Water Management"
                          value={TopicData.topic_name}
                          onChange={handleChange}
                          type="text"
                          name="topic_name"
                          id=""
                        />
                      </div>

                      <div className="form_topic_code">
                        <label htmlFor="">Topic Code *</label>
                        <input
                          placeholder="e.g., CUSTOM-W1"
                          type="text"
                          value={TopicData.topic_code}
                          name="topic_code"
                          onChange={handleChange}
                          id=""
                        />
                      </div>
                    </div>
                    <div className="topic_desc">
                      <div>
                        <label htmlFor="">Description *</label>
                        <textarea
                          name="desc"
                          value={TopicData.desc}
                          onChange={handleChange}
                          placeholder="Describe the topic and its scope..."
                          id=""
                        ></textarea>
                      </div>
                    </div>

                    <div className="pillar_select">
                      
                      <div>
                        <label htmlFor="">ESG Pillar *</label>
                        <select name="esg_pillar" id="esg_pillar" value={TopicData.esg_pillar} onChange={handleChange}>
                          <option value="" disabled hidden>
                            Select ESG pillar
                          </option>
                          <option value="E">Environmental (E) </option>
                          <option value="S">Social (S)</option>
                          <option value="G">Governance (G)</option>
                        </select>
                        <LuChevronDown className="chevron_icon"/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="framework_references_div">
                  
                  <div className="framework_header">
                    <div className="framework_ref_head">
                      <h1
                        style={{
                          fontSize: "1.125rem",
                          lineHeight: "1.75rem",
                          fontWeight: 600,
                          letterSpacing: "-0.025em",
                        }}
                      >
                        Framework References
                      </h1>
                    </div>
                    <div className="add_ref-button">
                      <button onClick={handleAddref}>
                        <LuPlus /> Add Reference
                      </button>
                    </div>
                  </div>


                    
                {References.length>0 && References.map((ref,index)=>{
                    return (
                    <div className="ref_form_fields" key={index}>
                      
                    <div className="ref_form_fields_container">
                      <div className="ref_heading">
                        <div className="ref_head">
                          <h3
                            style={{
                              fontSize: "1.125rem",
                              lineHeight: "1.75rem",
                              fontWeight: 600,
                              letterSpacing: "-0.025em",
                              margin: "0",
                            }}
                          >
                            Reference {index+1}
                          </h3>
                        </div>
                        {References.length > 0 && (
                          <div className="ref_cancel_button" onClick={()=>handleRefDelete(ref.id)}>
                            <button>
                              <LuX />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="ref_fields">
                        <div className="ref_framework_selection">
                          <label htmlFor="framework-select">Framework</label>
                          <div>
                          <select name="framework" id="framework-select" 
                          value={ref.framework}
                          onChange={(e)=>handlerefChange(e,index)}>
                            <option value="" disabled hidden>
                              Select Framework
                            </option>
                            {frameworks.map((framework) => (
                              <option
                                key={framework}
                                id="framework"
                                
                                
                                value={framework}
                               
                              >
                                {framework}
                              </option>
                            ))}
                          </select>
                          <LuChevronDown className="chevron_icon"/>
                          </div>
                          
                        </div>
                        <div className="ref_code">
                          <label htmlFor="">Reference Code</label>
                          <input
                            placeholder="e.g., ESRS E3"
                            type="text"
                            name="ref_code"
                            value={ref.ref_code}
                            onChange={(e)=>handlerefChange(e,index)}
                            id=""
                          />
                        </div>

                        <div className="ref_desc">
                          <label htmlFor="">Description</label>
                          <input
                            placeholder="e.g., Water and Marine Resources"
                            type="text"
                            name="desc"
                            value={ref.desc}
                            onChange={(e)=>handlerefChange(e,index)}
                            id=""
                          />
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                )})}
                  





                </div>
                
                    
                <div className="subtopics_selection_div" >
                 
                  <div className="framework_header">
                    <div className="framework_ref_head">
                      <h1
                        style={{
                          fontSize: "16px",
                          lineHeight: "1.75rem",
                          fontWeight: 500,
                          letterSpacing: "-0.025em",
                        }}
                      >
                        Subtopics
                      </h1>
                    </div>
                    <div className="add_ref-button">
                      <button onClick={handleAddSubtopic}><LuPlus />Add Subtopic</button>
                    </div>
                  </div>

                  {Subtopics.length>0 && Subtopics.map((topic,index)=>{
                return(
                  <div className="ref_form_fields" key={index}>
                    <div className="ref_form_fields_container">
                      <div className="ref_heading">
                        <div className="ref_head">
                          <h3>Subtopic {index+ 1}</h3>
                        </div>
                        {Subtopics.length > 1 && (
                          <div className="ref_cancel_button" onClick={()=>handleSubtopicDelete(topic.id)}>
                            <button>
                              <LuX />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="basic_info_fields">
                        <div className="topic_deets_container">
                          <div className="topic_name">
                            <label htmlFor="">Subtopic Name</label>
                            <input
                              placeholder="e.g., Water Consumption"
                              type="text"
                              name="subtopic_name"
                              id=""
                              value={topic.subtopic_name}

                              onChange={(e)=>{handleSubtopicChange(e,index)}}
                            />
                          </div>

                          <div className="form_topic_code">
                            <label htmlFor="">Subtopic Code</label>
                            <input
                              placeholder="e.g., CUSTOM-W1.1"
                              type="text"
                              name="subtopic_code"
                              id=""
                              value={topic.subtopic_code}
                              onChange={(e)=>{handleSubtopicChange(e,index)}}
                            />
                          </div>
                        </div>

                        <div className="topic_desc">
                          <div>
                            <label htmlFor="">Description</label>
                            <textarea
                              name="subtopic_desc"
                              placeholder="Describe the subtopic..."
                              id=""
                              value={topic.subtopic_desc}
                              onChange={(e)=>{handleSubtopicChange(e,index)}}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> )})}
                </div>
               
                
              </div>
            </div>
          </div>
          <hr style={{ color: "#e3e3e3", marginTop: "20px" }} />
          <div className="create_form_bottom">
            
            {props.type=="create" &&
            <div className="side_note">
              <p>Custom topics will be available for all assessments</p>
            </div>
            }

{props.type=="edit" &&
            <div className="side_note">
              <p>Changes will be applied to the topic and its configuration</p>
            </div>
            }


            <div className="action_buttons">
              <button
                className="cancel_topic_button"
                onClick={() => {
                  setToggleCreate(false) && setToggleEdit(false);
                }}
              >
                Cancel
              </button>
              

              {props.type=='create' && <button onClick={handleCreate} disabled={!isFormValid} className="create_topic_button"> <LuSave /> Create Topic</button>}
              
              {props.type=='edit' && <button onClick={()=>handleEdit(props.data)} disabled={!isFormValid} className="create_topic_button"> <LuSave /> Save Changes</button>}
              
                
                
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
