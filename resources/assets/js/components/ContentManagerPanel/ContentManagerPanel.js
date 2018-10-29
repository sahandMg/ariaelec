import React , {Component} from 'react';
import axios from 'axios';
import { NavLink , Route , Switch } from 'react-router-dom';
import AddContent from './AddContent/AddContent';
import AddImages from './AddImages/AddImages';

class ContentManagerPanel extends Component {
    render() {
        return (
            <div className="container" style={{marginTop: "2%"}}>
                <ul className="flex-row space-between">
                    <li><NavLink to="/ContentManagerPanel/slides" activeClassName="verticalListActive"> اسلایدها </NavLink></li>
                    <li><NavLink to="/ContentManagerPanel/important" activeClassName="verticalListActive">قسمت راست اسلایدها</NavLink></li>
                    <li><NavLink to="/ContentManagerPanel/Articles" activeClassName="verticalListActive"> مقاله ها </NavLink></li>
                    <li><NavLink to="/ContentManagerPanel/images" activeClassName="verticalListActive">عکس ها</NavLink></li>
                    <li><NavLink to="/ContentManagerPanel/videos" activeClassName="verticalListActive">ویدیوها</NavLink></li>
                    <li><NavLink to="/ContentManagerPanel/products" activeClassName="verticalListActive">محصولات</NavLink></li>
                </ul>
                <hr/>
                <br/>
                <Switch>
                    {/*<Route path="/ContentManagerPanel/slides" exact component={Main}/>*/}
                    {/*<Route path="/ContentManagerPanel/important" component={AddDataPart}/>*/}
                    <Route path="/ContentManagerPanel/Articles" component={AddContent}/>
                    <Route path="/ContentManagerPanel/images" component={AddImages}/>
                    {/*<Route path="/ContentManagerPanel/videos" component={AdminLogIn}/>*/}
                    {/*<Route path="/ContentManagerPanel/products" component={AdminControlPanel}/>*/}
                </Switch>
            </div>
        )
    }
}

export default ContentManagerPanel;