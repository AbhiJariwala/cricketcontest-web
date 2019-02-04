import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            lengthOfRunsBox: 0,
            totalbox1: 0,
            totalbox2: 0,
            Runs: "",
            six:"",
            four:"",
            Wicket:"",
            stumping:"",
            score: {
                "0": "Runs",
                "1": "Six",
                "2": "four",
                "3": "wicket",
                "4": "stumping"
            },
            next: 0,
        };
        this.openModal = this.openModal.bind(this);
    }
    AddmoreForRuns = () => {        
        this.setState({ lengthOfRunsBox: this.state.lengthOfRunsBox + 1 })
    }
    Remove = () => {        
        this.setState({ lengthOfRunsBox: this.state.lengthOfRunsBox - 1 })
    }
    Next = () => {        
        this.setState({ totalbox1: this.state.totalbox1 + 1 })
    }
    datachangehandle = (e) => {
        this.setState({
            Runs: {
                ...this.state.Runs,
                [e.target.name]: e.target.value
            }
        })
    }
    openModal() {        
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        let pagination = [], renderPageNumbers;
        for (let i = 0; i < this.state.lengthOfRunsBox; i++) {
            pagination.push(i);
        }
        renderPageNumbers = pagination.map(number => {
            return (<p key={number}>from
                <input type="text" name={"runsFrom" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"runsTo" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"runspoint" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                <Button color="primary" onClick={this.Remove.bind(Event)}>Remove</Button>                
            </p>
            );
        });
        let pagination2 = [], renderPageNumbers2;
        for (let i = 0; i < this.state.totalbox1; i++) {
            pagination2.push(i);
        }
        renderPageNumbers2 = pagination2.map(number => {
            return (<p key={number}>from
                <input type="text" name={"runsFrom" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"runsTo" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"runspoint" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />

                <Button color="primary" onClick={this.Remove.bind(Event)}>Remove</Button>
            </p>
            );
        });
        let pagination3 = [], renderPageNumbers3;
        for (let i = 0; i < this.state.totalbox2; i++) {
            pagination3.push(i);
        }
        renderPageNumbers3 = pagination3.map(number => {
            return (<p key={number}>from
                <input type="text" name={"runsFrom" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"runsTo" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"runspoint" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />

                <Button color="primary" onClick={this.Remove.bind(Event)}>Remove</Button>
            </p>
            );
        });

        let nextchange = this.state.score[0 + this.state.next]
        let nextchange1 = this.state.score[1 + this.state.next]
        let nextchange2 = this.state.score[2 + this.state.next]
        return (
            <div>
                <Button color="danger" onClick={this.openModal}>Add</Button>
                <Modal isOpen={this.state.modal} toggle={this.openModal} className={this.props.className}>
                    <ModalHeader toggle={this.openModal}>Modal title</ModalHeader>
                    <ModalBody>
                        <p>
                            <h3>{nextchange}</h3>
                            {renderPageNumbers}</p>
                            
                            {this.state.totalbox1?
                            <p>
                            {nextchange1}
                            {renderPageNumbers2}
                            </p>:""}
                            {this.state.totalbox2?
                            <p>
                            {nextchange2}
                            {renderPageNumbers3}
                            </p>:""}
                            {this.state.lengthOfRunsBox===0?
                            <Button color="primary" onClick={this.AddmoreForRuns.bind(Event)}>Add Run</Button>
                            :this.state.totalbox1===0?
                            <Button color="primary" onClick={this.AddmoreForRuns.bind(Event)}>Add More</Button>:""}
                            {this.state.totalbox1===0?
                        <Button color="primary" onClick={this.Next.bind(Event)}>{this.state.score[1 + this.state.next]}</Button>
                        :
                            <Button color="primary" onClick={this.Next.bind(Event)}>Add More</Button>}
                            {this.state.totalbox2===0?
                        <Button color="primary" onClick={this.Next.bind(Event)}>{this.state.score[2 + this.state.next]}</Button>
                        :
                            <Button color="primary" onClick={this.Next.bind(Event)}>Add More</Button>}

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.openModal}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.openModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalExample;