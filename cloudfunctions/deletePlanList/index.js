// 删除计划
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  // env:'book-5gutgylj4b76278c'
});
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('bookList').where({
    openid:event.userInfo.openid,
    planId:event.id
  }).update({
    data:{
      planId:''
    }
  });
  return await db.collection('planList').where({
    _id: event.id,
    openid: event.userInfo.openid
  }).remove();
}