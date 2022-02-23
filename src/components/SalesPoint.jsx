import Header from "./sub-components/Header";
import BaseNav from "./sub-components/BaseNav";
import ".././styles/sales.css"
import { useSelector } from "react-redux";
import { onSnapshot, collection, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { getCurrencySymbol, formatCurrency } from "../functions/utility";
import jsPDF from 'jspdf'
const SalesPoint = () => {
    const isDarkmode = useSelector(state => state)
    const user_key = localStorage.getItem("user");
    const [session, setSession] = useState(null);
    const [purchases, setPurchases] = useState([])
    const [item, setItem] = useState(null);
    const [stockUnit, setStockUnit] = useState(null);
    const [error, setError] = useState(null)
    function sumArray(arr) {
        let sum = 0
        if (arr.length == 0) {
            return 0
        } else {
            arr.forEach(each => sum += each)
        }
        return sum
    }

    useEffect(() => {
        if (session == null) {
            const q = query(collection(db, "store"), where("email", "==", user_key));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data_array = [];
                querySnapshot.forEach(each => setSession({ ...each.data(), id: each.id }))

            });
        }

    }, [session])
    function addToPurchase(e) {
        e.preventDefault();
        if (item != null) {
            if (session.stocks.filter(each => each.stockName == item).map(each => each.stockUnit - stockUnit)[0] >= 0) {
                if (stockUnit > 0) {
                    if (purchases.map(each => each.item).includes(item)) {
                        setPurchases(purchases.map(each => each.item == item ? { ...each, stockUnit, price: Math.round(session.stocks.filter(each => each.stockName == item)[0].stockValue * stockUnit) } : each))
                    } else {
                        setPurchases([...purchases, { item, stockUnit, price: Math.round(session.stocks.filter(each => each.stockName == item)[0].stockValue * stockUnit) }])
                    }
                }


            } else {
                setError("The number of available stock is too low for this amount to be purchased")
            }

        }
        console.log(purchases)
    }
    async function printReciept() {
        if (purchases.length != 0) {
            // Reduce stock
            const storeRef = doc(db, "store", session.id);
            // Array that holds changes in stock after purchase hase been made
            const reducedStock = []

            session.stocks.forEach((stock) => {
              const result =  purchases.map(each => each.item == stock.stockName ? {...stock,stockUnit:parseInt(stock.stockUnit)-parseInt(each.stockUnit),totalUnitSold:parseInt(each.stockUnit) + parseInt(stock.totalUnitSold),totalAmountSold:parseInt(stock.totalAmountSold)+parseInt(each.price)} : null)
              reducedStock.push( result[0] != null ? result[0] : stock)
            })
            await updateDoc(storeRef, {
                stocks: reducedStock
            });
            // Reciept generation
            const pdf = new jsPDF('p', 'mm', [130, 100]);
            pdf.text('sms360', 40, 10)
            pdf.setFontSize(11)
            pdf.text('Sales reciept', 38, 18)
            pdf.text(`Store name: ${session.storeName}`, 10, 30)
            pdf.text('Items purchased', 10, 40)


            pdf.addFont('helvetica', "bold")
            pdf.setFontSize(8)
            purchases.forEach((each, i) => {
                pdf.text(10, 50 + (i * 5), `${each.item}   ${each.stockUnit} units   ${getCurrencySymbol(session.baseCurrency)}${formatCurrency(each.price)}`)
            })
            pdf.setFontSize(11)
            pdf.text(10, 60 + (purchases.length * 5), `Total price:${getCurrencySymbol(session.baseCurrency)} ${formatCurrency(sumArray(purchases.map(each => each.price)))}`)
            pdf.text(10, 70 + (purchases.length * 5), `https://sales.sms360.vercel.app/?sId=${session.storeName.slice(0, 3)}_${Date.now().toString().slice(7, 10)}`)
            // doc.text(10, 20, 'This is the second title.')
            // doc.text(10, 30, 'This is the thrid title.')


            pdf.save(`reciept_ ${Date.now()}.pdf`)
        }

    }
    return (
        <div className="sales-container">
            {
                error && <div className="add-container">
                    <div className="main-card">
                        <p>{error}</p>
                        <button onClick={() => setError(null)} className="form-control form-btn">Ok</button>
                    </div>
                </div>
            }
            <div className={isDarkmode == "true" ? "utility-wrapper dark-mode" : "utility-wrapper"}>
                <Header />
                <BaseNav active="Sell stock" />
            </div>
            <div className={isDarkmode == "true" ? "main-container dark-mode-inv" : "main-container"}>
                <div className="container">
                    <div className="wrapper flex-space-btw">
                        {session && <div className={isDarkmode == "true" ? "sales-form dark-mode-deep" : "sales-form"}>
                            <form onSubmit={(e) => addToPurchase(e)}>
                                <select name="" id="" value={item} onChange={(e) => setItem(e.target.value)} className={isDarkmode == "true" ? "form-control  dark-mode-form-input" : "form-control"}>
                                    <option value="">Select stock</option>
                                    {session.stocks.map(each => (<option value={each.stockName}>{each.stockName}</option>))}
                                </select>
                                <input type="number" value={stockUnit} onChange={(e) => setStockUnit(e.target.value)} className={isDarkmode == "true" ? "form-control  dark-mode-form-input" : "form-control"} placeholder="Enter unit" required />
                                <button className={isDarkmode == "true" ? "light-mode  form-control form-btn" : " form-control form-btn"}>Add to cart</button>
                            </form>
                        </div>}
                        <div className="reciept-container">
                            <div className="reciept">
                                <span className="logo">
                                    sms<strong>360</strong>
                                </span>
                                <strong style={{ textAlign: "center", display: "block", margin: "1em 0" }}>Sales reciept</strong>
                                {session && <p><strong>Vendors name:</strong> {session.storeName}</p>}
                                <strong>Items purchased</strong>
                                {/* <div className="item">
                                    <span>Paracetamol</span>
                                    <span>2 units</span>
                                    <span>300</span>
                                </div>
                                <div className="item">
                                    <span>Paracetamol</span>
                                    <span>2 units</span>
                                    <span>300</span>
                                </div>
                                <div className="item">
                                    <span>Paracetamol</span>
                                    <span>2 units</span>
                                    <span>300</span>
                                </div> */}
                                {purchases.map(each => (<div className="item">
                                    <span>{each.item}</span>
                                    <span>{each.stockUnit}</span>
                                    <span>{getCurrencySymbol(session.baseCurrency)}{formatCurrency(each.price)}</span>
                                </div>))}
                                {session && <strong>Total amount :{getCurrencySymbol(session.baseCurrency)}{formatCurrency(sumArray(purchases.map(each => each.price)))}</strong>}
                            </div>
                            <button className={isDarkmode == "true" ? "light-mode  form-control form-btn" : " form-control form-btn"} onClick={printReciept}>Print reciept</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default SalesPoint;