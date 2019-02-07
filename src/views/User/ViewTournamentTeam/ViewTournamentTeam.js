import React, { Component } from 'react';
import UserPanel from '../../UserPanel/userPanel';

class userDashBoard extends Component {

    logoutClick() {
        this.props.action.logout.logoutUser();
    }
    render() {
        return (
            <div>
                <UserPanel></UserPanel>
                <div className="row" style={{ marginTop: "60px", zIndex: "-1" }}>
                    <div className="col-md-6">

                        <div className="card">
                            <div className="card-header">
                                Tornament teams
                    </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                Tornament teams
                    </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                Tornament teams
                    </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </div>
        );
    }
}



export default userDashBoard;
