//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        // env: 'test-gp4ml'
        // env:'apgy-876ffd'
      })
      this.globalData = {}
    }
  },
  getAjax(opts){//请求接口
    wx.showLoading({
      title: '加载中',
      mask:true,
    });
    wx.cloud.callFunction({
      // 云函数名称
      name: opts.url,
      // 传给云函数的参数
      // data:opts.params?opts.params:{},
      data:{...opts.params,_openid:this.globalData.openid},
      success: function (res) {
        if(opts.success){
          opts.success(res);
        }
      },
      fail(res){
        console.log("error:",res);
      },
      complete(){
        let timer = setTimeout(()=>{
          wx.hideLoading()
          clearTimeout(timer);
        },200);
      }
    });
  },
  showModal(content,success,fail){//显示对话框
    wx.showModal({
      title: '提示',
      content: content,
      showCancel:fail?true:false,
      success(res) {
        if (res.confirm) {
          if(success){
            success();
          }
        } else if (res.cancel) {
          if(fail){
            fail();
          }
        }
      }
    });
  },
  navigate(url){//跳转
    wx.navigateTo({
      url: url,
    });
  },
  relaunch(url) {//跳转
    wx.reLaunch({
      url:url
    });
  },
  redirect(url) {//跳转
    wx.redirectTo({
      url: url,
    });
  },
  getDateInfo(dateStr){//获取日期的年月日星期，无dateStr默认获取今天的
    let date;
    if (dateStr){
      date = new Date(dateStr);
    }else{
      date = new Date();
    }
    return{
      year:date.getFullYear(),
      month:date.getMonth()+1,
      date:date.getDate(),
      week:date.getDay()
    }
  },
  changeFooter(e){//点击底部按钮
    let url = e.currentTarget.dataset.url;
    if(e.currentTarget.dataset.method){
      this.navigate(`/pages/${url}/${url}`);
    }else{
      this.relaunch(`/pages/${url}/${url}`);
    }
  },
  rpxToPx(rpx,windowWidth){
    return rpx / 750 * windowWidth;
  },
  pxToRpx(px,windowWidth){
    return px * 750 / windowWidth;
  },
  globalData:{
    plan:{}
  }
})
