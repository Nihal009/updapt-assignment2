import '../css/card.css'
import { LuCircleCheck } from "react-icons/lu";
function Card(props){
    return (<>
    <div className="card">
    <div className='right'>
    <p style={{  "color": "rgb(75 85 99 / var(--tw-text-opacity, 1))"}}>{props.name}</p>
    <p style={{fontWeight:"700",fontSize:"1.5rem"}}>{props.count}</p>
    </div>
    <div className='left' style={props.s}>
        {props.icon}
    </div>
    </div>
    </>)
}

export default Card;