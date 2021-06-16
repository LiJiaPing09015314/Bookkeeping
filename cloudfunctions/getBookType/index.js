// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  // env: 'test-gp4ml'
});
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  let openid = event._openid;
  return await db.collection('bookType').where({
    type:event.type,
    _openid: _.eq(openid)
  }).get();
}