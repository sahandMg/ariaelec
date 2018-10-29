import React , {Component} from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import URLs from '../../URLs';


class AdminControlPanel extends Component {
    state = {
        data: {
            email: '',
            password: '',
            name: ''
        },
        CM: [],
        loading: false,
        errors: {}
    }

    componentDidMount() {
        axios.post(URLs.base_URL+URLs.admin_control_panel,{token: this.props.token})
            .then((res) => {
                console.log('res');
                console.log(res);
                if(res.data != 410) { this.setState({CM: res.data}) } ;
            })
            .catch((error)=> {
                console.log('error');
                console.log(error);
            });
    }

    deleteCM = (email) => {
        this.setState({loading: true});
        axios.post(URLs.base_URL+URLs.admin_control_cm_delete,{token: this.props.token, email: email})
            .then((res) => {
                Alert.success('با موفقیعت حذف شد', {
                    position: 'top-right',
                    effect: 'scale',
                    beep: false,
                    timeout: 3000,
                    offset: 100
                });
                let temp = this.state.CM.filter((el)=>{
                    return el.email !== email;
                });
                console.log('res');
                console.log(res);
                this.setState({loading: false});
                this.setState({CM: temp});
            })
            .catch((error)=> {
                this.setState({loading: false});
                console.log('error');
                console.log(error);
            });
    }

    sendData = (event) => {
        event.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            axios.post(URLs.base_URL+URLs.admin_control_cm_register,{token: this.props.token, name: this.state.data.name, email: this.state.data.email , password: this.state.data.password})
                .then((res) => {
                    Alert.success('با موفقیعت ثبت شد', {
                        position: 'top-right',
                        effect: 'scale',
                        beep: false,
                        timeout: 3000,
                        offset: 100
                    });
                    console.log('res');
                    console.log(res);
                    this.setState({loading: false});
                    window.location.reload();
                })
                .catch((error)=> {
                    this.setState({loading: false});
                    console.log('error');
                    console.log(error);
                });
        }

    }

    validate = (data) => {
        const errors = {};
        if (!data.name) errors.name = "Can't be blank";
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    render() {
        const { data, errors, loading } = this.state;
        const cms = this.state.CM.map((item,key)=> {
            return (<tr key={key}><td>{item.name}</td><td>{item.email}</td><td><button hidden={loading} onClick={() => this.deleteCM(item.email)} type="button" className="btn btn-primary">delete</button><ClipLoader color={'#123abc'} loading={loading}/></td></tr>);
        });
        return (
            <div className="container text-right" style={{direction: "rtl"}}>
              <br/>
              <h2>اضافه کردن مدیر محتوا</h2>
               <form onSubmit={this.sendData}>
                <div className="form-group">
                    <label htmlFor="exampleInputname">اسم</label>
                    <input name="name" value={data.name} onChange={this.onChange} type="text" className="form-control" id="exampleInputname" aria-describedby="emailHelp"
                           placeholder="نام مدیر محتوا را وارد کنید"/>
                    {errors.name && <InlineError text={errors.name} />}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">ایمیل</label>
                    <input name="email" value={data.email} onChange={this.onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="ایمیل مدیر محتوا را وارد کنید"/>
                    {errors.email && <InlineError text={errors.email} />}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">رمز</label>
                    <input name="password" value={data.password} onChange={this.onChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="رمز مدیر محتوا را وارد کنید"/>
                    {errors.password && <InlineError text={errors.password} />}
                </div>
                <button hidden={loading} type="submit" className="btn btn-primary">ثبت مدیر محتوا</button>
                <ClipLoader color={'#123abc'} loading={loading} />
               </form>
              <br/>
              <hr/>
              <h2>حذف مدیر محتوا</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cms}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminControlPanel);