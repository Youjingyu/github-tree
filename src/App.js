import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './style/App.css';
import { Tree } from './components';
import treeStore from './store';

@observer
class App extends Component {
  constructor(){
    super();
    this.state = {
      treeData: []
    }
  }
  render() {
    return (<Tree treeData={treeStore.treeData}/>)
  }
  componentWillMount(){
    treeStore.setUrlPath('/Youjingyu/Code-Collection');
    treeStore.getTreeData();
  }
}

export default App;
