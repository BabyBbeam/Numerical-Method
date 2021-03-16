import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Menu, Dropdown, Button } from 'antd';
import './Navbar.css'

const roet_menu = (
    <Menu className='roet-menu'>
        <Menu.Item className='roet-menu-item'> 
            Bisection Method
        </Menu.Item>
        <Menu.Item className='roet-menu-item'>
            False-position Method
        </Menu.Item>
    </Menu>
);

const matrix_menu = (
    <Menu className='roet-menu'>
        <Menu.Item className='roet-menu-item'> 
            Cramer's Rule
        </Menu.Item>
        <Menu.Item className='roet-menu-item'>
            Gauss Eliminate Method
        </Menu.Item>
    </Menu>
);

class Navbar extends Component {
    render() {
        return (
            <div>
                <div>
                    <Row className='navbar-row' type="flex" align="middle">
                        <Col span={12} className='logo'>
                            <span>Numerical Method</span>
                        </Col>
                        <Col span={12} className='menu'>
                            <Dropdown overlay={roet_menu} placement="bottomCenter">
                                <Button>Root of Equations</Button>
                            </Dropdown>
                            <Dropdown overlay={matrix_menu} placement="bottomCenter">
                                <Button>Matrix</Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Navbar

