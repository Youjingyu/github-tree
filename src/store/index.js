import {useStrict, observable, action, runInAction, autorun} from 'mobx';
import fetch from '../apis';

useStrict(true);

class TreeStore {
  @observable urlPath = '';
  @observable slideOut = true;
  @observable treeData = [];

  constructor(){
    autorun(()=>{
      fetch.setUrlPath(this.urlPath);
    })
  }
  @action	setUrlPath(urlPath) {
    this.urlPath = urlPath;
  }
  @action	toggleSlideOut() {
    this.slideOut = !this.slideOut;
  }
  @action
  async getTreeData() {
    const treeData = await fetch.getTreeData();
    runInAction(()=>{
      this.treeData = treeData;
    })
  }
}

export default new TreeStore();