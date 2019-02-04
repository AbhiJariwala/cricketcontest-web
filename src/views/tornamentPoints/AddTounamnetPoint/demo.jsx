import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DivbuttonMinusPlus={
    marginLeft: "120px",
    marginTop: "-48px"
}
class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            lengthOfRunsBox: 0,
            totalbox1: 0,
            totalbox2: 0,
            totalbox3: 0,
            totalbox4: 0,
            totalbox5: 0,
            Runs: [],
            score: {
                "0": "Runs",
                "1": "Six",
                "2": "Four",
                "3": "wicket",
                "4": "Stumping",
                "5": "Catch"
            },
            next: 0,
        };
        this.openModal = this.openModal.bind(this);
    }
    AddmoreForRuns = (abc) => {
        if(abc==="Runs"){
            this.setState({ lengthOfRunsBox: this.state.lengthOfRunsBox + 1 })
        }else if(abc ==="Six"){
            this.setState({ totalbox1: this.state.totalbox1 + 1 })
        }else if(abc ==="Four"){
            this.setState({ totalbox2: this.state.totalbox2 + 1 })
        }else if(abc ==="wicket"){
            this.setState({ totalbox3: this.state.totalbox3 + 1 })
        }else if(abc ==="Stumping"){
            this.setState({ totalbox4: this.state.totalbox4 + 1 })
        }else if(abc ==="Catch"){
            this.setState({ totalbox5: this.state.totalbox5 + 1 })
        }        
    }
    Remove = (abc) => {
        if(abc==="Runs"){
            this.setState({ lengthOfRunsBox: this.state.lengthOfRunsBox - 1 })
        }else if(abc ==="Six"){
            this.setState({ totalbox1: this.state.totalbox1 - 1 })
        }else if(abc ==="Four"){
            this.setState({ totalbox2: this.state.totalbox2 - 1 })
        }else if(abc ==="Wicket"){
            this.setState({ totalbox3: this.state.totalbox3 - 1 })
        }else if(abc ==="Stumping"){
            this.setState({ totalbox4: this.state.totalbox4 - 1 })
        }else if(abc ==="Catch"){
            this.setState({ totalbox5: this.state.totalbox5 - 1 })
        }
    }    
    datachangehandle = (e) => {
        console.log(e.target.name);
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
        
        console.log(this.state);
        let pagination = [], renderPageNumbers;
        for (let i = 0; i < this.state.lengthOfRunsBox; i++) {
            pagination.push(i);
        }
        renderPageNumbers = pagination.map(number => {
            return (<div key={number}>
            {number===0?<div style={DivbuttonMinusPlus}>
                <img  onClick={()=>this.AddmoreForRuns("Runs")} alt="true" src="https://img.icons8.com/color/48/000000/hospital.png" style={{width:"35px"}}></img>
                {this.state.lengthOfRunsBox>=2?
                <img onClick={()=>this.Remove("Runs")}  alt="true" src="https://img.icons8.com/color/48/000000/minus.png" style={{width:"35px"}}></img>:""}                
                </div> :""}
            from
                <div><input type="text" name={"Runs[From]"+ number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"Runs[To]" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"Runs[point]" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                 </div>
            </div>
            );
        });
        let pagination1 = [], renderPageNumbers1;
        for (let i = 0; i < this.state.totalbox1; i++) {
            pagination1.push(i);
        }
        renderPageNumbers1 = pagination1.map(number => {
            return (<div key={number}>            
            {number===0?<div style={DivbuttonMinusPlus}>
                <img  onClick={()=>this.AddmoreForRuns("Six")} alt="true" src="https://img.icons8.com/color/48/000000/hospital.png" style={{width:"35px"}}></img>
                {this.state.totalbox1>=2?
                <img onClick={()=>this.Remove("Six")} alt="true" src="https://img.icons8.com/color/48/000000/minus.png" style={{width:"35px"}}></img> :""}
            </div> :""}
            from
                <div><input type="text" name={"SixFrom" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"SixTo" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"Sixpoint" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                </div>
            </div>
            );
        });
        let pagination2 = [], renderPageNumbers2;
        for (let i = 0; i < this.state.totalbox2; i++) {
            pagination2.push(i);
        }
        renderPageNumbers2 = pagination2.map(number => {
            return (<div key={number}>
            {number===0?<div style={DivbuttonMinusPlus}>
                <img  onClick={()=>this.AddmoreForRuns("four")} alt="true" src="https://img.icons8.com/color/48/000000/hospital.png" style={{width:"35px"}}></img>
                {this.state.totalbox2>=2?<img onClick={()=>this.Remove("Four")} alt="true" src="https://img.icons8.com/color/48/000000/minus.png" style={{width:"35px"}}></img>:""} </div>:"" }
            from
                <div><input type="text" name={"fourFrom" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"fourTo" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"fourpoint" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                </div>
                
            </div>
            );
        });

        let pagination3 = [], renderPageNumbers3;
        for (let i = 0; i < this.state.totalbox3; i++) {
            pagination3.push(i);
        }
        renderPageNumbers3 = pagination3.map(number => {
            return (<div key={number}>
            {number===0?<div style={DivbuttonMinusPlus}>
                <img  onClick={()=>this.AddmoreForRuns("wicket")} alt="true" src="https://img.icons8.com/color/48/000000/hospital.png" style={{width:"35px"}}></img>
                {this.state.totalbox3>=2?
                <img onClick={()=>this.Remove("wicket")} alt="true" src="https://img.icons8.com/color/48/000000/minus.png" style={{width:"35px"}}></img>:""  }
                </div>:""}
            from
                <div><input type="text" name={"wicketFrom" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"wicketTo" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"wicketpoint" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                </div>
            </div>
            );
        });

        let pagination4 = [], renderPageNumbers4;
        for (let i = 0; i < this.state.totalbox4; i++) {
            pagination4.push(i);
        }
        renderPageNumbers4 = pagination4.map(number => {
            return (<div key={number}>
            {number===0?<div style={DivbuttonMinusPlus}>
                <img  onClick={()=>this.AddmoreForRuns("Stumping")} alt="true" src="https://img.icons8.com/color/48/000000/hospital.png" style={{width:"35px"}}></img>
                {this.state.totalbox4>=2?
                <img onClick={()=>this.Remove("Stumping")} alt="true" src="https://img.icons8.com/color/48/000000/minus.png" style={{width:"35px"}}></img> :""}
            </div>:""}
            from
               <div> <input type="text" name={"stumpingFrom" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"stumpingTo" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"stumpingpoint" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                 </div>
            </div>
            );
        });

        let pagination5 = [], renderPageNumbers5;
        for (let i = 0; i < this.state.totalbox5; i++) {
            pagination5.push(i);
        }
        renderPageNumbers5 = pagination5.map(number => {
            return (<div key={number}>
            {number===0?<div style={DivbuttonMinusPlus}>
                <img  onClick={()=>this.AddmoreForRuns("Catch")} alt="true" src="https://img.icons8.com/color/48/000000/hospital.png" style={{width:"35px"}}></img>
                {this.state.totalbox5>=2?
                <img onClick={()=>this.Remove("Catch")} alt="true" src="https://img.icons8.com/color/48/000000/minus.png" style={{width:"35px"}}></img>:""} </div> :""}
            from
                <div><input type="text" name={"catchFrom" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                to
                <input type="text" name={"catchTo" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                point
                <input type="text" name={"catchpoint" + number} style={{ width: "20%" }} onChange={this.datachangehandle} />
                </div>
            </div>
            );
        });
        let nextchange="";
if(this.state.lengthOfRunsBox===1){
         nextchange = this.state.score[0 + this.state.next]}

        let nextchange1 = this.state.score[1 + this.state.next]
        let nextchange2 = this.state.score[2 + this.state.next]
        let nextchange3 = this.state.score[3 + this.state.next]
        let nextchange4 = this.state.score[4 + this.state.next]
        let nextchange5 = this.state.score[5 + this.state.next]
        return (
            <div>
                <Button color="danger" onClick={this.openModal}>Add</Button>
                <Modal isOpen={this.state.modal} toggle={this.openModal} className={this.props.className}>
                    <ModalHeader toggle={this.openModal}>Add score</ModalHeader>
                    <ModalBody>
                        
                            <h3>{nextchange}</h3>
                            {renderPageNumbers}
                        {this.state.totalbox1 ?
                            <div>
                                <h3>{nextchange1}</h3>
                                {renderPageNumbers1}
                            </div> : ""}

                        {this.state.totalbox2 ?
                            <div>
                                 <h3>{nextchange2}</h3>
                                {renderPageNumbers2}
                            </div> : ""}
                        {this.state.totalbox3 ?
                            <div>
                                 <h3>{nextchange3}</h3>
                                {renderPageNumbers3}
                            </div> : ""}
                        {this.state.totalbox4 ?
                            <div>
                                 <h3>{nextchange4}</h3>
                                {renderPageNumbers4}
                            </div> : ""}
                        {this.state.totalbox5 ?
                            <div>
                                 <h3>{nextchange5}</h3>
                                {renderPageNumbers5}
                            </div> : ""}
                       <div style={{width:"101%"}}>
                        {this.state.lengthOfRunsBox === 0 ?
                            <Button color="primary" onClick={()=>this.AddmoreForRuns("Runs")}>Add Run</Button>
                            :""}
                        {this.state.totalbox1 === 0 ?
                            <Button color="primary" onClick={()=>this.AddmoreForRuns("Six")}>{"Add "+this.state.score[1 + this.state.next]}</Button>
                            :  ""}
                        {this.state.totalbox2 === 0 ?
                            <Button color="primary" onClick={()=>this.AddmoreForRuns("Four")}>{"Add "+this.state.score[2 + this.state.next]}</Button>
                            :""}
                        {this.state.totalbox3 === 0 ?
                            <Button color="primary" onClick={()=>this.AddmoreForRuns("wicket")}>{"Add "+this.state.score[3 + this.state.next]}</Button>
                            :  ""}
                        {this.state.totalbox4 === 0 ?
                            <Button color="primary" onClick={()=>this.AddmoreForRuns("Stumping")}>{"Add "+this.state.score[4 + this.state.next]}</Button>
                            : ""}

                        {this.state.totalbox5 === 0 ?
                            <Button color="primary" onClick={()=>this.AddmoreForRuns("Catch")}>{"Add "+this.state.score[5 + this.state.next]}</Button>
                            : ""}
                            </div>     
                    </ModalBody>
                    <ModalFooter>                        
                        {this.state.lengthOfRunsBox>=1 && this.state.totalbox1 >=1 && this.state.totalbox2 >=1 && this.state.totalbox3 >=1 && this.state.totalbox4 >=1 && this.state.totalbox5 >=1?
                        <Button color="primary" onClick={this.openModal}>
                        submit
                        </Button>
                        :""}
                        <Button color="secondary" onClick={this.openModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
       }
}

export default ModalExample;