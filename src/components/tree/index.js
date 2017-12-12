import React, { Component } from 'react';
import {observer} from 'mobx-react';
import TreeView from '../../../node_modules/react-treeview/lib/react-treeview';
import './style.css'

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
      const label = (<span className="folder">{node.name}</span>);
      if(node.children){
        return (<TreeView key={i} nodeLabel={label} defaultCollapsed={true}>
          { this.renderTree(node.children) }
        </TreeView>)
      } else {
        return (<div key={i} className="tree-view">{node.name}</div>)
      }
    });

  }
}

export default Tree;