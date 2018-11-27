import React , {Component} from 'react';
import axios from 'axios';
import URLs from '../../../URLs';
import LoginCom from '../../LoginCom/LoginCom';

class ContentManagerLogin extends Component {
    render() {
        return (
            <div className="container text-right">
                <br/>
                <h2>پنل ورود مدیر محتوا</h2>
                <LoginCom redirectTo="/ContentManagerPanel" url={URLs.base_URL+URLs.cm_login} />
                <br/>
            </div>
        )
    }
}

export default ContentManagerLogin;