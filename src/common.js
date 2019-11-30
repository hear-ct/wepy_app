import wepy from 'wepy' ;
wepy.basicToast = function(title='请求失败',isok = false){
    wepy.showToast({
        title: title,
        icon : isok?'success':'none',
        duration: 2000
    })
}
const BASE_URL = 'https://www.zhengzhicheng.cn/api/public/v1'
wepy.get = (url,data) => req(url,data);
wepy.post = (url,data) => req(url,data,true);

function req(url,data = {},isPost = false){
    return wepy.request({
        url:BASE_URL + url
        ,data,
        method:isPost?'post':'get'
    })
}