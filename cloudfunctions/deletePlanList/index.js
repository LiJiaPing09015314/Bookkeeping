// 删除计划
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  // env: 'test-gp4ml'
});
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('bookList').where({
    _openid:event._openid,
    planId:event.id
  }).update({
    data:{
      planId:''
    }
  });
  return await db.collection('planList').where({
    _id: event.id,
    _openid: event._openid
  }).remove();
}