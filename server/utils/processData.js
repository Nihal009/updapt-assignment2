
const ExcelJS =require('exceljs')

// async function ProcessData(path){
// const WorkBook=new ExcelJS.Workbook()
// const WorkSheet=await WorkBook.xlsx.readFile(path)
// const topic_data=WorkSheet.worksheets[0]
// console.log(topic_data.getColumnKey())
// // console.log(WorkSheet.eachSheet.toString())
// }


async function ProcessData(path){
    const data=[]
    
        
    
    const WorkBook=new ExcelJS.Workbook()
    const WorkSheet=await WorkBook.xlsx.readFile(path)
    const sheet1=WorkSheet.worksheets[0]
    const sheet2=WorkSheet.worksheets[1]
    const sheet3=WorkSheet.worksheets[2]

    
    sheet1.eachRow((row,rownumber)=>{
        if(rownumber>1){
            const topic_data={
                topic_data:{
            topic_name:row.getCell(1).value,
        topic_code:row.getCell(2).value,
        desc:row.getCell(3).value,
        esg_pillar:row.getCell(4).value
    },
    framework_ref:[],
    subtopics:[]
    }

    data.push(topic_data)
    }
    })
    sheet2.eachRow((row,rownumber)=>{
        data.map((mapdata,index)=>{
                        const item =row.getCell(1).value
                        if(item==mapdata.topic_data.topic_code
                    ){
                        const ref={framework: row.getCell(2).value,
                            ref_code: row.getCell(3).value,
                            desc: row.getCell(4).value}
                        data[index].framework_ref.push(ref)
                        
            
            }
        })
        
    })

    sheet3.eachRow((row,rownumber)=>{
        data.map((mapdata,index)=>{
                        const item =row.getCell(1).value
                        if(item==mapdata.topic_data.topic_code
                    ){
                        const ref={subtopic_name:row.getCell(2).value,
                            subtopic_code: row.getCell(3).value,
                            subtopic_desc: row.getCell(4).value,}
                        data[index].subtopics.push(ref)
                        
            
            }
        })
        
    })
    // console.log("topics:",data[1].framework_ref);
    // console.log(WorkSheet.getWorksheet(1))
    // console.log(WorkSheet.eachSheet.toString())
    return data;
    }

// ProcessData('./uploads/SampleData_Appended.xlsx')

module.exports=ProcessData