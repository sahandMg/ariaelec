import React , {Component}  from 'react';

class ParallelandSeriesResistor extends Component {

    state = {
        RSeries: [{Rvalue: 0,RSelect: 1},{Rvalue: 0,RSelect: 1}],
        RParallel:[{Rvalue: 0,RSelect: 1},{Rvalue: 0,RSelect: 1}],
        RSeriesTotal: {Rvalue: 0,RSelect: 1},
        RParallelTotal: {Rvalue: 0,RSelect: 1},
        RParallelNum: 2,
        RSeriesNum: 2
    }

    onChangeRParallel = (i,e) => {
        let temp = this.state.RParallel;
        temp[i] = {...temp[i],[e.target.name]: e.target.value};
        console.log('temp[i]');
        console.log(temp[i]);
        this.setState({RParallel: temp});
        this.calculateRParallelTotal();
    }
    onChangeRSeries = (i,e) => {
        let temp = this.state.RSeries;
        temp[i] = {...temp[i],[e.target.name]: e.target.value};
        this.setState({RSeries: temp});
        this.calculateRSeriesTotal();
    }
    onChangeRSeriesTotal = (e) => {
        let temp = this.state.RSeriesTotal;
        temp = {...temp,[e.target.name]: e.target.value};
        this.setState({RSeriesTotal: temp},() => {
            this.calculateRSeriesTotal();
        });
    }
    onChangeRParallelTotal = (e) => {
        let temp = this.state.RParallelTotal;
        temp = {...temp,[e.target.name]: e.target.value};
        console.log('RParallelTotal');
        console.log(temp);
        this.setState({RParallelTotal: temp},() => {
            this.calculateRParallelTotal();
        });
    }
    calculateRSeriesTotal = () => {
        let temp = this.state.RSeries;
        let RSeriesTotal = this.state.RSeriesTotal;
        RSeriesTotal.Rvalue = 0;
        for(let i=0;i<temp.length;i++) {
            RSeriesTotal.Rvalue += (temp[i].Rvalue*temp[i].RSelect);
        }
        RSeriesTotal.Rvalue = ((RSeriesTotal.Rvalue)/RSeriesTotal.RSelect);
        this.setState({RSeriesTotal: RSeriesTotal});
    }
    calculateRParallelTotal = () => {
        let temp = this.state.RParallel;
        let RParallelTotal = this.state.RParallelTotal;
        RParallelTotal.Rvalue = 0;
        console.log( "Resisot numbers: " + temp.length);
        for(let i=0;i<temp.length;i++) {
            console.log('value'+ i + ' : '  + temp[i].Rvalue);
            console.log('rselect ' + i + ' : ' + temp[i].RSelect);
          if(temp[i] != 0) {
              RParallelTotal.Rvalue += (1/(temp[i].Rvalue*temp[i].RSelect));
              console.log(RParallelTotal.Rvalue);
          } else {
              this.setState({RParallelTotal: 0});
              return 0 ;
          }
        }
        console.log('RParallelTotal');
        console.log(RParallelTotal);
        RParallelTotal.Rvalue = ((1/RParallelTotal.Rvalue)/RParallelTotal.RSelect);
        this.setState({RParallelTotal: RParallelTotal});
    }

    addRParallel = () => {
      let RParallelNum = this.state.RParallelNum;
      let RParallel = this.state.RParallel;
      RParallel = [...RParallel,{Rvalue: 0,RSelect: 1}];
      this.setState({RParallelNum: RParallelNum+1,RParallel: RParallel});
    }

    addRSeries = () => {
        let RSeriesNum = this.state.RSeriesNum;
        let RSeries = this.state.RSeries;
        RSeries = [...RSeries,{Rvalue: 0,RSelect: 1}];
        this.setState({RSeriesNum: RSeriesNum+1,RSeries: RSeries});
    }

