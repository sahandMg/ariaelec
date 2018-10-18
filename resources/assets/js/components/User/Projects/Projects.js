import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWrapper from '../../CardWrapper/CardWrapper';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import './Projects.css';
import axios from "axios";
import URLs from "../../../URLs";
import Alert from 'react-s-alert';

class Projects extends Component {
    state = {
        projects: [],
        data: {
            projectName: '',
        },
        errors: {}
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = () => {
        axios.post(URLs.base_URL+URLs.user_get_projects, {token: this.props.token})
            .then(response => {
                console.log("projects");console.log(response);
                this.setState({projects: response.data});
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
                Alert.success(response.data[0], {
                    position: 'bottom-right',
                    effect: 'scale',
                    beep: false,
                    timeout: 4000,
                    offset: 100
                });
                this.getProjects();
            })
            .catch(err => {
                console.log(err);
                Alert.error('اختلالی پیش آمدعه است،دوباره امتحن کنید', {
                    position: 'bottom-right',
                    effect: 'scale',
                    beep: false,
                    timeout: 4000,
                    offset: 100
                });
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
                    onClick: () => {

                    }
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
                                <Link to="/User/Projects/felan1"><h3>{project.name}</h3></Link><span
                                onClick={this.deleteProject} className="badge badge-delete">حذف</span>
                            </div>
                            <div className="flex-row space-between">
                                <span>  تاریخ شروع : {project.created_at}  </span><span>{project.price}مجموع هزینه ها :  تومان </span>
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

