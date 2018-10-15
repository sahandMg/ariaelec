import React , { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import { ClipLoader } from 'react-spinners';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class LoginCom extends Component {

  state = {
      data: {
          email: '',
          password: '',
      },
      errors: {}
  }

  componentDidMount() {
        this.props.checkAuthState();
  }

  sendData = (event) => {
      event.preventDefault();
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
          this.props.onAuth(this.state.data.email,this.state.data.password,this.props.url);
      }
  }

  validate = (data) => {
      const errors = {};
      if (!Validator.isEmail(data.email)) errors.email = "ایمیل نامعتبر است";
      if (!data.password) errors.password = "رمز را وارد نکرده ابد";
      if (data.password.length<8) errors.password = "رمز حداقل باید 8 حرف باشد";
      return errors;
  }

  onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

  render() {
      if (this.props.token) {
          return <Redirect to={this.props.redirectTo} />;
      }
      const { data, errors } = this.state;
      return (
          <div className="container" style={{direction: "ltr"}}>
              <form onSubmit={this.sendData} className="text-right" style={{direction: "rtl"}}>
                  {this.props.errorServer && <InlineError text={this.props.errorServer} />}
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">ایمیل</label>
                      <input name="email" value={data.email} onChange={this.onChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                             placeholder="ایمیل خود را وارد کنید"/>
                      {errors.email && <InlineError text={errors.email} />}
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1">رمز</label>
                      <input name="password" value={data.password} onChange={this.onChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="رمز خود را وارد کنید"/>
                      {errors.password && <InlineError text={errors.password} />}
                  </div>
                  <div className="flex-row space-between">
                      <div>
                          <button  hidden={this.props.loading} type="submit" className="btn btn-success">ورود</button>
                          <ClipLoader color={'#123abc'} loading={this.props.loading} />
                      </div>
                      <Link to="/Signup">ثبت نام نکردم</Link>
                  </div>
              </form>
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

export default connect(mapStateToProps,mapDispatchToProps)(LoginCom);


