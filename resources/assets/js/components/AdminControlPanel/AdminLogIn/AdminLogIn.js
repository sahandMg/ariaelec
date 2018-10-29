import React , {Component} from 'react';
import URLs from '../../../URLs';

import LoginCom from '../../LoginCom/LoginCom';
class AdminLogIn extends Component {
    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <LoginCom  redirectTo="/AdminControlPanel" url={URLs.base_URL+URLs.admin_log_in} />
                <br/>
                <br/>
            </div>
        )
    }
}

export default AdminLogIn;