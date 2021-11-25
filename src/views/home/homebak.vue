<template>
<!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <el-card class="box-card">
<div id="welcome">
  <el-row :gutter="10">
   

    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="24">
    <div class="grid-content bg-purple">
    <!-- <el-card class="box-card" style="margin-top:20px;padding:0px;"> -->
          
          <div class="Echarts">
            <div id="leftbox" class="leftbox fl"></div>
            <div id="middlebox" class="middlebox fl"></div>
            <div class="rightbox fl">
            <p style="width:100%;float:left;display:block"><el-button type="primary" icon="el-icon-video-play">开始采集</el-button></p>
          </div>
          </div>
        <!-- </el-card> -->
  </div>
    
  </el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="24">
    <div class="grid-content bg-purple">
      <div id="bottombox" class="bottombox"></div>
    <!-- <el-card class="box-card" style="margin-top:20px;padding:0px;"> -->
          <!-- <div id="introduce">
            <p style="width:100%">{{ introduceText }}</p>
          </div> -->
        <!-- </el-card> -->
  </div>
    
  </el-col>
<!--   
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col> -->
</el-row>
</div>
</el-card>

</template>

<script>
//import * as echarts from 'echarts';
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
//var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
export default {
  data() {
    return {
      introduceText:'',
      structure:{structure:this.GLOBAL.structure},
      percent:''
    };
  },
  props: {
      //颜色
      color: {
        type: String,
        default () {
          return 'red'
        }
      },
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
  name: 'Echarts',
  methods:{
    async getobjdescribe() {
      await this.$http.get(this.api.getviewinfo,{params:this.structure}).then(response => {
        // var jsonParseJson=JSON.parse(data);
				// 	$("#banner").empty();
			 	// 	$.each(jsonParseJson,function(idx,rows)
				//  	{   
				//  		if(rows.paratype == 1){
				//   			$("#banner").append("<p style = 'text-indent:2em;text-align: left;padding:0px 10px 0px 20px;'> "+rows.parainfo+"</p>");
				// 		}else if (rows.paratype == 2){
				// 			$("#banner").append("<p><div style='text-align:center'><img src='"+rows.parainfo+"' style='width:80%'></div></p>");
				// 		}else if (rows.paratype == 3){
				// 			$("#title").append(rows.parainfo);
				// 		}
        // 	});	
      //   <section id="header">
			// 	<header>
			// 		<h1 id="title"></h1>
			// 		<p>工程简介</p>
			// 	</header>
			// </section>
		
			// <section id="banner">
				
			// </section>
        console.log(response.body)
        this.introduceText = response.body
      });},
      async initRTEchartsData(){
        //alert('go')
            var avgTmp="";//温度数据
        	var avgHum="";//湿度数据
            var vls = ["YZCN-THM-G06-01"]
            var avgTmpDivs = [];
            var echartDivs;
    		var avgTmpSize = { "x" : 45, "x2" : 40,"y" : 40, "y2" : 30 };
    		var seriesTmp = [ '平均温度','最高温度','最低温度','最大温差' ];//定义平均值series数量与名称
    		for (var i in vls) {
    			var avgTmpEchart = this.initLineEcharts('ec', "avgTmp"+i, vls[i], seriesTmp, avgTmpSize, "N");
    		    avgTmpDivs.push(avgTmpEchart);
    		}
    		echartDivs = {'温度' : avgTmpDivs};
    		
    		var avgHumDivs = [];
    		var avgHumSize = { "x" : 45, "x2" : 40,"y" : 40, "y2" : 30 };
    		var seriesHum = [ '平均湿度','最大湿度' ];//定义平均值series数量与名称
    		for (i in vls) {
    			//var avgHumEchart = this.initLineEcharts('ec', "avgHum"+i, vls[i], seriesHum, avgHumSize, "N");
    			//avgHumDivs.push(avgHumEchart);
    		}
    		echartDivs['湿度'] = avgHumDivs;

       await this.$axios.get(this.api.getBasicSjfxInfo,{params:{type : 'THM', code : JSON.stringify({"names":["YZCN-THM-G06-01"],"codes":["YZCN-THM-G06-01"]}), timeType : '1', dateType : 'season', year : '2021', season : '1', month : '7',structure:this.GLOBAL.structure}}).then(response => {
         
          var objdata = JSON.parse(response);
           console.log(objdata)
          for(var c in objdata){
    				var dataInfo = objdata[c].data;
    				if(objdata[c].flag == "TMP"){
    					for(var v in avgTmpDivs){
        					var option = avgTmpDivs[v].getOption();
        					option.xAxis[0].name = objdata[c].xLabel;
                            option.yAxis[0].name = objdata[c].yLabel;
                            console.log(option)
        					for(var t in dataInfo){
          						//if(option.title.text.indexOf(dataInfo[t].sensorcode) != -1){
          							if(dataInfo[t].anltime.length>0){
            							option.xAxis[0].data=dataInfo[t].anltime;
        							}
        	            			if(dataInfo[t].avgval.length>0){
        	            				option.series[0].data=dataInfo[t].avgval;
        							}
        	            			if(dataInfo[t].maxval.length>0){
        	            				option.series[1].data=dataInfo[t].maxval;
        							}
        	            			if(dataInfo[t].minval.length>0){
        	            				option.series[2].data=dataInfo[t].minval;
        							}
        	            			if(dataInfo[t].maxdiff.length>0){
        	            				option.series[3].data=dataInfo[t].maxdiff;
        							}
          	        	        //}
          	        	    }
                            //avgTmpDivs[v].setOption(option,true);
                            avgTmpDivs[v].setOption(option);
                        }
                        }
                        }
    				// else if(objdata[c].flag == "HUM"){
    				// 	for(v in avgHumDivs){
        			// 		var option = avgHumDivs[v].getOption();
        			// 		option.xAxis[0].name = objdata[c].xLabel;
	            	// 		option.yAxis[0].name = objdata[c].yLabel;
	            	// 		for(t in dataInfo){
          			// 			if(option.title.text.indexOf(dataInfo[t].sensorcode)>-1){
          			// 				if(dataInfo[t].anltime.length>0){
            		// 					option.xAxis[0].data=dataInfo[t].anltime;
        			// 				}
        	        //     			if(dataInfo[t].avgval.length>0){
        	        //     				option.series[0].data=dataInfo[t].avgval;
        			// 				}
        	        //     			if(dataInfo[t].maxval.length>0){
        	        //     				option.series[1].data=dataInfo[t].maxval;
        			// 				}
          	        // 	        }
          	        // 	    }
	            	// 		avgHumDivs[v].setOption(option,true);
        			// 	}

    				// }
    			
			// for(t in paramRefresh){
			// 	if(div == paramRefresh[t].id){
			// 		paramRefresh[t].lastTime = objdata.Endtime;
			// 		paramRefreshFlag = t;
			// 	}
			// }
       // this.introduceText = response.body
      }).catch(err => {
            console.log(err + 'cuowu ')
        });
    },
	  myEcharts(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('leftbox'));

      // 指定图表的配置项和数据
     const  option = {
    legend: {
        top: 'top'
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: false},
            dataView: {show: false, readOnly: false},
            restore: {show: false},
            saveAsImage: {show: false}
        }
    },
     title: [{
               // text: data.timeline[0],
                textAlign: 'center',
                left: '63%',
                bottom: '0%',
                textStyle: {
                    fontSize: 100
                }
            }, {
                text: '传感器数量',
                left: 'center',
                bottom: 0,
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 20
                }
            }],
    series: [
        {
            name: '传感器数量',
            type: 'pie',
            radius: [50, 150],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius:8
            },
            emphasis: {
                      label: {
                          show: true,
                          fontSize: '20',
                          fontWeight: 'bold',
                          //color:'#000'
                      }
                  },
            data: [
                {value: 40, name: 'ACC'},
                {value: 38, name: 'FGT'},
                {value: 32, name: 'FSG'},
                {value: 30, name: 'DIS'},
                {value: 28, name: 'GPS'},
                {value: 22, name: 'THM'},
                {value: 18, name: 'SHH'}
            ]
        }
    ]
};
//       const option = {
//     tooltip: {
//         trigger: 'item'
//     },
//     legend: {
//         top: '5%',
//         left: 'center'
//     },
//     title: [{
//                // text: data.timeline[0],
//                 textAlign: 'center',
//                 left: '63%',
//                 bottom: '0%',
//                 textStyle: {
//                     fontSize: 100
//                 }
//             }, {
//                 text: '传感器数量',
//                 left: 'center',
//                 bottom: 0,
//                 textStyle: {
//                     fontWeight: 'bold',
//                     fontSize: 20
//                 }
//             }],
//     series: [
//         {
//             name: '传感器数量',
//             type: 'pie',
//             radius: ['60%', '70%'],
//             avoidLabelOverlap: false,
//             label: {
//                 show: false,
//                 position: 'center'
//             },
//             emphasis: {
//                 label: {
//                     show: true,
//                     fontSize: '24',
//                     fontWeight: 'bold'
//                 }
//             },
//             labelLine: {
//                 show: false
//             },
//             data: [
//                 {value: 12, name: 'ACC'},
//                 {value: 11, name: 'FSG'},
//                 {value: 3, name: 'FGT'},
//                 {value: 5, name: 'DIS'},
//                 {value: 1, name: 'GPS'}
//             ]
//         }
//     ]
// };
     


      //const chartObj = echarts.init(this.$refs.ringChart);
      //chartObj.setOption(option)
    
  
