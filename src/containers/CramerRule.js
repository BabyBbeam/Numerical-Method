import React, { Component } from 'react'
import { Row, Col , Input, Button, Table, Modal } from 'antd'
import axios from 'axios'
import { calOnePoint } from '../components/calculateROE'
import {MatrixInputA, MatrixInputB} from '../components/MatrixInput'
import './Content.css'

const Url = "https://raw.githubusercontent.com/BabyBbeam/Numerical-Method/main/db.json"

class CramerRule extends Component {

    state = {
        n: 2,
        matrixA : [[],[]],
        matrixB : [],
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
        isModalVisible : false
    }

    onClickCalculate = e =>{
        try{
            this.setState({iterationData:calOnePoint(this.state.fx, this.state.x, this.state.error)})
            this.setState({isCal:true})
        }
        catch (err){
            console.log("error")
        }
    }

    onClickExample = e =>{
        this.setState({isModalVisible:true})
    }

    onClickOk = e =>{
        this.setState({isModalVisible:false})
    }

    onClickReset = e =>{
        this.setState({fx:"",xl:null,xr:null,error:null,isCal:false})
    }

    OnChangeMatrixA = e =>{
        let index = e.target.name.split('_')
        this.state.matrixA[parseInt(index[1])][parseInt(index[2])] = e.target.value
        console.log(e.target.value)
    }

    OnChangeMatrixB = e =>{
        let index = e.target.name.split('_')
        this.state.matrixB[parseInt(index[1])]= e.target.value
        console.log(e.target.value)
    }

    onClickAdd = e =>{
        if(this.state.n < 6){
            this.state.matrixA.push([])
            this.setState({n:this.state.n+1})
        } 
    }

    onClickDel = e =>{
        if(this.state.n > 2){
            this.state.matrixA.pop()
            this.setState({n:this.state.n-1})
        } 
    }
    // async componentDidMount(){
    //     let DATA = null
    //     await axios.get(Url)
    //     .then(res => {DATA = res.data.root_of_eqution})
    //     .catch(err => console.log(err))
        
    //     this.setState({fx:DATA[0].equation,xl:DATA[0].xl,xr:DATA[0].xr,error:DATA[0].error})
    // }

    render() {
        return (
            <div className='content'>
                <Modal
                    title='ตัวอย่าง'
                    visible={this.state.isModalVisible} 
                    onOk={this.onClickOk}
                    onCancel={this.onClickOk}
                    footer={[
                        <Button type='primary' onClick={this.onClickOk}>
                            Ok
                        </Button>
                    ]}
            >

                </Modal>
                <h1>Cramer's Rule</h1>
                <Button onClick={this.onClickAdd}>Add</Button>{this.state.n} x {this.state.n}<Button onClick={this.onClickDel}>Del</Button>
                <Row>
                    <Col span={22}>
                        <MatrixInputA n={this.state.n} onChange={this.OnChangeMatrixA}/>
                    </Col>
                    <Col span={2}>
                        <MatrixInputB n={this.state.n} onChange={this.OnChangeMatrixB}/>
                    </Col>
                </Row>
                <Row type='flex' align='middle' className='row-button'>
                    <Col span={24} className='col-button'>
                        <Button size='large' type='primary' className='reset-button' onClick={this.onClickReset}>Reset</Button>
                        <Button size='large' type='primary' className='cal-button' onClick={this.onClickCalculate}>คำนวณ</Button>
                        <Button size='large' type='primary' className='example-button' onClick={this.onClickExample}>ตัวอย่าง</Button>
                    </Col>
                </Row>
                {this.state.isCal ? <Table columns={this.state.iterationColumns} dataSource={this.state.iterationData} size="middle" /> : null}
            </div>
        )
    }
}

export default CramerRule
