import React , {Component} from 'react';
import InputWithText from '../InputWithText/InputWithText';


class WeightCalculator extends Component {

    state = {
        Kilograms: '',
        Tons: '',
        Grams: '',
        Pounds: '',
        Ounces: '',
    }

    onChange = (e) => {
        let type = e.target.name;
        this.setState({[e.target.name]: e.target.value},() => {
            this.update(type);
        });
    }

    update = (type) => {
        switch (type) {
            case 'Kilograms' :
                this.calculateKg();
                break;
            case 'Tons':
                this.calculateTons();
                break;
            case 'Grams':
                this.calculateGrams();
                break;
            case 'ft':
                this.calculatePounds();
                break;
            case 'Pounds':
                this.calculateOunces();
                break;
            default:
                break;
        }
    }

    calculateKg =() => {
      let Kilograms = this.state.Kilograms;
      this.setState({Tons: (Kilograms/1000).toFixed(4),Grams: (Kilograms*1000).toFixed(4),Pounds: (Kilograms/0.453592).toFixed(4),Ounces: (Kilograms/0.0283495).toFixed(4)});
    }
    calculateTons =() => {
        let Tons = this.state.Tons;
        let Kilograms = (Tons*1000).toFixed(4);
        this.setState({Kilograms: Kilograms,Grams: (Kilograms*1000).toFixed(4),Pounds: (Kilograms/0.453592).toFixed(4),Ounces: (Kilograms/0.0283495).toFixed(4)});
    }
    calculateGrams =() => {
        let Grams = this.state.Grams;
        let Kilograms = (Grams/1000).toFixed(4);
        this.setState({Kilograms: Kilograms,Tons: (Kilograms/1000).toFixed(4),Pounds: (Kilograms/0.453592).toFixed(4),Ounces: (Kilograms/0.0283495).toFixed(4)});
    }
    calculatePounds =() => {
        let Pounds = this.state.Pounds;
        let Kilograms = (Pounds*0.453592).toFixed(4);
        this.setState({Kilograms: Kilograms,Grams: (Kilograms*1000).toFixed(4),Pounds: (Kilograms/0.453592).toFixed(4),Ounces: (Kilograms/0.0283495).toFixed(4)});
    }
    calculateOunces =() => {
        let Ounces = this.state.Ounces;
        let Kilograms = (Ounces*0.0283495).toFixed(4);
        this.setState({Kilograms: Kilograms,Grams: (Kilograms*1000).toFixed(4),Pounds: (Kilograms/0.453592).toFixed(4),Ounces: (Kilograms/0.0283495).toFixed(4)});
    }

    render() {

        return (
            <div className="container text-right">
                <h1> تبدیل واحد های وزن </h1>
                <hr/>
                <div className="flex-row space-between">
                    <div className="flex-item-5">
                        <InputWithText text="lb" onChange={this.onChange} value={this.state.Pounds} name="Pounds" label="پوند"  placeholder="به پوند وارد کنید" />
                        <InputWithText text="oz" onChange={this.onChange} value={this.state.Ounces} name="Ounces" label="اونس"  placeholder="به اونس وارد کنید" />
                    </div>
                    <div className="flex-item-5">
                        <InputWithText text="t" onChange={this.onChange} value={this.state.Tons} name="Tons" label="تن"  placeholder="به تن وارد کنید" />
                        <InputWithText text="kg" onChange={this.onChange} value={this.state.Kilograms} name="Kilograms" label="کیلوگرم"  placeholder="به کیلوگرم وارد کنید" />
                        <InputWithText text="g" onChange={this.onChange} value={this.state.Grams} name="Grams" label="گرم"  placeholder="به گرم وارد کنید" />
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
}
export default WeightCalculator;