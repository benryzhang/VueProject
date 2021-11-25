<template>
  <div class="right-chart-1">
  <span>最新预警信息</span>
	<div id="RightCharts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'RightCharts',
  data () {
    return {
      plantCap: [
		        {
		          name: "无预警",
		          value: "20",
		          num: "20",
		          tip: "无预警",
		          color: "#66CC00",
		        },
		        {
		          name: "黄色预警",
		          value: "15",
		          num: "30",
		          tip: "黄色预警",
		          color: "#FFCC00",
		        },
		        {
		          name: "红色预警",
		          value: "29",
		          num: "15",
		          tip: "红色预警",
		          color: "#FF0000",
		        },
	      	]
    }
  },
  mounted(){
    //this.drawLine();
    this.initChart();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('RightCharts'))
        // 绘制图表
        myChart.setOption({
            title: { text: '传感器预警统计',
            left: 'center',//主副标题的水平位置
            top: 'top',//主副标题的垂直位置
            padding: 5,//标题内边距,
            //backgroundColor: '#ccc',//背景颜色；
            // borderColor: '#000',//边框的颜色
            // borderWidth: 1,//标签线框
            // borderRadius: 10,//边框切圆角
            // shadowBlur: 10,//图形阴影模糊大小.
            // shadowColor: 'aqua',//阴影颜色
            // shadowOffsetX: '60',//阴影水平方向上的偏移距离
            // shadowOffsetY: '70',//阴影垂直方向上的偏移距离
            textStyle:{color:'#fff',fontSize:14}},
            
            tooltip: {},
              xAxis: {
                type: 'value',
                  
splitLine:{
   show:false},

              axisLabel:{
                textStyle:{
                color:'#fff'
                }
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            yAxis: {
              data: ["ACC","DIS","FSG","FGT","HTM","GPS"],
              axisLabel:{
                textStyle:{
                color:'#fff'
                }
              }
            },
            series: [{
                name: '条数',
                type: 'bar',
                data: [45, 20, 36, 50, 10, 20],
                itemStyle: {
                    normal: {
                      color: function (params) {
                        var colorList = [
                          "#855BD7",
                          "#4B6FB8",
                          "#0F6E43",
                          "#B69C2B",
                          "#2588BB",
                          "#BB612D",
                          "#1D9394",
                          "#C24545",
                        ];
                        return colorList[params.dataIndex];
                      }
                    }
                  }
					}]
        });
    },

initChart(){
let colors = ["rgb(102, 204, 0)", "rgb(255, 204, 0)", "rgb(255, 0, 0)"];
  // 计算数据总和  reduce
  let result = this.plantCap.reduce(
      (sum, e) => Number(sum) + Number(e.value),
        0
      );
  var datalist = [
        {
          offset: [10, 80],
          symbolSize: 80,
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(102,255,153, .5)",
            },
            {
              offset: 1,
              color: "rgb(102, 204, 0,1)",
            },
          ]),
        },
        {
          offset: [38, 70],
          symbolSize: 84,
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 255, 102, .5)",
            },
            {
              offset: 1,
              color: "rgb(255, 204, 0, 1)",
            },
          ]),
        },
        {
          offset: [66, 80],
          symbolSize: 90,
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 0, 0, .5)",
            },
            {
              offset: 1,
              color: "rgb(255, 0, 102, 1)",
            },
          ]),
        },
      ];
        var datas = [];
      for (var i = 0; i < this.plantCap.length; i++) {
        var item = this.plantCap[i];
        var itemToStyle = datalist[i];
        datas.push({
          // name: item.name + "n" + item.value,
          name:
            //((item.value / result) * 100).toFixed(2) +
            // "%" +
            // "n" +
            // "n" +
            // "n" +
            // "n" +
            item.num ,
           // "人", //气泡的百分比,
          value: itemToStyle.offset,
          symbolSize: itemToStyle.symbolSize,
          label: {
            normal: {
              textStyle: {
                fontSize: 20,
                lineHeight: 100,
                color: '#00ffff',
                padding: [0, 0, 0, 0],
              },
            },
          },
          itemStyle: {
            normal: {
              color: itemToStyle.color,
              opacity: itemToStyle.opacity,
              borderWidth: "2",
              borderColor: item.color,
              borderType: "solid",
            },
          },
        });
      }
       let option = {
        // backgroundColor: "#20203e",
        color: colors,
        grid: {
          show: false,
          top: 10,
          bottom: 10,
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          // backgroundColor: "rgba(0,0,0,0.9)",
          // formatter: function (params) {
          //   let titleName;
          //   if (params.dataIndex == 2) {
          //     titleName = "无预警";
          //   } else if (params.dataIndex == 1) {
          //     titleName = "黄色预警";
          //   } else if (params.dataIndex == 0) {
          //     titleName = "红色预警";
          //   }
          //   return (
          //     '<span style="font-size: 0.2rem;font-weight: bold;>' +
          //     titleName +
          //     "</span>" +
          //     // params.seriesName +
          //     "<br/>" +
          //     params.marker +
          //     '<span style="color:' +
          //     params.color +
          //     ';font-size: 0.2rem;font-weight: bold;>' +
          //     params.data["name"] +
          //     "n" +
          //     "</span>"
          //   );
          // },
        },
        legend: {
          show: true,
          left: 85,
          bottom: 20,
          trigger: "axis",
          // 图例文字颜色
          textStyle: {
            fontSize: "14",
            //fontWeight: "bold",
            //fontFamily: "SourceHanSansCN",
            color: "#fff",
          },
          icon: "rect",
          itemWidth: 10,
          itemHeight: 10,
        },
        xAxis: [
          {
            gridIndex: 0,
            type: "value",
            show: false,
            min: 0,
            max: 100,
            nameLocation: "middle",
            nameGap: 5,
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: "middle",
            nameGap: 30,
          },
        ],
        series: [
          {
            name: "无预警",
            // color:'red',
            type: "scatter",
            symbol: "circle",
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                color: "#fff",
                textStyle: {
                  fontSize: "14",
                  //fontFamily: "BoldCondensed",
                },
              },
            },
            dataLabels: {
              allowOverlap: true,
            },
            data: datas,
          },
         
          {
            name: "黄色预警",
            type: "scatter",
            symbol: "circle",
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                color: "#fff",
                textStyle: {
                  fontSize: "14",
                  //fontFamily: "BoldCondensed",
                },
              },
            },
            data: datas,
          },
           {
            name: "红色预警",
            color:'red',
            type: "scatter",
            symbol: "circle",
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                color: "#fff",
                textStyle: {
                  fontSize: "14",
                  //fontFamily: "BoldCondensed",
                },
              },
            },
            data: datas,
          },
        ],
      };
 let myChart = this.$echarts.init(document.getElementById("RightCharts"));
  myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
}
  }
}
</script>

<style lang="less">
.right-chart-1 {
  width: 100%;
  // height: 210px;
  display: flex;
  flex-direction: column;
  background: #10152f
 }
 .right-chart-1 span{text-align: center;font-size: 14px; line-height: 24px;font-weight: bold;}
#RightCharts {height:182px;width: 100%;}
</style>