import React, { Component } from 'react';
  import { Container,Button,ModalFooter ,  Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input  } from 'reactstrap';
class AddTournament extends Component {
  
  componentDidUpdate=()=>{
   console.log(this.props.isOpen)    
  }
  AddDataData=()=>{
    console.log("hello");
    this.props.toggle();
  }

    render() {      
      return (    
        <Container>
          <div style={{float: "right",margin:"15px"}}>        
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
          <ModalHeader toggle={this.props.toggle} >Tournament</ModalHeader>
          <ModalBody>
          <Form>
          <FormGroup>
          <Label for="exampleSelect">Select Tournament Name</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select team Name</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
      </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.AddDataData.bind(this)}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>        
      </Container>
      );
    }
  }
  export default AddTournament
  