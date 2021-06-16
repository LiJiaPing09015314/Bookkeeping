let app = getApp();
Page({
  data: {
    id:'',
    bookDetail:null
  },
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id
      });
    }
  },
  onShow: function () {
    this.initData();
  },
  initData(){
    let _this = this;
    app.getAjax({
      url:'getBookDetail',
      params:{
        id:_this.data.id
      },
      success(res){
        console.log("bookDetail:",res);
        _this.setData({
          bookDetail:res.result.data&&res.result.data.length?res.result.data[0]:{}
        });
      },
      fail(){
        app.showModal('请求失败!');
      }
    });
  },
  toEdit(){
    app.navigate(`/pages/addBook/addBook?id=${this.data.id}&tab=${this.data.bookDetail.amtType}`);
  },
  toDelete(){
    let _this = this;
    app.showModal('确认删除',()=>{
      app.getAjax({
        url:'deleteBook',
        params:{
          id:_this.data.id
        },
        success(){
          app.showModal('删除成功!',()=>{
            wx.navigateBack();
          });
        }
      })
    },()=>{});
  },
  onShareAppMessage: function () {
  }
})