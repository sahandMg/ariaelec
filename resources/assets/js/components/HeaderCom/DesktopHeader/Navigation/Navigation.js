import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = (props) => (
        <ul className="navbar-list-group text-light">
            <li className="navbar-list-item custom-dropdown" id="products">
                <a className="navbar-list-item-link custom-dropdown-toggler">
                    محصولات
                </a>
                <ul className="custom-dropdown-menu">
                    <li className="custom-dropdown-menu-item">

                                <span className="custom-dropdown-menu-item-link">

                                    <span className="dropdown-icon">&larr;</span>
                                    سومی هم دیگ
                                </span>

                        <ul className="custom-dropdown-submenu">
                            <li className="custom-dropdown-menu-item">
                                <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                                </span>
                            </li>
                            <li className="custom-dropdown-menu-item">
                                <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                                </span>
                            </li>
                            <li className="custom-dropdown-menu-item">

                                <span className="custom-dropdown-menu-item-link">

                                    <span className="dropdown-icon">&larr;</span>
                                    سومی هم دیگ
                                </span>

                                <ul className="custom-dropdown-submenu">
                                    <li className="custom-dropdown-menu-item">
                                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                                        </span>
                                    </li>
                                    <li className="custom-dropdown-menu-item">
                                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                                        </span>
                                    </li>
                                    <li className="custom-dropdown-menu-item">
                                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                                        </span>
                                    </li>
                                    <li className="custom-dropdown-menu-item">
                                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                                        </span>
                                    </li>
                                </ul>

                            </li>
                            <li className="custom-dropdown-menu-item">
                                <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                                </span>
                            </li>
                        </ul>
                    </li>
                    <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                        </span>
                    </li>
                    <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                        </span>
                    </li>
                    <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                        </span>
                    </li>
                    <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                        </span>
                    </li>
                    <li className="custom-dropdown-menu-item">
                        <span className="custom-dropdown-menu-item-link">
                                    اینم از این
                        </span>
                    </li>

                </ul>
            </li>
            {/*<li className="navbar-list-item">*/}
                {/*<a className="navbar-list-item-link">*/}
                    {/*آموزش ها*/}
                {/*</a>*/}
            {/*</li>*/}
            {/*<li className="navbar-list-item">*/}
                {/*<a className="navbar-list-item-link">*/}
                    {/*مجله*/}
                {/*</a>*/}
            {/*</li>*/}
            <li className="navbar-list-item">
                <Link to="/online-conversion-calculator" className="navbar-list-item-link">محاسبه تبدیل</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/articles" className="navbar-list-item-link">مجله</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/videos" className="navbar-list-item-link">ویدیوها</Link>
            </li>
            {/*<li className="navbar-list-item">*/}
                {/*<a className="navbar-list-item-link">*/}
                    {/*فوت پرینت ها*/}
                {/*</a>*/}
            {/*</li>*/}
        </ul>
);

export default Navigation;

