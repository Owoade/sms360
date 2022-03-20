import {useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import { setDarkMode,setLightMode } from "../../actions/actionMethods";
import {useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  isDarkmode=useSelector(state => state )
    // console.log(isDarkmode);
    // const [isDarkmode,setDarkMode]=useState();
    const setBgMode = ()=>{
        if(isDarkmode=="false"){
            setDarkMode("true")
            localStorage.setItem("isDarkmode","true");
            dispatch(setDarkMode())
        }else{
            setDarkMode("false")
            localStorage.setItem("isDarkmode","false");
            dispatch(setLightMode())
            
        }
        
    }
    const sign_out=()=>{
        signOut(getAuth()); 
        // localStorage.clear() 
        navigate('/')
    }
    return ( 
        <header>
            <div className="container">
                <div className="left">
                    <span className={`logo ${isDarkmode == "true" ? "dark-mode" : "null"}`}>
                        sms<strong>360</strong> 
                    </span>
                </div>
                <div className="right">
                <i className={isDarkmode == "true" ? "bg-toggle ri-sun-fill dark-mode-deep dark-mode-shadow" : "bg-toggle ri-moon-fill bg-toggle"} onClick={setBgMode}></i>
                <button onClick={()=>{sign_out()}} className={isDarkmode == "true" ? "dark-mode-deep" : ""} on><i className="ri-logout-circle-r-line"></i> Sign out</button>
                </div>
            </div>
        </header>
     );
}
 
export default Header;