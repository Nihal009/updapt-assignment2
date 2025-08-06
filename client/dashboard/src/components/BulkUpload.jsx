import { useEffect, useState } from "react";
import "../css/create_pop.css";
import { useGlobalData } from "./DataProvider";
import {
    LuDownload,LuUpload,LuFileText,LuX
} from "react-icons/lu";
import '../css/BulkUpload.css'
import '../css/create_pop.css'
import '../css/Header.css'

import axios from 'axios'




// console.log(Workbook)



function BulkUpload(props) {


async function handleSubmit(){
    const formData=new FormData()
    formData.append("file",selectedFile)
    console.log("fdata",formData)
    try{
        const response=await axios.post('http://localhost:4000/api/bulk-upload/',formData,{headers: {
            'Content-Type': 'multipart/form-data',
          },})
        console.log("response",response)
    }
    catch(error){
        console.error("Error uploading File",error)
    }

    

}









function handleDragOver(e){
    // console.log(e)
    e.preventDefault();
    setdragOver(true);

}

function handleDragLeave(e){
   
    e.preventDefault();
    console.log("dg",dragOver)
    setdragOver(false)
}

function handleDrop(e){
    e.preventDefault()
    const file=e.dataTransfer.files[0]
    console.log(file)
    // console.log(e)
    setselectedFile(file)
    setdragOver(false)
    
    // reader.readAsDataURL(file)

}


function handleFileChange(e){
const file=e.target.files[0]
setselectedFile(file)
console.log(file)
}


function handleFileRemove(){
setselectedFile(null)

}





const [dragOver,setdragOver]=useState(false)
const [selectedFile,setselectedFile]=useState(null)

const {BulkuploadToggle,setBulkuploadToggle}=useGlobalData()





// useEffect(()=>{
//     const Worksheet=Workbook.xlsx(selectedFile)
//     console.log(Worksheet)
// },[selectedFile])
// console.log(selectedFile)

    return (
    <>
      <div
        className="popup-overlay"
        style={{ overflowY: "auto" }}
        onClick={() => {
            setBulkuploadToggle(false)
        }}
      >
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <div className="create-form-container">
            <div className="popup-create-form">
              <div className="form_top">
              {/* {props.type=="create" &&  */}
                <div className="form-heading">
                 
                  <h1>Bulk Upload Topics</h1>
                  <p>
                  Upload multiple topics and subtopics using a CSV file
                  </p>
                </div>
              </div>
                <div className="example_container">
                        
                        <div className='example_details'>
                        
                        <h3>Download Template</h3>
                        <p>Use our CSV template to ensure proper formatting</p>
                        </div>
                        
                        
                
                        <div className='download_button'>
                        <button className="d_button" id="other"><LuDownload />  Download Template</button>
                            
                        </div>
                    </div>
              <div className="download-drop-container">
               <div className={`download-drop-area ${dragOver?"drag-over":""}`}
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}>
                <div className="drop-inner-div">
                    
                    {selectedFile?<div className="after-drag">
                        <div className="icon">
                    <LuFileText size={"3rem"} color="#16a34a"/>
                    </div>
                   
                        <h3>
                        {selectedFile.name}
                        </h3>
                        <p>{selectedFile.size} KB</p>
                        
                        
                        
                        <button
                            className="remove_file-button" type="button"
                           onClick={handleFileRemove}>
                           <LuX /> Remove File
                          </button>
                            

                    </div>:
                    <div className="before-drag">
                    <div className="icon">
                    <LuUpload size={"3rem"} color="#9ca3af"/>
                    </div>
                   
                        <h3>
                        Drop your CSV file here, or click to browse 
                        </h3>
                        <p>Supports CSV files up to 10MB</p>
                        <input type="file" name="" accept=".xlsx" hidden id="file-input" className="file-input" onChange={handleFileChange}/>
                        
                        <label htmlFor="file-input" type="button" className="cancel_file-upload_button">
                    
                            Select File
                            </label></div>}
                    

                </div>

               </div>

                

                
                
              
              
            </div>

            <div className="create_form_bottom">
                        
                        {/* {props.type=="create" && */}
                        <div className="side_note">
                          <p>Upload a CSV file to get started</p>
                        </div>
                        
            
            
            
                        <div className="file-upload-buttons">
                          <button
                            className="cancel_file-upload_button"
                            onClick={() => {
                            //   setToggleCreate(false) && setToggleEdit(false);
                            setBulkuploadToggle(false)
                            }}
                          >
                            Cancel
                          </button>
                          
            
                          
                          
                          <button onClick={handleSubmit}  className="import-topics_button"> Import Topics</button>
                          
                            
                            
                          
                          
                        </div>
                      </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}


export default BulkUpload