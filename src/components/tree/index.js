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
        {this.props.treeData.map((node, i) => {
          console.log(node.name);
          return (<span>{node.name}</span>)
          // const type = node.type;
          // const label = <span className="node">{type}</span>;
          // return (
          //   <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={false}>
          //     {node.people.map(person => {
          //       const label2 = <span className="node">{person.name}</span>;
          //       return (
          //         <TreeView nodeLabel={label2} key={person.name} defaultCollapsed={false}>
          //           <div className="info">age: {person.age}</div>
          //           <div className="info">sex: {person.sex}</div>
          //           <div className="info">role: {person.role}</div>
          //         </TreeView>
          //       );
          //     })}
          //   </TreeView>
          // );
        })}
      </div>
    );
  }
}

export default Tree;