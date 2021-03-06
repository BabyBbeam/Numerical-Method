import React, { Component } from 'react'
import { Row, Col , Input, Button, Table } from 'antd'
import apis from '../api/index'
import { calSecant } from '../components/calculateNumer'
import ModalPopup from '../components/ModalPopup'
import './Content.css'

class Secant extends Component {

    state = {
        fx : "",
        x0 : null,
        x1 : null,
        error : null,
        isCal : false,
        iterationColumns : [
            {
                title: 'Iteration',
                dataIndex: 'iteration'
            },
            {
                title: 'X',
                dataIndex: 'x'
            },
            {
                title: 'Error',
                dataIndex: 'error'
            }
        ],
        iterationData : [],
        isModalVisible : false,
        apiData : [],
        hasData : false,
    }

    onClickCalculate = e =>{
        try{
            this.setState({iterationData:calSecant(this.state.fx, this.state.x0, this.state.x1, this.state.error)})
            this.setState({isCal:true})
        }
        catch (err){
            console.log("error")
        }
    }

    async getData(){
        let tempData = null
        await apis.getAllRoe().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({hasData:true})
        this.setState({
            fx: this.state.apiData[3]["equation"],
            x0 : this.state.apiData[3]["xl"],
            x1 : this.state.apiData[3]["xr"],
            error : this.state.apiData[3]["error"]
        })
    }

    onClickExample = e =>{
       this.getData()
    }

    onClickReset = e =>{
        this.setState({fx:"",xl:null,xr:null,error:null,isCal:false})
    }

    OnChangeFx = e =>{
        this.setState({fx:e.target.value})
    }

    OnChangeX0 = e =>{
        this.setState({x0:e.target.value})
    }

    OnChangeX1 = e =>{
        this.setState({x1:e.target.value})
    }

    onChangeErr = e =>{
        this.setState({error:e.target.value})
    }

    render() {
        return (
            <div className='content'>
                <h1>Secant Method</h1>
                <Row className='input-form' type='flex' align='middle'>
                    <Col span={24}>
                        <span>f(x) :</span><Input className='input-form-fx' placeholder='Example | x^4-13' value={this.state.fx} onChange={this.OnChangeFx} />
                    </Col>
                </Row>
                <Row className='input-form' type='flex' align='middle'>
                    <Col span={8} className='col-input-xl'>
                        x0 :<Input className='input-form-init' placeholder='1.5' value={this.state.x0} onChange={this.OnChangeX0} />
                    </Col>
                    <Col span={8}>
                        x1 :<Input className='input-form-init' placeholder='2.0' value={this.state.x1} onChange={this.OnChangeX1} />
                    </Col>
                    <Col span={8} className='col-input-err'>
                        error :<Input className='input-form-err' placeholder='0.00001' value={this.state.error} onChange={this.onChangeErr} />
                    </Col>
                </Row>
                <Row type='flex' align='middle' className='row-button'>
                    <Col span={24} className='col-button'>
                        <Button size='large' type='primary' className='reset-button' onClick={this.onClickReset}>Reset</Button>
                        <Button size='large' type='primary' className='cal-button' onClick={this.onClickCalculate}>???????????????</Button>
                        <Button size='large' type='primary' className='example-button' onClick={this.onClickExample}>????????????????????????</Button>
                    </Col>
                </Row>
                {this.state.isCal ? <Table columns={this.state.iterationColumns} dataSource={this.state.iterationData} size="middle" /> : null}
            </div>
        )
    }
}

export default Secant
