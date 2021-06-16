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
  let list = await db.collection('bookList')
    .where({
      _id: _.in((event.id).split(','))
    }).get();
  list = list.data;
  // return list;
  for(let key in list){
    await db.collection('bookList').where({
      _id:list[key]._id
    }).update({
      data:{
        crtTs: list[key].bookYear + '-' + (list[key].bookMonth + '').padStart(2,'0')+'-'+(list[key].bookDate+'').padStart(2,'0'),
        updTs: list[key].bookYear + '-' + (list[key].bookMonth + '').padStart(2, '0') + '-' + (list[key].bookDate + '').padStart(2, '0')
      }
    });
  }
}