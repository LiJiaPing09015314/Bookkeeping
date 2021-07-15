// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  traceUser: true,
  // env:'book-5gutgylj4b76278c'
});
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const params = {
    bookMonth:event.bookMonth,
    bookYear:event.bookYear
  };
  params.openid = event.userInfo.openId;
  return await db.collection('bookList').where(params).orderBy('bookDate','desc').get();
}