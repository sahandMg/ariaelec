import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = (props) => (
        <div className="navbar-sticky-bg col-12 m-0 p-0">
            <div className="navbar-sticky col-md-6 col-sm-8 col-10 p-0">
                <ul className="list-group list-group-flush p-0">
                    <li className="list-group-item text-right p-0">
                        <a className="collapsed card-link w-100 p-2 pl-4" data-toggle="collapse" href="#list-first">
                            <span className="dropdown-icon fa fa-arrow-down"></span>
                            <span className="text-right pr-2">محصولات</span>
                        </a>
                        <div className="collapse m-0 pt-2 " id="list-first" dir="rtl">
                            <ul className="w-100 m-0 list-group list-group-flush p-0">
                                <li className="list-group-item text-right p-0 first-dropdwon-background">
                                    <a href="#hey" data-toggle="collapse"
                                       className="m-0 p-2 pl-4 collapsed card-link w-100">
                                        <span className="dropdown-icon fa fa-arrow-down"></span>
                                        <span className="text-right pr-2">آموزش</span>
                                    </a>
                                    <div className="collapse m-0 pt-2" id="hey">
                                        <ul className="w-100 list-group list-group-flush p-0">
                                            <li className="list-group-item text-right second-dropdwon-background"><a
                                                href="/">مجله</a></li>
                                            <li className="list-group-item text-right second-dropdwon-background"><a
                                                href="/">محاسبه تبدیل</a></li>
                                            <li className="list-group-item text-right second-dropdwon-background p-0">
                                                <a href="#third-col" data-toggle="collapse" className="m-0 p-2 pl-4 collapsed card-link w-100">
                                                    <span className="dropdown-icon fa fa-arrow-down"></span>
                                                    <span className="text-right pr-2">فوت پرینت</span>
                                                </a>
                                                <div className="collapse m-0 pt-2" id="third-col">
                                                    <ul className="w-100 list-group list-group-flush p-0">
                                                        <li className="list-group-item text-right third-dropdwon-background"><a href="/">مجله</a></li>
                                                        <li className="list-group-item text-right third-dropdwon-background"><a href="/">محاسبه تبدیل</a></li>
                                                        <li className="list-group-item text-right third-dropdwon-background"><a href="/">فوت پرینت</a></li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="list-group-item text-right first-dropdwon-background"><a href="/">مجله</a></li>
                                <li className="list-group-item text-right first-dropdwon-background"><a href="/">محاسبه تبدیل</a></li>
                                <li className="list-group-item text-right first-dropdwon-background"><a href="/">فوتپرینتها</a></li>
                            </ul>
                        </div>
                    </li>
                    {/*<li className="list-group-item text-right"><a href="/">آموزش</a></li>*/}
                    {/*<li className="list-group-item text-right"><a href="/">مجله</a></li>*/}
                    <li className="list-group-item text-right"><Link to="/online-conversion-calculator">محاسبه تبدیل</Link></li>
                    {/*<li className="list-group-item text-right"><a href="/">فوت پرینت</a></li>*/}
                    <li className="list-group-item text-right"><a href="/">ورود</a></li>
                    <li className="list-group-item text-right"><a href="/">ثبت نام</a></li>
                </ul>
            </div>
        </div>
);

export default Navigation;

