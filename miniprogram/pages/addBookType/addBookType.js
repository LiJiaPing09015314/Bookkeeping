let app = getApp();
import {iconList} from '../../utils/js/iconList.js';
Page({
  data: {
    pageType:'0',//页面类型,0账单,1计划
    type:'0',//0支出，1收入
    iconList:iconList,//图标列表
    indexX:0,
    indexY:0,
    typeText:'',
    planAmt:''
  },
  onLoad: function (options) {
    this.setData({
      type:options.type?options.type:'0',
      pageType:options.ptype?options.ptype:'0'
    });
    let title = `添加${options.type == 1 ? '收入' : '支出'}${this.data.pageType == 0 ?'类别':'计划'}`;
    wx.setNavigationBarTitle({
      title: title,
    });
  },
  selectIcon(e){//选择icon
    let data = e.currentTarget.dataset;
    let setDatas = {};
    if(data.idx != this.data.indexX){
      setDatas.indexX = data.idx;
    }
    if (data.idy != this.data.indexY) {
      setDatas.indexY = data.idy;
    }
    this.setData(setDatas);
  }, 
  setType(e){//设置类别名称
    let text = e.detail.value;
    if(text.length <= 6){
      this.setData({
        typeText:text
      });
    }
  },
  setPlanAmt(e) {//设置计划金额
    this.setData({
      planAmt:e.detail.value
    });
  },
  addType(e){//提交新增的类别
    let typeText = this.data.typeText,
        planAmt = this.data.planAmt,
        pageType = this.data.pageType;
    if(!this.data.typeText){
      app.showModal('请输入类别名称!');
      return;
    }
    if(!typeText.length>6){//判断字数
      app.showModal(`${pageType == 0?'类别':'计划'}名称不得超过6个字!`);
      return;
    }
    if(pageType == 1 && planAmt == 0){//若添加计划,计划金额不得为0
      app.showModal('请输入计划金额!');return;
    }
    let data = this.data;
    let params = {
      icon: data.iconList[data.indexX].icons[data.indexY],
      name: data.typeText,
      type: data.type
    };
    if (pageType == 1){
      params.planAmt = planAmt;
    }
    app.getAjax({
      url:pageType==0?'addBookType':'addPlanList',
      params: params,
      success(res){
        console.log("addBookType:",res);
        app.showModal('添加成功!',()=>{
          wx.navigateBack();
        });
      }
    });
  }
})