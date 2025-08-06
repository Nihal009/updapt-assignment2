
import '../css/Header.css'
import { MdOutlineFileUpload } from "react-icons/md";
// import { PiGear } from "react-icons/pi";
import { LuX,LuCircleCheck,LuSlidersVertical,LuPlus,LuSettings } from "react-icons/lu";
import '../css/create_pop.css'


import { useState } from 'react';
import { Modal } from './modal';
import { useGlobalData } from './DataProvider';
import BulkUpload from './BulkUpload';

function Header(){


    
    

    function handleBulkUpload(){
        setBulkuploadToggle(true)

    }


    const {ToggleCreate,setToggleCreate,BulkuploadToggle,setBulkuploadToggle}=useGlobalData()
    // const [ToggleState,setToggleState]=useState(false)
    // const[SelectedFrameworks,setSelectedFrameworks]=useState([])
    // const [ToggleCreate,setToggleCreate]=useState(false)
    
    // function handleConfigFramework(){
    //     console.log("clicked Config")
    //     setToggleState(true)
        
    // }

    function handleCreate(){
        setToggleCreate(!ToggleCreate)

    }
    return (
        <>
        <div className="container">
            <div className="right-side">
        <h1>Topic Library</h1>
        <p>Double Materiality Assessment Configuration</p>
        </div>
        <div className="left-side">
        <button className="button" id="other"><LuSlidersVertical />   Assessment Level: Subtopic</button>
        <button className="button" id="other" ><LuSettings /> Configure Frameworks</button>
        <button className="button" id="other" onClick={handleBulkUpload}><MdOutlineFileUpload /> Bulk Upload</button>
        <button className="create-button" id="create_topic" onClick={handleCreate}><LuPlus /> Create Topic</button>
        </div>

        {/* {ToggleState && <div className='popup-overlay'>
            <div className='popup'>

                <div className='popup-form'>
                <h1>Configure Assessment Frameworks</h1>
                <p>Select the frameworks that apply to your organization. Topics and subtopics will be filtered based on your selection.</p>
                
                <div className='summary_div'>
                    <div className="selection_container">
                        <div style={{
                           "border": "1px",
          "border-radius": "7px",
          "padding": "6px",
          "background-color": "rgb(37 99 235 / var(--tw-text-opacity, .1))",
          "color":"rgb(37 99 235 / var(--tw-text-opacity, 1))"
                        }}><LuCircleCheck/></div>
                        <div className='selection_summary'>
                        
                        <h3>Selection Summary</h3>
                        <p>{SelectedFrameworks.length} frameworks selected • ~98 topics available </p>
                        </div>
                
                        <div className='left-selection_summary'>
                            <span style={{"fontSize":"0.875rem"}}>Industry: Air Freight & Logistics</span>
                            <span style={{"fontSize":"0.75rem"}}>Topics will be filtered for your industry</span>
                            
                        </div>
                    </div>
                    </div></div>
            <h1></h1>
            </div>


        </div>} */}
        {ToggleCreate && <Modal type="create"/>}

        {BulkuploadToggle && <BulkUpload/>}
        {/* {ToggleCreate && <div className='popup-overlay' style={{  "overflowY": "auto"}} onClick={()=>{
            setToggleCreate(false)
        }}>
            <div className='popup' onClick={(e) => e.stopPropagation()}>
            <div className='create-form-container'>
                <div className='popup-create-form'>
                <div className='form_top'>
                <div className='form-heading'>
                <h1>Create Custom Topic</h1>
                <p>Add a custom topic and subtopics to your assessment library</p>
                </div>


                <div className='form_cancel' onClick={()=>{
            setToggleCreate(false)
        }}><LuX /></div>
                </div>
                
                <div className='main_form_div'>
                    <div className='basic_info'>
                        <div className='basic_info_title' >
                            
                            <div><h1 style={{"fontSize": "1.125rem",
"lineHeight": "1.75rem",
"fontWeight": 600, 
"letterSpacing": "-0.025em",
"margin":"0"
}}>Basic Information</h1>
                        </div>
                        </div>
                        <div className='basic_info_fields'>
                            <div className='topic_deets_container'>
                            <div className='topic_name'>
                            <label htmlFor="">Topic Name *</label>
                            <input placeholder='e.g., Water Management' type="text" name="" id="" />
                            </div>

                            <div className='form_topic_code'><label htmlFor="">Topic Code *</label>
                            <input placeholder='e.g., CUSTOM-W1' type="text" name="" id="" /></div>
                            </div>
                            <div className='topic_desc'>
                                <div>
                            <label htmlFor="">Description *</label>
                            <textarea name="" placeholder='Describe the topic and its scope...' id=""></textarea></div></div>

                            <div className='pillar_select'> <div>
                            <label htmlFor="">ESG Pillar *</label>
                            <select name="" id="">
                                <option value="" disabled selected hidden>Select ESG pillar</option>
                                <option value="">Environmental (E) </option>
                                <option value="">Social (S)</option>
                                <option value="">Governance (G)</option>
                            </select>

                            </div>
                            </div>

                        </div>

                    </div>

                    <div className='framework_references_div'>  <div className='framework_header'>
                        <div className='framework_ref_head'>
                            <h1 style={{"fontSize": "1.125rem",
"lineHeight": "1.75rem", 
"fontWeight": 600, 
"letterSpacing": "-0.025em" }}>Framework References</h1>
                        </div>
                        <div className='add_ref-button'>
                            <button>
                            <LuPlus /> Add Reference
                            </button>
                        </div>
                        </div>

                        <div className='ref_form_fields'>
                          <div className='ref_form_fields_container'>
                           <div className='ref_heading'>
                            <div className='ref_head'>
                            <h3 style={{"fontSize": "1.125rem",
"lineHeight": "1.75rem",
"fontWeight": 600, 
"letterSpacing": "-0.025em",
"margin":"0"
}}>Reference {References.length+1}</h3>
                            </div>
                            {References.length>0 && <div className='ref_cancel_button'>
                            <button>
                            <LuX/>
                            </button>
                            </div>}
                            

                            </div>
                        <div className='ref_fields'>
                            
                            <div className='ref_framework_selection'>
                            <label htmlFor="framework-select">Framework</label>
                <select name="framework" id="framework-select">
                 <option value="" disabled selected hidden>Select Framework</option>
                    {frameworks.map((framework) => (
                        <option key={framework} id="framework" value={framework} onChange={handleAddReferenceForm}>
                        {framework}
                        </option>
                    ))}
                    </select>

                            </div>
                            <div className='ref_code'>
                            <label htmlFor="">Reference Code</label>
                            <input placeholder='e.g., ESRS E3' type="text" name="" id="" />
                            </div>

                            <div className='ref_desc'><label htmlFor="">Description</label>
                            <input placeholder='e.g., Water and Marine Resources' type="text" name="" id="" /></div>
                            <div>

                            </div>
                            <div>

                            </div>
                        
                        </div>
                        </div>
                        </div>
                    </div>







                    <div className='subtopics_selection_div'>  <div className='framework_header'>
                        <div className='framework_ref_head'>
                            <h1 style={{"fontSize": "16px",
"lineHeight": "1.75rem", 
"fontWeight": 500, 
"letterSpacing": "-0.025em" }}>Subtopics</h1>
                        </div>
                        <div className='add_ref-button'>
                            <button>
                                Add Subtopic
                            </button>
                        </div>
                        </div>

                        <div className='ref_form_fields'>
                        <div className='ref_form_fields_container'>
                           <div className='ref_heading'>
                            <div className='ref_head'>
                            <h3>Subtopic {Subtopics.length+1}</h3>
                            </div>
        {Subtopics.length>0 && <div className='ref_cancel_button'>
                            <button>
                            <LuX />
                            </button>
                            </div>}

                            </div>
                        <div className='basic_info_fields'>
                            
                        
                            <div className='topic_deets_container'>
                            
                            <div className='topic_name'>
                            <label htmlFor="">Subtopic Name</label>
                            <input placeholder='e.g., Water Consumption' type="text" name="" id="" />
                            </div>

                            <div className='form_topic_code'><label htmlFor="">Subtopic Code</label>
                            <input placeholder='e.g., CUSTOM-W1.1' type="text" name="" id="" /></div>
                            </div>
                            
                            <div className='topic_desc'>
                            <div>
                            <label htmlFor="">Description</label>
                            <textarea name="" placeholder='Describe the subtopic...' id=""></textarea>
                            </div>
                            </div>

                            

                        

                            
                            
                            
                        </div>

                        </div>
                        </div>
                    </div>
                    

                    
                
                       
                            
                        
                    </div>
                    </div>
                    </div>
                    <hr style={{"color":"#e3e3e3","marginTop":"20px"}}/>
                    <div className='create_form_bottom'>
                    <div className='side_note'>
                    <p>Custom topics will be available for all assessments</p>
                    </div>
                    <div className='action_buttons'>
                    <button className='cancel_topic_button' onClick={()=>{
            setToggleCreate(false)
        }}>
                        Cancel
                    </button>
                    <button className='create_topic_button'>
                        Create Topic
                    </button>

                    </div>
                    </div>
                    </div>

                    
            
            </div>


        } */}

        </div>





        </>
        
    )
}

export default Header;