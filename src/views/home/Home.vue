<template>
<!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <el-card class="box-card">
      <div id="welcome">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple-bdark">
              <div class="Echarts">
                <div id="leftbox" class="leftbox fl"></div>
                
                  <!-- <div class="rightbox fl">
                  <p style="width:100%;float:left;display:block"><el-button type="primary" icon="el-icon-video-play">开始采集</el-button></p> -->
                <!-- </div> -->
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-bdark bmap">
              <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
              </baidu-map>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-bdark bmap">
              <div class="Echarts">
                <div id="topbox" class="topbox fl">
                  <!-- <div v-for="(item,index) in sensortypelist" :id="item.sensortypecode" class="resize-drag" @click="objclick"></div> -->
                </div>
                <div id="downbox" class="downbox fl">
                  <el-button type="primary" icon="el-icon-video-play">开始采集</el-button>
                </div>
                <!-- <div id="middlebox" class="middlebox fl"></div> -->
                  <!-- <div class="rightbox fl">
                  <p style="width:100%;float:left;display:block"><el-button type="primary" icon="el-icon-video-play">开始采集</el-button></p> -->
                <!-- </div> -->
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="6"><div class="grid-content bg-purple-bdark"><span>传感器总数：<label>126</label>个</span></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-bdark"><span>预警统计：<label>123</label>条</span></div></el-col> -->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple-bdark">
            <div class="Echarts">
               
                <div id="middlebox" class="middlebox fl"></div>
                  <!-- <div class="rightbox fl">
                  <p style="width:100%;float:left;display:block"><el-button type="primary" icon="el-icon-video-play">开始采集</el-button></p> -->
                <!-- </div> -->
              </div>
            </div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-bdark">
            
            <div id="bottombox" class="bottombox fl"></div>
            </div></el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
            <p>湖南永州市城南大桥工程位于城南大道与金水路平交口，跨湘江西路和湘江东路，顺接城南大道，止于城南大道与空巷路平交口。城南大桥是横跨湘江联接永州市一市两区（冷水滩区和零陵区）的重要通道，建成后将缓解城区东西向越江交通压力，完善永州市区城市路网，改善市民出行条件，打造中心城市地标式建筑。</p>
          <p>城南大桥主线全长1183.56m，桥跨布置为8×40+70+2×120+70+40+2×41.5+40+29+2×29.5+29+2×13.5+2×17.5+2×13.5+4×25m。主桥结构为矮塔斜拉桥，主桥长380m，桥宽34m，主塔高21m，孔跨布置为70+2×120+70m，西岸引桥长325.43m，东岸引桥长478.13m，南北两侧匝道桥长381.1m。

跨湘江主桥为（70+2×120+70）m 三塔单索面预应力混凝土矮塔斜拉桥，边中跨比值为0.583，其中10#塔梁墩固结，9#、11#塔梁固结，墩梁分离，设滑动支座，8#、12#墩设滑动支座。</p>
<p>永州市城南大桥桥位区气候条件复杂，存在温差大、风速高、降雨量丰富、地震烈度大等特点，极端情况下的结构受力状态可能会超出设计工况，钢结构腐蚀、混凝土碳化等材料因素需要考虑。桥梁在其服役期间不可避免地会遭受长期环境侵蚀、地震、风、暴雨、洪水等自然灾害，严重威胁沿线运行安全。</p>
          <p>城南大桥作为未来横跨湘江联接永州市一市两区的交通要道，交通流量大，超载现象多发，对桥梁的疲劳寿命影响很大，是桥梁管理、养护的重点关注方面；城南大桥为全线的控制性节点，是生命线工程，其结构安全对于整条线路的畅通十分重要。</p>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
        </el-row> -->
       
      </div>
    </el-card>

</template>


<script>
//import * as echarts from 'echarts';
import * as echarts from 'echarts';
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

