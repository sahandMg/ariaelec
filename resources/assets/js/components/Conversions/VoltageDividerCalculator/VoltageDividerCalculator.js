import React , {Component} from 'react';
import InputWithText from '../InputWithText/InputWithText';
import Select from 'react-select';
// import '../../../../node_modules/react-select/dist/react-select.css';
import image from '../../../assets/Images/voltage-divider-diagram.jpg';

class VoltageDividerCalculator extends Component {

    state = {
        VSource: '',
        VOut: '',
        R1: '',
        R2: '',
        RLoad: '',
        selectedOption: ''
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        // console.log(`Selected: ${selectedOption.label}`);
    }
    onChange = (e) => {
        let type = e.target.name;
        this.setState({[e.target.name]: e.target.value},() => {
            this.update(type);
        });
    }

    sendData = () => {

    }

    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        return (
            <div className="container text-right">
                <h1> محاسبه تقسیم ولتاژ </h1>
                <hr/>
                <div className="flex-row">
                    <div className="flex-item-6">
                        <p>از محاسبه گر زیر می توانید برای محاسبه تقسیم ولتاژ بین مقاومت ها و یا برعکس با داشتن مقدار ولتاژها نسبت اندازه مقاومت ها رو بدست آورید. </p>
                        <p>با وارد کردن کم ترین اندازه مقاومت مجاز برای مدار و نسبت مقاومت ها ، محاسبه گر مقاومت هایی از لیست قطعات سایت با داشتن بیشترین شباهت معرفی می کند. همچنین می توانید نوع مقاومت هارو برای جستو جوی دقیق تر مشخص کنید. </p>
                    </div>
                    <div className="flex-item-6">
                        <img src={image}/>
                    </div>
                </div>
                <div className="flex-row space-between">
                    <div className="flex-item-5">
                        <Select
                            name="form-field-name"
                            multi={true}
                            simpleValue={true}
                            removeSelected={true}
                            value={value}
                            onChange={this.handleChange}
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                                { value: 'three', label: 'three' },
                                { value: 'four', label: 'four' },
                            ]}
                        />
                    </div>
                    <div className="flex-item-5">
                        <InputWithText text="V" onChange={this.onChange} value={this.state.VSource} name="VSource" label="V1"  placeholder="ولتاژ ورودی مدار را وارد کنید" />
                        <InputWithText text="V" onChange={this.onChange} value={this.state.VOut} name="VOut" label="VOut"  placeholder="ولتاژ خروجی مدار را وارد کنید" />
                        <InputWithText text="R1" onChange={this.onChange} value={this.state.R1} name="R1" label="R1"  placeholder="مقاومت R1 را وارد کنید" />
                        <InputWithText text="R2" onChange={this.onChange} value={this.state.R2} name="R2" label="R2"  placeholder="مقاومت R2 را وارد کنید" />
                        <InputWithText text="RLoad" onChange={this.onChange} value={this.state.RLoad} name="RLoad" label="RLoad"  placeholder="مقاومت RLoad را وارد کنید" />
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
}
export default VoltageDividerCalculator;