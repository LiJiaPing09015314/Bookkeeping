let app = getApp();
Page({
  data: {
    footerIndex:0,
    selectYear:'',
    selectMonth:'',
    bookList:[],
    incomeAmt:'',
    payAmt:''
  },
  onLoad: function (options) {
  },
  onShow: function () {
    app.getAjax({
      url:'login',
      params:{},
      success:res=>{
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      }
    })
    let dateObj = app.getDateInfo();
    this.initData(dateObj.year, dateObj.month);
  },
  initData(year,month){//初始化
    let _this = this;
    app.getAjax({
      url:'getUserBookList',
      params:{
        bookYear:year-0,
        bookMonth:month-0
      },
      success(res){
        console.log("getUserBookList:",res);
        let sortedBookList = _this.sortBookList(res.result.data);
        _this.setData({
          bookList: sortedBookList.sortData,
          incomeAmt:sortedBookList.incomeAmt,
          payAmt:sortedBookList.payAmt,
          selectYear:year,
          selectMonth:month
        });
        console.log("bookList:",sortedBookList.sortData)
      }
    });
  },
  sortBookList(data){//格式化账单列表
    let dateArr = [],
        sortData = [],
        incomeAmt = 0,
        payAmt = 0;
    for(var key in data){
      let index = dateArr.indexOf(data[key].bookDate);
      let amtType = data[key].amtType;
      if (index == -1){
        dateArr.push(data[key].bookDate);
        sortData.push({
          date:data[key].bookDate,
          week: ['日', '一', '二', '三', '四', '五', '六'][data[key].week],
          incomeAmt: amtType == '0' ? 0 : data[key].bookAmt,
          payAmt: amtType == '0' ? data[key].bookAmt : 0,
          list:[data[key]]
        });
      }else{
        if(amtType == 0){
          sortData[index].payAmt = (sortData[index].payAmt * 100 + data[key].bookAmt * 100) / 100;
        }else{
          sortData[index].incomeAmt =  (sortData[index].incomeAmt*100 + data[key].bookAmt*100)/100;
        }
        sortData[index].list.push(data[key]);
      }
      if(amtType == 0){
        payAmt += data[key].bookAmt;
      } else {
        incomeAmt += data[key].bookAmt;
      }
    }
    return{
      sortData:sortData,
      incomeAmt: parseInt(incomeAmt*100)/100,
      payAmt: parseInt(payAmt * 100) / 100
    }
  },
  toBookDetail(e){//去账单详情页
    let id = e.currentTarget.dataset.id;
    app.navigate(`/pages/bookDetail/bookDetail?id=${id}`);
  },
  changeFooter(e){//点击底部按钮
    app.changeFooter(e);
  },
  selectDate(e){//选择日期
    console.log("selectDate:",e)
    let value = e.detail.value;
    value = value.split('-');
    this.initData(value[0], value[1]);
  }
})