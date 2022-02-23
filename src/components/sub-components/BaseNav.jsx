import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
const BaseNav = ({active}) => {
    const isDarkmode = useSelector(state => state)
    const links = [
        {
            link_name:"Overview",
            link_path:"/",
            active:false
            
        },
        {
            link_name:"All stocks",
            link_path:"/all-stocks",
            active:false
        },
        {
            link_name:"Settings",
            link_path:"/settings",
            active:false
           
        },
        {
            link_name:"Sell stock",
            link_path:"/sell-stock",
            active:false
           

        }
    ]
    const filtered_links= isDarkmode == "true" ? links.map(each=> each.link_name == active ? {...each,activeClassName:"dark-mode-inv-text active-dark"}: {...each,activeClassName:"dark-mode-inv-text"}) : links.map(each=> each.link_name == active ? {...each,activeClassName:"active-light"}: {...each,activeClassName:"null"})
    console.log(filtered_links)
    console.log(isDarkmode)
    return ( 
        <div className="base-nav">
            <div className="container">
                <div className="scroll-wrapper">
                    <nav>
                        {filtered_links.map(each => (<Link to={`${each.link_path}`} className={`${each.activeClassName}`}> {each.link_name} </Link>))}
                    </nav>
                </div>
               
            </div>
            
        </div>
     );
}
 
export default BaseNav;