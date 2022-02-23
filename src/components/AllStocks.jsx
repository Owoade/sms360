import Header from "./sub-components/Header";
import BaseNav from "./sub-components/BaseNav";
import { useSelector } from "react-redux";
import "../styles/allstocks.css";
import NewStock from "./sub-components/addStockForm"
import { onSnapshot, collection,query,where,doc,updateDoc,deleteDoc,getDocs } from "firebase/firestore";
import { useState,useEffect } from "react";
import { db } from "../firebase";
import {formatCurrency, getCurrencySymbol } from "../functions/utility"
const AllStocks = () => {
    const isDarkmode = useSelector(state => state);
    const [session,setSession]=useState(null);
    const [addStock,setAddStock]=useState(null)
    const user_key=localStorage.getItem("user");
    const [stockName,setStockName]=useState(null)
    const [stockValue,setStockValue]=useState(null)
    const [stockUnit,setStockUnit]=useState(null)
    const [loading, setLoading]=useState(null);
    const [isDeleting,setIsDeleting]=useState(false);
    const [addMore,setAddMore]=useState(null)
    const [editState,setEditState]=useState(null);
    const [error,setError]=useState(null);
    console.log(isDarkmode)
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
      async function pushStock(e){
          setLoading(true)
          e.preventDefault();
          const storeRef = doc(db, "store", session.id);
          await updateDoc(storeRef, {
             stocks:[...session.stocks,{stockValue:parseInt(stockValue),stockName,stockUnit:parseInt(stockUnit),totalUnitSold:0,totalAmountSold:0}]
            //  totalAmountInStock:session.totalAmountInStock + (parseInt(stockUnit) * parseInt(stockValue))
          });
        setAddStock(null)
        setLoading(null)
      }
      async function deleteStock(stockName){
          setIsDeleting(true)
        const storeRef = doc(db, "store", session.id);
        await updateDoc(storeRef, {
            stocks:session.stocks.filter(each => each.stockName != stockName )
         });
         setIsDeleting(false)
      }
      async function editStock(e){
          setLoading(true)
          e.preventDefault()
        //   alert(editState)
        const storeRef = doc(db, "store", session.id);
        if(editState== "Increase"){
            await updateDoc(storeRef, {
                stocks:session.stocks.map(each => each.stockName == addMore[0] ? {...each,stockUnit:parseInt(addMore[1]) + parseInt(stockUnit)} : {...each} )
             });
        }else{
            if((addMore[1]-stockUnit) >= 0){
                await updateDoc(storeRef, {
                    stocks:session.stocks.map(each => each.stockName == addMore[0] ? {...each,stockUnit:parseInt(addMore[1]) - parseInt(stockUnit)} : {...each} )
                 }); 
            }else{
                setError("The available stock unit is too low to be reuced by this amount")
            }
        }
        setLoading(false)
        setAddMore(false)
       
      }
    return (
        <div className="all-stocks-container">
             {
                 error && <div className="add-container">
                  <div className="main-card">
                     <p>{error}</p>
                     <button onClick={()=> setError(null)} className="form-control form-btn">Ok</button>
                  </div>
              </div>
                }
            { addStock &&
                <div className="add-container">
                <div className="main-card" >
                    <form action="" onSubmit={e=>pushStock(e)}>
                        <h1>Add new stock</h1>
                        <input type="text" value={stockName} placeholder="Enter stock name" className="form-control form-input" onChange={(e)=>setStockName(e.target.value)} />
                        <input type="number" value={stockValue} placeholder="Enter stock value" className="form-control form-input"  onChange={(e)=>setStockValue(e.target.value)}/>
                        <input type="number" value={stockUnit} placeholder="Enter stock unit" className="form-control form-input"  onChange={(e)=>setStockUnit(e.target.value)}/>
                        {!loading && <button className="form-control form-btn" type="submit">Add stock</button>}
                        {loading && <button className="form-control form-btn" disabled type="submit">Adding stock....</button> }
                        <span style={{textAlign:"center",display:"block"}}  onClick={()=> setAddStock(null)}>Cancel</span>
                    </form>
                </div>
            </div>
            }
            { addMore &&
                <div className="add-container">
                <div className="main-card" >
                    <form action="" onSubmit={e=>editStock(e)}>
                        <h1>Edit Stock unit</h1>
                        <input type="text" value={addMore} placeholder="Enter stock name" className="form-control form-input" readOnly  />
                        <select name="" id="" value={editState} onChange={(e)=>setEditState(e.target.value)} className="form-control form-select">
                            <option value="null">Select state</option>
                            <option value="Increase">Increase</option>
                            <option value="Decrease">Decrease</option>

                        </select>
                        <input type="number" value={stockUnit} placeholder="Enter stock unit" className="form-control form-input"  onChange={(e)=>setStockUnit(e.target.value)}/>
                        {!loading && <button className="form-control form-btn" type="submit">Edit stock</button>}
                        {loading && <button className="form-control form-btn" disabled type="submit">Editting stock.... Please wait</button> }
                        <span style={{textAlign:"center",display:"block"}}  onClick={()=> setAddMore(null)}>Cancel</span>
                    </form>
                </div>
            </div>
            }
            <div className={isDarkmode == "true" ? "utility-wrapper dark-mode" : "utility-wrapper"}>
                <Header />
                <BaseNav active="All stocks" />
            </div>
            <div className={isDarkmode == "true" ? "main-container dark-mode-inv" : "main-container"}>
               { session && <div className="container">
               <div className="utility-header flex-space-btw">
                        <h2>All stocks</h2>
                        <button className={isDarkmode == "true" ? "light-mode  btn-add-new" : "btn-add-new "} onClick={()=>setAddStock(true)}> <i className="ri-add-line"></i>Add new stock</button>
                        </div> 
                   { session.stocks.length > 0 ? <div className="stocks">
                       {
                           session.stocks.map(each=>( <div className={isDarkmode == "true" ? "stock dark-mode-deep dark-mode-shadow" : "stock"} >
                           <div className="containing-wrapper" style={isDeleting ? {opacity:0.3} : {}}>
                           <div className="stock-header flex-space-btw">
                               <h3>{each.stockName}</h3>
                               <i className="ri-delete-bin-7-fill" onClick={()=>deleteStock(each.stockName)}></i>
                           </div>
                           <span className={each.stockUnit > 0 ? "stock-status in-stock" : "stock-status"}>{each.stockUnit > 0 ? "in stock" : "out of stock"}</span>
                           <div className="stock-stats flex-space-btw">
                               <div className="stock-stat">
                                   <h2>{each.stockUnit}</h2>
                                   <strong>Units in stock</strong>
                               </div>
                               <div className="line"></div>
                               <div className="stock-stat">
                                   <h2><span>{getCurrencySymbol(session.baseCurrency)}</span>{formatCurrency(Math.round(parseInt(each.stockValue) * parseInt(each.stockUnit)))}</h2>
                                   <strong>Amount in stock</strong>
                               </div>
                           </div>
                           <div className="stock-footer flex-space-btw">
                               <span className="amount-sold">{getCurrencySymbol(session.baseCurrency)}{formatCurrency(Math.round(each.totalAmountSold))} sold out</span>
                               <button className="btn" onClick={()=>setAddMore([each.stockName,each.stockUnit])}>Add / Reduce </button>
                           </div>
                           </div>    
                          
                       </div>))
                       }
                       
                        
                    </div> : <span style={{textAlign:"center",margin:"3em 0",display:"block",fontWeight:"bolder"}}>No stocks for now</span>}
                </div>}
                       { 
                           !session &&      <div className="container">
                          <div className="utility-header flex-space-btw">
                        <h2>All stocks</h2>
                        <button className={isDarkmode == "true" ? "light-mode  btn-add-new" : "btn-add-new "} onClick={()=>setAddStock(true)}> <i className="ri-add-line"></i>Add new stock</button>
                        </div> 
                           <div className="stocks">
                               <div className={isDarkmode == "true" ? "stock-loader-element dark-mode-deep dark-mode-shadow" : "stock-loader-element"} ></div>
                               <div className={isDarkmode == "true" ? "stock-loader-element dark-mode-deep dark-mode-shadow" : "stock-loader-element"} ></div>
                               <div className={isDarkmode == "true" ? "stock-loader-element dark-mode-deep dark-mode-shadow" : "stock-loader-element"} ></div>
                               <div className={isDarkmode == "true" ? "stock-loader-element dark-mode-deep dark-mode-shadow" : "stock-loader-element"} ></div>
                               <div className={isDarkmode == "true" ? "stock-loader-element dark-mode-deep dark-mode-shadow" : "stock-loader-element"} ></div>
                               <div className={isDarkmode == "true" ? "stock-loader-element dark-mode-deep dark-mode-shadow" : "stock-loader-element"} ></div>
                           </div>
                       </div>
                       
                       }
            </div>

        </div>
    );
}

export default AllStocks;