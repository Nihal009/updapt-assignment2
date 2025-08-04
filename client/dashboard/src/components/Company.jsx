import '../css/company.css'
import { LuBuilding2 } from "react-icons/lu";
function Company(){
    return (<>
    <div className="Company_container">
        <div className='icon'><LuBuilding2 style={{"height": "1.25rem",
    "width": "1.25rem"}}/></div>
        <div className='company_details'>
        
        <h3>Global Logistics Corp</h3>
        <p>Air Freight & Logistics • International Freight</p>
        </div>

        <div className='active_frameworks'>
            <span>Active Frameworks:</span>
            <div className='framework'>ESRS</div>
            
        </div>
    </div>
    </>)
}

export default Company;