import React , {Component} from 'react';
import './InputWithText.css';

const InputWithText = (props) => (
                <div className="form-group text-center">
                    <label> {props.label} </label>
                    <div className="flex-row flex-start InputWithText">
                     <span className="badge badge-secondary flex-item-2">{props.text}</span>
                     <input  placeholder={props.placeholder} name={props.name} value={props.value} onChange={(e) => props.onChange(e)} type="text" className="form-control flex-item-10"/>
                    </div>
                </div>
)
export default InputWithText;

// style={{marginLeft: "-30px"}}