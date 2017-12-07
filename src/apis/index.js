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
  getTreeData() {
    return axios.get(this.baseUrl + '/contents');
  }
}

export default new fetch();