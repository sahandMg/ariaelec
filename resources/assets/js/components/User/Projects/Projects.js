import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWrapper from '../../CardWrapper/CardWrapper';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './Projects.css';
import axios from "axios";
import URLs from "../../../URLs";

class Projects extends Component {
    state = {
        projects: [],
        data: {
            projectName: '',
        },
        errors: {}
    }

    componentDidMount() {
        axios.post(URLs.base_URL+URLs.user_get_projects, {token: this.props.token})
            .then(response => {
                console.log(response);
                // this.setState({projects: response.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    newProject = () => {
        axios.post(URLs.base_URL+URLs.user_create_project, {token: this.props.token, name: this.state.data.projectName})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteProject = () => {
        console.log("deleteProject");
        confirmAlert({
            title: 'حذف پروژه',
            message: 'آیا از حذف پروژه فلان مطمئن هستید؟',
            buttons: [
                {
                    label: 'خیر',
                    onClick: () => console.log("no")
                },
                {
                    label: 'بله',
                    onClick: () => console.log("yes")
                }
            ]
        })
    };

    render() {
        let data = this.state.data; let projects;
        if(this.state.projects.length > 0) {
            projects = this.state.projects.map((project, i) => {
                return (
                    <li key={i}>
                        <CardWrapper>
                            <div className="flex-row space-between flex-center-align">
                                <Link to="/User/Projects/felan1"><h3>پروژه فلان</h3></Link><span
                                onClick={this.deleteProject} className="badge badge-delete">حذف</span>
                            </div>
                            <div className="flex-row space-between">
                                <span>مجموع هزینه ها : 20000 تومان</span><span>تاریخ شروع : 1397/05/22</span>
                            </div>
                        </CardWrapper>
                    </li>
                )
            });
        } else {projects = <h3 className="text-center">تا حالا پروژه ای ایجاد نکردید.</h3>}
        return (
            <div className="container projects" style={{direction: 'rtl'}}>
              <br/>
              <div className="flex-row space-around flex-center-align">
                  <label>نام پروژه : </label>
                  <input name="projectName" value={data.projectName} onChange={this.onChange} type="text" className="form-control col-lg-4 col-md-6" placeholder="نام پروژه"/>
                  <button onClick={this.newProject} className="btn btn-success">ایجاد پروژه جدید</button>
              </div>
              <br/>
              <h2>لیست پروژه ها</h2>
              <hr/>
              <ul>
                  {projects}
              </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,null)(Projects);

