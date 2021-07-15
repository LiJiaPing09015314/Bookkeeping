// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  // env:'book-5gutgylj4b76278c'
});
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // return await event;
  try {
    let data = event;
    data.openid = event.userInfo.openId;
    delete event.userInfo;
    let date = new Date(new Date().getTime() + 28800000);
    let crtTs = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    event.crtTs = crtTs;
    event.updTs = crtTs;
    return await db.collection('bookList').add({
      data: data
    });
  } catch (e) {
    console.error(e)
  }
}