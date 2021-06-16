let app = getApp();
Page({
  data: {
    id:'',//类型id
    footerIndex: 1,
    amtType:'0',//0支出，1收入
    amtTypeArr:['支出','收入'],
    dateType:1,//时间范围1月，2年
    dateTypeIdx:0,//选中的月或年的idx
    chartList:[],
    chartListCount:0,
    yearArr: ['2019','2018'],
    monthArr: [12,11,10,9,8,7,6,5,4,3,2,1],
    year:'',
    beginMonth:'',
    endMonth:''
  },
  onLoad: function (options) {
    if(options.id){
      this.setData({
        amtType:options.type,
        id:options.id,
        year:options.year,
        beginMonth:options.mon1,
        endMonth:options.mon2
      });
      this.getChartDetail();
    }else{
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      this.setData({
        year:year,
        beginMonth:month,
        endMonth:month,
        monthArr:this.data.monthArr.slice(12-month),
        dateTypeIdx:0
      });
      this.initData();
    }
  },
  onShow: function () {
  },
  initData(){
    let _this = this;
    let data = this.data;
    this.setData({
      chartList:[]
    });
    app.getAjax({
      url:'getChartData',
      params:{
        amtType:data.amtType,
        year: data.year-0,
        beginMonth: data.beginMonth,
        endMonth:data.endMonth
      },
      success(res){
        console.log("getChartData:",res);
        let data = res.result.list;
        let count = 0;
        for(var key in data){
          data[key].count = parseInt(data[key].count*100)/100;
          count += data[key].count;
        }
        _this.setData({
          chartList:data,
          chartListCount:count
        });
      }
    });
  },
  getChartDetail(){
    let _this = this;
    let data = this.data;
    app.getAjax({
      url:'getChartDetailData',
      params:{
        id:data.id,
        year:data.year,
        beginMonth:data.beginMonth,
        endMonth:data.endMonth
      },
      success(res){
        console.log("getChartDetailData:",res);
        let data = res.result.data;
        let count = 0;
        for(var key in data){
          count += data[key].bookAmt
        }
        _this.setData({
          chartList: data,
          chartListCount: count
        });
      }
    });
  },
  cliDateRange(e){
    let idx = e.currentTarget.dataset.idx;
    let dateType = this.data.dateType;
    let year,beginMonth,endMonth;
    if(dateType == 1){//月
      this.setData({
        year:new Date().getFullYear(),
        beginMonth:this.data.monthArr[idx],
        endMonth:this.data.monthArr[idx],
        dateTypeIdx:idx
      });
      this.initData();
    }else{//年
      this.setData({
        dateTypeIdx:idx,
        year:this.data.yearArr[idx],
        beginMonth:1,
        endMonth:12
      });
      this.initData();
    }
  },
  toChartDetail(e){
    let id = e.currentTarget.dataset.id;
    let data = this.data;
    app.navigate(`/pages/chart/chart?id=${id}&year=${data.year}&mon1=${data.beginMonth}&mon2=${data.endMonth}&type=${data.amtType}`);
  },
  amtTypeChange(e){//选择账单类型
    if(e.detail.value != this.data.amtType){
      this.setData({
        amtType:e.detail.value
      });
      if(this.data.id){
        this.getChartDetail();
      }else{
        this.initData();
      }
    }
  },
  setDateType(e){//选择日期范围
    let type = e.currentTarget.dataset.type;
    if(type != this.data.dateType){
      let year,beginMonth,endMonth;
      let setDatas = {};
      if(type == 1){
        let date = new Date();
        setDatas.year = date.getFullYear();
        setDatas.beginMonth = date.getMonth()+1;
        setDatas.endMonth = date.getMonth()+1;
        setDatas.monthArr = [12,11,10,9,8,7,6,5,4,3,2,1].slice(12-date.getMonth()+1);
        setDatas.dateTypeIdx = 0;
      }else{
        setDatas.year = new Date().getFullYear();
        setDatas.beginMonth = 1;
        setDatas.endMonth = 12;
        setDatas.dateTypeIdx = 0;
      }
      setDatas.dateType = type;
      this.setData(setDatas);
      this.initData();
    }
  },
  changeFooter(e) {
    app.changeFooter(e);
  }
})