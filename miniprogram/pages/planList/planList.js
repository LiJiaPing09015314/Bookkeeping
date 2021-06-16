let app = getApp();
Page({
  data: {
    amtType: '0',//0支出，1收入
    planList: [],//计划列表
    deleteBtnIdx: -1,//显示删除按钮的索引
  },
  onLoad: function (options) {
  },
  onShow: function () {
    this.getPlanList();
  },
  getPlanList(){//获取计划列表
    let _this = this;
    app.getAjax({
      url: 'getPlanList',
      params: {
        type: _this.data.amtType
      },
      success(res) {
        console.log("getPlanList:", res);
        let planList = res.result;
        for(var key in planList){
          planList[key].diffAmt = planList[key].planAmt - planList[key].total;
          planList[key].showInfo = false;
        }
        _this.setData({
          planList: planList
        });
      }
    });
  },
  setAmtType(e) {//选择收入支出
    this.setData({
      amtType: e.currentTarget.dataset.type
    });
    this.getPlanList();
  },
  addPlanType(){//添加计划
    app.navigate(`/pages/addBookType/addBookType?type=${this.data.amtType}&ptype=1`);
  },
  showDeleteBtn(e) {//显示删除按钮
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      deleteBtnIdx: idx
    });
  },
  hideDeleteBtn() {//隐藏删除按钮
    this.setData({
      deleteBtnIdx: -1
    });
  },
  deletePlanList(e) {//删除计划
    let idx = e.currentTarget.dataset.idx;
    let item = this.data.planList[idx],
      _this = this;
    app.showModal('确认删除?',()=>{
      app.getAjax({
        url: 'deletePlanList',
        params: {
          id: item._id
        },
        success(res) {
          app.showModal('删除成功!', () => {
            _this.setData({
              deleteBtnIdx:-1
            });
            _this.getPlanList();
          });
        },
        fail(res) {
          console.log("deletePlanList:", res);
        }
      });
    },()=>{
      _this.setData({
        deleteBtnIdx: -1
      });
    });
  },
  showPlanInfo(e){//显示计划进度
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      [`planList[${idx}].showInfo`]:!this.data.planList[idx].showInfo
    });
  },
  toPlanDetail(e){//到计划详情页
    let idx = e.currentTarget.dataset.idx;
    let plan = this.data.planList[idx];
    if(plan.total == 0){
      return;
    }
    app.globalData.plan = plan;
    app.navigate(`/pages/planBookList/planBookList?pid=${plan._id}`);
  }
})