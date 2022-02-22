import { useState } from "react"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";
import {auth,db} from ".././firebase/";
import Error from "./sub-components/Error";
import {addDoc,collection,deleteDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [authState, setAuthState] = useState("signup");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [storeName,setStoreName]=useState("");
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false)
    const [changePassword,setChangePassword]=useState(null)

    const navigate = useNavigate();
    const signUp=(e)=>{
        setLoading(true)
      e.preventDefault();
      createUserWithEmailAndPassword(auth,email,password)
      .then( async (user)=>{
          console.log(user)
           await addDoc(collection(db, "store"), {email,storeName,totalUnits:0,totalAmountInStock:0,totalStockSoldOut:0,baseCurrency:"NGN",stocks:[]});
           localStorage.setItem("user",email)
           navigate("/")
           setLoading(false)
        })
      .catch((error)=>{
          setLoading(false)
             switch(error.message){
               case  "Firebase: Password should be at least 6 characters (auth/weak-password)." :
                   setError("Password should be at least 6 characters");
                break
                case "auth/email-already-in-use" :
                    setError("This email has been used, kindly try a different email.");
                break
                default :
                  setError(error.message)   
                 break 
             }
          } 
          )
    }
    const signIn=(e)=>{
        setLoading(true)
      e.preventDefault();
      signInWithEmailAndPassword(auth,email,password)
      .then( async (user)=>{
           navigate("/")
           localStorage.setItem("user",email)
        })
        .catch((error)=>{
            setLoading(false)
               switch(error.message){
                 case  "Firebase: Error (auth/wrong-password)." :
                     setError("You have entered a wrong password");
                  break
                  case "Firebase: Error (auth/user-not-found)." :
                      setError("This email doesn't belong to any registered user");
                  break
                  default :
                    setError(error.message)   
                   break 
               }
            } 
            )
    }  
    const resetPassword =(e)=>{
        e.preventDefault()
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            setChangePassword(null)
            setError(`Email verification link sent to ${email}, Kindly check and follow the given instruction`)
        })
    }  
    if (authState == "login") {
        return (
            <div className="login-container">
                {
                 error && <div className="add-container">
                  <div className="main-card">
                     <p>{error}</p>
                     <button onClick={()=> setError(null)} className="form-control form-btn">Ok</button>
                  </div>
              </div>
                }
                {
                    changePassword && 
                    <div className="add-container">
                    <div className="main-card">
                        <form action="" onSubmit={(e)=>resetPassword(e)}>
                            <h1>Password Reset</h1>
                            <input type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} className="form-control form-input" />
                            <button className="form-control form-btn" type="submit">Send verification link</button>
                            <span onClick={()=>setChangePassword(null)}>Cancel</span>
                        </form>
                    </div>
                </div>
                }
                 <span className="logo">
                    sms<strong>360</strong>
                </span>
                <p>The best dynamic <strong>STOCK MANAGEMENT SYSTEM</strong></p>
                <div className="main-card">
                    <form onSubmit={signIn}>
                        <input type="text" required value={email} className="form-control" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" required value={password} className="form-control" onChange={(e)=>setPassword(e.target.value)} name="" id="" placeholder="Enter password" />
                        {!loading && <button className="form-control form-btn">Login</button>} 
                        {loading && <button disabled="true" className="form-control form-btn">Logging you in 😎...</button>} 
                    </form>
                </div>
                <span onClick={()=> setAuthState("signup")}>Don't have an account? <strong>Click here to sign up</strong>  </span>
                { <span onClick={()=> setChangePassword(true)}>Forgot password 😔? <strong>Click here to Change password</strong>  </span>}

            </div>
        )
    } else {
        return (
            <div className="login-container">
                   {
                 error && <div className="add-container">
                  <div className="main-card">
                     <p>{error}</p>
                     <button onClick={()=> setError(null)} className="form-control form-btn">Ok</button>
                  </div>
              </div>
                }
                <span className="logo">
                    sms<strong>360</strong>
                </span>
                <p>The best dynamic <strong>STOCK MANAGEMENT SYSTEM</strong></p>
                <div className="main-card">
                    <form onSubmit={(e)=>signUp(e)}>
                        <input type="text" required  value={email} className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                        <input type="text" required value={storeName} className="form-control" placeholder="Enter Store name" onChange={(e)=>setStoreName(e.target.value)} />
                        <input type="password" required  value={password} className="form-control" name="" id="" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />
                        {!loading && <button className="form-control form-btn">Sign up</button>} 
                        {loading && <button disabled="true" className="form-control form-btn">Signing you up 😎...</button>} 
                    </form>
                </div>
                <span onClick={()=> setAuthState("login")}>Already have an account?  <strong>Click here to sign in</strong>  </span>
            </div>
        );
    }

}

export default Login;