// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser:true,
  // env:'book-5gutgylj4b76278c'
});
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  // return event;
  const params = {
    bookMonth:_.gte(event.beginMonth-0).and(_.lte(event.endMonth-0)),
    bookYear: event.year-0,
    bookTypeId:event.id
  };
  params.openid = event.userInfo.openId;
  // return params;
  return await db.collection('bookList').where(params)
  .orderBy('bookMonth', 'desc')
  .get();
}