import React , {Component}  from 'react';

class ParallelandSeriesCap extends Component {

    state = {
        CSeries: [{CValue: 0,CSelect: 1e-6},{CValue: 0,CSelect: 1e-6}],
        CParallel:[{CValue: 0,CSelect: 1e-6},{CValue: 0,CSelect: 1e-6}],
        CSeriesTotal: {CValue: 0,CSelect: 1e-6},
        CParallelTotal: {CValue: 0,CSelect: 1e-6},
        CParallelNum: 2,
        CSeriesNum: 2
    }

    onChangeCParallel = (i,e) => {
        let temp = this.state.CParallel;
        temp[i] = {...temp[i],[e.target.name]: e.target.value};
        this.setState({CParallel: temp});
        this.calculateCParallelTotal();
    }
    onChangeCSeries = (i,e) => {
        let temp = this.state.CSeries;
        temp[i] = {...temp[i],[e.target.name]: e.target.value};
        this.setState({CSeries: temp});
        this.calculateCSeriesTotal();
    }
    onChangeCSeriesTotal = (e) => {
        let temp = this.state.CSeriesTotal;
        temp = {...temp,[e.target.name]: e.target.value};
        this.setState({CSeriesTotal: temp},() => {
            this.calculateCSeriesTotal();
        });
    }
    onChangeCParallelTotal = (e) => {
        let temp = this.state.CParallelTotal;
        temp = {...temp,[e.target.name]: e.target.value};
        console.log('CParallelTotal');
        console.log(temp);
        this.setState({CParallelTotal: temp},() => {
            this.calculateCParallelTotal();
        });
    }
    calculateCSeriesTotal = () => {
        let temp = this.state.CSeries;
        let CSeriesTotal = this.state.CSeriesTotal;
        CSeriesTotal.CValue = 0;
        for(let i=0;i<temp.length;i++) {
            if(temp[i] != 0) {
                CSeriesTotal.CValue += (1/(temp[i].CValue*temp[i].CSelect));
            } else {
                this.setState({CSeriesTotal: 0});
                return 0 ;
            }
        }
        CSeriesTotal.CValue = ((CSeriesTotal.CValue)/CSeriesTotal.CSelect);
        this.setState({CSeriesTotal: CSeriesTotal});
    }
    calculateCParallelTotal = () => {
        let temp = this.state.CParallel;
        let CParallelTotal = this.state.CParallelTotal;
        CParallelTotal.CValue = 0;
        console.log( "Resisot numbers: " + temp.length);
        for(let i=0;i<temp.length;i++) {
            CParallelTotal.CValue += (temp[i].CValue*temp[i].CSelect);
        }
        console.log('CParallelTotal');
        console.log(CParallelTotal);
        CParallelTotal.CValue = ((1/CParallelTotal.CValue)/CParallelTotal.CSelect);
        this.setState({CParallelTotal: CParallelTotal});
    }

    addCParallel = () => {
        let CParallelNum = this.state.CParallelNum;
        let CParallel = this.state.CParallel;
        CParallel = [...CParallel,{CValue: 0,CSelect: 1}];
        this.setState({CParallelNum: CParallelNum+1,CParallel: CParallel});
    }

    addCSeries = () => {
        let CSeriesNum = this.state.CSeriesNum;
        let CSeries = this.state.CSeries;
        CSeries = [...CSeries,{CValue: 0,CSelect: 1}];
        this.setState({CSeriesNum: CSeriesNum+1,CSeries: CSeries});
    }

