import React from 'react';
import RegisterMark from '../../assets/Images/logo_register_mark.png';
import Enamad from '../../assets/Images/logo_trust_enamad.png';
import './FooterCom.css';

const FooterCom = (props) => (
    <footer>
        {/*<!-- footer lg -->*/}
        <div className="footer-container d-none d-md-block d-lg-block col-12">
            <div className="row p-4 col-12">
                <div className="follow-us-div col-4 text-light p-3">
                    <div className="col-lg-10 m-auto text-right">
                        <h2>ما را دنبال کنید</h2>
                    </div>
                    <hr className="bg-light" />
                        <div className="row social-media-grouptext-center col-lg-9 col-md-10 col-12 m-auto">
                            <div className="social-media-item col-lg-3 col-md-3 col-sm-3 col-12 m-2 m-sm-0 d-flex justify-content-center">
                                <a href=""><span className="fa fa-telegram"></span></a>
                            </div>
                            <div className="social-media-item col-lg-3 col-md-3 col-sm-3 col-12 m-2 m-sm-0 d-flex justify-content-center">
                                <a href=""><span className="fa fa-instagram"></span></a>
                            </div>
                            <div className="social-media-item col-lg-3 col-md-3 col-sm-3 col-12 m-2 m-sm-0 d-flex justify-content-center">
                                <a href=""><span className="fa fa-twitter"></span></a>
                            </div>
                            <div className="social-media-item col-lg-3 col-md-3 col-sm-3 col-12 m-2 m-sm-0 d-flex justify-content-center">
                                <a href=""><span className="fa fa-google-plus"></span></a>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-around col-lg-6 col-md-8 col-sm-10 col-12 mr-auto ml-auto mt-5">
                            <div className="col-lg-6 col-md-6 col-sm-4 col-5">
                                <img src={RegisterMark} alt="ساماندهی" className="img-fluid" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-4 col-5">
                                <img src={Enamad} alt="نماد اعتماد تجارت الکترونیک" className="img-fluid" />
                            </div>
                        </div>
                </div>
                <div className="about-us-div col-4 text-light p-3">
                    <div className="col-lg-10 m-auto text-right">
                        <h2>درباره ما</h2>
                    </div>
                    <hr className="bg-light"/>
                    <div dir="rtl" className="text-justify p-2" style={{fontSize: "125%"}}>
                        سایت اتریکس در تلاش است تا تمامی ابزارها، قطعات و امکاناتی که مهندسین نیاز دارند را با ارزان ترین قیمت فراهم آورد. تمامی محصولات سایت همراه با جزئیات در سایت قرار داده شده است. شما می توانید با موتور جست و جوی سایت محصول مورد نیاز خود را به راحتی پیدا کنید. همچنین می توانید گزارش خریدهای خود را به صورت جداگانه برای هر پروژه مشاهده کنید.
                    </div>
                </div>
                <div className="contact-us-div col-4 text-light p-3">
                    <div className="col-lg-10 m-auto text-right">
                        <h2>تماس با ما</h2>
                    </div>
                    <hr className="bg-light"/>
                        <div dir="rtl" className="col-lg-10 col-md-10 col-sm-10 col-12 text-right m-auto">
                            <div className="contact-us-item col-12 d-flex justify-content-between p-1">
                                <div className="contact-us-icon">
                                    <span className="fa fa-phone"></span>
                                </div>
                                <div className="contact-us-text">
                                    <a href="tel:+989371869568" style={{direction: 'ltr',float: 'left'}}>0937 186 9568</a>
                                </div>
                            </div>

                            <div className="contact-us-item col-12 d-flex justify-content-between p-1">
                                <div className="contact-us-icon text-right">
                                    <span className="fa fa-envelope"></span>
                                </div>
                                <div className="contact-us-text">
                                    <a href="www.example@gmail.com">example@gmail.com</a>
                                </div>
                            </div>

                            <div className="contact-us-item col-12 d-flex justify-content-between p-1">
                                <div className="contact-us-icon">
                                    <span className="fa fa-map-marker"></span>
                                </div>
                                <div className="contact-us-text">
                                    , بهارستان
                                    , خیابان اول
                                    <br/>
                                        , کوچه دوم
                                        , پلاک سوم
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>

        {/*<!-- footer xs -->*/}
        <div className="footer-container d-block d-md-none d-lg-none col-12">
            <div className="row p-0 col-12 d-flex flex-column-reverse m-auto">
                <div className="follow-us-div col-12 text-light p-3">
                    <div className="col-lg-10 m-auto text-right">
                        <h2>ما را دنبال کنید</h2>
                    </div>
                    <hr className="bg-light"/>
                        <div className="row social-media-grouptext-center col-lg-9 col-md-10 col-12 m-auto d-flex justify-content-between">
                            <div className="social-media-item m-md-3 m-1">
                                <a href=""><span className="fa fa-telegram"></span></a>
                            </div>
                            <div className="social-media-item m-md-3 m-1">
                                <a href=""><span className="fa fa-instagram"></span></a>
                            </div>
                            <div className="social-media-item m-md-3 m-1">
                                <a href=""><span className="fa fa-twitter"></span></a>
                            </div>
                            <div className="social-media-item m-md-3 m-1">
                                <a href=""><span className="fa fa-google-plus"></span></a>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-around col-lg-6 col-md-8 col-sm-10 col-12 mr-auto ml-auto mt-5">
                            <div className="col-lg-6 col-md-6 col-sm-4 col-5 text-center">
                                <img src={RegisterMark} alt="ساماندهی" className="img-fluid" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-4 col-5 text-center">
                                <img src={Enamad} alt="نماد اعتماد تجارت الکترونیک" className="img-fluid" />
                            </div>
                        </div>

                </div>
                <div className="about-us-div col-12 text-light p-3">
                    <div className="col-lg-10 m-auto text-right">
                        <h2>
                            درباره ما
                        </h2>
                    </div>
                    <hr className="bg-light" />
                        <div dir="rtl" className="text-justify p-2">

                            افراد به دلایل مختلفی به
                            سایت شما وارد میشوند و وظیفه شما شناسایی نیاز و هدف آنهاست. بعنوان مثال یک طراح را بررسی میکنیم؛
                            برای کاربران مهمترین نکات
                            مشاهده نمونه کارها، نرم افزارهای مورد استفاده و سابقه فعالیت یک طراح خواهد بود. مشتریان بدنبال شخصی
                            هستند که مدرک دانشگاهی
                            معتبر، نمونه کارهای مناسب و خلاقیت کافی داشته باشد و بهترین مکان برای ارائه این اطلاعات صفحه درباره
                            ما یا درباره شرکت خواهد بود.

                        </div>
                </div>
                <div className="contact-us-div col-12 text-light p-3">
                    <div className="col-lg-10 m-auto text-right">
                        <h2>تماس با ما</h2>
                    </div>
                    <hr className="bg-light" />
                        <div dir="rtl" className="col-lg-10 col-md-10 col-sm-10 col-12 text-right m-auto">
                            <div className="contact-us-item col-12 d-flex justify-content-between p-1">
                                <div className="contact-us-icon">
                                    <span className="fa fa-phone"></span>
                                </div>
                                <div className="contact-us-text">
                                    <a href="tel:+989388762953">0938 876 2953</a>
                                </div>
                            </div>

                            <div className="contact-us-item col-12 d-flex justify-content-between p-1">
                                <div className="contact-us-icon text-right">
                                    <span className="fa fa-envelope"></span>
                                </div>
                                <div className="contact-us-text">
                                    <a href="www.example@gmail.com">example@gmail.com</a>
                                </div>
                            </div>

                            <div className="contact-us-item col-12 d-flex justify-content-between p-1">
                                <div className="contact-us-icon">
                                    <span className="fa fa-map-marker"></span>
                                </div>
                                <div className="contact-us-text">
                                    , بهارستان
                                    , خیابان اول
                                    <br/>
                                        , کوچه دوم
                                        , پلاک سوم
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>

    </footer>
    );

export default FooterCom;