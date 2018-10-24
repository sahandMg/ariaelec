import React , { Component } from 'react';
import { Link } from 'react-router-dom';

class Followup extends Component {

    state = {
    }

    componentDidMount() {
    }


    render() {
        console.log("Project");console.log("render");
        return (
            <div className="container responsive-margin" style={{direction: "ltr"}}>
                <h1 className="text-center">سفارش ها </h1>
                            <div style={{direction: 'rtl', textAlign: "right"}}>
                                <table className="table table-striped">
                                    <thead>
                                    <th>شماره فاکتور</th><th>تاریخ</th><th>ساعت</th><th>هزینه کل</th><th>وضعیت</th>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><Link to={"/User/Factors/"+"1234"}> 1234 </Link></td>
                                        <td>1397/02/01</td>
                                        <td>02:31</td>
                                        <td>10000 تومان</td>
                                        <td>در حال جمع آوری</td>
                                    </tr>
                                    <tr>
                                        <td><Link to={"/User/Factors/"+"1234"}>1234</Link></td>
                                        <td>1397/02/01</td>
                                        <td>02:31</td>
                                        <td>22000 تومان</td>
                                        <td>تحویل داده شد</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                <br/><br/><br/>
            </div>
        )
    }
};

export default Followup;


