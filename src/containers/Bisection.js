import React, { Component } from 'react'
import { Row, Col , Input, Button} from 'antd'
import './Bisection.css'

class Bisection extends Component {

    state = {
        fx : "",
        xl : null,
        xr : null,
        error : null,
        isCal : false
    }

    onClickReset = e =>{
        this.setState({fx:"",xl:null,xr:null,error:null,isCal:false})
    }

    OnChangeFx = e =>{
        this.setState({fx:e.target.value})
    }

    OnChangeXl = e =>{
        this.setState({xl:e.target.value})
    }

    OnChangeXr = e =>{
        this.setState({xr:e.target.value})
    }

    onChangeErr = e =>{
        this.setState({error:e.target.value})
    }

    componentDidMount

    render() {
        return (
            <div className='bisection-content'>
                <h1>Bisection Method</h1>
                <Row className='input-form' type='flex' align='middle'>
                    <Col span={24}>
                        f(x) :<Input className='input-form-fx' placeholder='Example | x^4-13' value={this.state.fx} onChange={this.OnChangeFx}/>
                    </Col>
                </Row>
                <Row className='input-form' type='flex' align='middle'>
                    <Col span={8} className='col-input-xl'>
                        xl :<Input className='input-form-init' placeholder='1.5' value={this.state.xl} onChange={this.OnChangeXl}/>
                    </Col>
                    <Col span={8}>
                        xr :<Input className='input-form-init' placeholder='2.0' value={this.state.xr} onChange={this.OnChangeXr}/>
                    </Col>
                    <Col span={8} className='col-input-err'>
                        error :<Input className='input-form-init' placeholder='0.00001' value={this.state.error} onChange={this.onChangeErr}/>
                    </Col>
                </Row>
                <Row type='flex' align='middle' className='row-button'>
                    <Col span={12} className='col-reset-button'>
                        <Button size='large' type='primary' className='reset-button' onClick={this.onClickReset}>Reset</Button>
                    </Col>
                    <Col span={12}>
                        <Button size='large' type='primary' className='cal-button'>คำนวณ</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Bisection
