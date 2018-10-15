import React , {Component} from 'react';


class TemperatureCalculator extends Component {

    state = {
        celcius: 27,
        farnheight: 48.6,
        kelvin: 300
    }

    onChangeCelcius = (e) => {
       let celcius = e.target.value;
       let kelvin = Number(celcius) + 273 ;
       this.setState({celcius: celcius,farnheight: celcius*1.8,kelvin: kelvin});
    }
    onChangeKelvin = (e) => {
        let kelvin = e.target.value;
        let celcius = kelvin-273 ;
        this.setState({celcius: celcius,farnheight: celcius/1.8,kelvin: kelvin});
    }
    onChangeFarnheight = (e) => {
        let farnheight = e.target.value;
        let celcius = farnheight/1.8 ;
        let kelvin = Number(celcius)+273 ;
        this.setState({celcius: celcius,farnheight: farnheight,kelvin: kelvin});
    }

    render() {
        return (
          <div className="container text-right">
              <h1>تبدیل واحدهای دما</h1>
              <hr/>
              <div className="flex-row space-between">
                  <div className="flex-column flex-item-3">
                      <label> دما به سلسیوس  </label>
                      <input name="Rvalue" value={this.state.celcius} onChange={(e) => this.onChangeCelcius(e)} type="number" className="form-control"/>
                  </div>
                  <div className="flex-column flex-item-3">
                      <label> دما به فارنهایت  </label>
                      <input name="Rvalue" value={this.state.farnheight} onChange={(e) => this.onChangeFarnheight(e)} type="number" className="form-control"/>
                  </div>
                  <div className="flex-column flex-item-3">
                      <label> دما به کلوین </label>
                      <input name="Rvalue" value={this.state.kelvin} onChange={(e) => this.onChangeKelvin(e)} type="number" className="form-control"/>
                  </div>
              </div>
              <br/>
              <br/>
          </div>
        )
    }
}
export default TemperatureCalculator;