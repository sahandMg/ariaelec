import React , { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ECommerce.css';
import ComponentList from './ComponentList/ComponentList';

class EditComponentList extends Component {


    render() {
        return (
            <div className="flex-row space-between text-right">
                <div className="flex-item-3">
                    <ComponentList/>
                </div>
                <div className="flex-item-8"></div>
            </div>
        )
    }
};


export default EditComponentList;

