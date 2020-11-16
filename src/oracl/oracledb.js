
console.log('ss');

 var oracledb = require("oracledb");
 var config = {
  user:'bshm_admin',　　//用户名
  password:'ZXKJ_sjhh_2019',　　//密码
  //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
 // connectString : "192.168.10.21:1521/bshm_sjhh"
  //connectString : "localhost:1521/bshm_sjhh"
  connectString : "192.168.10.21:1521/BSHMSJHH"
 };
 oracledb.getConnection(
   config,
   function(err, connection)
   {
     if (err) {
       console.error(err.message);
       return;
     }
     connection.execute("SELECT * from INFO_SENSOR_CHANNEL",
       function(err, result)
       {
         if (err) {
           console.error(err.message);
           doRelease(connection);
           return;
         }
         //打印返回的表结构
         //console.log(result.metaData);
         //打印返回的行数据
         console.log(result.rows);    
       });
   });
  
 function doRelease(connection)
 {
   connection.close(
     function(err) {
       if (err) {
         console.error(err.message);
       }
     });
 }
//const Oracledb = require('oracledb');
// var config = {
//   user:'bshm_admin',　　//用户名
//   password:'ZXKJ_sjhh_2019',　　//密码
//   //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
//   connectString : "localhost:8080/bshm_sjhh"
// };
// oracledb.getConnection(
//   config,
//   function(err, connection)
//   {
//     if (err) {
//       console.error(err.message);
//       return;
//     }
// 　　//查询某表十条数据测试，注意替换你的表名
//     connection.execute("SELECT * FROM ( SELECT A.*, ROWNUM RN FROM (SELECT * FROM INFO_SENSOR_BASE) A WHERE ROWNUM <= 10 ) WHERE RN >= 0",
//       function(err, result)
//       {
//         if (err) {
//           console.error(err.message);
//           doRelease(connection);
//           return;
//         }
//         //打印返回的表结构
//         console.log(result.metaData);
//         //打印返回的行数据
//         console.log(result.rows);
//       });
//   });

// function doRelease(connection)
// {
//   connection.close(
//     function(err) {
//       if (err) {
//         console.error(err.message);
//       }
//     });
// }


// var query = function(sql,callback){
//   alert('s');
//   oracledb.getConnection(
//       {
//           user          : "bshm_admin",
//           password      : "ZXKJ_sjhh_2019",
//           connectString : "localhost:8080/bshm_sjhh"
//       },
//       function (err, connection)
//       {
//           if (err)
//           {
//               console.error(err.message);
//               return;
//           }else{
//               console.log("连接成功");
//           }
//           connection.execute(sql, [], function (err, result)
//           {
//               if (err)
//               {
//                   console.error(err.message);
//                   doRelease(connection);
//                   return;
//               }
//               //console.log(result.metaData);
//               callback(result.rows.map((v)=>
//                   {
//                       return result.metaData.reduce((p, key, i)=>
//                       {
//                           p[key.name] = v[i];
//                           return p;
//                       }, {})
//                   }));
//               doRelease(connection);
//           });
//       }
//   );
// }

// function doRelease(connection) {
//   connection.close(
//       function(err) {
//           if (err)
//               console.error(err.message);
//       });
// }

// exports.query = query;

// var db = require('./db');
// db.query("SELECT count(*) count FROM X",function(result){
//     console.log("查询数量："+result[0].count)
// })

