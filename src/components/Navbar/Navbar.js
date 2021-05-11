import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { Menu, Dropdown, Button } from 'antd';
import './Navbar.css'

const roet_menu = (
  <Menu className="roet-menu">
    <Menu.Item className="roet-menu-item">
      <Link to="/bisection" replace>Bisection Method</Link>
    </Menu.Item>
    <Menu.Item className="roet-menu-item">
      <Link to="/false-position" replace>False-position Method</Link>
    </Menu.Item>
    <Menu.Item className="roet-menu-item">
      <Link to="/one-point" replace>One-point Iteration Method</Link>
    </Menu.Item>
    <Menu.Item className="roet-menu-item">
      <Link to="/newton-raphson" replace>Newton Raphson Method</Link>
    </Menu.Item>
    <Menu.Item className="roet-menu-item">
      <Link to="/secant" replace>Secant Method</Link>
    </Menu.Item>
  </Menu>
);

const matrix_menu = (
    <Menu className='roet-menu'>
      <Menu.Item className='roet-menu-item'> 
        <Link to="/cramer-rule" replace>Cramer's Rule</Link>
      </Menu.Item>
      <Menu.Item className='roet-menu-item'>
          <Link to="/gauss-elimination" replace>Gauss Elimination Method</Link>
      </Menu.Item>
      <Menu.Item className='roet-menu-item'>
          <Link to="/gauss-jordan" replace>Gauss Jordan Method</Link>
      </Menu.Item>
      <Menu.Item className='roet-menu-item'>
          <Link to="/lu-decomposition" replace>LU Decomposition Method</Link>
      </Menu.Item>
      <Menu.Item className='roet-menu-item'>
          <Link to="/conjugate-gradient" replace>Conjugate Gradient Method</Link>
      </Menu.Item>
      <Menu.Item className='roet-menu-item'>
          <Link to="/jacobi" replace>Jacobi Method</Link>
      </Menu.Item>
      <Menu.Item className='roet-menu-item'>
          <Link to="/gauss-seidel" replace>Gauss-Seidel Method</Link>
      </Menu.Item>
    </Menu>
);

const interpolation_menu = (
    <Menu className='roet-menu'>
        <Menu.Item className='roet-menu-item'> 
          <Link to="/newton-divide" replace>Newton Devide</Link>
        </Menu.Item>
        <Menu.Item className='roet-menu-item'> 
          <Link to="/lagrange" replace>Lagrange</Link>
        </Menu.Item>
        <Menu.Item className='roet-menu-item'> 
          <Link to="/lagrange" replace>Spline</Link>
        </Menu.Item>
    </Menu>
)

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
                            <Dropdown overlay={interpolation_menu} placement="bottomCenter">
                                <Button>Interpolation</Button>
                            </Dropdown>
                            <Button><Link to="/swagger" replace>API Document</Link></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Navbar

