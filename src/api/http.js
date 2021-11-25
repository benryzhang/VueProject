import axios from 'axios';
import { Message } from 'element-ui';
import { showLoading, hideLoading } from '../assets/js/loading';

//axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

//let localhosts = 'http://39.100.239.145:8082';   //请求的后台域名
let localhosts = 'http://localhost:8086/bshm_edj';   //请求的后台域名
axios.interceptors.request.use(config => {//请求之前(可以设置token)
    showLoading();
    return config
},error =>{
    Message.error(error)
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {//数据拿到之后
    hideLoading();
    return response.data
},error => {
    Message.error('Http请求失败，请联系管理员');
    hideLoading();
    return Promise.reject(error.response);
});
function successfun(res){//处理后台返回的非200错误
    if(res.code === 200){
        return res
    }else{        
         Message.warning(res.message);
         return res;
    } 
}
function errorfun(res){
    if(res.code != 200){
        Message.error(res.message);
        return res;
    }
}
export default{
    post(url,data){//post请求
        return axios({
            method:'post',
            baseURL:localhosts,
            url,
            data: data,
            withCredentials: true,
            timeout:5000,//响应时间
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err);
        })
    },
    get(url,params){//get请求
        return axios({
            method:'get',
            baseURL:localhosts,
            url,
            params,
            withCredentials: true,
            timeout:5000,
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err)
        })
    }
    //(delete,put等请求同上)...
}