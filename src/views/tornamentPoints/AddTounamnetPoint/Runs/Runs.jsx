import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            totalbox: 0,
            totalbox1: 0,
            totalbox2: 0,
            Runs: "",
            six: "",
            four: "",
            Wicket: "",
            stumping: "",
            score: {
                "0": "Runs",
                "1": "Six",
                "2": "four",
                "3": "wicket",
                "4": "stumping"
            },
            next: 0,
        };
        this.toggle = this.toggle.bind(this);
    }
    Addmore = () => {
        this.setState({ totalbox: this.state.totalbox + 1 })
    }
    Remove = () => {
        this.setState({ totalbox: this.state.totalbox - 1 })
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
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        let pagination = [], renderPageNumbers;
        for (let i = 0; i < this.state.totalbox; i++) {
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

        let nextchange = this.state.score[0 + this.state.next]

        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Add</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <p>
                            <h3>{nextchange}</h3>
                            {renderPageNumbers}</p>

                        {this.state.totalbox1 ?
                            <p>
                                {nextchange1}
                                {renderPageNumbers2}
                            </p> : ""}
                        {this.state.totalbox2 ?
                            <p>
                                {nextchange2}
                                {renderPageNumbers3}
                            </p> : ""}
                        {this.state.totalbox === 0 ?
                            <Button color="primary" onClick={this.Addmore.bind(Event)}>Add Run</Button>
                            : this.state.totalbox1 === 0 ?
                                <Button color="primary" onClick={this.Addmore.bind(Event)}>Add More</Button> : ""}
                        {this.state.totalbox1 === 0 ?
                            <Button color="primary" onClick={this.Next.bind(Event)}>{this.state.score[1 + this.state.next]}</Button>
                            :
                            <Button color="primary" onClick={this.Next.bind(Event)}>Add More</Button>}
                        {this.state.totalbox2 === 0 ?
                            <Button color="primary" onClick={this.Next.bind(Event)}>{this.state.score[2 + this.state.next]}</Button>
                            :
                            <Button color="primary" onClick={this.Next.bind(Event)}>Add More</Button>}

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalExample;