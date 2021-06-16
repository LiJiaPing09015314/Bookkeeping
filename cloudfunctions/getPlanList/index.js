// 获取计划列表
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  // env: 'test-gp4ml'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  let openid = event._openId;
  let planList = await db.collection('planList').where({
    type: event.type,
    _openid: _.eq(openid)
  }).get();
  console.log(planList)
  for(let key in planList){
    let count = await db.collection('bookList').aggregate().match({
      amtType:event.type,
      _openid: openid,
      planId: planList[key]._id
    }).group({
      _id:null,
      count: $.sum('$bookAmt')
    }).end();
    planList[key].total = count.list.length?count.list[0].count:0;
  }
  return planList;
  // return await db.collection('planList').where({
  //   type: event.type,
  //   _openid: _.eq(openid)
  // }).get();
}