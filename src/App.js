import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './style/App.css';
import { Tree } from './components';
import treeStore from './store';

@observer
class App extends Component {
  constructor(){
    super();
    this.repo =
      window.location.search && window.decodeURIComponent(window.location.search.split('=')[1]);
    this.state = {
      repoPath: ''
    }
  }
  render() {
    if(this.repo){
      return (<Tree treeData={treeStore.treeData}/>)
    } else {
      return (
        <div>
          <input type="text" value={this.state.repoPath}
                 onChange={this.handleChange}
                 onKeyUp={this.inputEnter}/>
          <button onClick={this.setRepo}>确定</button>
        </div>
      )
    }
  }
  componentDidMount(){
    if(this.repo){
      treeStore.setUrlPath(this.repo);
      treeStore.getTreeData();
    }
  }
  handleChange = (e)=>{
    this.setState({
      repoPath: e.target.value
    });
  }
  inputEnter = (e)=>{
    if(e.key === 'Enter'){
      this.setRepo();
    }
  }
  setRepo = ()=>{
    window.location.search =
      'repo=' + window.encodeURIComponent(this.state.repoPath.replace('https://github.com', ''));
  }
}

export default App;
