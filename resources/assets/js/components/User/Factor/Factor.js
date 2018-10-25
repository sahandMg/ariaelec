import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import {ClipLoader} from "react-spinners";

class Factor extends Component {

    componentDidMount() {
    }

    getFactors = () => {

    }

    render() {
        console.log("Project");console.log("render");
        return (
            <div className="container responsive-margin" style={{direction: "rtl"}}>
                <div className="flex-row space-around">
                    <h2 className="text-right">فاکتور شماره 1234</h2>
                    <span className="text-left">ساعت: 11:34 </span><span className="text-left">تاریخ : 1397/05/28 </span>
                </div>
                <br/><hr/><br/>
                <h3 className="text-center">پروژه فلان</h3>
                <table className="table table-striped">
                    <thead>
                      <th>نام محصول</th><th>تعداد</th><th>قیمت واحد</th><th>قیمت مجموع</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>LM386</td>
                        <td>5</td>
                        <td>
                            1000 تومان
                        </td>
                        <td>5000 تومان</td>
                    </tr>
                    <tr>
                        <td>LM386</td>
                        <td>5</td>
                        <td>
                            1000 تومان
                        </td>
                        <td>5000 تومان</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><h3 className="cart-responsive-font">جمع کل :</h3></td>
                        <td><h3 className="cart-responsive-font">20000 تومان</h3></td>
                    </tr>
                    </tbody>
                </table>
                <br/><hr/><br/>
                <h3 className="text-center">پروژه فلان</h3>
                <table className="table table-striped">
                    <thead>
                    <th>نام محصول</th><th>تعداد</th><th>قیمت واحد</th><th>قیمت مجموع</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>LM386</td>
                        <td>5</td>
                        <td>
                            1000 تومان
                        </td>
                        <td>5000 تومان</td>
                    </tr>
                    <tr>
                        <td>LM386</td>
                        <td>5</td>
                        <td>
                            1000 تومان
                        </td>
                        <td>5000 تومان</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><h3 className="cart-responsive-font">جمع کل :</h3></td>
                        <td><h3 className="cart-responsive-font">20000 تومان</h3></td>
                    </tr>
                    </tbody>
                </table>
                <br/><br/>
                <h2 className="text-center">جمع کل : 20000 تومان</h2>
                <br/><br/>
            </div>
        )
    }
};

export default Factor;


