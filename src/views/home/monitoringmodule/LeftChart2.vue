<template>
  <div class="left-chart-1">
	<div id="BottomCharts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'LeftCharts',
  data () {
    return {
      
    }
  },
  mounted(){
    this.drawLine();
    //setInterval(this.drawLine(), 1000);
    window.setInterval(() => {
    setTimeout(() => {
        this.drawLine();
        }, 0)
        }, 300000)
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('BottomCharts'))
        // 绘制图表
        this.$axios.get(this.api.geALLSensorNum,{params:{structure:this.GLOBAL.structure}}).then(response => {
                const data = JSON.parse(response)
        myChart.setOption({
                title: {
                  text: '传感器数量统计',
                  subtext: '',
                  left: 'center',
                  textStyle:{color:'#fff',fontSize:14}
                },
                tooltip: {
                  trigger: 'item'
                },
               legend: {
                orient: 'vertical',
                left: 10,
                top: 20,
                textStyle: { //图例文字的样式
                  color: '#fff',
                  fontSize: 12
              },
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
    
            series: [
              {
                name: '',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                normal:{
                     color:function(params) {
                     //自定义颜色
                     var colorList = [           
                             '#bdbdbd','#000000','#FCCE10','#E87C25','#27727B',                                    
                             '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',                                            
                             '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                         ];
                         return colorList[params.dataIndex]
                      }
                 }
              }
            ]
        });
        });
    }
  }
}
</script>

<style lang="less">

#BottomCharts {height:350px;width: 100%;}
</style>