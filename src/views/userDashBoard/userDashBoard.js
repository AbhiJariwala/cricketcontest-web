import React, { Component } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
const Option = Select.Option;


class userDashBoard extends Component {
    handleChange(value) {
        console.log(`selected ${value}`);
      }
    render() {
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        return (
            <div> <Select mode="tags"
    style={{ width: '100%' }}
    onChange={this.handleChange}
    tokenSeparators={[',']}>
    {children}
  </Select>,
            

            </div>
        );
    }
}


export default userDashBoard;