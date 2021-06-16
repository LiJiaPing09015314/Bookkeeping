// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  traceUser:true,
  // env:'test-gp4ml'
});
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  event._openid = event._openid;
  delete event.userInfo;
  return await db.collection('bookType').add({
    data:event
  })
}