    render() {
        const resistorsParallel = [];
        for (let i = 2 ; i < this.state.RParallelNum ; i++  ) {
            resistorsParallel.push(
                <div className="flex-row flex-start margin-2 text-left">
                    <label className="flex-item-3"> R{i+1} : </label>
                    <input name="Rvalue" value={this.state.RParallel[i].Rvalue} onChange={(e) => this.onChangeRParallel(i,e)} type="number" className="form-control flex-item-5"/>
                    <select name="RSelect" value={this.state.RParallel[i].RSelect} onChange={(e) => this.onChangeRParallel(i,e)} className="form-control flex-item-4">
                        <option value="1">Ω</option>
                        <option value="1e+3">KΩ</option>
                        <option value="1e6">MΩ</option>
                    </select>
                </div>
            )
        }
        const resistorsSerie = [];
        for (let i = 2 ; i < this.state.RSeriesNum ; i++  ) {
            resistorsSerie.push(
                <div className="flex-row flex-start margin-2 text-left">
                    <label className="flex-item-3"> R{i+1} : </label>
                    <input name="Rvalue" value={this.state.RSeries[i].Rvalue} onChange={(e) => this.onChangeRSeries(i,e)} type="number" className="form-control flex-item-5"/>
                    <select name="RSelect" value={this.state.RSeries[i].RSelect} onChange={(e) => this.onChangeRSeries(i,e)} className="form-control flex-item-4">
                        <option value="1">Ω</option>
                        <option value="1e+3">KΩ</option>
                        <option value="1e6">MΩ</option>
                    </select>
                </div>
            )
        }

        return(
        <div className="container text-right">
            <h1> محاسبه مقاومت های سری و موازی </h1>
            <hr/>
            <p> فرمول محاسبه مقاومت های موازی   </p>
            <p style={{direction: "ltr"}}>R<sub>T</sub> = 1 / (1/R1 + 1/R2 + 1/R3 + etc..)</p>
            <p> 0.7 * ( جریان خروجی / ظرفیت باتری ) = شارژدهی باتری </p>
            <p> فرمول محاسبه مقاومت های سری  </p>
            <p> R<sub>T</sub> = R1 + R2 + R3 + etc..</p>
            <div className="flex-row flex-wrap space-between" style={{direction: "ltr"}}>
                <div className="flex-column flex-item-md-5 flex-item-sm-12">
                    <h3 className="text-center">مقاومت های موازی</h3>
                    <div className="flex-row flex-start margin-2 text-left">
                        <label className="flex-item-3"> R1 :</label>
                        <input name="Rvalue" value={this.state.RParallel[0].Rvalue} onChange={(e) => this.onChangeRParallel(0,e)} type="number" className="form-control flex-item-5"/>
                        <select name="RSelect" value={this.state.RParallel[0].RSelect} onChange={(e) => this.onChangeRParallel(0,e)} className="form-control flex-item-4">
                            <option value="1">Ω</option>
                            <option value="1e+3">KΩ</option>
                            <option value="1e6">MΩ</option>
                        </select>
                    </div>
                    <div className="flex-row flex-wrap flex-start margin-2 text-left">
                        <label  className="flex-item-3"> R2 : </label>
                        <input name="Rvalue" value={this.state.RParallel[1].Rvalue} onChange={(e) => this.onChangeRParallel(1,e)} type="number" className="form-control flex-item-5"/>
                        <select name="RSelect" value={this.state.RParallel[1].RSelect} onChange={(e) => this.onChangeRParallel(1,e)} className="form-control flex-item-4">
                            <option value="1">Ω</option>
                            <option value="1e+3">KΩ</option>
                            <option value="1e6">MΩ</option>
                        </select>
                    </div>
                    {resistorsParallel}
                    <button onClick={this.addRParallel} className="btn btn-primary" style={{width: "70%",margin: "auto"}}>مقاومت اضافه کن</button>
                    <div className="flex-row flex-start margin-2 text-left">
                        <label  className="flex-item-3"> RTotal : </label>
                        <input name="Rvalue" value={this.state.RParallelTotal.Rvalue} onChange={(e) => this.onChangeRParallelTotal(e)} type="email" className="form-control flex-item-5"/>
                        <select name="RSelect" value={this.state.RParallelTotal.RSelect} onChange={(e) => this.onChangeRParallelTotal(e)} className="form-control flex-item-4">
                            <option value="1">Ω</option>
                            <option value="1e+3">KΩ</option>
                            <option value="1e6">MΩ</option>
                        </select>
                    </div>
                </div>
                <div className="flex-column flex-item-md-5 flex-item-sm-12">
                    <h3 className="text-center">مقاومت های سری</h3>
                    <div className="flex-row flex-start margin-2 text-left">
                        <label className="flex-item-3"> R1 : </label>
                        <input name="Rvalue" value={this.state.RSeries[0].Rvalue} onChange={(e) => this.onChangeRSeries(0,e)} type="number" className="form-control flex-item-5"/>
                        <select name="RSelect" value={this.state.RSeries[0].RSelect} onChange={(e) => this.onChangeRSeries(0,e)} className="form-control flex-item-4">
                            <option value="1">Ω</option>
                            <option value="1e+3">KΩ</option>
                            <option value="1e6">MΩ</option>
                        </select>
                    </div>
                    <div className="flex-row flex-start margin-2 text-left">
                        <label  className="flex-item-3"> R2 : </label>
                        <input name="Rvalue" value={this.state.RSeries[1].Rvalue} onChange={(e) => this.onChangeRSeries(1,e)} type="number" className="form-control flex-item-5"/>
                        <select name="RSelect" value={this.state.RSeries[1].RSelect} onChange={(e) => this.onChangeRSeries(1,e)} className="form-control flex-item-4">
                            <option value="1">Ω</option>
                            <option value="1e+3">KΩ</option>
                            <option value="1e6">MΩ</option>
                        </select>
                    </div>
                    {resistorsSerie}
                    <button onClick={this.addRSeries} className="btn btn-primary" style={{width: "70%",margin: "auto"}}>مقاومت اضافه کن</button>
                    <div className="flex-row flex-start margin-2 text-left">
                        <label  className="flex-item-3"> RTotal : </label>
                        <input name="Rvalue" value={this.state.RSeriesTotal.Rvalue} onChange={(e) => this.onChangeRSeriesTotal(e)} type="email" className="form-control flex-item-5"/>
                        <select name="RSelect" value={this.state.RSeriesTotal.RSelect} onChange={(e) => this.onChangeRSeriesTotal(e)} className="form-control flex-item-4">
                            <option value="1">Ω</option>
                            <option value="1e+3">KΩ</option>
                            <option value="1e6">MΩ</option>
                        </select>
                    </div>
                </div>
            </div>
            <br/>
        </div>
       )
    }
}
//
//
//
export default ParallelandSeriesResistor;