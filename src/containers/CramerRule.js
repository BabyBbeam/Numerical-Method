import React, { Component } from 'react'
import { Row, Col, Button, Table, Modal } from 'antd'
import { calOnePoint } from '../components/calculateNumer'
import {MatrixInputA, MatrixInputB} from '../components/MatrixInput'
import './Content.css'

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
        let resetArrA = [[null,null],[null,null]]
        let resetArrB = [null,null]
        this.setState({
            matrixA : resetArrA,
            matrixB : resetArrB,
            n : 2
        })
    }

    OnChangeMatrixA = e =>{
        let changedArr = this.state.matrixA
        let index = e.target.name.split('_')
        changedArr[parseInt(index[1])][parseInt(index[2])] = e.target.value
        console.log(e.target.value)
        this.setState({matrixA:changedArr})
    }

    OnChangeMatrixB = e =>{
        let changedArr = this.state.matrixB
        let index = e.target.name.split('_')
        changedArr[parseInt(index[1])]= e.target.value
        console.log(e.target.value)
        this.setState({matrixB:changedArr})
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
                <Row className='add-del-row'>
                    <Button onClick={this.onClickAdd}>Add</Button>
                    <span className='n-text'>{this.state.n} x {this.state.n}</span>
                    <Button onClick={this.onClickDel}>Del</Button>
                </Row>
                <Row>
                    <MatrixInputA n={this.state.n} onChange={this.OnChangeMatrixA} value={this.state.matrixA}/>
                    <MatrixInputB n={this.state.n} onChange={this.OnChangeMatrixB} value={this.state.matrixB}/> 
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
