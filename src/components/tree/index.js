import React, { Component } from 'react';
import {observer} from 'mobx-react';
import TreeView from '../../../node_modules/react-treeview/lib/react-treeview';
import './style.css'

@observer
class Tree extends Component{
  render() {
    return (
      <div className="tree-container">
        { this.renderTree(this.props.treeData) }
      </div>
    );
  }
  renderTree(data){
    return data.map((node, i)=>{
      if(node.children){
        return (
          <MyTreeView key={i} text={node.name}>
            { this.renderTree(node.children) }
          </MyTreeView>
        )
      } else {
        return (<div key={i} className="tree-view_item node file">{node.name}</div>)
      }
    });

  }
}

class MyTreeView extends Component {
  constructor(){
    super();
    this.state = {
      collapsed: true
    }
  }
  render(){
    const label = (<span className="node" onClick={this.click}>{this.props.text}</span>);
    return (
      <TreeView nodeLabel={label} collapsed={this.state.collapsed} onClick={this.click}>
        { this.props.children }
      </TreeView>
    )
  }
  click = ()=>{
    this.setState((prevState)=>({
      collapsed: !prevState.collapsed
    }));
  }
}

export default Tree;