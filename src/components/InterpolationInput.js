import React from 'react'
import { Input } from 'antd'
import './MatrixInput.css'

class InterpolationInput extends React.Component{

    createMatrix(){
        let arrMatrix = []
        for(let i=0;i<this.props.n;i++){
            for(let j=0;j<2;j++){
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
                    Coordinate X Y
                </div>
                <div>
                    {this.createMatrix()}
                </div>  
            </div>
        )
    }
}

export {InterpolationInput}