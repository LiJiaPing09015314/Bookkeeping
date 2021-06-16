let app = getApp();
Page({
  data: {
    footerIndex: 3,
    menus:[]
  },
  onLoad: function (options) {
    this.setMenus();
  },
  onShow: function () {

  },
  setMenus(){//初始化菜单 
    this.setData({
      menus:[
        {
          name:'计划',
          icon:'icon_178',
          path:'planList'
        }
      ]
    });
  },
  menuClick(e){//点击菜单选项
    let idx = e.currentTarget.dataset.idx;
    let path = this.data.menus[idx].path;
    app.navigate(`/pages/${path}/${path}`);
  },
  changeFooter(e) {
    app.changeFooter(e);
  },
})