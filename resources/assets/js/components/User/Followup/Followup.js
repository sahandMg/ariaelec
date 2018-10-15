import React , { Component } from 'react';
import { connect } from 'react-redux';


class Project extends Component {

    state = {
    }

    componentDidMount() {
        console.log("Project");console.log(this.props.match.params.projectName);
    }

    getFactors = () => {

    }

    render() {
        console.log("Project");console.log("render");
        return (
            <div className="container responsive-margin" style={{direction: "ltr"}}>
                <h1 className="text-center">{this.props.match.params.projectName}پروژه </h1>
                            <div style={{direction: 'rtl'}}>
                                <table className="table table-striped">
                                    <thead>
                                    <th>نام محصول</th><th>تعداد</th><th>قیمت واحد</th><th>قیمت مجموع</th>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>stm32</td>
                                        <td>4</td>
                                        <td>قیمت قدیم</td>
                                        <td>42000</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><h3>جمع کل :</h3></td>
                                        <td><h3>20000 تومان</h3></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                <br/><br/><br/>
            </div>
        )
    }
};

export default Project;


