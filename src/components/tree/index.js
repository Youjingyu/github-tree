import React, { Component } from 'react';
import {observer} from 'mobx-react';
import TreeView from '../../../node_modules/react-treeview/lib/react-treeview';
import '../../../node_modules/react-treeview/react-treeview.css';
import './style.less'

@observer
class Tree extends Component{
  render() {
    return (
      <div>
        { this.renderTree(this.props.treeData) }
      </div>
    );
  }
  renderTree(data){
    return data.map((node, i)=>{
      const label = (<span className="node">{node.name}</span>);
      if(node.children){
        return (<TreeView key={i} nodeLabel={label} defaultCollapsed={true}>
          { this.renderTree(node.children) }
        </TreeView>)
      } else {
        return (<TreeView key={i} nodeLabel={label} defaultCollapsed={true} />)
      }
    });

  }
}

export default Tree;