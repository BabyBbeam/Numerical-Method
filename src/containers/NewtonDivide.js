import React, { Component } from 'react'
import { Row, Col, Button, Table } from 'antd'
import { calNewtonDivide, cloneArray } from '../components/calculateNumer'
import {InterpolationInput} from '../components/InterpolationInput'
import ModalPopup from '../components/ModalPopup'
import apis from '../api/index'
import './Content.css'

class NewtonDevide extends Component {

    state = {
        n: 2,
        matrix : [[],[]],
        selectedPoint : null,
        x : null,
        ans : null,
        isCal : false,
        isModalVisible : false,
        apiData : [],
        hasData : false,
    }

    onClickCalculate = e =>{
        try{
            let tmpMatrix = cloneArray(this.state.matrix)
            let tmpSelectedPoint = this.state.selectedPoint.split(",")
            tmpSelectedPoint = tmpSelectedPoint.map(x => (+x)-1)
            this.setState({ans:calNewtonDivide(tmpMatrix, +this.state.x, tmpSelectedPoint)})
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
        this.setState({hasData:true})
    }

    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        this.setState({isModalVisible:true})
    }

    onClickInsert = e =>{
        let index = e.currentTarget.getAttribute('name').split('_')
        index = parseInt(index[1])
        this.setState({
            n: this.state.apiData[index]["n"],
            matrix : cloneArray(this.state.apiData[index]["matrix"]),
            isModalVisible : false
        })
    }

    onClickOk = e =>{
        this.setState({isModalVisible:false})
    }

    onClickReset = e =>{
        let resetArrA = [[null,null],[null,null]]
        let resetArrB = [null,null]
        this.setState({
            matrix : resetArrA,
            matrixB : resetArrB,
            n : 2
        })
    }

    OnChangeMatrix = e =>{
        let changedArr = this.state.matrix
        let index = e.target.name.split('_')
        changedArr[parseInt(index[1])][parseInt(index[2])] = e.target.value
        console.log(e.target.value)
        this.setState({matrix:changedArr})
    }

    onClickAdd = e =>{
        if(this.state.n < 6){
            this.state.matrix.push([])
            this.setState({n:this.state.n+1})
        } 
    }

    onClickDel = e =>{
        if(this.state.n > 2){
            this.state.matrix.pop()
            this.setState({n:this.state.n-1})
        } 
    }

    render() {
        return (
            <div className='content'>
                <ModalPopup 
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    showQuestion = {false}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                />
                <h1>Newton's Divided Difference</h1>
                <Row className='add-del-row'>
                    <Button onClick={this.onClickAdd}>Add</Button>
                    <span className='n-text'>{this.state.n}</span>
                    <Button onClick={this.onClickDel}>Del</Button>
                </Row>
                <Row>
                    <InterpolationInput n={this.state.n} onChange={this.OnChangeMatrix} value={this.state.matrix}/>
                </Row>
                <Row type='flex' align='middle' className='row-button'>
                    <Col span={24} className='col-button'>
                        <Button size='large' type='primary' className='reset-button' onClick={this.onClickReset}>Reset</Button>
                        <Button size='large' type='primary' className='cal-button' onClick={this.onClickCalculate}>คำนวณ</Button>
                        <Button size='large' type='primary' className='example-button' onClick={this.onClickExample}>ตัวอย่าง</Button>
                    </Col>
                </Row>
                {this.state.isCal ? <div>f({this.state.x}) = {this.state.ans}</div> : null}
            </div>
        )
    }
}

export default NewtonDevide
