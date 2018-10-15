import React from 'react';
import { Link , Route , Switch } from 'react-router-dom';
import BatteryLifeCalculator from './BatteryLifeCalculator/BatteryLifeCalculator';
import ParallelandSeriesResistor from './ParallelandSeriesResistor/ParallelandSeriesResistor';
import ParallelandSeriesCap from './ParallelandSeriesCap/ParallelandSeriesCap';
import CurrentDividerCalculator from './CurrentDividerCalculator/CurrentDividerCalculator';
import TemperatureCalculator from './TemperatureCalculator/TemperatureCalculator';
import ResistorsColorCode from './ResistorsColorCode/ResistorsColorCode';
import LengthCalculator from './LengthCalculator/LengthCalculator';
import RequestNewConversion from './RequestNewConversion/RequestNewConversion';
import VoltageDividerCalculator from './VoltageDividerCalculator/VoltageDividerCalculator';
import WeightCalculator from './WeightCalculator/WeightCalculator';
// import LEDSVG from '../../assets/SVG/SVGIcons/led.svg';
import BatterySVG from '../../assets/SVG/SVGIcons/battery.svg';
import Res from '../../assets/SVG/SVGIcons/ohm.svg';
import Cap from '../../assets/SVG/SVGIcons/Cap.svg';
import ResColorCode from '../../assets/SVG/SVGIcons/resistor.svg';
import CurrentDiv from '../../assets/SVG/SVGIcons/CurrentDiv.svg';
import VoltageDiv from '../../assets/SVG/SVGIcons/VoltageDiv.svg';
import Length from '../../assets/SVG/SVGIcons/2100.svg';
import Temperture from '../../assets/SVG/SVGIcons/number.svg';
import Weight from '../../assets/SVG/SVGIcons/Weight.svg';
import Presure from '../../assets/SVG/SVGIcons/dbm.svg';
import NewReq from '../../assets/SVG/SVGIcons/led.svg';
import './conversions.css';

const Conversions = (props) => (
    <div className="container margin-top-2">
        <ul id="conversionList" className="flex-row flex-wrap space-between text-center">
            <li><Link to="/online-conversion-calculator/conversion-calculator-battery-life" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={BatterySVG}/> محاسبه عمر باتری </Link></li>
            <li><Link to="/online-conversion-calculator/conversion-calculator-parallel-and-series-resistor" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={Res}/> محاسبه مقاومت های سری و موازی </Link></li>
            <li><Link to="/online-conversion-calculator/conversion-calculator-series-and-parallel-capacitor" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={Cap}/> محاسبه خازن های سری و موازی </Link></li>
            {/*<li><Link to="/online-conversion-calculator/conversion-calculator-current-divider" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={CurrentDiv}/> محاسبه تقسیم جریان </Link></li>*/}
            {/*<li><Link to="/online-conversion-calculator/conversion-calculator-voltage-divider" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={VoltageDiv}/> محاسبه تقسیم ولتاژ </Link></li>*/}
            <li><Link to="/online-conversion-calculator/conversion-calculator-length" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={Length}/> تبدیل واحدهای طولی </Link></li>
            <li><Link to="/online-conversion-calculator/conversion-calculator-temperature" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={Temperture}/> تبدیل واحدهای دما </Link></li>
            <li><Link to="/online-conversion-calculator/conversion-calculator-weight" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={Weight}/> تبدیل واحدهای وزن </Link></li>
            <li><Link to="/online-conversion-calculator/conversion-calculator-resistor-color-code" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={ResColorCode}/> ماشین حساب کد رنگ مقاومتی </Link></li>
            {/*<li><Link to="/online-conversion-calculator/conversion-calculator-pressure" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={Presure}/> تبدیل واحد های فشار </Link></li>*/}
            {/*<li><Link to="/online-conversion-calculator/request-new-conversion" activeClassName={"conversionListActive"}><img height="40" width="40" className="svg-icon" src={NewReq}/> درخواست محاسبه جدید </Link></li>*/}
        </ul>
        <br/>
            <Switch>
                <Route path="/online-conversion-calculator/conversion-calculator-battery-life"  component={BatteryLifeCalculator}/>
                <Route path="/online-conversion-calculator/conversion-calculator-parallel-and-series-resistor"  component={ParallelandSeriesResistor}/>
                <Route path="/online-conversion-calculator/conversion-calculator-series-and-parallel-capacitor"  component={ParallelandSeriesCap}/>
                {/*<Route path="/online-conversion-calculator/conversion-calculator-current-divider"  component={CurrentDividerCalculator}/>*/}
                <Route path="/online-conversion-calculator/conversion-calculator-temperature"  component={TemperatureCalculator}/>
                <Route path="/online-conversion-calculator/conversion-calculator-resistor-color-code"  component={ResistorsColorCode}/>
                <Route path="/online-conversion-calculator/conversion-calculator-length"  component={LengthCalculator}/>
                {/*<Route path="/online-conversion-calculator/conversion-calculator-voltage-divider"  component={VoltageDividerCalculator}/>*/}
                <Route path="/online-conversion-calculator/conversion-calculator-weight"  component={WeightCalculator}/>
                {/*<Route path="/online-conversion-calculator/request-new-conversion"  component={RequestNewConversion}/>*/}
            </Switch>
    </div>
);

export default Conversions;