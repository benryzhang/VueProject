<template>
  <div class="right-chart-3">
	  <div id="RightChart3"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import Bus from '../../../assets/js/bus.js';
export default {
  name: 'RightChart3',
  data () {
    return {
      //redWarnArr:[],
      //redWarnArrVal:[]
    }
  },
  mounted(){
    // Bus.$on('redWarnArr', (data) => {
    //     let redWarnAr = []
    //     redWarnAr = data
    //     //console.log(redWarnAr)
    // })
    // Bus.$on('redWarnArrVal', (data) => {
    //     let redWarnArrVal = []
    //     redWarnArrVal = data
    // })
    // console.log(redWarnArrVal)
    this.drawLine();
    window.setInterval(() => {
    setTimeout(() => {
        this.drawLine();
        }, 0)
        }, 300000)
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('RightChart3'))
        // 绘制图表
        this.$axios.get(this.api.geALLWarnNum,{params:{structure:this.GLOBAL.structure}}).then(response => {
                const data = JSON.parse(response)
                //this.parainfo = data
                //const yellowWarnArr
                let yellowWarnArr = []
                let yellowWarnArrVal = []
                let redWarnArr = []
                let redWarnArrVal = []
                let totalWarnNum = 0
                data.forEach(function(value, index, _ary) {  
                    if(value.alarmlevel == 1){
                            yellowWarnArr.push(value.sensortypecode)
                            yellowWarnArrVal.push(value.alarmcount)
                            
                      }else if (value.alarmlevel == 2){
                            redWarnArr.push(value.sensortypecode)
                            redWarnArrVal.push(value.alarmcount)
                      }else if (value.alarmlevel == 3){
                        //document.getElementById("title").append(value.parainfo);
                      }
                      totalWarnNum += Number(value.alarmcount)
                });
        myChart.setOption({
            title: { text: '传感器红色预警统计',
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
                data: redWarnArr,
                
                  
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
              type: 'value',
              axisLabel:{
                textStyle:{
                color:'#fff'
                }
              }
            },
            series: [{
                //name: '条数',
                type: 'bar',
                data: redWarnArrVal,
                itemStyle: {
                  
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 0,
                        color: "#de1c31" // 0% 处的颜色
                      }, {
                        offset: 0.6,
                        color: "#ee2746" // 60% 处的颜色
                      }, {
                        offset: 1,
                        color: "#e77c8e" // 100% 处的颜色
                      }], false)
                    }
                  
                    // normal: {
                    //   label: {
                    //     show: false,  //开启显示
                    //     position: 'right',  //在上方显示
                    //     textStyle: {  //数值样式
                    //       color: '#fff',
                    //       fontSize: 16
                    //     }
                    //   },
                    //   color: function (params) {
                    //     var colorList = [
                    //       "#0099FF",
                    //       "#3399CC",
                    //       "#ABCDEF",
                    //       "#336666",
                    //       "#669999",
                    //       "#666699",
                    //       "#003366",
                    //       "#0099CC",
                    //     ];
                    //     return colorList[params.dataIndex];
                    //   }
                    // }
                  }
					}]
        });
        });
    }
  }
}
</script>


<style lang="less">
.right-chart-3 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  background: #10152f;
 }
#RightChart3 {height:350px;width: 100%;}
</style>