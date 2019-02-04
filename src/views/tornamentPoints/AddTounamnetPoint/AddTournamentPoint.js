import React from 'react'
import 'antd/dist/antd.css';
import { Tabs, Icon } from 'antd';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
const TabPane = Tabs.TabPane;
class TournamentPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: [], formIsValid: true, errors: [], point: "", to: "", from: "", finalObject: [] }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createUI() {

        return this.state.values.map((el, i) =>
            <div key={i}>
                <input type="text" name="from" onChange={this.handleChange.bind(this, i)} style={{ width: "20%" }} /> &nbsp;&nbsp; To &nbsp;&nbsp;&nbsp;
                <input type="text" name="to" onChange={this.handleChange.bind(this, i)} style={{ width: "20%" }} /> &nbsp;&nbsp; Points &nbsp;&nbsp;
                <input type="text" name="point" onChange={this.handleChange.bind(this, i)} style={{ width: "20%" }} />&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='button' value='Remove' onClick={this.removeClick.bind(this, i)} />
                <span style={{ color: "red" }}>{this.state.errors[i]}</span>
                <br /><br />
            </div>
        )
    }
    handleChange(i, event) {
        let v = event.target.value;
        var e = [];
        if (!v) {
            this.setState({ formIsValid: false });
            e[i] = "*Please enter your Points.";
        }
        if (!event.target.value.match(/^[0-9 ]*$/)) {
            this.setState({ formIsValid: false });
            e[i] = " *Please enter Numbers only.";
        } else {
            //let val={[event.target.name]:event.target.value};
            this.setState({ errors: "" })

        }
        // this.setState({[event.target.name]:event.target.value})
        // var data={"from":this.state.from.concat(this.state.from),
        // "to":this.state.to.concat(this.state.to),
        // "point":this.state.point.concat(this.state.point)


        this.setState({ [event.target.name]: event.target.value })
        var data = {
            "from": this.state.from,
            "to": this.state.to,
            "point": this.state.point

        }

        this.setState({
            errors: e,
            finalObject: data
        })
    }
    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, this.state.finalObject] }))

    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.values.join(', '));
    }

    render() {

        const addControl = <div>{this.createUI()}<form onSubmit={this.handleSubmit}>
            <input type='button' value='add more' onClick={this.addClick.bind(this)} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="submit" value="Submit" />
        </form></div>

        return (

            <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Tabs defaultActiveKey="1"  >
                        <TabPane tab={<span> <Icon type="swap" />Runs</span>} key="1" >
                            {addControl}
                        </TabPane>
                        <TabPane tab={<span><Icon type="gitlab" />Six</span>} key="2">
                            {addControl}
                        </TabPane>
                        <TabPane tab={<span><Icon type="android" />Four</span>} key="3">
                            {addControl}
                        </TabPane>
                        <TabPane tab={<span><Icon type="android" />Catch</span>} key="4">
                            {addControl}
                        </TabPane>
                        <TabPane tab={<span><Icon type="android" />Stumping</span>} key="5">
                            {addControl}
                        </TabPane>
                    </Tabs>

                </ModalBody>

            </Modal>








        )
    }
}

export default TournamentPoint