import React, { Component } from 'react'
import { Row, Col, Button, Input } from 'antd'
import { calNewtonDivide, cloneArray } from '../components/calculateNumer'
import {InterpolationInput} from '../components/InterpolationInput'
import apis from '../api/index'
import './Content.css'

class Spline extends Component {

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
        await apis.getAllInterpolation().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            n: this.state.apiData[0]["n"],
            matrix : cloneArray(this.state.apiData[0]["matrix"]),
            selectedPoint : this.state.apiData[0]["selectedPoint"],
            x : this.state.apiData[0]["x"]
        })
    }

    onClickExample = e =>{
        this.getData()
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

    onChangeMatrix = e =>{
        let changedArr = this.state.matrix
        let index = e.target.name.split('_')
        changedArr[parseInt(index[1])][parseInt(index[2])] = e.target.value
        console.log(e.target.value)
        this.setState({matrix:changedArr})
    }

    onChangeSelectedPoint = e =>{
        this.setState({
            selectedPoint : e.target.value
        })
    }

    onChangeX = e =>{
        this.setState({
            x : e.target.value
        })
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
                <h1>Spline Interpolation</h1>
                <Row className='add-del-row'>
                    <Button onClick={this.onClickAdd}>Add</Button>
                    <span className='n-text'>{this.state.n}</span>
                    <Button onClick={this.onClickDel}>Del</Button>
                </Row>
                <Row>
                    <InterpolationInput n={this.state.n} onChange={this.onChangeMatrix} value={this.state.matrix}/>
                </Row>
                <Row>
                    ใช้จุดใดบ้าง <Input style={{width:'200px', marginLeft:'10px'}} onChange={this.onChangeSelectedPoint} value={this.state.selectedPoint} autoComplete="off" />
                </Row>
                <Row>
                    จุด x ที่ต้องการหาผลลัพธ์ <Input style={{width:'200px', marginLeft:'10px'}} onChange={this.onChangeX} value={this.state.x} autoComplete="off" />
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

export default Spline
