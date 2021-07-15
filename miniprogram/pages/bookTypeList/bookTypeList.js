const app = getApp();
Page({
  data: {
    amtType:'0',//0支出，1收入
    bookTypeList:[],//类型列表
    deleteBtnIdx:-1,//显示删除按钮的索引
  },
  onLoad: function (options) {
    if(options.type){
      this.setData({
        amtType:options.type
      });
    }
  },
  onShow(){
    this.getBookList();
    
  },
  getBookList(){//获取类型列表
    let _this = this;
    app.getAjax({
      url:'getBookType',
      params:{
        type:_this.data.amtType
      },
      success(res){
        console.log("getBookType:", res);
        _this.setData({
          bookTypeList:res.result.data
        });
      }
    });
  },
  showDeleteBtn(e){//显示删除按钮
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      deleteBtnIdx:idx
    });
  },
  hideDeleteBtn(){//隐藏删除按钮
    this.setData({
      deleteBtnIdx:-1
    });
  },
  deleteBookType(e){
    let idx = e.currentTarget.dataset.idx;
    let item = this.data.bookTypeList[idx],
        _this = this;
    if(item.user == ''){
      app.showModal('暂时无法删除公用类别!');return;
    }
    app.getAjax({
      url:'deleteBookType',
      params:{
        id:item._id
      },
      success(res){
        app.showModal('删除成功!',()=>{
          _this.getBookList();
        });
      },
      fail(res){
        console.log("deleteBookType:",res);
      }
    });
  },
  setAmtType(e){//选择收入支出
    this.setData({
      amtType:e.currentTarget.dataset.type
    });
    this.getBookList();
  },
  addBookType(){
    app.navigate(`/pages/addBookType/addBookType?type=${this.data.amtType}`);
  }
})