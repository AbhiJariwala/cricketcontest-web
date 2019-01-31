import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
// import { Route } from 'react-router-dom'
import CRoute from './components/customRoute/customRoute'

import UserRegistration from './views/Registration/User-registration'
import Login from './views/Login/Login'
import indexRoutes from './routes/index'
// import userDashBoard from './views/userDashBoard/userDashBoard'
class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <CRoute path="/registration" exact component={UserRegistration} />
                    <CRoute path="/login" exact component={Login} />
                    {/* <CRoute path="/userDashBoard" exact component={userDashBoard} /> */}
                    {indexRoutes.map((prop, key) => {
                        return <CRoute path={prop.path} key={key} component={prop.component} cprivate />;
                    })}
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);