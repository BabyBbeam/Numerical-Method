import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './Navbar.css'
class Navbar extends Component {
    render() {
        return (
            <div> 
                <Row className='navbar-row'>
                    <Col span={12} className='logo'>Numerical Method</Col>
                    <Col span={12} className='menu'>col</Col>
                </Row>
                <div className='logo'>
                    this is div
                </div>
            </div>
        )
    }
}

export default Navbar

