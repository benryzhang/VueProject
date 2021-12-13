<template>
  <div class="right-chart-2">
    <div id="rightChart2"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Bus from "../../../assets/js/bus.js";
//import echart from '../../../assets/js/echarts.js';
export default {
  name: "rightChart2",
  data() {
    return {
      redWarnArr: [],
      redWarnArrVal: [],
      yellowWarnArr: [],
      yellowWarnArVal: [],
      totalWarnNum: "",
    };
  },
  mounted() {
    this.drawLine();
    window.setInterval(() => {
      setTimeout(() => {
        //this.drawLine();
      }, 0);
    }, 300000);
  },
  methods: {
   
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("rightChart2"));
      // 绘制图表
      //console.log(this.yellowWarnArr);
      this.$axios
        .get(this.api.geALLWarnNum, {
          params: { structure: this.GLOBAL.structure },
        })
        .then((response) => {
          const data = JSON.parse(response);
          //console.log('arr',data);
          //this.parainfo = data
          //const yellowWarnArr
          let yellowWarnArr = [];
          let yellowWarnArrVal = [];
          let redWarnArr = [];
          let redWarnArrVal = [];
          let totalWarnNum = 0;
          let datasource = [['预警级别', '红色预警', '黄色预警']];
           //['sss', '红色预警', '2017'],
          data.forEach(function (value, index, _ary) {
            if (value.alarmlevel == 1) {
              yellowWarnArr.push(value.sensortypecode);
              //yellowWarnArrVal.push(value.alarmcount);
            } else if (value.alarmlevel == 2) {
              redWarnArr.push(value.sensortypecode);
              //redWarnArrVal.push(value.alarmcount);
            } else if (value.alarmlevel == 3) {
              //document.getElementById("title").append(value.parainfo);
            }
            //totalWarnNum += Number(value.alarmcount);
          });
          //console.log(yellowWarnArr)
          // let a=new Set([1,2,3,4,5]);
          // let b=new Set([1,2,3,4,5,6,7,8,9]);
          let sensortypecodearr = Array.from(new Set([...yellowWarnArr, ...redWarnArr]));
          

          for(let i = 0;i < sensortypecodearr.length;i++){
            let temparr = []
            temparr.push(sensortypecodearr[i])
            console.log(temparr)
            for(let j = 0;j < data.length;j++){
              if(sensortypecodearr[i] == data[j].sensortypecode && data[j].alarmlevel == 1 ){
                temparr.push(data[j].alarmcount)
              }else if(sensortypecodearr[i] == data[j].sensortypecode && data[j].alarmlevel == 2){
                temparr.push(data[j].alarmcount)
              }
            }
              datasource.push(temparr)
          }
          myChart.setOption({
            title: {
              text: "传感器预警统计",
              left: "center", //主副标题的水平位置
              top: "top", //主副标题的垂直位置
              padding: 5, //标题内边距,
              //backgroundColor: '#ccc',//背景颜色；
              // borderColor: '#000',//边框的颜色
              // borderWidth: 1,//标签线框
              // borderRadius: 10,//边框切圆角
              // shadowBlur: 10,//图形阴影模糊大小.
              // shadowColor: 'aqua',//阴影颜色
              // shadowOffsetX: '60',//阴影水平方向上的偏移距离
              // shadowOffsetY: '70',//阴影垂直方向上的偏移距离
              textStyle: { color: "#fff", fontSize: 14 },
            },
            legend:{
              left:0,
              top:20,
              textStyle:{color:'#fff'}
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            dataset: {
              //dimensions: ['预警统计', '黄色预警', '红色预警'],
              source: datasource
            },
            xAxis: {
              type: 'category',
              //data: yellowWarnArr,
              axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:1,//这里是为了突出显示加上的
                }
              },

              splitLine: {
                show: false,
              },

              axisLabel: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            grid: {
              left: "3%",
              left: "4%",
              bottom: "3%",
              containLabel: true,
            },
            yAxis: {
              type: "value",
              //data: yellowWarnArr,
              axisLine:{
                lineStyle:{
                    color:'#fff',
                    width:1,//这里是为了突出显示加上的
                }
              },
              axisLabel: {
                textStyle: {
                  color: "#fff",
                },
              },
              splitLine:{
                show:false,
              },
            },
            series: [
              {
                name: '黄色预警',
                type: "bar",
                //data: yellowWarnArrVal,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0,
                      1,
                      0,
                      0,
                      [
                        {
                          offset: 0,
                          color: "#fbda41", // 0% 处的颜色
                        },
                        {
                          offset: 0.6,
                          color: "#fbda41", // 60% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#f9d367", // 100% 处的颜色
                        },
                      ],
                      false
                    ),
                  },
                },
              },
               {
                name: '红色预警',
                type: "bar",
                //data: redWarnArrVal,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0,
                      1,
                      0,
                      0,
                      [
                        {
                          offset: 0,
                          color: "#de1c31", // 0% 处的颜色
                        },
                        {
                          offset: 0.6,
                          color: "#ee2746", // 60% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#e77c8e", // 100% 处的颜色
                        },
                      ],
                      false
                    ),
                  },
                },
              },
            ],
          });
        });
    },
  },
};
</script>


<style lang="less">
.right-chart-2 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  background-color: rgba(16,21,41,0.4);
}
#rightChart2 {
  height: 350px;
  width: 100%;
}
</style>