// 基于准备好的dom，初始化echarts实例
//var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
export default {
  data() {
    return {
      introduceText:'',
      structure:{structure:this.GLOBAL.structure},
      percent:'',
      center: {lng: 0, lat: 0},
      zoom: 3,
      sensortypelist: [],
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
    handler ({BMap, map}) {
                //console.log(BMap, map)
                this.center.lng = 110.768412
                this.center.lat = 30.96115
                this.zoom = 12
                //map.setMapStyleV2({styleId:'f3ac6c7453a08d04617e66a2d8a7bad9'});
                //map.addControl(new BMap.NavigationControl());    
                //map.addControl(new BMap.ScaleControl());    
                //map.addControl(new BMap.OverviewMapControl());    
                //map.addControl(new BMap.MapTypeControl());   
                //map.addControl(new BMap.ZoomControl());   
                // var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
                // map.addControl(zoomCtrl);
                map.enableScrollWheelZoom(true);  //启用滚轮放大缩小，默认禁用
                var point = new BMap.Point(110.768412, 30.96115);    
                map.centerAndZoom(point, 15);   
  
                var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker);       
            },
    async getobjdescribe() {
      await this.$http.get(this.api.getviewinfo,{params:this.structure}).then(response => {
  
				
			// </section>
        console.log(response.body)
        this.introduceText = response.body
      });},
      async getMapWarnInfo() {
        await this.$axios.get(this.api.getMapWarnInfo,{params:{type:"",warnTime:"1",structure:this.GLOBAL.structure}}).then(response => {
          //const sensortype = JSON.parse(response)
          this.sensortypelist = JSON.parse(response)
          this.sensortypelist.forEach((v, i) => {
              console.log(v, i)
              console.log(v.sensortypecode)
              const div = document.createElement('div');
              var currentDiv = document.getElementById("topbox");
              currentDiv.appendChild(div);
              // this.floorNumber ++;
              // var div = document.createElement("div");
              // div.id ="div"+this.floorNumber;
              // div.setAttribute("class", "resize-drag");
              // div.style.cssText="width:80px;height:50px;border:1px solid #000;";
          })
        });
      },
    async getMapWarnType() {
      await this.$axios.get(this.api.getMapWarnType,{params:this.GLOBAL.structure}).then(response => {
        //const sensortype = JSON.parse(response)
        this.sensortypelist = response
      });
    },
    
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
    this.getMapWarnInfo();
    this.getMapWarnType();
  }
}
</script>

<style lang="less">
// .Echarts{display: inline-block;}
//.fl{float: left;display: block;}
.leftbox{width: 100%;height:460px;}
.middlebox{width: 100%;height:320px;}
.rightbox{width: 20%;height:400px;}
.bottombox{width: 100%;height:320px;}
.topbox{width: 100%;height:260px;}

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #856d72;
  }
  .bg-purple {
    background: #ef475d;
  }
  .bg-purple-light {
    background: #815c94;
  }
  .bg-purple-bdark {
    background: #f5f3f1;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
    font-size: 24px;
    line-height: 60px;
    color:#fff;
  }
  .grid-content label{font-size: 32px; color: #ee3f4d; font-weight: bold;}
  .grid-content p {font-size: 16px;line-height: 24px; text-align: left;text-indent: 2em;padding: 10px;}
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.bmap{height: 460px;}
  

 .topbox div
{
	width:40px;
	height:40px;
  border-radius: 50px;
	background:#00965e;
  display: block;
  float: left;
  margin: 10px;
	position:relative;
	animation:anls 2s linear 2s infinite alternate;
	/* Firefox: */
	-moz-animation:anls 2s linear 2s infinite alternate;
	/* Safari and Chrome: */
	-webkit-animation:anls 2s linear 2s infinite alternate;
	/* Opera: */
	-o-animation:anls 2s linear 2s infinite alternate;
}
@keyframes anls
{
	0%   {background:#00965e; }
	25%  {background:green; }
	50%  {background:#fff; }
	75%  {background:green; }
	100% {background:#00965e;}
}

</style>
