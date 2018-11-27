import React , {Component} from 'react';
import './ResistorsColorCode.css';

class ResistorsColorCode extends Component {

    state = {
        color4Band: {color1: 10,color2: 10,color3: 10,color4: 10},
        Res4Band: {RValue: '' , RSelect: ''}
    }

    onChangeColor4 = (e) => {
       let color4Band = this.state.color4Band;
       color4Band = {...color4Band,[e.target.name]: e.target.value};
       this.setState({color4Band: color4Band},() => {
           this.calculateColor4Band();
       });
    }

    calculateColor4Band = () => {
        let color4Band = this.state.color4Band;
        let Res4Band = this.state.Res4Band ;
        if( (color4Band.color1 !== 10) & (color4Band.color2 !== 10) & (color4Band.color3 !== 10) & (color4Band.color4 !== 10)  ) {
            Res4Band.RValue = (Number(color4Band.color1*10) + Number(color4Band.color2))*Math.pow(10,color4Band.color3);
            if (Res4Band > 1000000) {
                Res4Band.RValue = Res4Band.RValue/1000000;
                Res4Band.RSelect = ' MΩ ';
            } else if (Res4Band > 1000) {
                Res4Band.RValue = Res4Band.RValue/1000;
                Res4Band.RSelect = ' KΩ ';
            } else {
                Res4Band.RSelect = ' Ω ';
            }
            Res4Band.RSelect += ((color4Band.color4*100)+'%');
            this.setState({Res4Band: Res4Band});
        }
    }

    render() {
        return (
            <div className="container text-right">
                <h1>محاسبه مقدار مقاومت بر اساس کد های رنگی</h1>
                <hr/>
                <div className="flex-row space-between">
                    <div className="flex-column space-between res-color-code">
                        <div className="form-group">
                            <h2>4 بند</h2>
                            <label> رنگ بند 1 : </label>
                            <select name="color1" value={this.state.color4Band.color1} onChange={(e) => this.onChangeColor4(e)} className="form-control">
                                <option value="10">انتخاب کنید</option>
                                <option value="1"> قهوه ای </option>
                                <option value="2"> قرمز </option>
                                <option value="3"> نارنجی </option>
                                <option value="4"> زرد </option>
                                <option value="5"> سبز </option>
                                <option value="6"> آبی </option>
                                <option value="7"> بنفش </option>
                                <option value="8"> خاکستری </option>
                                <option value="9"> سفید </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label> رنگ بند 2 : </label>
                            <select name="color2" value={this.state.color4Band.color2} onChange={(e) => this.onChangeColor4(e)} className="form-control">
                                <option value="10">انتخاب کنید</option>
                                <option value="0"> مشکی </option>
                                <option value="1"> قهوه ای </option>
                                <option value="2"> قرمز </option>
                                <option value="3"> نارنجی </option>
                                <option value="4"> زرد </option>
                                <option value="5"> سبز </option>
                                <option value="6"> آبی </option>
                                <option value="7"> بنفش </option>
                                <option value="8"> خاکستری </option>
                                <option value="9"> سفید </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label> رنگ بند 3 : </label>
                            <select name="color3" value={this.state.color4Band.color3} onChange={(e) => this.onChangeColor4(e)} className="form-control">
                                <option value="10">انتخاب کنید</option>
                                <option value="0"> مشکی </option>
                                <option value="1"> قهوه ای </option>
                                <option value="2"> قرمز </option>
                                <option value="3"> نارنجی </option>
                                <option value="4"> زرد </option>
                                <option value="5"> سبز </option>
                                <option value="6"> آبی </option>
                                <option value="7"> بنفش </option>
                                <option value="8"> خاکستری </option>
                                <option value="9"> سفید </option>
                            </select>                           </div>
                        <div className="form-group">
                            <label> رنگ بند 4 : </label>
                            <select name="color4" value={this.state.color4Band.color4} onChange={(e) => this.onChangeColor4(e)} className="form-control">
                                <option value="10">انتخاب کنید</option>
                                <option value="0.01"> قهوه ای 1% </option>
                                <option value="0.02"> قرمز 2% </option>
                                <option value="0.005"> سبز 0.5% </option>
                                <option value="0.0025"> آبی 0.25% </option>
                                <option value="0.001"> بنفش 0.1% </option>
                                <option value="0.0005"> خاکستری 0.05% </option>
                                <option value="0.05"> طلایی 5% </option>
                                <option value="0.1"> نقره ای 10% </option>
                            </select>
                        </div>
                        <p style={{backgroundColor: '#DFDFFD',padding: '1%'}}> مقدار مقاومت  = <span> {this.state.Res4Band.RSelect} </span> +  <span className="text-left" style={{direction: 'ltr'}}> {this.state.Res4Band.RValue}</span> </p>
                    </div>
                    {/*<div className="flex-column space-between flex-item-5">*/}
                        {/*<h2>5 بند</h2>*/}
                    {/*</div>*/}
                </div>
                <br/>
                <br/>
            </div>
        )
    }
}
export default ResistorsColorCode;