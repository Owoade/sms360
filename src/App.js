import logo from './logo.svg';
import './styles/utility.css';
import Index from "./components/Index";
import AllStocks from "./components/AllStocks";
import Settings from "./components/Settings";
import SalesPoint from "./components/SalesPoint"
import Login from './components/Login';
// import MyManager from './components/MyManager';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from "react";
import {useSelector} from "react-redux";
function App() {
  const isDarkmode = useSelector(state=>state)
  const auth = getAuth();
  const [signedIn, setSignedIn] = useState(false)
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      user ? setSignedIn(true) : setSignedIn(false)
    })
    return () => subscribe();
  }, [])
  if (signedIn) {
    return (
      <div className={isDarkmode == "true" ? "App dark-mode-inv" : "App"}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Index />}>
            </Route>
            <Route exact path="/all-stocks" element={<AllStocks />}>
            </Route>
            <Route exact path="/settings" element={<Settings />}>
            </Route>
            <Route exact path="/sell-stock" element={<SalesPoint />}>
            </Route>
            <Route exact path="/login" element={<Login />}>
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <Index /> */}
      </div>
    );
  } else {
    return(
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    )
   

  }

}

export default App;
