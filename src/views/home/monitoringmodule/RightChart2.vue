<template>
  <div class="right-chart-2">
	  <div id="RightChart2"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import Bus from '../../../assets/js/bus.js';
//import echart from '../../../assets/js/echarts.js';
export default {
  name: 'RightChart2',
  data () {
    return {
      redWarnArr:[],
      redWarnArrVal:[],
      yellowWarnArr:[],
      yellowWarnArVal:[],
      totalWarnNum:''
    }
  },
  mounted(){
    this.drawLine()
    window.setInterval(() => {
    setTimeout(() => {
        this.drawLine();
        }, 0)
        }, 300000)
    //this.geALLWarnNum();
    
  },
  methods: {
    geALLWarnNum() {
            
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
                    //console.log(value.paratype);  
                    //return false;  
                    
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
                  xAxis: {
                    data: yellowWarnArr
                  },
                  series: [
                    {
                      // 根据名字对应到相应的系列
                      name: '销量',
                      data: yellowWarnArrVal
                    }
                  ]
                });
                // this.yellowWarnArr = yellowWarnArr
                // this.yellowWarnArrVal = yellowWarnArrVal
                // console.log(yellowWarnArr)
                // console.log(yellowWarnArrVal.split(','))
                Bus.$emit('totalWarnNum', totalWarnNum);
                //$.each(jsonParseJson,function(idx,rows)
       
            });
            //this.drawLine(this.yellowWarnArr,this.yellowWarnArrVal);
        },
    drawLine(yellowWarnArr,yellowWarnArrVal){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('RightChart2'))
        // 绘制图表
        //console.log(this.yellowWarnArr);
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
                // myChart.setOption({
                //   xAxis: {
                //     data: yellowWarnArr
                //   },
                //   series: [
                //     {
                //       // 根据名字对应到相应的系列
                //       name: '销量',
                //       data: yellowWarnArrVal
                //     }
                //   ]
                // });
                // this.yellowWarnArr = yellowWarnArr
                // this.yellowWarnArrVal = yellowWarnArrVal
                // console.log(yellowWarnArr)
                // console.log(yellowWarnArrVal.split(','))
                Bus.$emit('totalWarnNum', totalWarnNum);
                //$.each(jsonParseJson,function(idx,rows)
       
            

        myChart.setOption({
            title: { text: '传感器黄色预警统计',
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
                data:yellowWarnArr,
                  
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
              //data: [],
              axisLabel:{
                textStyle:{
                color:'#fff'
                }
              }
            },
            series: [{
                // name: '条数',
                type: 'bar',
                data: yellowWarnArrVal,
                itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 0,
                        color: "#fbda41" // 0% 处的颜色
                      }, {
                        offset: 0.6,
                        color: "#fbda41" // 60% 处的颜色
                      }, {
                        offset: 1,
                        color: "#f9d367" // 100% 处的颜色
                      }], false)
                    }
                  
                  }
					}]
        });
        });
    }
  }
}
</script>


<style lang="less">
.right-chart-2 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  background: #10152f;
 }
#RightChart2 {height:350px;width: 100%;}
</style>