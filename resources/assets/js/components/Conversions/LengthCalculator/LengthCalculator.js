import React , {Component} from 'react';
import InputWithText from '../InputWithText/InputWithText';

class LengthCalculator extends Component {

    state = {
        meter: '', cm : '', mm:'', mi: '', yd: '', ft: '', in: ''
    }

    onChange = (e) => {
        let type = e.target.name;
        this.setState({[e.target.name]: e.target.value},() => {
            this.update(type);
        });
    }
    update = (type) => {
        switch (type) {
            case 'mi' :
                this.calculateMI();
                break;
            case 'yd':
                this.calculateYD();
                break;
            case 'cm':
                this.calculateCM();
                break;
            case 'ft':
                this.calculateFT();
                break;
            case 'in':
                this.calculateIN();
                break;
            case 'meter':
                this.calculateMeter();
                break;
            case 'mm':
                this.calculateMM();
                break;
            default:
                break;
        }
    }
    calculateMeter = () => {
        let meter = this.state.meter;
        this.setState({cm: (meter*100).toFixed(4),mm: (meter*1000).toFixed(4),mi: (meter/1609.34).toFixed(4),yd: (meter/1.09361).toFixed(4),ft: (meter/3.28084).toFixed(4),in: (meter/39.3701).toFixed(4)});
    }
    calculateCM = () => {
        let cm = this.state.cm;
        let meter = cm/100 ;
        this.setState({meter: (meter).toFixed(4),mm: (meter*1000).toFixed(4),mi: (meter/1609.34).toFixed(4),yd: (meter/1.09361).toFixed(4),ft: (meter/3.28084).toFixed(4),in: (meter/39.3701).toFixed(4)});
    }
    calculateMM = () => {
        let mm = this.state.mm;
        let meter = mm/1000 ;
        this.setState({meter: (meter).toFixed(4),cm: (meter*100).toFixed(4),mi: (meter/1609.34).toFixed(4),yd: (meter/1.09361).toFixed(4),ft: (meter/3.28084).toFixed(4),in: (meter/39.3701).toFixed(4)});
    }
    calculateMI = () => {
        let mi = this.state.mi;
        let meter = mi*1609.34 ;
        this.setState({meter: (meter).toFixed(4),cm: (meter*100).toFixed(4),mm: (meter/1000).toFixed(4),yd: (meter/1.09361).toFixed(4),ft: (meter/3.28084).toFixed(4),in: (meter/39.3701).toFixed(4)});
    }
    calculateYD = () => {
        let yd = this.state.yd;
        let meter = yd*1.09361 ;
        this.setState({meter: (meter).toFixed(4),cm: (meter*100).toFixed(4),mm: (meter/1000).toFixed(4),mi: (meter/1609.34).toFixed(4),ft: (meter/3.28084).toFixed(4),in: (meter/39.3701).toFixed(4)});
    }
    calculateFT = () => {
        let ft = this.state.ft;
        let meter = ft*3.28084 ;
        this.setState({meter: (meter).toFixed(4),cm: (meter*100).toFixed(4),mm: (meter/1000).toFixed(4),mi: (meter/1609.34).toFixed(4),yd: (meter/1.09361).toFixed(4),in: (meter/39.3701).toFixed(4)});
    }
    calculateIN = () => {
        let IN = this.state.ft;
        let meter = IN*39.3701 ;
        this.setState({meter: (meter).toFixed(4),cm: (meter*100).toFixed(4),mm: (meter/1000).toFixed(4),mi: (meter/1609.34).toFixed(4),yd: (meter/1.09361).toFixed(4),ft: (meter/3.28084).toFixed(4)});
    }



    render() {
        return (
            <div className="container text-right">
                <h1>تبدیل واحد های طولی</h1>
                <hr/>
                <div className="flex-row space-between">
                 <div className="flex-column flex-item-5">
                   <InputWithText  placeholder="به مایل وارد کنید" name="mi" value={this.state.mi} onChange={this.onChange} text="mi" />
                   <InputWithText  placeholder="به یارد وارد کنید" name="yd" value={this.state.yd} onChange={this.onChange} text="yd" />
                   <InputWithText  placeholder="به فوت وارد کنید" name="ft" value={this.state.ft} onChange={this.onChange} text="ft" />
                   <InputWithText  placeholder="به اینچ وارد کنید" name="in" value={this.state.in} onChange={this.onChange} text="in" />
                 </div>
                 <div className="flex-column flex-item-5">
                  <InputWithText  placeholder="به متر وارد کنید" name="meter" value={this.state.meter} onChange={this.onChange} text="m" />
                  <InputWithText  placeholder="به سانتی متر وارد کنید" name="cm" value={this.state.cm} onChange={this.onChange} text="cm" />
                  <InputWithText  placeholder="به میلی متر وارد کنید" name="mm" value={this.state.mm} onChange={this.onChange} text="mm" />
                 </div>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
}
export default LengthCalculator;