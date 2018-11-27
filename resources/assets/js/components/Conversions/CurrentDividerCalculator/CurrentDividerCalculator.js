import React , {Component} from 'react';
import circuit from '../../../assets/Images/current-divider-diagram.png';
class CurrentDividerCalculator extends Component {

    state = {
        Resistors: [{RValue: null,RSelect: 1},{RValue: null,RSelect: 1}],
        Current:['',''],
        CurrentSource: 0,
        RNum: 2
    }


    onChangeResistors = (i,e) => {
        let temp = this.state.Resistors;
        temp[i] = {...temp[i],[e.target.name]: e.target.value};
        this.setState({Resistors: temp},() => {
            this.calculateCurrents();
        });
    }
    onChangeCurrentSource = (e) => {
        this.setState({CurrentSource: e.target.value},() => {
            this.calculateCurrents();
        });
    }
    addResistor = () => {
        let RNum = this.state.RNum;
        let Resistors = this.state.Resistors;
        let Current = this.state.Current;
        Resistors = [...Resistors,{RValue: null,RSelect: 1}];
        Current = [...Current,''];
        this.setState({RNum: RNum+1,Resistors: Resistors,Current: Current});
    }
    calculateCurrents = () => {
        let temp = this.state.Resistors;
        let Current = this.state.Current;
        let CurrentSource = this.state.CurrentSource;
        let zeroResistors = [];
        let RParallelTotal = 0;
        for(let i=0;i<temp.length;i++) {
            if(temp[i].RValue === 0 ) {
                zeroResistors.push(i);
            }
        }
        if(zeroResistors.length > 0) {
            for(let i=0;i<zeroResistors.length;i++) {
                Current[zeroResistors[i]] = (CurrentSource/zeroResistors.length);
            }
            this.setState({Current: Current});
            return 0;
        }
        RParallelTotal  = this.calculateRParallelTotal();
        if(RParallelTotal === 0) {
            return 0;
        }
        for(let i=0;i<temp.length;i++) {
            if(temp[i] !== null) {
                Current[i] = ((temp[i].RValue * temp[i].RSelect)/RParallelTotal) * CurrentSource ;
            }
        }
        this.setState({Current: Current});
    }

    calculateRParallelTotal = () => {
        let temp = this.state.Resistors;
        let RParallelTotal = 0;
        for(let i=0;i<temp.length;i++) {
            if(temp[i] !== null) {
                RParallelTotal += (1/(temp[i].Rvalue*temp[i].RSelect));
            }
        }
        return RParallelTotal;
    }

    render() {
        const resistorsParallel = [];
        for (let i = 2 ; i < this.state.RNum ; i++  ) {
            resistorsParallel.push(
                <div className="flex-row flex-start margin-2 text-left">
                    <label className="flex-item-2"> R{i+1} : </label>
                    <input name="Rvalue" value={this.state.Resistors[i].RValue} onChange={(e) => this.onChangeResistors(i,e)} type="number" className="form-control flex-item-5"/>
                    <select name="RSelect" value={this.state.Resistors[i].RSelect} onChange={(e) => this.onChangeResistors(i,e)} className="form-control flex-item-2">
                        <option value="1">Ω</option>
                        <option value="1e+3">KΩ</option>
                        <option value="1e6">MΩ</option>
                    </select>
                    <span style={{fontSize: '125%'}} className="flex-item-1 text-center"> = </span>
                    <input value={this.state.Current[i] + ' A'}  className="form-control flex-item-1"/>
                </div>
            )
        }

        return (
          <div className="container text-right" style={{direction: 'rtl'}}>
              <h1>محاسبه تقسیم جریان</h1>
              <hr/>
              <div className="row">
                  <div className="col-sm-6">
                      <p>از ماشین حساب زیر برای محاسبه جریان مقاومت های موازی مانند شکل استفتده کنید</p>
                      <p>زمانی که یک مدار موازی داریم ، جریانی که از منبع تغذیه می آید، بین مصرف کننده ها تقسیم می شود.</p>
                      <p>فرمول: I<sub>s</sub> = I<sub>total</sub> (R<sub>total</sub> / R<sub>n</sub>)</p>
                  </div>
                  <div className="col-sm-6">
                      <img src={circuit} alt="circuit"/>
                  </div>
              </div>
              <br/>
              <div className="flex-row flex-start-align" style={{direction: "ltr"}}>
                  <div className="flex-column">
                          <div className="flex-row flex-start margin-2 text-left">
                              <label className="flex-item-3"> Current Source ( A ) : </label>
                              <input name="CurrentSource" value={this.state.CurrentSource} onChange={(e) => this.onChangeCurrentSource(e)} type="number" className="form-control flex-item-3"/>
                          </div>
                          <div className="flex-row flex-start margin-2 text-left">
                              <label className="flex-item-2"> R1 : </label>
                              <input name="RValue" value={this.state.Resistors[0].RValue} onChange={(e) => this.onChangeResistors(0,e)} type="number" className="form-control flex-item-5"/>
                              <select name="RSelect" value={this.state.Resistors[0].RSelect} onChange={(e) => this.onChangeResistors(0,e)} className="form-control flex-item-2">
                                  <option value="1">Ω</option>
                                  <option value="1e+3">KΩ</option>
                                  <option value="1e6">MΩ</option>
                              </select>
                              <span style={{fontSize: '125%'}} className="flex-item-1 text-center"> = </span>
                              <input value={this.state.Current[0] + ' A'}  className="form-control flex-item-1"/>
                          </div>
                          <div className="flex-row flex-start margin-2 text-left">
                              <label  className="flex-item-2"> R2 : </label>
                              <input name="RValue" value={this.state.Resistors[1].RValue} onChange={(e) => this.onChangeResistors(1,e)} type="number" className="form-control flex-item-5"/>
                              <select name="RSelect" value={this.state.Resistors[1].RSelect} onChange={(e) => this.onChangeResistors(1,e)} className="form-control flex-item-2">
                                  <option value="1">Ω</option>
                                  <option value="1e+3">KΩ</option>
                                  <option value="1e6">MΩ</option>
                              </select>
                              <span style={{fontSize: '125%'}} className="flex-item-1 text-center"> = </span>
                              <input value={this.state.Current[0] + ' A'}  className="form-control flex-item-1"/>
                          </div>
                          {resistorsParallel}
                          <button onClick={this.addResistor} className="btn btn-primary" style={{width: "40%",margin: "auto"}}>مقاومت اضافه کن</button>
                  </div>
              </div>
              <br/>
          </div>
        )
    }
}

export default CurrentDividerCalculator;