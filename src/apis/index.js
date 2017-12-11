import axios from 'axios';

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

class fetch {
  constructor(){
    this.baseUrl = 'https://api.github.com/repos';
  }
  setUrlPath(path){
    this.baseUrl = this.baseUrl + path;
  }
  getTreeData(sha) {
    return axios.get(this.baseUrl + '/git/trees/' + sha + '?recursive=1');
  }
  // getRefs(branch) {
  //   return axios.get(this.baseUrl + '/git/refs/heads/' + branch);
  // }
  getBranches(){
    return axios.get(this.baseUrl + '/branches');
  }
}

export default new fetch();