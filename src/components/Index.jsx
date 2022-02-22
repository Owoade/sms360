import BaseNav from "./sub-components/BaseNav";
import Header from "./sub-components/Header";
import  "../styles/index.css"
import { useState,useEffect } from "react";
import { useSelector} from "react-redux";
import { onSnapshot, collection,query,where } from "firebase/firestore";
import { db } from "../firebase";
import {formatCurrency,getCurrencySymbol } from "../functions/utility"
const Index = () => {

    const isDarkmode = useSelector(state=>state)
    const user_key=localStorage.getItem("user");
    const [session,setSession]=useState(null);
    useEffect(()=>{
        const q = query(collection(db, "store"), where("email", "==", user_key));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data_array = [];
            querySnapshot.forEach(each => setSession(each.data()))
            
          });
    },[session])

    function sumArray(arr){
        let sum =0
        if(arr.length == 0){
            return 0
        }else{
            arr.forEach(each => sum+=each)
        }
        return sum
    }

    
    
    return ( 
        <div className="index-container">
            <div className={isDarkmode == "true" ? "index-header dark-mode" : "index-header"}>
                <Header />
                <BaseNav active="Overview" />
            </div>
            {/* {session && <span>{session.email}</span>} */}
               
                <div className={isDarkmode == "true" ? "overview-container dark-mode-inv" : "overview-container"}>
                    <div className="container">
                        <div className="overview-container-header">
                            <h2>Overview</h2>
                            <button className={isDarkmode == "true" ? "light-mode" : ""}> <i className="ri-add-line"></i>Add new stock</button>                            
                        </div>
                        {
                            session && <div className="stat-cards">
                            <div className={isDarkmode == "true" ? "stat dark-mode-deep dark-mode-shadow" : "stat"}>
                                <h4 className={isDarkmode == "true" ? "dark-mode-inv-text" : "null"}>Total amount in stock</h4>
                                <h2><span>{getCurrencySymbol(session.baseCurrency)}</span>{formatCurrency(sumArray(session.stocks.map(each=>Math.round(each.stockValue * each.stockUnit))))}</h2>
                                <i className={isDarkmode == "true" ? "dark-mode-inv-text ri-bar-chart-fill" : "ri-bar-chart-fill"}></i>
                             </div>     
                            <div className={isDarkmode == "true" ? "stat dark-mode-deep dark-mode-shadow" : "stat"}>
                                <h4 className={isDarkmode == "true" ? "dark-mode-inv-text" : "null"}>Total stock sold out </h4>
                                <h2><span>{getCurrencySymbol(session.baseCurrency)}</span>{sumArray(session.stocks.map(each=>each.totalUnitSold))}</h2>
                                <i className={isDarkmode == "true" ? "dark-mode-inv-text ri-share-forward-fill" : "ri-share-forward-fill"}></i>
                             </div>     
                            <div className={isDarkmode == "true" ? "stat dark-mode-deep dark-mode-shadow" : "stat"}>
                                <h4 className={isDarkmode == "true" ? "dark-mode-inv-text" : "null"}>Total number of stocks </h4>
                                <h2>{sumArray(session.stocks.map(each=>each.stockUnit))}</h2>
                                <i className={isDarkmode == "true" ? "dark-mode-inv-text ri-stack-fill" : "ri-stack-fill"}></i>
                             </div>     
                         </div>
                        }
                    </div>
                    
                </div>
        </div>
     );
}
 
export default Index;