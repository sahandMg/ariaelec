import React from 'react';
import { NavLink , Route , Switch } from 'react-router-dom';


const BatteryLifeCalculator = (props) => (
    <div className="container text-right">
      <h1> محاسبه شارژ دهی باتری </h1>
      <hr/>
      <p>به طور عمومی شارژ دهی باتری براساس ظرفیت آن به میلی آمپر برساعت (mAH) و جریان خروجی به میلی آمپر (mA) محاسبه می شود. </p>
      <p> 0.7 * ( جریان خروجی / ظرفیت باتری ) =  شارژدهی باتری </p>
      <p> * ضریب 0.7 برای عوامل خارجی که می تواند بر عمر باتری تاثیر بگذارد در نظر گرفته می شود. </p>
        <div class="form-group col-md-6">
            <label for="exampleFormControlInput1"> ظرفیت باتری </label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="mAh"/>
        </div>
        <div class="form-group col-md-6">
            <label for="exampleFormControlInput1"> جریان خروجی </label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="mA"/>
        </div>
        <div class="form-group col-md-6">
            <label for="exampleFormControlInput1"> ضریب عوامل خارجی </label>
            <input type="email" class="form-control" id="exampleFormControlInput1" value="0.7"/>
        </div>
        <div class="form-group col-md-6">
            <label for="exampleFormControlInput1"> زمان محاسبه شده به ساعت </label>
            <input type="email" class="form-control" id="exampleFormControlInput1" />
        </div>
    </div>
);

export default BatteryLifeCalculator;