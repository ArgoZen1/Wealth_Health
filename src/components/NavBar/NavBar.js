import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    const location = useLocation();
    const linkText = location.pathname === "/page2" ? "Create Employee" : "View Current Employees";

    return (
        <nav>
            <div className='container-logo-text'>
                <div className='container-img-logo'>
                </div>
                <h1>HRnet</h1>
            </div>
            <div className='container-link'>
                <Link to={location.pathname === "/page2" ? "/" : "/page2"} className='my-link'>
                    {linkText}
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;