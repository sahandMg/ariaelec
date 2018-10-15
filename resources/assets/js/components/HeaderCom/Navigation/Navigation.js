import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import './Navigation.css';
const Navigation = (props) => (
    <ul className="navbar-list-group text-light">
        <li className="navbar-list-item custom-dropdown">
            <a className="navbar-list-item-link custom-dropdown-toggler">محصولات</a>
            <ul className="custom-dropdown-menu">
                <li className="custom-dropdown-menu-item">
                                <span className="custom-dropdown-menu-item-link">
                                    <span className="dropdown-icon">&larr;</span>سومی هم دیگ
                                </span>
                    <ul className="custom-dropdown-submenu">
                        <li className="custom-dropdown-menu-item">
                                <span className="custom-dropdown-menu-item-link">اینم از این</span>
                        </li>
                        <li className="custom-dropdown-menu-item">
                                <span className="custom-dropdown-menu-item-link">اینم از این</span>
                        </li>
                        <li className="custom-dropdown-menu-item">
                                <span className="custom-dropdown-menu-item-link">
                                    <span className="dropdown-icon">&larr;</span>سومی هم دیگ
                                </span>
                            <ul className="custom-dropdown-submenu">
                                <li className="custom-dropdown-menu-item">
                                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                                </li>
                                <li className="custom-dropdown-menu-item">
                                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                                </li>
                            </ul>
                        </li>
                        <li className="custom-dropdown-menu-item">
                                <span className="custom-dropdown-menu-item-link">اینم از این</span>
                        </li>
                    </ul>
                </li>
                <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                </li>
                <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                </li>
                <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                </li>
                <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                </li>
                <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">اینم از این</span>
                </li>
            </ul>
        </li>
        <li className="navbar-list-item">
            <a className="navbar-list-item-link">آموزش ها</a>
        </li>
        <li className="navbar-list-item">
            <a className="navbar-list-item-link">مجله</a>
        </li>
        <li className="navbar-list-item">
            <Link to="/online-conversion-calculator" className="navbar-list-item-link">محاسبه تبدیل</Link>
        </li>
        <li className="navbar-list-item">
            <a className="navbar-list-item-link">فوت پرینت ها</a>
        </li>
    </ul>
);

{/*<nav>*/}
    {/*<ul>*/}
        {/*<li><NavLink to="/" exact activeClassName="ActiveNav">فروشگاه</NavLink></li>*/}
        {/*<li><NavLink to="/Articles"  activeClassName="ActiveNav">مقاله ها</NavLink></li>*/}
        {/*<li><NavLink to="/DashBoard/EnteredInfo" activeClassName="ActiveNav">فیلم ها</NavLink></li>*/}
        {/*<li><NavLink to="/Tutorials" activeClassName="ActiveNav">آموزش ها</NavLink></li>*/}
        {/*<li><NavLink to="/DashBoard/EnteredInfo" activeClassName="ActiveNav">دیتاشیت ها</NavLink></li>*/}
        {/*<li><NavLink to="/DashBoard/EnteredInfo" activeClassName="ActiveNav">فوت پرینت ها</NavLink></li>*/}
        {/*<li><NavLink to="/online-conversion-calculator" activeClassName="ActiveNav">محاسبه تبدیل ها</NavLink></li>*/}
        {/*<li><NavLink to="/Forum" activeClassName="ActiveNav">فرم ها</NavLink></li>*/}
    {/*</ul>*/}
{/*</nav>*/}


export default Navigation;