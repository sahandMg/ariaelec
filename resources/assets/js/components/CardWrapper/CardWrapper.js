import React from 'react';
import './CardWrapper.css';

const CardWrapper = (props) => (
   <div className="card-wrapper text-right">
       {props.children}
   </div>

);

export default CardWrapper;