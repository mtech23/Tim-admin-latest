import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUser,
  faEye,
  faTasks,
  faMountainCity,
  faMoneyBill,
  faHeadphonesAlt,
  faHeadset
} from "@fortawesome/free-solid-svg-icons";
import {
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";

export const Sidebar = (props) => {

  const location = useLocation()
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/dashboard') ? 'active' : ''}`} to="/dashboard">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/book-management') ? 'active' : ''}`} to="/book-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMessage} />
            </span>
            <span className="sideLinkText">Book Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/chapter-management') ? 'active' : ''}`} to="/chapter-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMessage} />
            </span>
            <span className="sideLinkText">Chapter Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/category-management') ? 'active' : ''}`} to="/category-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="sideLinkText">Category Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/ads-management') ? 'active' : ''}`} to="/ads-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faTasks} />
            </span>
            <span className="sideLinkText">Ads Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/genre-management') ? 'active' : ''}`} to="/genre-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMountainCity} />
            </span>
            <span className="sideLinkText">Genre Management</span>
          </Link>
        </li>
      
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/customer-support') ? 'active' : ''}`} to="/customer-support">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faHeadset} />
            </span>
            <span className="sideLinkText">Customer Support</span>
          </Link>
        </li>



        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/language-management') ? 'active' : ''}`} to="/language-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faHeadset} />
            </span>
            <span className="sideLinkText">Language  Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/currency-management') ? 'active' : ''}`} to="/currency-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Currency Management</span>
          </Link>
        </li>
        {/* 
       
       
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/user-management') ? 'active' : ''}`} to="/user-management">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="sideLinkText">User Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link className={`sideLink ${location.pathname.includes('/target-listing') ? 'active' : ''}`} to="/target-listing">
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span className="sideLinkText">Sales</span>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};
