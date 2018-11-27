import React , { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

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
                <Accordion accordion={false}>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>1397/08/22</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
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
                        </AccordionItemBody>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <h3>1397/09/10</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody>
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
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
                <br/><br/><br/>
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        errorServer: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,url) => dispatch(actions.auth(email,password,url)),
        checkAuthState: () => dispatch( actions.authCheckState() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Project);


