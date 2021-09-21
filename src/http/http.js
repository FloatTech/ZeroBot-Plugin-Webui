import axios from "axios";

export default {

    get(url,headers={},params={}){
        return axios.get(url,{headers:headers,params:params})
    },

    post(url,data,headers={}){
        return axios.post(url,data,{headers:headers})
    },

    uploader(url, file, auth = false) {
        let param = new FormData();
        param.append('file', file)
        if (auth) {
            return axios.post(url, param, {headers: {Authorization: 'Your back-end user authenticates information'}})
        } else {
            return axios.post(url, param)
        }
    },


}