import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { config } from './APIConfig'

class APIDoc extends React.Component{
    render(){
        return(
            <SwaggerUI spec={config} />
        )
    }
}

export default APIDoc