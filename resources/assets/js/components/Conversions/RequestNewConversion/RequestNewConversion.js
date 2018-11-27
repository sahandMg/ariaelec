import React , {Component} from 'react';

class RequestNewConversion extends Component {

    state = {
        name: '',
        discription: '',
        file: null
    }

    sendData = () => {

    }

    render() {
        return (
            <div className="container text-right">
                <h1> در خواست محاسبه جدید </h1>
                <hr/>
                <div className="form-group text-right">
                    <label> نام محاسبه گر : </label>
                    <input name="name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} type="text" className="form-control"/>
                </div>
                <div className="form-group text-right">
                    <label> شرح محاسبه گر : </label>
                    <textarea name="discription" value={this.state.discription} onChange={(e) => this.setState({discription: e.target.value})}  className="form-control"/>
                </div>
                <div className="form-group text-right">
                    <label> اگر فایلی برای توضیح بهتر دارید وارد کنید : </label>
                    <input name="file" value={this.state.file} onChange={(e) => this.setState({file: e.target.value})} type="file" className="form-control"/>
                </div>
                <button onClick={this.sendData} className="btn btn-success">ثبت در خواست</button>
                <br/>
                <br/>
            </div>
        )
    }
}
export default RequestNewConversion;