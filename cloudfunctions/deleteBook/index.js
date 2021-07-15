// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  // env:'book-5gutgylj4b76278c'
});
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('bookList').where({
    _id:event.id
  }).remove();
}