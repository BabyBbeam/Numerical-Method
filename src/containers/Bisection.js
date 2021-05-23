import React, { Component } from 'react'
import { Col , Input, Button, Table } from 'antd'
import apis from '../api/index'
import { calBisection } from '../components/calculateNumer'
import './Content.css'

class Bisection extends Component {

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
        apiData : []
    }
  //เรียกfcalbiนำผลลัพธ์ที่ได้มาเก็บในiterเพื่อแสดงผลบนหน้าเว็บ
    onClickCalculate = e =>{
        try{
            this.setState({iterationData:calBisection(this.state.fx, this.state.xl, this.state.xr, this.state.error)})
            this.setState({isCal:true})
        }
        catch (err){
            console.log("error")
        }
    }
     //ดึงโจทย์
    async getData(){
        let tempData = null
        await apis.getAllRoe().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            fx: this.state.apiData[0]["equation"],
            xl : this.state.apiData[0]["xl"],
            xr : this.state.apiData[0]["xr"],
            error : this.state.apiData[0]["error"],
        })
    }

    onClickExample = e =>{
        this.getData()
    }

    onClickReset = e =>{
        this.setState({fx:"",xl:null,xr:null,error:null,isCal:false})
    }

    //ฟังก์ชั่นรับค่า FX จาก Input หน้าเว็บ
    OnChangeFx = e =>{
        this.setState({fx:e.target.value}) //Set ค่าที่รับมาจากช่อง Input ไปไว้ที่ state fx
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
            // แสดงหน้าเว็บ
            <div className='content'> 
                <h1>Bisection Method</h1>
                <div className='input-form' type='flex' align='middle'>
                    {/* <Col span={24}> */}
                    <span>f(x) :</span><Input className='input-form-fx' placeholder='Example | x^4-13' value={this.state.fx} onChange={this.OnChangeFx} />
                    {/* </Col> */}
                </div>
                <div style={{marginBottom:'10px',fontSize:'20px'}}>                    
                        xl :<Input style={{width:'100px'}} placeholder='1.5' value={this.state.xl} onChange={this.OnChangeXl} />
                        xr :<Input style={{width:'100px'}} placeholder='2.0' value={this.state.xr} onChange={this.OnChangeXr} />
                        error :<Input style={{width:'100px'}} placeholder='0.00001' value={this.state.error} onChange={this.onChangeErr} />
                </div>
                <div type='flex' align='middle' className='div-button'>
                    <Col span={24} className='col-button'>
                        <Button size='large' type='primary' className='reset-button' onClick={this.onClickReset}>Reset</Button>
                        <Button size='large' type='primary' className='cal-button' onClick={this.onClickCalculate}>คำนวณ</Button>
                        <Button size='large' type='primary' className='example-button' onClick={this.onClickExample}>ตัวอย่าง</Button>
                    </Col>
                </div>
                {this.state.isCal ? <Table columns={this.state.iterationColumns} dataSource={this.state.iterationData} size="middle" /> : null}
            </div>
        )
    }
}

export default Bisection