// 		 var option = {
//            title: {
//         text: '传感器实时监测统计',
//         //subtext: '虚构数据',
//         left: 'center'
//     },
//        color:['#67C23A','#E6A23C','#EF0E0E','#67C23A','#67C23A','#67C23A','#67C23A','#67C23A'],
//   legend: {
//     orient: "vertical",
//     left: "left",
//     data: ["ACC", "FGT", "FSG", "THM", "UAN", "INC", "CFS", "WLI"]
//   },
//   series: [{
//     type: "pie",
//     radius: ['40%', '55%'],
//     data: [{
//       value: 1,
//       name: "ACC"
//     }, {
//       value: 1,
//       name: "FGT"
//     }, {
//       value: 1,
//       name: "FSG"
//     }, {
//       value: 1,
//       name: "THM"
//     }, {
//       value: 1,
//       name: "UAN"
//     }
//     , {
//       value: 1,
//       name: "INC"
//     }
//     , {
//       value: 1,
//       name: "CFS"
//     }
//     , {
//       value: 1,
//       name: "WLI"
//     }],
//      label: {
//       fontWeight: "bolder",
//       fontSize: 20
//     },
//     itemStyle: {
//       color: null,
//       borderType: "solid",
//       borderWidth: 3,
//       borderColor: "#fff"
//     }
//   }]
// }


