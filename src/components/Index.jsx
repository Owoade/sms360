import BaseNav from "./sub-components/BaseNav";
import Header from "./sub-components/Header";
import "../styles/index.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { formatCurrency, getCurrencySymbol, getMonthFromIndex,formatDate} from "../functions/utility"
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import { Flex } from "@chakra-ui/react"
import "../styles/activity.css"
const Index = () => {
    const navigate = useNavigate()
    const isDarkmode = useSelector(state => state)
    const user_key = localStorage.getItem("user");
    const [session, setSession] = useState(null);
    useEffect( async () => {
        if (session == null) {
            const q = query(collection(db, "store"), where("email", "==", user_key));           
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setSession({ ...doc.data(), id: doc.id })
            });

//                 setSession(querySnapshot.data())
            console.log(session)
        }
    }, [session])

    function sumArray(arr) {
        let sum = 0
        if (arr.length == 0) {
            return 0
        } else {
            arr.forEach(each => sum += each)
        }
        return sum
    }



    return (
        <div className="index-container">
            <div className={isDarkmode == "true" ? "index-header dark-mode" : "index-header"}>
                <Header />
                <BaseNav active={"Overview"} />
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
                                <h2><span>{getCurrencySymbol(session.baseCurrency)}</span>{formatCurrency(sumArray(session.stocks.map(each => Math.round(each.stockValue * each.stockUnit))))}</h2>
                                <i className={isDarkmode == "true" ? "dark-mode-inv-text ri-bar-chart-fill" : "ri-bar-chart-fill"}></i>
                            </div>
                            <div className={isDarkmode == "true" ? "stat dark-mode-deep dark-mode-shadow" : "stat"}>
                                <h4 className={isDarkmode == "true" ? "dark-mode-inv-text" : "null"}>Total stock sold out </h4>
                                <h2><span>{getCurrencySymbol(session.baseCurrency)}</span>{formatCurrency(Math.floor(sumArray(session.stocks.map(each => each.totalAmountSold))))}</h2>
                                <i className={isDarkmode == "true" ? "dark-mode-inv-text ri-share-forward-fill" : "ri-share-forward-fill"}></i>
                            </div>
                            <div className={isDarkmode == "true" ? "stat dark-mode-deep dark-mode-shadow" : "stat"}>
                                <h4 className={isDarkmode == "true" ? "dark-mode-inv-text" : "null"}>Total number of stocks </h4>
                                <h2>{sumArray(session.stocks.map(each => each.stockUnit))}</h2>
                                <i className={isDarkmode == "true" ? "dark-mode-inv-text ri-stack-fill" : "ri-stack-fill"}></i>
                            </div>
                        </div>
                    }{
                        !session && <div className="stat-cards">
                            <div className={isDarkmode == "true" ? "stat-loader-element dark-mode-deep dark-mode-shadow" : "stat-loader-element"}>
                            </div>
                            <div className={isDarkmode == "true" ? "stat-loader-element dark-mode-deep dark-mode-shadow" : "stat-loader-element"}>
                            </div>
                            <div className={isDarkmode == "true" ? "stat-loader-element dark-mode-deep dark-mode-shadow" : "stat-loader-element"}>
                            </div>

                        </div>
                    }
                    <div className="overview-container-header">
                        <h2>Recent Activities</h2>
                    </div>
                    <div className={isDarkmode == "true" ? "stat dark-mode-deep dark-mode-shadow activity-container" : "activity-container"} >
                        {/* <div className="clusters">
                                    <div className="cluster">
                                        <h3>March 2022</h3>
                                        <span className={isDarkmode == "true" ? "light-mode stock-tag" : "stock-tag"}>Canadian loud</span>
                                        <div className="logs">
                                            <div className="activity-flex-wrapper" >
                                                <div className="log">
                                                    <div className="log-info credit">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, laborum.</div>
                                                    <span className="log-type"></span>
                                                </div>
                                                <span className="log-date">12h</span>
                                            </div>
                                           
                                            
                                        </div>
                                        <div className="logs">
                                            <div className="activity-flex-wrapper" >
                                                <div className="log">
                                                    <div className="log-info debit">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, laborum.</div>
                                                    <span className="log-type"></span>
                                                </div>
                                                <span className="log-date">12h</span>
                                            </div>
                                           
                                            
                                        </div>
                                        <div className="logs">
                                            <div className="activity-flex-wrapper" >
                                                <div className="log">
                                                    <div className="log-info debit">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, laborum.</div>
                                                    <span className="log-type"></span>
                                                </div>
                                                <span className="log-date">12h</span>
                                            </div>
                                           
                                            
                                        </div>
                                        <div className="logs">
                                            <div className="activity-flex-wrapper" >
                                                <div className="log">
                                                    <div className="log-info credit">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, laborum.</div>
                                                    <span className="log-type"></span>
                                                </div>
                                                <span className="log-date">12h</span>
                                            </div>
                                           
                                            
                                        </div>
                                    </div>
                                </div> */}
                                {
                                    !session && (
                                        <div className="clusters">
                                            <div className="cluster">
                                                <div className="loader-element loader-cluster-header"></div>
                                                <div className="logs">
                                                    <div className="activity-flex-wrapper log-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                                <div className="loader-element log-notification"></div>
                                                                <div className="loader-element log-rate-tag"></div>
                                                            </Flex>
                                                            
                                                        </div>
                                                         <div className="loader-element loader-log-date"></div>
                                                    </div>
                                                    <div className="activity-flex-wrapper log-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                                <div className="loader-element log-notification"></div>
                                                                <div className="loader-element log-rate-tag"></div>
                                                            </Flex>
                                                            
                                                        </div>
                                                         <div className="loader-element loader-log-date"></div>
                                                    </div>
                                                    <div className="activity-flex-wrapper log-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                                <div className="loader-element log-notification"></div>
                                                                <div className="loader-element log-rate-tag"></div>
                                                            </Flex>
                                                            
                                                        </div>
                                                         <div className="loader-element loader-log-date"></div>
                                                    </div>
                                                    <div className="activity-flex-wrapper log-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                                <div className="loader-element log-notification"></div>
                                                                <div className="loader-element log-rate-tag"></div>
                                                            </Flex>
                                                            
                                                        </div>
                                                         <div className="loader-element loader-log-date"></div>
                                                    </div>
                                                    <div className="activity-flex-wrapper log-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                                <div className="loader-element log-notification"></div>
                                                                <div className="loader-element log-rate-tag"></div>
                                                            </Flex>
                                                            
                                                        </div>
                                                         <div className="loader-element loader-log-date"></div>
                                                    </div>
                                                    <div className="activity-flex-wrapper log-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                                <div className="loader-element log-notification"></div>
                                                                <div className="loader-element log-rate-tag"></div>
                                                            </Flex>
                                                            
                                                        </div>
                                                         <div className="loader-element loader-log-date"></div>
                                                    </div>
                                                    <div className="activity-flex-wrapper log-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                                <div className="loader-element log-notification"></div>
                                                                <div className="loader-element log-rate-tag"></div>
                                                            </Flex>
                                                            
                                                        </div>
                                                         <div className="loader-element loader-log-date"></div>
                                                    </div>
                                                    <div className="activity-flex-wrapper log-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                                <div className="loader-element log-notification"></div>
                                                                <div className="loader-element log-rate-tag"></div>
                                                            </Flex>
                                                            
                                                        </div>
                                                         <div className="loader-element loader-log-date"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                        {
                            session && session.stock_logs && (
                                <div className="clusters">
                                    {session.stock_logs.map(logs => (<div className="cluster">
                                        <h3>{getMonthFromIndex(logs.month)},{logs.year}</h3>
                                        <div className="logs">
                                            {
                                                logs.activities.sort((a,b) => b.timeStamp.milliseconds - a.timeStamp.milliseconds).map(log => (
                                                    <div className="activity-flex-wrapper">
                                                        <div className="log">
                                                            <Flex>
                                                              <div className={`log-info`}>{log.notification}</div>
                                                              <span className={`rate-tag ${log.tag ? log.tag : ""}`}>{log.tag == "debit" ? "-" : "+"}{log.stock.stockUnit}{log.stock.stockUnit > 1 ? " units" : " unit"}</span>
                                                            </Flex>
                                                            

                                                        </div>
                                                        <span className="log-date">{formatDate(logs.year,logs.month,log.date,log.timeStamp)}</span>
                                                    </div>

                                                ))
                                            }
                                        </div>
                                    </div>)
                                    )}
                                </div>
                            )
                        }
                        {
                            session  && (!session.stock_log &&  session.stock_logs.length == 0) && (
                                <span style={{textAlign:"center",margin:"1em 0",fontWeight:"bolder"}}>No activities for now</span>
                            ) 
                        }
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Index;
