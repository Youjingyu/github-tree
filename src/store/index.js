import {useStrict, observable, action, runInAction, autorun} from 'mobx';
import fetch from '../apis';

useStrict(true);

class TreeStore {
  @observable urlPath = '';
  @observable slideOut = true;
  @observable treeData = [];
  @observable codeSrc = '';

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
  @action	setCodeSrc(src) {
    this.codeSrc = src;
  }
  @action
  async getTreeData() {
    const treeData = await fetch.getTreeData();
    runInAction(()=>{
      this.treeData = this._parseData(treeData.tree);
    })
  }
  _parseData(data){
    // 将路径解析为用对象表示的树，用节点名作为key
    // 因为遍历对象不能保证顺序，因此用length、index属性模拟数组，
    // 最后使用_objToArr方法将模拟的数组转换为真数组
    const treeObj = {
      length: 0,
      index: 0
    };
    data.forEach((item) => {
      const pathArr = item.path.split('/');
      let delegateObj = treeObj
      // 遍历到到倒数第二个路径（最后一个路径单独处理）
      for(var i = 0; i < pathArr.length - 1; i++){
        if(!delegateObj[pathArr[i]]){
          // 如果节点不存在，为节点赋值
          delegateObj[pathArr[i]] = {
            length: 0,
            index: delegateObj.length // 当前节点在父节点中的索引
          };
          delegateObj.length ++; // 添加当前节点后，父节点长度需要加1
        }
        // 保存当前节点，循环递归
        delegateObj = delegateObj[pathArr[i]];
      }
      // 对于最后一个节点，判断是否还有子节点
      // 如果有子节点，则同上赋值
      // 如果没有子节点，说明到达终点，将内容保存到该节点
      if(item.type === 'tree' && !delegateObj[pathArr[i]]){
        delegateObj[pathArr[i]] = {
          length: 0,
          index: delegateObj.length
        };
        delegateObj.length ++;
      } else {
        delegateObj[pathArr[i]] = {
          index: delegateObj.length,
          item
        }
        delegateObj.length ++;
      }
    });
    return this._objToArr(treeObj);
  }
  _objToArr(obj){
    return objToArr(obj, []);
    // 将上述模拟出的数组转换为真数组
    function objToArr(obj, arr) {
      // 删除对象中的index、length属性，避免遍历到
      // 遍历到的key即为节点名
      delete obj.index;
      delete obj.length;
      let nodeObj, index;
      let fileArr = [], folderArr = [];
      for(let key in obj){
        // 保存节点的index，后续使用该index插入数组，达到按顺序遍历数组的目的
        index = obj[key].index;
        nodeObj = {
          name: key
        };
        // 如果是遍历到树的最底部，直接保存该节点
        if(obj[key].item || obj[key].length === 0){
          nodeObj.item = obj[key].item;
        } else {
          // 如果还没有到达树的底部，继续递归
          nodeObj.children = objToArr(obj[key], []);
        }
        // 按照索引插入数组
        if(obj[key].item){
          // 有item说明是文件
          fileArr[index] = nodeObj;
        } else {
          folderArr[index] = nodeObj;
        }
      }
      // 过滤数组中不存的项
      fileArr = fileArr.filter(filterArr);
      folderArr = folderArr.filter(filterArr);
      return folderArr.concat(fileArr);
    }
    function filterArr(currentValue) {
      return currentValue !== undefined;
    }
  }
}

export default new TreeStore();