import { useDispatch } from "react-redux";
import {useState} from "react";
const Message = ({message, setError}) => {   
        return (  
            <div className="wrapper-x">
                 <div className="add-container">
                  <div className="main-card">
                     <p style={{textAlign:"center",margin:"1em 0",fontWeight:"bolder"}}>{message}</p>
                     <button onClick={()=> setError(null)} className="form-control form-btn">Ok</button>
                  </div>
              </div>
                
            </div>
           
        );
    
   
}
 
export default Message;