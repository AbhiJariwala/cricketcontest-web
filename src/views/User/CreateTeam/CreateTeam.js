import React, { Component } from 'react';
import { Container } from 'reactstrap';
import UserPanel from '../../UserPanel/userPanel'
const banerhome = require('../../../Image/image1.jpg')
class CreateTeam extends Component {
   
    render() {
        return (
            <Container>
                <UserPanel></UserPanel>
                <div>
                    <img src={banerhome} alt={{}} style={{width: "100%",height: "640px"}} ></img>
                    
                </div>
            </Container>
        );
    }
}
export default CreateTeam;