/*
window.onload = function() {
    setTimeout(startRotate, 500);
}
*/


		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
      },
      drawmid(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('middlebox'));
      
      // 指定图表的配置项和数据
       const option = {
          tooltip: {
              trigger: 'item'
          },
          legend: {
              top: '5%',
              left: 'center'
          },
          title: [{
               // text: data.timeline[0],
                textAlign: 'center',
                left: '63%',
                bottom: '0%',
                textStyle: {
                    fontSize: 100
                }
            }, {
                text: '传感器运行状态',
                left: 'center',
                bottom: 0,
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: 20
                }
            }],
          color:['#67C23A','#EF0E0E'],
          //formatter: '{b}:{c}' + '\n\r' + '({d}%)',
          series: [
              {
            //     name: '传感器数量',
            // type: 'pie',
            // radius: [50, 150],
            // center: ['50%', '50%'],
            // roseType: 'area',
            // itemStyle: {
            //     borderRadius:8
            // },
            // emphasis: {
            //           label: {
            //               show: true,
            //               fontSize: '20',
            //               fontWeight: 'bold',
            //               //color:'#000'
            //           }
            //       },
            // data: [
            //     {value: 40, name: 'ACC'},
            //     {value: 38, name: 'FGT'},
            //     {value: 32, name: 'FSG'},
            //     {value: 30, name: 'DIS'},
            //     {value: 28, name: 'GPS'},
            //     {value: 22, name: 'THM'},
            //     {value: 18, name: 'SHH'}
            // ]
                  name: '正常运行',
                  type: 'pie',
                  radius: ['60%', '70%'],
                  //avoidLabelOverlap: false,
                  //color:'#67C23A',
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '20',
                          fontWeight: 'bold',
                          color:'#bcbcbc'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value:20, name:'正常运行'},
                      {value:2, name: '非正常运行'},
                      
                  ]
              }
          ]
      };
  
		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
      },
      drawbot(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('bottombox'));
      
      // 指定图表的配置项和数据
      var data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];

       const option = {
    xAxis: {
        type: 'category',
        data: data
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
    }]
};
  
		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
		  }
  },
  mounted() {
    this.myEcharts();
    this.drawmid();
    this.drawbot();
    this.getobjdescribe();
  }
}
</script>

<style>
.fl{float: left;display: block;}
.leftbox{width: 40%;height:400px;}
.middlebox{width: 40%;height:400px;}
.rightbox{width: 20%;height:400px;}
.bottombox{width: 100%;height:400px;}
</style>