    render() {
        const capacitorParallel = [];
        for (let i = 2 ; i < this.state.CParallelNum ; i++  ) {
            capacitorParallel.push(
                <div className="flex-row flex-start margin-2 text-left">
                    <label className="flex-item-3"> C{i+1} : </label>
                    <input name="CValue" value={this.state.CParallel[i].CValue} onChange={(e) => this.onChangeCParallel(i,e)} type="number" className="form-control flex-item-5"/>
                    <select name="CSelect" value={this.state.CParallel[i].CSelect} onChange={(e) => this.onChangeCParallel(i,e)} className="form-control flex-item-4">
                        <option value="1e-6">uF</option>
                        <option value="1e-9">nF</option>
                        <option value="1e-12">pF</option>
                    </select>
                </div>
            )
        }
        const capacitorSerie = [];
        for (let i = 2 ; i < this.state.CSeriesNum ; i++  ) {
            capacitorSerie.push(
                <div className="flex-row flex-start margin-2 text-left">
                    <label className="flex-item-3"> C{i+1} : </label>
                    <input name="CValue" value={this.state.CSeries[i].CValue} onChange={(e) => this.onChangeCSeries(i,e)} type="number" className="form-control flex-item-5"/>
                    <select name="CSelect" value={this.state.CSeries[i].CSelect} onChange={(e) => this.onChangeCSeries(i,e)} className="form-control flex-item-4">
                        <option value="1e-6">uF</option>
                        <option value="1e-9">nF</option>
                        <option value="1e-12">pF</option>
                    </select>
                </div>
            )
        }

        return(
            <div className="container text-right">
                <h1> محاسبه خازن های سری و موازی </h1>
                <hr/>
                <p> فرمول محاسبه خازن های موازی :   </p>
                <p>C<sub>T</sub> = 1 / (1/C1 + 1/C2 + 1/C3 + etc..)</p>
                <p> 0.7 * ( جریان خروجی / ظرفیت باتری ) = شارژدهی باتری </p>
                <p> فرمول محاسبه مقاومت های سری : </p>
                <p> C<sub>T</sub> = C1 + C2 + C3 + etc..</p>
                <div className="flex-row flex-wrap" style={{direction: "ltr"}}>
                    <div className="flex-column flex-item-md-5 flex-item-sm-12">
                        <h3 className="text-center">خازن های موازی</h3>
                        <div className="flex-row flex-start margin-2 text-left">
                            <label className="flex-item-3"> C1 : </label>
                            <input name="CValue" value={this.state.CParallel[0].CValue} onChange={(e) => this.onChangeCParallel(0,e)} type="number" className="form-control flex-item-5"/>
                            <select name="CSelect" value={this.state.CParallel[0].CSelect} onChange={(e) => this.onChangeCParallel(0,e)} className="form-control flex-item-3">
                                <option value="1e-6">uF</option>
                                <option value="1e-9">nF</option>
                                <option value="1e-12">pF</option>
                            </select>
                        </div>
                        <div className="flex-row flex-start margin-2 text-left">
                            <label  className="flex-item-3"> C2 : </label>
                            <input name="CValue" value={this.state.CParallel[1].CValue} onChange={(e) => this.onChangeCParallel(1,e)} type="number" className="form-control flex-item-5"/>
                            <select name="CSelect" value={this.state.CParallel[1].CSelect} onChange={(e) => this.onChangeCParallel(1,e)} className="form-control flex-item-3">
                                <option value="1e-6">uF</option>
                                <option value="1e-9">nF</option>
                                <option value="1e-12">pF</option>
                            </select>
                        </div>
                        {capacitorParallel}
                        <button onClick={this.addCParallel} className="btn btn-primary" style={{width: "40%",margin: "auto"}}>خازن اضافه کن</button>
                        <div className="flex-row flex-start margin-2 text-left">
                            <label  className="flex-item-3"> CTotal : </label>
                            <input name="CValue" value={this.state.CParallelTotal.CValue} onChange={(e) => this.onChangeCParallelTotal(e)} type="email" className="form-control flex-item-5"/>
                            <select name="CSelect" value={this.state.CParallelTotal.CSelect} onChange={(e) => this.onChangeCParallelTotal(e)} className="form-control flex-item-3">
                                <option value="1e-6">uF</option>
                                <option value="1e-9">nF</option>
                                <option value="1e-12">pF</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-column flex-item-md-5 flex-item-sm-12">
                        <h3 className="text-center">خازن های سری</h3>
                        <div className="flex-row flex-start margin-2 text-left">
                            <label className="flex-item-3"> C1 : </label>
                            <input name="CValue" value={this.state.CSeries[0].CValue} onChange={(e) => this.onChangeCSeries(0,e)} type="number" className="form-control flex-item-5"/>
                            <select name="CSelect" value={this.state.CSeries[0].CSelect} onChange={(e) => this.onChangeCSeries(0,e)} className="form-control flex-item-3">
                                <option value="1e-6">uF</option>
                                <option value="1e-9">nF</option>
                                <option value="1e-12">pF</option>
                            </select>
                        </div>
                        <div className="flex-row flex-start margin-2 text-left">
                            <label  className="flex-item-3"> C2 : </label>
                            <input name="CValue" value={this.state.CSeries[1].CValue} onChange={(e) => this.onChangeCSeries(1,e)} type="number" className="form-control flex-item-5"/>
                            <select name="CSelect" value={this.state.CSeries[1].CSelect} onChange={(e) => this.onChangeCSeries(1,e)} className="form-control flex-item-3">
                                <option value="1e-6">uF</option>
                                <option value="1e-9">nF</option>
                                <option value="1e-12">pF</option>
                            </select>
                        </div>
                        {capacitorSerie}
                        <button onClick={this.addCSeries} className="btn btn-primary" style={{width: "40%",margin: "auto"}}>خازن اضافه کن</button>
                        <div className="flex-row flex-start margin-2 text-left">
                            <label  className="flex-item-3"> CTotal : </label>
                            <input name="CValue" value={this.state.CSeriesTotal.CValue} onChange={(e) => this.onChangeCSeriesTotal(e)} type="email" className="form-control flex-item-5"/>
                            <select name="CSelect" value={this.state.CSeriesTotal.CSelect} onChange={(e) => this.onChangeCSeriesTotal(e)} className="form-control flex-item-3">
                                <option value="1e-6">uF</option>
                                <option value="1e-9">nF</option>
                                <option value="1e-12">pF</option>
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
export default ParallelandSeriesCap;