import { useDispatch } from "react-redux";
import {useState} from "react";
const ErrorCard = ({error, errorDisplay}) => {
    const dispatch = useDispatch();
    const [display,setDisplay] = useState(error);
    
   
        return (  
            <div className="wrapper-x">
                {
                 display != null && <div className="add-container">
                  <div className="main-card">
                     <p>{error}</p>
                     <button onClick={()=> setDisplay(null)} className="form-control form-btn">Ok</button>
                  </div>
              </div>
                }
            </div>
           
        );
    
   
}
 
export default ErrorCard;