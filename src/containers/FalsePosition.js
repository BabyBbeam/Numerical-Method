import React, { Component } from 'react'
import { Row, Col , Input, Button, Table } from 'antd'
import apis from '../api/index'
import { calFalsePosition } from '../components/calculateNumer'
import ModalPopup from '../components/ModalPopup'
import './Content.css'

class FalsePosition extends Component {

    state = {
        fx : "",
        xl : null,
        xr : null,
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
            this.setState({iterationData:calFalsePosition(this.state.fx, this.state.xl, this.state.xr, this.state.error)})
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
        this.setState({
            fx: this.state.apiData[1]["equation"],
            xl : this.state.apiData[1]["xl"],
            xr : this.state.apiData[1]["xr"],
            error : this.state.apiData[1]["error"],
        })
    }

    onClickExample = e =>{
        this.getData()
    }

    onClickOk = e =>{
        this.setState({isModalVisible:false})
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

    render() {
        return (
            <div className='content'>
                <h1>False-Position Method</h1>
                <Row className='input-form' type='flex' align='middle'>
                    <Col span={24}>
                        <span>f(x) :</span><Input className='input-form-fx' placeholder='Example | 43x-1' value={this.state.fx} onChange={this.OnChangeFx} />
                    </Col>
                </Row>
                <Row className='input-form' type='flex' align='middle'>
                    <Col span={8} className='col-input-xl'>
                        xl :<Input className='input-form-init' placeholder='0.2' value={this.state.xl} onChange={this.OnChangeXl} />
                    </Col>
                    <Col span={8}>
                        xr :<Input className='input-form-init' placeholder='0.3' value={this.state.xr} onChange={this.OnChangeXr} />
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

export default FalsePosition
