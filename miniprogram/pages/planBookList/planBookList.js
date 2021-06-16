let app = getApp();
Page({
  data: {
    planId:'',
    planAmt:0,
    total:0,
    plan:{},
    bookList:[]
  },
  onLoad: function (options) {
    if(options.pid){
      this.setData({
        planId:options.pid,
        plan:app.globalData.plan
      });
      this.initData();
    }
  },
  onShow: function () {
  },
  initData(){
    let _this = this;
    app.getAjax({
      url:'getPlanBookList',
      params:{
        planId:_this.data.planId
      },
      success(res){
        console.log("getPlanBookList:",res);
        _this.setData({
          bookList:res.result.data
        });
      }
    });
  }
})