import { useSelector } from "react-redux";
import BaseNav from "./sub-components/BaseNav"
import Header from "./sub-components/Header"
import {useState,useEffect} from "react"
import { onSnapshot, collection,query,where,doc,updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
// import axios from "axios";
import ".././styles/settings.css"
const Settings = () => {
//  fetch("https://v6.exchangerate-api.com/v6/a94560461fb8ccb0ce0170b7/latest/NGN")
// .then(response => response.json()).
// then(result => console.log(result))
// .catch(err => {
// 	console.error(err);
// });
    const isDarkmode= useSelector(state=>state)
    const [currency,setCurrency]=useState(null);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(null);
    const [session,setSession]=useState(null);
    const user_key=localStorage.getItem("user");
  
    useEffect(()=>{
        if(session==null){
            const q = query(collection(db, "store"), where("email", "==", user_key));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data_array = [];
                querySnapshot.forEach(each => setSession({...each.data(),id:each.id}))
                // setSession(querySnapshot.data())
                // console.log(session)
              }); 
        }
        
    },[session])
    async function changeCurrency(e){
        setLoading(true)
          e.preventDefault();
          if(currency != null){
            try{
                const request = await fetch(`https://v6.exchangerate-api.com/v6/a94560461fb8ccb0ce0170b7/latest/${session.baseCurrency}`);
                const result = await request.json()
                const rateIndex = Object.keys(result.conversion_rates).indexOf(currency)
                const rate =  Object.values(result.conversion_rates)[rateIndex];
                console.log(rate);
                const storeRef = doc(db, "store", session.id);
                await updateDoc(storeRef, {
                   baseCurrency:currency,
                   stocks: session.stocks.map(function(each){ return {...each,stockValue:each.stockValue * rate,totalAmountSold:each.totalAmountSold * rate} })
             });
            }catch(error){
               setError(error)
            }
             
          }
          setLoading(false)
    }
    return ( 
        <div className="settings-container">
             {
                 error && <div className="add-container">
                  <div className="main-card">
                     <p>{error}</p>
                     <button onClick={()=> setError(null)} className="form-control form-btn">Ok</button>
                  </div>
              </div>
                }
             <div className={isDarkmode == "true" ? "utility-wrapper dark-mode" : "utility-wrapper"}>
                <Header/>
                <BaseNav active="Settings"/>
            </div>
            <div className={isDarkmode == "true" ? "main-container dark-mode-inv" : "main-container"}>
                <div className="container">
                    <div className="utility-header flex-space-btw">   
                        <h2>Settings</h2>
                        {/* <button className={isDarkmode == "true" ? "light-mode  btn-add-new" : "btn-add-new "}> <i className="ri-add-line"></i>Add new stock</button>    */}
                    </div>
                   { session && <div className="settings">
                        <div className={isDarkmode == "true" ? "setting dark-mode-deep" : "setting"}>
                            <h3>Change stock currency</h3>
                            <form onSubmit={e=> changeCurrency(e)}>
                            <select name="" id="" value={currency} onChange={(e)=>setCurrency(e.target.value)} className={isDarkmode == "true" ? "dark-mode-form-input  form-control " : " form-control"}>
                                <option value="null">Select a currency</option>
                                <option value="NGN">Naira (₦)</option>
                                <option value="USD">Dollars ($)</option>
                                <option value="GBP">Pounds (£)</option>
                                <option value="EUR">Euro (€)</option>
                            </select>
                            { !loading && <button className={isDarkmode == "true" ? "light-mode  form-control form-btn" : " form-control form-btn"}>Change currency</button>}
                            {loading && <button className={isDarkmode == "true" ? "light-mode  form-control form-btn" : " form-control form-btn"}>Changing currency...</button>}

                            </form>
                           

                        </div>
                        
                    </div>}
                </div>
               
            </div>
        </div>
     );
}
 
export default Settings;