import React, { useState,useEffect, useContext } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";
import { uploadContext } from "../Context/Context";

export default function Navbar() {
  const {image,searchQuery,setSearchQuery} = useContext(uploadContext)
  const [collapsed, setCollapsed] = useState(true);
  const [navbar,setNavbar] = useState(false)
  

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);


    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, [image]);

  return (
    <div className={`fixed-top ${navbar ? "Active" : ""}`}>
<nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand logo-navbar" href="#">Blog</a>
        <button className={`navbar-toggler ${collapsed ? 'collapsed' : ''}`} type="button" onClick={toggleNavbar}>
          <span className={`toggler-icon top-bar ${collapsed ? 'collapsed' : ''}`}></span>
          <span className={`toggler-icon middle-bar ${collapsed ? 'collapsed' : ''}`}></span>
          <span className={`toggler-icon bottom-bar ${collapsed ? 'collapsed' : ''}`}></span>
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">

            <a className="nav-link active" aria-current="page" href="#"> <input
            type="text"
            className="input"
            placeholder="Search Images"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /></a>
            <Link to={'/upload'} className="nav-link" href="#"><button className="button" >Create Blog <span className="button-plus">+</span></button> </Link>
          </div>
        </div>
      </div>
    </nav>
    </div>
    
  );
}
