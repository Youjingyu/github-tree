import React, { Component } from 'react';
import TreeView from '../node_modules/react-treeview/lib/react-treeview';
import '../node_modules/react-treeview/react-treeview.css';
import './style/App.css';

const dataSource = [
  {
    type: 'Employees',
    collapsed: false,
    people: [
      {name: 'Paul Gordon', age: 29, sex: 'male', role: 'coder', collapsed: false},
      {name: 'Sarah Lee', age: 27, sex: 'female', role: 'ocamler', collapsed: false},
    ],
  },
  {
    type: 'CEO',
    collapsed: false,
    people: [
      {name: 'Drew Anderson', age: 39, sex: 'male', role: 'boss', collapsed: false},
    ],
  },
];

class App extends Component {
  render() {
    return (
      <div>
        {dataSource.map((node, i) => {
          const type = node.type;
          const label = <span className="node">{type}</span>;
          return (
            <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={false}>
              {node.people.map(person => {
                const label2 = <span className="node">{person.name}</span>;
                return (
                  <TreeView nodeLabel={label2} key={person.name} defaultCollapsed={false}>
                    <div className="info">age: {person.age}</div>
                    <div className="info">sex: {person.sex}</div>
                    <div className="info">role: {person.role}</div>
                  </TreeView>
                );
              })}
            </TreeView>
          );
        })}
      </div>
    );
  }
}

export default App;
