import React, { Component } from 'react'
import { Row, Col, Button, Table } from 'antd'
import { calLUDecomposition, cloneArray } from '../components/calculateNumer'
import {MatrixInputA, MatrixInputB} from '../components/MatrixInput'
import ModalPopup from '../components/ModalPopup'
import apis from '../api/index'
import './Content.css'

class LUDecomposition extends Component {

    state = {
        n: 2,
        matrixA : [[],[]],
        matrixB : [],
        isCal : false,
        iterationColumns : [
            {
                title: 'X',
                dataIndex: 'x'
            },
            {
                title: 'Value',
                dataIndex: 'value'
            }
        ],
        iterationData : [],
        isModalVisible : false,
        apiData : [],
        hasData : false,
    }

    onClickCalculate = e =>{
        try{
            this.setState({iterationData:calLUDecomposition(this.state.n, this.state.matrixA, this.state.matrixB)})
            this.setState({isCal:true})
        }
        catch (err){
            console.log("error")
        }
    }

    async getData(){
        let tempData = null
        await apis.getAllMatrix().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            n: this.state.apiData[0]["n"],
            matrixA : cloneArray(this.state.apiData[0]["matrixA"]),
            matrixB : [...this.state.apiData[0]["matrixB"]]
        })
    }

    onClickExample = e =>{
        this.getData()
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
            this.state.matrixA.map(x => x.push(null))
            this.state.matrixB.push(null)
            this.setState({n:this.state.n+1})
        } 
    }

    onClickDel = e =>{
        if(this.state.n > 2){
            this.state.matrixA.pop()
            this.state.matrixA.map(x => x.pop())
            this.state.matrixB.pop()
            this.setState({n:this.state.n-1})
        } 
    }

    render() {
        return (
            <div className='content'>
                <h1>LU Decomposition Method</h1>
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

export default LUDecomposition