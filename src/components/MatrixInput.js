import React from 'react'
import { Input } from 'antd'
import './MatrixInput.css'

class MatrixInputA extends React.Component{

    createMatrix(){
        let arrMatrix = []
        for(let i=0;i<this.props.n;i++){
            for(let j=0;j<this.props.n;j++){
                arrMatrix.push(<Input className='matrix-input' name={'inputA_'+i.toString()+'_'+j} placeholder={i.toString()+j} onChange={this.props.onChange} value={this.props.value[i][j]} autoComplete='off'/>)
            }
            arrMatrix.push(<div></div>)
        }
        return arrMatrix
    }

    render(){
        return(
            <div className='matrixA-form'>
                <div style={{marginBottom:'10px', fontSize:'1.25em'}}>
                    Matrix A
                </div>
                <div>
                    {this.createMatrix()}
                </div>  
            </div>
        )
    }
}

class MatrixInputB extends React.Component{

    createMatrix(){
        let arrMatrix = []
        for(let i=0;i<this.props.n;i++){
            arrMatrix.push(<Input className='matrix-input' name={'inputB_'+i} placeholder={i.toString()} onChange={this.props.onChange} value={this.props.value[i]} autoComplete='off'/>)
            arrMatrix.push(<div></div>)
        }
        return arrMatrix
    }

    render(){
        return(
            <div>
                <div style={{marginBottom:'10px', fontSize:'1.25em'}}>
                    Matrix B
                </div>
                <div>
                    {this.createMatrix()}
                </div>  
            </div>
        )
    }
}

export {MatrixInputA, MatrixInputB}