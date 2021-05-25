import React from 'react'
import { Row, Col, Button, Input } from 'antd'
import apis from '../api/beam'
import MLR from "ml-regression-multivariate-linear";

class Multiregression extends React.Component{

    state = {
        n : 2 ,
        m : 3 ,
        x : [[null,null,null],[null,null,null]],
        y : [[null],[null]],
        xnew : [null,null,null],
        apiData : []
    }

    async getData(){
        let tempData = null
        await apis.getMultiLinear().then(res => {tempData = res.data})
        this.setState({apiData:tempData})
        this.setState({
            n: this.state.apiData["n"],
            m: this.state.apiData["m"],
            x: this.state.apiData["x"],
            y: this.state.apiData["y"],
            xnew: this.state.apiData["xnew"],
            
        })
    }

    onClickExample = e =>{
        this.getData()
    }


    x = () => {
        if(this.state.n < 6){
            this.state.x.push([])
            this.state.y.push(null)
            this.setState({
                n : this.state.n+1
            })
        }
    }

    y = () => {
        if(this.state.n > 2){
            this.state.x.pop()
            this.state.y.pop()
            this.setState({
                n : this.state.n-1
            })
        }
    }
    calculate = () =>{
        const mlr = new MLR(this.state.x,this.state.y)
        console.log(mlr.predict(this.state.xnew));
    }

    createMatrix(){
        let arrMatrix = []
        for(let i=0;i<this.state.n;i++){
            for(let j=0;j<3;j++){
                arrMatrix.push(<Input className='interpolation-input' name={i.toString()+'_'+j} placeholder={"X"+i.toString()+j} value={this.state.x[i][j]} autoComplete='off'/>)
            }
            arrMatrix.push(<Input className='interpolation-input' name={i.toString()} placeholder={"Y"+i.toString()} value={this.state.y[i]} autoComplete='off'/>)
            arrMatrix.push(<br />)
        }
        return arrMatrix
    }

    render(){
        return(
            <div>
                  Multiregression
                  <Row>
                        <Button onClick= {this.x}>Add</Button>
                        <Button onClick= {this.y}>Del</Button>
                  </Row> 
                  <Row>
                  <div className='matrixA-form'>
                        {this.createMatrix()}
                    </div> 
                  </Row>  
                  <Row>
                        <Button onClick= {this.onClickExample }>ตัวอย่าง</Button>
                        <Button onClick= {this.calculate}>คำนวณ</Button>
                  </Row>
            </div>
        )
    }
}

export default Multiregression 