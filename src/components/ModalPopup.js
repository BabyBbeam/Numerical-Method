import React from 'react'
import { Button, Row, Col, Modal } from 'antd'

class ModalPopup extends React.Component {
    render() {
        return (
            <div>
                <Modal
                    title='ตัวอย่าง'
                    visible={this.props.visible} 
                    onOk={this.props.onOk}
                    onCancel={this.props.onOk}
                    footer={[
                        <Button type='primary' onClick={this.props.onOk}>
                            Ok
                        </Button>
                    ]}
                >
                    {this.props.hasData ? 
                        this.props.apiData.map((x,i) => (
                            <Row className='modal-popup'>
                                <Col span={12}>{x['equation']}</Col>
                                <Col span={12}>
                                    <Button name={'insert_'+i} type='primary' onClick={this.props.onClick}>Insert</Button>
                                </Col>
                                <hr/>
                            </Row>
                            )) 
                    : <span style={{fontSize:"20px", textAlign:"center"}}>Loading Data ...</span>}
                </Modal>
            </div>
        )
    }
}

export default ModalPopup
