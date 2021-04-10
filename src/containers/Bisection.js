import React, { Component } from 'react'
import { Row, Col , Input, Button, Table, Modal } from 'antd'
import axios from 'axios'
import apis from '../api/index'
import { calBisection } from '../components/calculateROE'
import './Content.css'

const Url = "https://raw.githubusercontent.com/BabyBbeam/Numerical-Method/main/db.json"

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
        isModalVisible : false,
        apiData : [{
            "id": 0,
            "equation": "x^4-13",
            "initial_x": "1",
            "xl": "1.5",
            "xr": "2.0",
            "error": "0.00001"
        },
        {
            "id": 1,
            "equation": "43x-1",
            "initial_x": "1",
            "xl": "0.2",
            "xr": "0.3",
            "error": "0.00001"
        },
        {
            "id": 2,
            "equation": "x/2 + 1/4",
            "initial_x": "0",
            "xl": "1.5",
            "xr": "2.0",
            "error": "0.00001"
        },
        {
            "id": 3,
            "equation": "x^2 - 7",
            "initial_x": "0",
            "xl": "2.0",
            "xr": "3.0",
            "error": "0.00001"
        }],
        hasData : false,
    }

    onClickCalculate = e =>{
        try{
            this.setState({iterationData:calBisection(this.state.fx, this.state.xl, this.state.xr, this.state.error)})
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
        console.log(tempData)
    }

    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        this.setState({isModalVisible:true})
    }

    onClickInsert = e =>{
        console.log(e.currentTarget.getAttribute('name'))
        let index = e.currentTarget.getAttribute('name').split('_')
        index = parseInt(index[1])
        this.setState({
            fx: this.state.apiData[index]["equation"],
            xl : this.state.apiData[index]["xl"],
            xr : this.state.apiData[index]["xr"],
            error : this.state.apiData[index]["error"],
            isModalVisible : false
        })
        console.log(this.state.apiData[index]["equation"])
        console.log(this.state.apiData[index]["xl"])
        console.log(this.state.apiData[index]["xr"])
        console.log(this.state.apiData[index]["error"])
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

    //  async componentDidMount(){
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
                    {this.state.hasData ? 
                        this.state.apiData.map((x,i) => (
                            <Row style={{marginBottom:'20px'}}>
                                <Col span={12}>{x['equation']}</Col>
                                <Col span={12}>
                                    <Button name={'insert_'+i} type='primary' onClick={this.onClickInsert}>Insert</Button>
                                </Col>
                            </Row>)) 
                    : null}
                </Modal>
                <h1>Bisection Method</h1>
                <Row className='input-form' type='flex' align='middle'>
                    <Col span={24}>
                        <span>f(x) :</span><Input className='input-form-fx' placeholder='Example | x^4-13' value={this.state.fx} onChange={this.OnChangeFx} />
                    </Col>
                </Row>
                <Row className='input-form' type='flex' align='middle'>
                    <Col span={8} className='col-input-xl'>
                        xl :<Input className='input-form-init' placeholder='1.5' value={this.state.xl} onChange={this.OnChangeXl} />
                    </Col>
                    <Col span={8}>
                        xr :<Input className='input-form-init' placeholder='2.0' value={this.state.xr} onChange={this.OnChangeXr} />
                    </Col>
                    <Col span={8} className='col-input-err'>
                        error :<Input className='input-form-err' placeholder='0.00001' value={this.state.error} onChange={this.onChangeErr} />
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

export default Bisection
