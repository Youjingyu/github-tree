import React, { Component } from 'react';
import {observer} from 'mobx-react';

@observer
class CodePreview extends Component{
    render(){
        return (
            <script src={this.props.codeSrc}></script>
        );
    }
}

export default CodePreview